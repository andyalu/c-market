<template>
  <div class="product-card-wrapper">
    <button
      class="nav-link btn-outlined"
      @click="router.push({ name: 'Catalog' })"
    >
      <i class="bi bi-skip-backward-fill"></i> &nbsp;
      <span>Back to catalog</span>
    </button>
    <div class="product-card flex md-column md-flex-center">
      <div class="product-card__img-wrapper md-w-100">
        <div class="product-img-large border-light">
          <img
            :src="selectedProduct.thumbnail"
            :alt="selectedProduct.title"
            class="main-img"
          />
          <img
            :src="demoImgSrc"
            :alt="selectedProduct.title"
            class="demo-img"
          />
        </div>
        <div class="images-row flex wrap md-just-center">
          <img
            v-for="image in selectedProduct.images"
            @mouseover="imgDemoSet(image)"
            @mouseleave="imgDemoClear"
            class="images-row-item border-light"
            :src="image"
            :key="image"
            :alt="selectedProduct.title"
            height="96"
          />
        </div>
      </div>
      <div class="product-card__info md-w-100 md-mt-2">
        <h2 class="product-title flex center">
          <span>{{ selectedProduct.title }}</span>
          <div class="discount-badge">
            -{{ selectedProduct.discountPercentage }}%
          </div>
        </h2>
        <p class="product-description border-bottom">
          {{ selectedProduct.description }}
        </p>
        <div class="product-rating">
          <div
            class="rating-stars"
            :style="`--rating: ${selectedProduct.rating}`"
            :title="`Rating of this product is ${selectedProduct.rating} out of 5.0`"
          ></div>
          &nbsp;
          <span class="rating-value">{{ selectedProduct.rating }}</span>
        </div>
        <p class="old-price">
          <span
            >£{{
              Math.ceil(
                selectedProduct.price +
                  selectedProduct.price *
                    (selectedProduct.discountPercentage / 100)
              )
            }}</span
          >
        </p>
        <p class="current-price flex center">
          <span>£{{ selectedProduct.price }}</span>
        </p>
        <p class="in-stock">
          <b>{{ selectedProduct.stock }}</b> left in stock
        </p>
        <p class="brand">Brand: {{ selectedProduct.brand }}</p>
        <button class="btn" @click="addToCart()">
          <i class="bi bi-cart3"></i> &nbsp;
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductDetail",
});
</script>

<script setup>
import { ref, computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";

const productsStore = useProductsStore();
const route = useRoute();
const router = useRouter();

const selectedProduct = computed(() => {
  return productsStore.products.find(
    (item) => item.id === Number(route.params.id)
  );
});

const addToCart = () => {
  productsStore.addToCart(selectedProduct.value);
};

let demoImgSrc = ref(selectedProduct.value.thumbnail);

const imgDemoSet = (source) => {
  demoImgSrc.value = source;
};

const imgDemoClear = () => {
  demoImgSrc.value = selectedProduct.value.thumbnail;
};
</script>

<style>
.border-light {
  border: 1px solid #e9e9e9;
}
.product-card-wrapper {
  padding: 2rem 0;
}
.nav-link {
  padding: 0.2rem 1rem;
  margin-bottom: 1.5rem;
}
.product-card__img-wrapper {
  width: 50%;
  padding-right: 1.5rem;
}
.product-img-large {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 0.65;
  background-color: #eee;
  border-radius: 4px;
  padding: 1rem;
}
.main-img,
.demo-img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 94%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 3;
  border-radius: 4px;
}
.demo-img {
  z-index: 5;
}
.images-row {
  margin-top: 1rem;
}
.images-row-item {
  margin-right: 0.5rem;
  border-radius: 4px;
}
.product-card__info {
  width: 50%;
  padding-left: 1.5rem;
}
.product-card__info .product-title {
  font-size: 1.8rem;
}
.product-card__info .product-title .discount-badge {
  background-color: rgb(246, 211, 17);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.2rem;
  margin-left: 1.2rem;
}
.product-card__info .product-description {
  margin: 1rem 0;
  max-width: 460px;
  color: #555;
  padding-bottom: 1rem;
}
.product-card__info .current-price {
  font-size: 1.7rem;
  font-weight: 700;
}
.product-card__info .in-stock,
.product-card__info .brand {
  margin-top: 0.6rem;
}
.product-card__info .btn {
  margin-top: 2rem;
}

@media screen and (max-width: 1699px) {
  .product-img-large {
    aspect-ratio: 1 / 0.55;
  }
  .images-row-item {
    height: 68px;
  }
}

@media screen and (max-width: 1199px) {
  .product-img-large {
    aspect-ratio: 1 / 0.55;
  }
  .images-row-item {
    height: 68px;
  }
}

@media screen and (max-width: 799px) {
  .product-card-wrapper .nav-link {
    margin-top: var(--header-height);
  }
  .product-img-large {
    aspect-ratio: 1 / 0.55;
  }
}

@media screen and (max-width: 599px) {
  .product-card__img-wrapper {
    padding-right: 0;
  }
  .images-row-item {
    height: 48px;
  }
  .product-card__info {
    padding-left: 0;
  }
  .product-card__info .product-title {
    font-size: 1.4rem;
  }
}
</style>
