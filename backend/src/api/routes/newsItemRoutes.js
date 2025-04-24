const express = require("express");
const router = express.Router();
const NewsItemController = require("../controllers/NewsItemController");

router.post("/", NewsItemController.createNewsItem);
router.get("/", NewsItemController.getAllNewsItems);
router.get("/:id", NewsItemController.getNewsItemById);
router.put("/:id", NewsItemController.updateNewsItem);
router.delete("/:id", NewsItemController.deleteNewsItem);

module.exports = router;