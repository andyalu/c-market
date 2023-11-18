<template>
  <div class="menu-filters-wrapper">
    <h4>Filters:</h4>
    <div class="flex center">
      Price:
      <button
        @click="sortByPriceToHigh"
        title="Low to high"
        aria-label="Low to high"
      >
        <i class="bi bi-graph-up-arrow"></i>
      </button>
      <button
        @click="sortByPriceToLow"
        title="High to low"
        aria-label="High to low"
      >
        <i class="bi bi-graph-down-arrow"></i>
      </button>
    </div>
    <div class="flex center">
      <button @click="sortByRating">Sort by rating</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits([
  "sortByPriceToHigh",
  "sortByPriceToLow",
  "sortByRating",
]);

const sortByPriceToHigh = () => {
  emit("sortByPriceToHigh");
};
const sortByPriceToLow = () => {
  emit("sortByPriceToLow");
};
const sortByRating = () => {
  emit("sortByRating");
};
</script>

<style></style>
