<template>
  <div class="cart-wrapper" v-if="!productsStore.cart.length">
    <button
      class="nav-link btn-outlined"
      @click="router.push({ name: 'Catalog' })"
    >
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
        @goToProductPage="goToProductPage(item.id)"
        @removeFromCart="removeFromCart(item.id)"
      />
    </ul>
    <div class="total-cost-widget flex center">
      Total:&nbsp;<span class="currency">£</span
      ><span class="total-value">{{ totalFinalCost }}</span>
      &nbsp;&nbsp;
      <button class="btn">
        <span>Order</span>&nbsp;
        <i class="bi bi-check-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Cart",
});
</script>

<script setup>
import { onMounted } from "vue";
import CartItem from "../components/CartItem.vue";
import { useProductsStore } from "../stores/products";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

const goToProductPage = (id) => {
  router.push({
    name: "Product",
    params: {
      id,
    },
  });
};

const removeFromCart = (id) => {
  productsStore.removeFromCart(id);
};

const totalFinalCost = computed(() => {
  let total = [];

  productsStore.cart.forEach((item) => {
    total.push(item.price * item.quantity);
  });

  total = total.reduce((sum, el) => {
    return sum + el;
  });

  return total;
});

onMounted(() => {
  if (localStorage.getItem("cart") !== "") {
    productsStore.cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    productsStore.cart = [];
  }
});
</script>

<style>
.cart-wrapper {
  padding: 2rem 0 6rem 0;
}
.total-cost-widget {
  position: fixed;
  z-index: 15;
  right: 1rem;
  bottom: 1rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: #00a0461a;
  border: 1px solid #00a046;
  backdrop-filter: blur(12px);
}
.total-cost-widget .currency {
}
.total-cost-widget .total-value {
  font-weight: 700;
}

@media screen and (max-width: 799px) {
  .cart-wrapper .nav-link {
    margin-top: var(--header-height);
  }
}
</style>
