<template>
  <div class="tasks-view">
    <TaskAdd v-if="!showTaskDetails" @task-added="refreshRequired = true" />

    <TaskList
      v-if="!showTaskDetails"
      :refreshRequired="refreshRequiredReactive"
      @task-details-opened="handleTaskDetails"
    />

    <Transition>
      <TaskDetails
        v-if="showTaskDetails"
        @close-task-details="showTaskDetails = false"
        :task-id="taskIdReactive"
    /></Transition>
  </div>
</template>

<script>
// import task components
import TaskList from "./TaskList.vue";
import TaskAdd from "./TaskAdd.vue";
import TaskDetails from "./TaskDetails.vue";

export default {
  components: {
    TaskList,
    TaskAdd,
    TaskDetails,
  },
  data() {
    return {
      refreshRequired: false,
      showTaskDetails: false,
      taskId: null,
      isVisible: false,
    };
  },
  methods: {
    handleTaskDetails(id) {
      this.taskId = id;
      this.showTaskDetails = true;
    },
  },
  computed: {
    refreshRequiredReactive() {
      return this.refreshRequired;
    },
    taskIdReactive() {
      return this.taskId;
    },
  },
};
</script>
