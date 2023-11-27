<template>
  <div class="menu-filters-wrapper">
    <h4>Filters:</h4>
    <div class="filter-item flex center">
      Price:
      <button
        @click="sortByPriceToHigh"
        title="Low to high"
        aria-label="Low to high"
        class="btn-outlined"
      >
        <i class="bi bi-graph-up-arrow"></i>
      </button>
      <button
        @click="sortByPriceToLow"
        title="High to low"
        aria-label="High to low"
        class="btn-outlined"
      >
        <i class="bi bi-graph-down-arrow"></i>
      </button>
    </div>
    <div class="filter-item flex center">
      Rating:
      <button @click="sortByRating" class="btn-outlined">Sort by rating</button>
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

<style>
.filter-item {
  margin-top: 0.8rem;
}
.filter-item .btn-outlined {
  margin-left: 0.4rem;
  padding: 0.1rem 0.4rem;
}
</style>
