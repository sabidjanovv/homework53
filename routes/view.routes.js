const { Router } = require("express");

const { createViewPath } = require("../helpers/create_view_path")

const router = Router();

router.get("/", (req, res) => {
  res.render(createViewPath("index"),{
    title: "Asosiy sahifa",
    isHome: true, // classda menu active qilish uchun
  });
});

router.get("/dictionary", (req, res) => {
  res.render(createViewPath("dictionary"), {
    title: "Lug'atlar",
    isHome: true, // classda menu active qilish uchun
  });
});
router.get("/topics", (req, res) => {
  res.render(createViewPath("topics"), {
    title: "Maqolalar",
    isHome: true, // classda menu active qilish uchun
  });
});
router.get("/authors", (req, res) => {
  res.render(createViewPath("authors"), {
    title: "Mualliflar",
    isHome: true, // classda menu active qilish uchun
  });
});
router.get("/login", (req, res) => {
  res.render(createViewPath("login"), {
    title: "Login",
    isHome: true, // classda menu active qilish uchun
  });
});

router.get("/add", (req, res) => {
  res.render(createViewPath("add"), {
    title: "Register",
    isHome: true, // classda menu active qilish uchun
  });
});

module.exports = router;