<template>
  <div class="cart-wrapper" v-if="!productsStore.cart.length">
    <button class="nav-link" @click="router.push({ name: 'Catalog' })">
      <i class="bi bi-skip-backward-fill"></i> &nbsp;
      <span>Back to catalog</span>
    </button>
    <p class="cart-message">Cart is empty...</p>
  </div>
  <div class="cart-wrapper cards-wrapper" v-else>
    <button class="nav-link" @click="router.push({ name: 'Catalog' })">
      <i class="bi bi-skip-backward-fill"></i> &nbsp;
      <span>Back to catalog</span>
    </button>
    <ul class="cart-list">
      <CartItem
        v-for="item in productsStore.cart"
        :key="item.id"
        :cartItem="item"
        @removeFromCart="removeFromCart(item.id)"
      />
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Cart",
});
</script>

<script setup>
import CartItem from "../components/CartItem.vue";
import { useProductsStore } from "../stores/products";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

const removeFromCart = (id) => {
  productsStore.removeFromCart(id);
};
</script>

<style>
.cart-wrapper {
  padding: 2rem 0;
}
</style>
