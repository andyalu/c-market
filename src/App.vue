<template>
  <AppHeader />
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { RouterLink, RouterView } from "vue-router";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
</script>
