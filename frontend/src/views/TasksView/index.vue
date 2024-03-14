<template>
  <div class="tasks-view">
    <Transition name="switch" mode="out-in">
      <div v-if="!taskDetailsDisplayed">
        <TaskAdd @task-added="refreshRequired = true" />
        <TaskList
          :refreshRequired="refreshRequiredReactive"
          @task-details-opened="openTaskDetails"
        />
      </div>

      <TaskDetails
        v-else
        @task-details-closed="closeTaskDetails"
        :task-id="taskIdReactive"
      />
    </Transition>
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
      taskDetailsDisplayed: false,
      taskId: null,
    };
  },
  methods: {
    openTaskDetails(id) {
      this.taskId = id;
      this.taskDetailsDisplayed = true;
    },
    closeTaskDetails() {
      this.taskDetailsDisplayed = false;
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
