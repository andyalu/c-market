<template>
  <li class="cart-list__item flex just-between">
    <div class="product-info flex">
      <div class="img-wrapper">
        <img :src="cartItem.thumbnail" :alt="cartItem.title" loading="lazy" />
      </div>
      <div class="details">
        <h4>{{ cartItem.title }}</h4>
        <p class="product-description border-bottom">
          {{ cartItem.description }}
        </p>
        <p class="old-price">
          <span
            >£{{
              Math.ceil(
                cartItem.price +
                  cartItem.price * (cartItem.discountPercentage / 100)
              )
            }}</span
          >
        </p>
        <p class="current-price flex center">
          <span>£{{ cartItem.price }}</span>
        </p>
        <div class="quantity-wrapper flex center">
          <button id="qtyDecrease" @click="qtyDecrease">
            <i class="bi bi-dash"></i>
          </button>
          <div class="qty-value">
            {{ cartItem.quantity }}
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
        @click="removeFromCart(cartItem.id)"
        aria-label="Delete item from cart"
        title="Delete"
      >
        <i class="bi bi-trash3"></i>
      </button>
      <div class="final-cost">
        <span>Final cost:</span>&nbsp;
        <b>£ {{ cartItem.price * cartItem.quantity }}</b>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartItem",
});
</script>

<script setup>
import { ref, onMounted } from "vue";
import { useProductsStore } from "../stores/products";
const props = defineProps({
  cartItem: Object,
});
console.log(props.cartItem);

const emit = defineEmits(["removeFromCart"]);

const productsStore = useProductsStore();

const removeFromCart = (id) => {
  productsStore.removeFromCart(id);
  emit("removeFromCart", id);
};

onMounted(() => {
  props.cartItem.quantity = ref(1);
});

const qtyDecrease = () => {
  if (props.cartItem.quantity > 1) {
    props.cartItem.quantity -= 1;
  }
};

const qtyIncrease = () => {
  props.cartItem.quantity += 1;
};
</script>

<style>
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
.quantity-wrapper button {
  padding: 0 0.3rem;
  font-size: 1.1rem;
}
.quantity-wrapper .qty-value {
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
}
@media (max-width: 1699px) {
  .cart-list__item .img-wrapper {
    max-width: 202px;
  }
}
</style>
