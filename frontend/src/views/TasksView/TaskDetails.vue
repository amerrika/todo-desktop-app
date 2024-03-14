<template>
  <div class="task-details">
    <div class="task-details__header p-4">
      <h2 class="txt-neutral-100 fw-500 fs-500">Task Details</h2>
      <button
        class="btn-close-taskdetails"
        aria-label="Close task details and go back to task list"
        @click="closeTaskDetails"
      ></button>
    </div>
    <div class="task-details__content p-4" v-if="currentTask.id !== null">
      <div class="task-details__title fs-400 txt-neutral-400 fw-500">
        <div class="fs-100 mb-end-2 txt-project-blue">Title</div>
        <textarea
          class="fs-400 txt-neutral-400 fw-500"
          v-model="currentTask.title"
          >{{ currentTask.title }}</textarea
        >
      </div>
      <div class="task-details__description fs-300 txt-neutral-400 fw-500">
        <div class="fs-100 mb-end-2 txt-project-blue">Description</div>
        <textarea
          class="fs-400 txt-neutral-400 fw-500"
          v-model="currentTask.description"
        >
          {{ currentTask.description }}
        </textarea>
      </div>
    </div>
    <div class="task-details__sidebar p-4">
      <div class="txt-neutral-100">Some editing options here</div>
      <div>
        <button class="button" data-style="outline" @click="closeTaskDetails">
          Cancel
        </button>
        <button class="button" data-style="primary" @click="updateTask">
          Save changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import Data Service
import TaskDataService from "@/services/TaskDataService";

export default {
  props: {
    taskId: String,
  },
  emits: ["taskDetailsClosed"],
  data() {
    return {
      currentTask: {
        id: null,
        title: "",
        description: "",
        priority: "p0",
        isCompleted: false,
      },
    };
  },
  methods: {
    closeTaskDetails() {
      this.$emit("taskDetailsClosed");
    },
    retrieveTask() {
      TaskDataService.get(this.taskId)
        .then((response) => (this.currentTask = response.data))
        .catch((err) => console.log(err));
    },
    updateTask() {
      TaskDataService.update(this.taskId, this.currentTask)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.retrieveTask();
  },
};
</script>
