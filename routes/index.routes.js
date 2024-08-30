const express = require("express");

const router = express.Router();
const dictRouter = require("./dictionary.routes");
const categoryRoutes = require("./category.routes");
const descriptionRoutes = require("./description.routes");
const synonymRoutes = require("./synonym.routes");
const authorRoutes = require("./author.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const authorSocialRoutes = require("./author_social.routes");
const descQA_Routes = require("./desc_QA.routes");
const desctopicRoutes = require("./desc_topic.routes");
const guestRoutes = require("./guest.routes");
const questionAnswerRoutes = require("./question_answer.routes");
const tagRoutes = require("./tag.routes");
const topicRoutes = require("./topic.routes");
const socialRoutes = require("./social.routes");
const workerRoutes = require("./worker.routes")






router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/dictionary", dictRouter);
router.use("/category", categoryRoutes);
router.use("/description", descriptionRoutes);
router.use("/synonym", synonymRoutes);
router.use("/author", authorRoutes);
router.use("/author_social", authorSocialRoutes);
router.use("/desc_QA", descQA_Routes);
router.use("/desc_topic", desctopicRoutes);
router.use("/guest", guestRoutes);
router.use("/question_answer", questionAnswerRoutes);
router.use("/tag", tagRoutes);
router.use("/topic", topicRoutes);
router.use("/social", socialRoutes);
router.use("/worker", workerRoutes)


module.exports = router;
