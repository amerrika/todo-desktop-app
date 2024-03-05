<template>
  <div class="task-add p-4 br-10">
    <button
      class="btn-open-editor"
      v-show="!isOpened"
      aria-label="Open editor to create a new task"
      @click="openEditor"
    >
      <img src="../../assets/icon-add.svg" alt="" />
      <span class="txt-neutral-400 fs-400 fw-500">Add new task</span>
    </button>
    <div class="task-add__editor" v-show="isOpened">
      <input
        class="fs-500 txt-neutral-500"
        type="text"
        v-model="newTask.title"
        placeholder="Title"
      />
      <input
        class="fs-200 txt-neutral-500"
        type="text"
        v-model="newTask.description"
        placeholder="Description"
      />
      <select name="priority" id="select-priority" v-model="newTask.priority">
        <option value="p0" selected>Priority</option>
        <option value="p1">Priority 1</option>
        <option value="p2">Priority 2</option>
      </select>
      <div>
        <button
          class="button"
          data-style="outline"
          aria-label="Close the editor"
          @click="closeEditor"
        >
          Cancel
        </button>
        <button
          class="button btn-save-task"
          :class="ClassButtonDisabled"
          data-style="primary"
          @click="saveTask"
        >
          Add task
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskDataService from "@/services/TaskDataService";

export default {
  emits: ["taskAdded"],
  data() {
    return {
      newTask: {
        id: null,
        title: "",
        description: "",
        priority: "p0",
        isCompleted: false,
      },
      isOpened: false,
    };
  },
  methods: {
    openEditor() {
      this.isOpened = true;
    },
    closeEditor() {
      this.isOpened = false;
      this.newTask = this.initialNewTask();
    },
    saveTask() {
      const data = {
        title: this.newTask.title,
        description: this.newTask.description,
        priority: this.newTask.priority,
        isCompleted: this.newTask.isCompleted,
      };

      TaskDataService.create(data)
        .then((response) => {
          this.newTask.id = response.data.id;
          this.isOpened = false;
          this.$emit("taskAdded");
          this.newTask = this.initialNewTask();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initialNewTask() {
      return {
        id: null,
        title: "",
        description: "",
        priority: "p0",
        isCompleted: false,
      };
    },
  },
  computed: {
    ClassButtonDisabled() {
      if (this.newTask.title === "") {
        return "btn-disabled";
      }
    },
  },
};
</script>
