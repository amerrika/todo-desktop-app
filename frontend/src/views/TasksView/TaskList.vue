<template>
  <div class="task-list br-10">
    <!-- header -->
    <div class="task-list__header p-4">
      <h2 class="txt-neutral-100 fw-500 fs-500">Your Task List</h2>
      <button class="btn-print" @click="printTaskList"></button>
    </div>
    <!-- list -->
    <ul class="task-list__content p-4">
      <li v-for="task in taskList" :class="{ completed: task.isComplete }">
        <button
          class="task-checkbox"
          type="button"
          role="checkbox"
          aria-checked="false"
          aria-label="Mark task as complete"
          @click="setTaskIsComplete(task)"
        ></button>
        <a
          href="#"
          class="fs-400 txt-neutral-400 fw-500"
          aria-label="Open task details"
          @click="emitTaskDetailsClicked(task['_id'])"
        >
          {{ task.title }}
        </a>
        <button
          class="btn-task-delete"
          @click="deleteTask(task['_id'])"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
// import Data Service
import TaskDataService from "@/services/TaskDataService";

export default {
  props: {
    refreshRequired: Boolean,
  },
  emits: ["taskDetailsClicked"],
  data() {
    return {
      taskList: [],
    };
  },
  methods: {
    retrieveTasks() {
      TaskDataService.getAll()
        .then((response) => {
          this.taskList = response.data;
        })
        .catch((err) => console.log(err));
    },
    deleteTask(id) {
      TaskDataService.delete(id)
        .then((response) => {
          this.refreshTaskList();
        })
        .catch((err) => console.log(err));
    },
    setTaskIsComplete(task) {
      task.isComplete = !task.isComplete;
      const id = task["_id"];
      TaskDataService.update(id, task)
        .then((response) => {
          this.refreshTaskList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refreshTaskList() {
      this.retrieveTasks();
    },
    printTaskList() {
      window.print();
    },
    emitTaskDetailsClicked(id) {
      this.$emit("taskDetailsClicked", id);
    },
  },
  created() {
    this.retrieveTasks();
  },
  watch: {
    refreshRequired: {
      handler() {
        this.refreshTaskList();
      },
    },
  },
};
</script>
