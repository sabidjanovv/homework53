const User = require("../schemas/User");
const bcrypt = require("bcrypt");
const config = require("config");
const myJwt = require("../services/jwt_service");
const { userValidation } = require("../validations/user.validation");
const { errorHandler } = require("../helpers/error_handler");

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const {
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
      user_is_active,
    } = value;

    const existingUser = await User.findOne({
      user_email: { $regex: user_email, $options: "i" },
    });
    if (existingUser) {
      return res.status(400).send({ message: "Bunday email mavjud" });
    }

    const hashedPassword = bcrypt.hashSync(user_password, 7);

    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_info,
      user_photo,
      user_is_active,
    });

    const payload = {
      _id: newUser._id,
      user_email: newUser.user_email,
    };
    const tokens = myJwt.generateTokens(payload);
    newUser.token = tokens.refreshToken;
    await newUser.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.status(201).send({
      message: "Foydalanuvchi muvaffaqiyatli qo'shildi",
      id: newUser._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }

    const validPassword = bcrypt.compareSync(user_password, user.user_password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      _id: user._id,
      user_email: user.user_email,
    };

    const tokens = myJwt.generateTokens(payload);
    user.token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.send({
      message: "Foydalanuvchi tizimga kirdi",
      id: user._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).send({ message: "Token topilmadi" });
    }

    const user = await User.findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ message: "Yaroqsiz token" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Foydalanuvchi tizimdan chiqdi" });
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
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
};



const getUsers = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).send({ message: "Token not provided" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      return res.status(403).send({ message: "Invalid token" });
    }

    const decodedToken = jwt.verify(token, config.get("tokenKey"));
    console.log(decodedToken);

    const users = await User.find();
    res.send(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = userValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User updated successfully", updatedUser });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
