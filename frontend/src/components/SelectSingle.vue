<template>
  <div class="select-single" role="listbox">
    <button
      ref="selectButton"
      aria-label="Select priority for the task"
      @click="toggleMenu"
    >
      <span v-if="!selectedOption">Select priority</span>
      <span v-else>{{ selectedOption.option }}</span>
      <img src="../assets/icon-dropdown.svg" alt="" />
    </button>
    <Transition v-show="isMenuOpen">
      <ul ref="selectMenu" role="presentation">
        <li
          role="option"
          v-for="option in optionsList"
          :key="option.id"
          :aria-selected="option.isSelected"
          @click="handleSelectingOption(option)"
        >
          <div
            :class="['w-3 h-3 br-50 bg-priority-' + option.color]"
            aria-hidden="true"
          ></div>
          <p>{{ option.option }}</p>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsList: [
        {
          id: 1,
          option: "Priority 1",
          value: "p1",
          color: "red",
          isSelected: false,
        },
        {
          id: 2,
          option: "Priority 2",
          value: "p2",
          color: "yellow",
          isSelected: false,
        },
      ],
      isMenuOpen: true,
      selectedOption: {
        option: "Select priority",
      },
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleSelectingOption(option) {
      // toggle isSelected
      option.isSelected = !option.isSelected;
      // unselect other options
      this.optionsList.forEach((item) => {
        if (item.id !== option.id) {
          item.isSelected = false;
        }
      });
      // update selectedOption
      this.selectedOption = this.returnSelectedOption;
    },
  },
  computed: {
    returnSelectedOption() {
      return this.optionsList.find((option) => option.isSelected === true);
    },
  },
  mounted() {
    // get width of the toggle button
    const btnToggleWidth =
      this.$refs.selectButton.getBoundingClientRect().width;
    // set menu width = button width
    this.$refs.selectMenu.style["min-width"] = `${btnToggleWidth}px`;
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
