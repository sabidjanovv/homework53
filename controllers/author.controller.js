const { errorHandler } = require("../helpers/error_handler");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validations/author.validation");

const bcrypt = require("bcrypt");
const config = require('config');
const jwt = require("jsonwebtoken");
const myJwt = require("../services/jwt_service");
const { response } = require("express");

const uuid = require("uuid")
const mail_service = require("../services/mail_service")


const authorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(404).send({ message: "Author topilmadi" });
    }
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email parol noto'g'ri" });
    }
    const payload = {
      _id: author._id,
      email: author.email,
      is_expert: author.is_expert,
      author_roles: ["READ", "WRITE"], //DELETE
    };
    const tokens = myJwt.generateTokens(payload);
    author.token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    // try {
    //   setTimeout(function(){
    //     throw new Error("uncaughtException example")
    //   })
    // } catch (error) {
    //   console.log(error);
    // }

    new Promise((_, reject) => {
      reject(new Error("unhandledRejection example"));
    });

    res.send({
      message: "User logged in",
      id: author._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};




const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const fullName = `${value.first_name} ${value.last_name}`;

    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    } = value;

    const author = await Author.findOne({
      email: { $regex: email, $options: "i" },
    });

    if (author) {
      return res.status(400).send({ message: "Bunday Author email mavjud" });
    }

    const hashedPassword = bcrypt.hashSync(password, 7);

    const activation_link = uuid.v4();

    const newAuthor = await Author.create({
      first_name,
      last_name,
      full_name: fullName,
      nick_name,
      email,
      phone,
      password: hashedPassword,
      info,
      position,
      photo,
      is_expert,
      is_active,
      activation_link,
    });

    await mail_service.sendActivationMail(
      email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/author/activate/${activation_link}`
    );

    const payload = {
      _id: newAuthor._id,
      email: newAuthor.email,
      is_expert: newAuthor.is_expert,
    };
    const tokens = myJwt.generateTokens(payload);
    newAuthor.token = tokens.refreshToken;
    await newAuthor.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.send({
      message: "Author added",
      id: newAuthor._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};



const logoutAuthor = async (req, res) => {
  const { refreshToken } = req.cookies
  if (!refreshToken){
    return res.status(403).send({ message: "Refresh token topilmadi" });
  }
  const author = await Author.findOneAndUpdate(
    { token: refreshToken },
    { token: "" },
    { new: true }
  );
  if (!author) {
    return res.status(400).send({ message: "Invalid refresh token" });
  }
  res.clearCookie("refreshToken");
  res.send({ reshreshToken:author.token })

};


const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      return res.status(403).send({ message: "Cookieda Refresh token topilmadi" });
    }
    const [error, decodedRefreshToken] = await to(myJwt.verifyRefreshToken(refreshToken));
    if (error) {
      return res.status(403).send({ error: error.message });
    }
    const authorFromDB = await Author.findOne({ token: refreshToken });
    if (!authorFromDB) {
      return res.status(403).send({ message: "Ruxsat etilmagan foydalanuvchi(Refresh token mos emas)" });
    }
    const payload = {
      _id: authorFromDB._id,
      email: authorFromDB.email,
      is_expert: authorFromDB.is_expert,
    };
    const tokens = myJwt.generateTokens(payload);
    authorFromDB.token = tokens.refreshToken;
    await authorFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });
    res.send({
      message: "Refresh Token",
      id: authorFromDB._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};



const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    if(!authors){
      return res.status(400).send({ message: "Birorta author topilmadi" });
    }
    res.json({ data:authors});
  } catch (error) {
    errorHandler(res, error);
  }
};


const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo_url,
      is_expert,
      is_active,
    } = req.body;
    const author = await Author.find({
      email: { $regex: email, $options: "i" },
    });
    console.log(author, typeof author);

    if (author.length > 1) {
      return res.status(400).send({ message: "Bunday Author email mavjud" });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        nick_name,
        email,
        phone,
        password,
        info,
        position,
        photo: photo_url,
        is_expert,
        is_active,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Author updated succesfuly", updatedAuthor });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "Author deleted succesfuly", deletedAuthor });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.author._id);

    if(id !== req.author._id){
      return res
        .status(403)
        .send({ message: "Ruxsat etilmagan foydalanuvchi" });

    }
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).send({ message: "Author mavjud emas" });
    }
    res.send(author);
  } catch (error) {
    errorHandler(res, error);
  }
};

const authorActivate = async(req, res)=>{
  try {
    const link = req.params.link;
    const author = await Author.findOne({activation_link:link});

    if (!author) {
      return res.status(400).send({ message: "Bunday Author topilmadi" });
    }
    if (author.is_active){
      return res.status(400).send({ message: "Bu author avval faollashtirilgan" });
    }
    author.is_active = true;
    await author.save();
    res.send({ is_active:author.is_active, message: "Author faollashtirildi"})
  } catch (error) {
    errorHandler(res, error);
  }
}


module.exports = {
  addAuthor,
  authorLogin,
  logoutAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
  refreshToken,
  getAuthorById,
  authorActivate,
};