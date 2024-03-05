const express = require("express");
const controller = require("../controllers/taskController");

const router = express.Router();

router.post("/", controller.task_create);
router.get("/", controller.task_index);
router.get("/completed", controller.task_completed_all_get);
router.get("/:id", controller.task_details);
router.put("/:id", controller.task_update);
router.delete("/:id", controller.task_delete);
router.delete("/", controller.task_delete_all);

module.exports = router;
