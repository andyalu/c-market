<template>
  <div class="layout-main flex">
    <aside class="aside">
      <MenuCategories @sortByCategory="sortByCategory" />
    </aside>
    <div class="cards-wrapper products-list flex wrap">
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :productData="product"
        @addToCart="addToCart(product)"
        @goToProductPage="goToProductPage(product.id)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "Catalog",
});
</script>

<script setup>
import MenuCategories from "@/components/MenuCategories.vue";
import ProductItem from "@/components/ProductItem.vue";
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

let sortedProducts = ref([]);

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

const sortByCategory = (category) => {
  sortedProducts.value = [];
  productsStore.products.map((item) => {
    if (item.category.toLowerCase() === category.toLowerCase()) {
      console.log(item.category);
      sortedProducts.value.push(item);
    }
  });
};

const filteredProducts = computed(() => {
  if (sortedProducts.value.length) {
    return sortedProducts.value;
  } else {
    return productsStore.products;
  }
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
}

@media (max-width: 399px) {
  :root {
    --header-height: 52px;
  }
  .header .container {
    width: 92%;
  }
}
</style>
