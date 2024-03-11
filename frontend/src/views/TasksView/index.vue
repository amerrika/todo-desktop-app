<template>
  <div class="tasks-view" :data-show-taskdetails="mountTaskDetails">
    <TaskAdd @task-added="refreshRequired = true" />
    <TaskList
      :refreshRequired="refreshRequiredReactive"
      @task-details-opened="handleTaskDetails"
    />
    <TaskDetails
      v-if="showTaskDetails"
      @close-task-details="showTaskDetails = false"
      :task-id="taskIdReactive"
    />
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
    mountTaskDetails() {
      if (this.showTaskDetails) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
