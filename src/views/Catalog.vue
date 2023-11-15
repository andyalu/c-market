<template>
  <div class="layout-main flex">
    <aside class="aside">
      <MenuCategories />
    </aside>
    <div class="cards-wrapper products-list flex wrap">
      <div
        class="card products-list-card"
        v-for="product in productsStore.products"
        :key="product.name"
        :title="product.title"
      >
        <div
          class="card-img-wrapper"
          @click="goToProductPage(product.id)"
          title="See the details"
        >
          <img :src="product.thumbnail" :alt="product.title" />
          <div class="discount-badge">-{{ product.discountPercentage }}%</div>
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <div class="product-rating">
            <div
              class="rating-stars"
              :style="`--rating: ${product.rating}`"
              :title="`Rating of this product is ${product.rating} out of 5.0`"
            ></div>
            &nbsp;
            <span class="rating-value">{{ product.rating }}</span>
          </div>
          <!-- <h3>{{ product.category }}</h3> -->
          <p class="old-price">
            <span
              >£{{
                Math.ceil(
                  product.price +
                    product.price * (product.discountPercentage / 100)
                )
              }}</span
            >
          </p>
          <p class="current-price flex center just-between">
            <span>£{{ product.price }}</span>
            <button @click="addToCart(product)" class="add-to-cart">
              <i class="bi bi-cart3"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Catalog",
});
</script>

<script setup>
import MenuCategories from "@/components/MenuCategories.vue";
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
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

const addToCart = (product) => {
  productsStore.addToCart(product);
};

onMounted(async () => {
  await productsStore.fetchProductsFromDB();
});
</script>

<style>
:root {
  --rating-star-size: 20px;
  --rating-star-color: #ccc;
  --rating-star-background: #ffc132;
}
.layout-main {
  padding: 2rem 0;
}
.aside {
  width: 16%;
}
.products-list {
  width: 84%;
  padding-left: 1rem;
}
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
  .aside {
    width: 18%;
  }
  .categories-list__item span {
    font-size: 0.8rem;
  }
  .products-list {
    width: 82%;
    padding-left: 1rem;
  }
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
  .aside {
    position: fixed;
    z-index: 12;
    top: var(--header-height);
    left: -100%;
    width: 60%;
    background-color: #fff;
    padding: 2rem 1rem;
    border-right: 1px solid #e9e9e9;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .products-list {
    width: 100%;
    padding-left: 0;
  }
  .products-list-card {
    width: 49.52%;
    padding: 0 0.5rem 1.5rem 0.5rem;
  }
  .card-img-wrapper {
    min-height: 7.2rem;
  }
}

@media (max-width: 399px) {
  :root {
    --header-height: 52px;
  }
  .header .container {
    width: 92%;
  }
  .cart-indicator {
    font-size: 18px;
  }
  .products-list-card {
    width: 100%;
    padding: 0 0.5rem 1.5rem 0.5rem;
  }
  .card-img-wrapper {
    min-height: 10.4rem;
  }
}
</style>
