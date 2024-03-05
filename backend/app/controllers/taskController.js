const db = require("../models");
const Task = db.tasks;

// create and save a new Task
const task_create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  // create a Task
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    isComplete: req.body.isComplete ? req.body.isComplete : false,
  });
  // save in the database
  task
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Task.",
      });
    });
};

// retrieve all Tasks from the database
const task_index = (req, res) => {
  Task.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving tasks",
      });
    });
};

// find a single Task
const task_details = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Task with id:" + id });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id,
      });
    });
};

// update a single Task
const task_update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data cannot be empty!",
    });
    return;
  }

  const id = req.params.id;

  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: "Task was successfully updated" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

// delete a single Task
const task_delete = (req, res) => {
  const id = req.params.id;
  console.log(req);
  Task.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: "Task was successfully deleted" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Task with id=" + id,
      });
    });
};

// delete all Tasks from the database
const task_delete_all = (req, res) => {
  Task.deleteMany()
    .then((data) => {
      res.send({
        message: "All Tasks were sucessfully deleted!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while deleting all Tasks",
      });
    });
};

// find all completed Tasks
const task_completed_all_get = (req, res) => {
  Task.find({ isComplete: true })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occured while retrieving (completed) tasks",
      });
    });
};

module.exports = {
  task_create,
  task_index,
  task_details,
  task_update,
  task_delete,
  task_delete_all,
  task_completed_all_get,
};
