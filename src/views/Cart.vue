<template>
  <div class="cart-message" v-if="!productsStore.cart.length">
    <p>Cart is empty...</p>
    <RouterLink :to="{ name: 'Catalog' }" class="btn"
      >Back to catalog</RouterLink
    >
  </div>
  <div class="cart-wrapper cards-wrapper" v-else>
    <button class="nav-link" @click="router.push({ name: 'Catalog' })">
      <i class="bi bi-skip-backward-fill"></i> &nbsp;
      <span>Back to catalog</span>
    </button>
    <ul class="cart-list">
      <li
        class="cart-list__item flex just-between"
        v-for="item in productsStore.cart"
        :key="item.id"
      >
        <div class="product-info flex">
          <div class="img-wrapper">
            <img :src="item.thumbnail" :alt="item.title" loading="lazy" />
          </div>
          <div class="details">
            <h4>{{ item.title }}</h4>
            <p class="product-description border-bottom">
              {{ item.description }}
            </p>
            <p class="old-price">
              <span
                >£{{
                  Math.ceil(
                    item.price + item.price * (item.discountPercentage / 100)
                  )
                }}</span
              >
            </p>
            <p class="current-price flex center">
              <span>£{{ item.price }}</span>
            </p>
            <div class="quantity-wrapper flex center">
              <button id="qtyDecrease" @click="qtyDecrease">
                <i class="bi bi-dash"></i>
              </button>
              <div class="qty-value">
                {{ itemQty }}
              </div>
              <button id="qtyIncrease" @click="qtyIncrease">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="control-panel flex column just-between">
          <button
            class="btn"
            @click="removeFromCart(item.id)"
            aria-label="Delete item from cart"
            title="Delete"
          >
            <i class="bi bi-trash3"></i>
          </button>
          <div class="final-cost">
            <span>Final cost:</span>&nbsp;
            <b>£ {{ item.price * itemQty }}</b>
          </div>
        </div>
      </li>
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
import { useProductsStore } from "../stores/products";
import { RouterLink, useRoute, useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

const removeFromCart = (id) => {
  productsStore.removeFromCart(id);
};

let itemQty = ref(5);

const result = productsStore.cart.reduce((acc, el) => {
  acc[el] = (acc[el] || 0) + 1;
  return acc;
}, {});

console.table(result);

// const qtyDecrease = () => {
//   if (itemQty.value > 1) {
//     itemQty.value - 1;
//   }
// };

// const qtyIncrease = () => {
//   itemQty.value + 1;
// };
</script>

<style>
.cart-wrapper {
  padding: 2rem 0;
}
.cart-list__item {
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  border-radius: 5px;
}
.cart-list__item .img-wrapper {
  width: 100%;
  max-width: 262px;
  aspect-ratio: 1 / 0.65;
  overflow: hidden;
  border-radius: 5px;
}
.cart-list__item .img-wrapper img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.product-info .details {
  margin-left: 1.5rem;
}
.quantity-wrapper {
  margin-top: 1rem;
}
.quantity-wrapper .qty-value {
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
}
</style>
