<template>
  <div class="menu-categories-wrapper">
    <h4>Categories:</h4>
    <ul class="categories-list">
      <li
        class="categories-list__item flex center"
        @click="sortByCategory('All')"
      >
        <i class="bi bi-list-check"></i>&nbsp;
        <span>All</span>
      </li>
      <li
        class="categories-list__item flex center"
        v-for="item in categories"
        :key="item.name"
        @click="sortByCategory(item.name)"
        :data-category="item.name"
      >
        <i :class="item.iconClass"></i>&nbsp;
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const categories = [
  {
    name: "Laptops",
    iconClass: "bi bi-laptop",
  },
  {
    name: "Smartphones",
    iconClass: "bi bi-phone",
  },
  {
    name: "Fragrances",
    iconClass: "bi bi-emoji-smile",
  },
  {
    name: "Skincare",
    iconClass: "bi bi-hand-index-thumb",
  },
  {
    name: "Groceries",
    iconClass: "bi bi-egg",
  },
  {
    name: "Home-decoration",
    iconClass: "bi bi-house-door",
  },
];

const emit = defineEmits(["sortByCategory"]);

const sortByCategory = (category) => {
  emit("sortByCategory", category);
};
</script>

<style>
.menu-categories-wrapper {
  /* position: sticky;
  top: 1rem; */
  margin-bottom: 1.5rem;
}
.categories-list__item {
  cursor: pointer;
  margin: 0.2rem 0;
  padding: 0.5rem;
  background-color: #ddd;
  color: #3e77aa;
}
.categories-list__item span {
  font-size: 0.9rem;
}
.categories-list__item:hover span {
  text-decoration: underline;
}
</style>
