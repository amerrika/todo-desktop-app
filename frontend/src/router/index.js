import { createRouter, createWebHistory } from "vue-router";
import TasksView from "../views/TasksView";
import NotesView from "../views/NotesView.vue";
import TipsView from "../views/TipsView.vue";

const routes = [
  {
    path: "/",
    name: "tasks",
    component: TasksView,
  },
  {
    path: "/notes",
    name: "notes",
    component: NotesView,
  },
  {
    path: "/tips",
    name: "tips",
    component: TipsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
