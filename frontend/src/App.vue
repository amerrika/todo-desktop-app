<template>
  <header class="sidebar" :class="ClassSidebarHidden">
    <div class="p-4">
      <span role="img" class="logo" aria-label="Logo in plain text">TODO</span>
      <button
        class="btn-toggle-sidebar"
        aria-expanded="true"
        aria-label="Close the sidebar"
        @click="toggleSidebar"
      ></button>
    </div>
    <nav class="p-4">
      <h2 class="fs-300 txt-neutral-600 mb-end-4">OVERVIEW</h2>
      <ul>
        <li>
          <img src="../src/assets/icon-task.svg" alt="" />
          <router-link to="/">Tasks</router-link>
        </li>
        <li>
          <img src="../src/assets/icon-note.svg" alt="" />
          <router-link to="/notes">Notes</router-link>
        </li>
        <li>
          <img src="../src/assets/icon-tip.svg" alt="" />
          <router-link to="/tips">Tips</router-link>
        </li>
      </ul>
    </nav>
    <div class="p-4">
      <div class="copyright">
        <p class="fs-100 txt-neutral-100">© 2024. Made with ❤️ by&nbsp;</p>
        <a class="fs-100 txt-primary-blue" href="https://github.com/amerrika">Amer Tricic</a>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
// import sass
import "../src/scss/main.scss";
export default {
  data() {
    return {
      sidebarHidden: false,
    };
  },

  methods: {
    toggleSidebar(e) {
      this.sidebarHidden = !this.sidebarHidden;
      e.target.setAttribute("aria-expanded", !this.sidebarHidden);
      if (this.sidebarHidden) {
        e.target.setAttribute("aria-label", "Open the sidebar");
      } else {
        e.target.setAttribute("aria-label", "Close the sidebar");
      }
    },
  },
  computed: {
    ClassSidebarHidden() {
      if (this.sidebarHidden) {
        return "hidden";
      } else {
        return "";
      }
    },
  },
};
</script>
