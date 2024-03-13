<template>
  <div class="select-single" role="listbox">
    <button
      ref="selectButton"
      aria-label="Select priority for the task"
      @click="toggleMenu"
    >
      <span v-if="!selectedOption">Priority</span>
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
          value: "a",
          color: "red",
          isSelected: false,
        },
        {
          id: 2,
          option: "Priority 2",
          value: "b",
          color: "yellow",
          isSelected: false,
        },
      ],
      isMenuOpen: false,
      selectedOption: null,
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
      // validate selectedOption & emit value of selected priority
      if (this.selectedOption) {
        this.$emit("selectedPriority", this.selectedOption.value);
      } else {
        this.$emit("selectedPriority", "c");
      }
    },
  },
  computed: {
    returnSelectedOption() {
      return this.optionsList.find((option) => option.isSelected === true);
    },
  },
};
</script>
