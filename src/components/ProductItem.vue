<template>
  <div class="card products-list-card" :title="productData.title">
    <div
      class="card-img-wrapper"
      @click="goToProductPage(productData.id)"
      title="See the details"
    >
      <img :src="productData.thumbnail" :alt="productData.title" />
      <div class="discount-badge">-{{ productData.discountPercentage }}%</div>
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ productData.title }}</h3>
      <div class="product-rating">
        <div
          class="rating-stars"
          :style="`--rating: ${productData.rating}`"
          :title="`Rating of this product is ${productData.rating} out of 5.0`"
        ></div>
        &nbsp;
        <span class="rating-value">{{ productData.rating }}</span>
      </div>
      <p class="old-price">
        <span
          >£{{
            Math.ceil(
              productData.price +
                productData.price * (productData.discountPercentage / 100)
            )
          }}</span
        >
      </p>
      <p class="current-price flex center just-between">
        <span>£{{ productData.price }}</span>
        <button @click="addToCart(productData)" class="add-to-cart">
          <!-- <i class="bi bi-cart" v-if="productData.isAddedToCart === false"></i>
          <i class="bi bi-cart-check-fill" v-else></i> -->
          <i class="bi bi-cart"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ProductItem",
});
</script>

<script setup>
const props = defineProps({
  productData: Object,
});

const emit = defineEmits(["addToCart", "goToProductPage"]);

// onMounted(() => {
//   props.productData.isAddedToCart = ref(false);
// });

const goToProductPage = (id) => {
  emit("goToProductPage", id);
};

const addToCart = (item) => {
  emit("addToCart", item);
  // item.isAddedToCart = true;
};
</script>

<style>
.products-list-card {
  width: 16.66%;
  padding: 0 0.5rem 1.5rem 0.5rem;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  position: relative;
  transition: all ease 0.2s;
}
.products-list-card:hover {
  z-index: 3;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.card-img-wrapper {
  width: 100%;
  min-height: 6rem;
  overflow: hidden;
  position: relative;
  background-color: #eee;
  cursor: pointer;
}
.card-img-wrapper img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all ease 0.2s;
}
.card-img-wrapper:hover img {
  width: 110%;
}
.discount-badge {
  position: absolute;
  top: 0.1rem;
  left: 0;
  background-color: rgb(246, 211, 17);
  font-size: 12px;
  font-weight: 700;
  padding: 0.2rem;
}
.product-info {
  padding: 0.5rem;
}
.product-title {
  height: 40px;
  overflow: hidden;
  font-size: 14px;
  color: #333;
}
.rating-stars {
  --rating-percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--rating-star-size);
  font-family: Times;
  line-height: 1;
  letter-spacing: -1.98px;
}
.rating-stars::before {
  content: "★★★★★";
  background: linear-gradient(
    90deg,
    var(--rating-star-background) var(--rating-percent),
    var(--rating-star-color) var(--rating-percent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rating-value {
  font-size: 12px;
  color: #221f1f;
}
.old-price {
  text-decoration: line-through;
  color: #a6a5a5;
  font-size: 14px;
  margin-top: 0.2rem;
}
.current-price {
  color: var(--accent-color);
  font-size: 24px;
  margin-top: 0.4rem;
}
.current-price .add-to-cart {
  color: var(--brand-color);
  cursor: pointer;
  font-size: 18px;
  border: 0;
  border-radius: 5px;
  padding: 0.1rem 0.2rem;
  background-color: #fff;
  transition: all ease 0.2s;
}
.current-price .add-to-cart:hover {
  background-color: #eee;
}
.current-price .add-to-cart:active {
  transform: scale(0.98);
}

@media (max-width: 1699px) {
  .products-list-card {
    width: 19.96%;
    padding: 0 0.5rem 1.5rem 0.5rem;
    cursor: pointer;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    transition: all ease 0.2s;
  }
  .card-img-wrapper {
    min-height: 7rem;
  }
}

@media (max-width: 1199px) {
  .products-list-card {
    width: 24.76%;
    padding: 0 0.5rem 1.5rem 0.5rem;
    cursor: pointer;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    transition: all ease 0.2s;
  }
  .card-img-wrapper {
    min-height: 5rem;
  }
  .current-price {
    font-size: 20px;
  }
}

@media (max-width: 1199px) {
  .products-list-card {
    width: 32.52%;
    padding: 0 0.5rem 1.5rem 0.5rem;
  }
}

@media (max-width: 599px) {
  .products-list-card {
    width: 49.52%;
    padding: 0 0.5rem 1.5rem 0.5rem;
  }
  .card-img-wrapper {
    min-height: 7.2rem;
  }
}

@media (max-width: 399px) {
  .products-list-card {
    width: 100%;
    padding: 0 0.5rem 1.5rem 0.5rem;
  }
  .card-img-wrapper {
    min-height: 10.4rem;
  }
}
</style>
