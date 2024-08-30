const Admin = require("../schemas/Admin");
const { adminValidation } = require("../validations/admin.validation");
const { errorHandler } = require("../helpers/error_handler");

const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/jwt_service");
const { response } = require("express");


const uuid = require("uuid")
const mail_service = require("../services/mail_service")

const createAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = value;

    const admin = await Admin.findOne({
      admin_email: { $regex: admin_email, $options: "i" },
    });
    if (admin) {
      return res.status(400).send({ message: "Bunday email mavjud" });
    }

    const hashedPassword = bcrypt.hashSync(admin_password, 7);

    const activation_link = uuid.v4();

    const newAdmin = await Admin.create({
      admin_name,
      admin_email,
      admin_phone,
      admin_password: hashedPassword,
      admin_is_active,
      admin_is_creator,
    });


    await mail_service.sendActivationMail(
      email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/admin/activate/${activation_link}`
    );



    const payload = {
      _id: newAdmin._id,
      admin_email: newAdmin.admin_email,
      admin_is_creator: newAdmin.admin_is_creator,
    };
    const tokens = myJwt.generateTokens(payload);
    newAdmin.token = tokens.refreshToken;
    await newAdmin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.status(201).send({
      message: "Admin muvaffaqiyatli qo'shildi",
      id: newAdmin._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });
    if (!admin) {
      return res.status(404).send({ message: "Admin topilmadi" });
    }

    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      _id: admin._id,
      admin_email: admin.admin_email,
      admin_is_creator: admin.admin_is_creator,
    };

    const tokens = myJwt.generateTokens(payload);
    admin.token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.send({
      message: "Admin tizimga kirdi",
      id: admin._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const adminLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).send({ message: "Token topilmadi" });
    }

    const admin = await Admin.findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Yaroqsiz token" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Admin tizimdan chiqdi" });
  } catch (error) {
    errorHandler(res, error);
  }
};


const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const newAccessToken = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
};




const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send(admins);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin topilmadi" });
    }
    res.send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, value, {
      new: true,
    });
    if (!updatedAdmin) {
      return res.status(404).send({ message: "Admin topilmadi" });
    }
    res
      .status(200)
      .send({ message: "Admin muvaffaqiyatli yangilandi", updatedAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).send({ message: "Admin topilmadi" });
    }
    res
      .status(200)
      .send({ message: "Admin muvaffaqiyatli o'chirildi", deletedAdmin });
  } catch (error) {
    errorHandler(res, error);
  }
};


const adminActivate = async(req, res)=>{
  try {
    const link = req.params.link;
    const admin = await Admin.findOne({ activation_link: link });

    if (!admin) {
      return res.status(400).send({ message: "Bunday Admin topilmadi" });
    }
    if (admin.admin_is_active) {
      return res
        .status(400)
        .send({ message: "Bu admin avval faollashtirilgan" });
    }
    admin.admin_is_active = true;
    await admin.save();
    res.send({
      admin_is_active: admin.admin_is_active,
      message: "Admin faollashtirildi",
    });
  } catch (error) {
    errorHandler(res, error);
  }
}



module.exports = {
  createAdmin,
  adminLogin,
  adminLogout,
  refreshToken,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminActivate
};
