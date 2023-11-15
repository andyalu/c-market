<template>
  <header class="header flex center just-center">
    <div class="container flex center just-between">
      <RouterLink :to="{ name: 'Catalog' }" class="logo">
        <i class="bi bi-shop-window"></i>&nbsp; <b>C-MARKET</b>
      </RouterLink>
      <RouterLink :to="{ name: 'Cart' }" class="cart-indicator">
        <i class="bi bi-cart3"></i>
        <span class="cart-length">{{ productsStore.cart.length }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
</script>

<style>
:root {
  --header-height: 68px;
}
.header {
  background-color: #000;
  color: #fff;
  padding: 0.5rem 0;
  height: var(--header-height);
}
.cart-indicator {
  padding: 0.28rem;
  border-radius: 5px;
  position: relative;
  font-size: 22px;
  transition: all ease 0.2s;
}
.cart-indicator:hover {
  background-color: #333;
}
.cart-indicator .cart-length {
  position: absolute;
  width: 22px;
  height: 22px;
  top: -8px;
  right: -8px;
  font-size: 14px;
  color: #fff;
  background-color: var(--brand-color);
  padding: 0.2rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
