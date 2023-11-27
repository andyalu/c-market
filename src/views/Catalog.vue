<template>
  <div class="layout-main flex">
    <aside class="aside" id="asideMenu">
      <MenuCategories @sortByCategory="sortByCategory" />
      <MenuFilters
        @sortByPriceToHigh="sortByPriceToHigh"
        @sortByPriceToLow="sortByPriceToLow"
        @sortByRating="sortByRating"
      />
      <div class="mob-menu-btn" @click="asideMenuToggle">
        <i class="bi bi-list icon-menu"></i>
        <i class="bi bi-x-lg icon-close"></i>
      </div>
    </aside>
    <div class="main-part">
      <!-- <div class="control-panel flex center just-center">
        <TextInput
          :textInputData="textInputData"
          v-model="inputValue"
          @searchByValue="searchProductsByName"
        />
      </div> -->
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
import MenuFilters from "@/components/MenuFilters.vue";
import ProductItem from "@/components/ProductItem.vue";
import TextInput from "@/components/UI/TextInput.vue";
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();
const router = useRouter();

const textInputData = {
  id: "searchInput",
  placeholder: "Search...",
};

let inputValue = "";

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

const sortByPriceToHigh = () => {
  if (sortedProducts.value.length) {
    sortedProducts.value = sortedProducts.value.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
  } else {
    productsStore.products = productsStore.products.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
  }
};

const sortByPriceToLow = () => {
  if (sortedProducts.value.length) {
    sortedProducts.value = sortedProducts.value.sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
  } else {
    productsStore.products = productsStore.products.sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
  }
};

const sortByRating = () => {
  if (sortedProducts.value.length) {
    sortedProducts.value = sortedProducts.value.sort((a, b) =>
      a.rating < b.rating ? 1 : -1
    );
  } else {
    productsStore.products = productsStore.products.sort((a, b) =>
      a.rating < b.rating ? 1 : -1
    );
  }
};

const asideMenuToggle = () => {
  document.querySelector("#asideMenu").classList.toggle("active");
};
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
  position: relative;
  z-index: 12;
  padding-right: 0.5rem;
  border-right: 1px solid #ccc;
}
.aside .mob-menu-btn {
  display: none;
  align-content: center;
  justify-content: center;
  font-size: 1.25rem;
  width: 2rem;
  height: 2rem;
  background: #fff;
  padding: 0.1rem;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  position: absolute;
  right: -2rem;
  top: 0;
  cursor: pointer;
}
.aside .mob-menu-btn .icon-close {
  display: none;
}
.main-part {
  width: 84%;
  padding-left: 1rem;
}
.main-part .control-panel {
  margin-bottom: 1rem;
}

@media (max-width: 1199px) {
  .aside {
    width: 18%;
  }
  .categories-list__item span {
    font-size: 0.8rem;
  }
  .main-part {
    width: 82%;
  }
}

@media (max-width: 799px) {
  .main-part {
    margin-top: var(--header-height);
  }
  .aside {
    position: fixed;
    z-index: 12;
    top: var(--header-height);
    left: -60%;
    width: 60%;
    height: 100%;
    background-color: #fff;
    padding: 2rem 1rem;
    border-right: 1px solid #e9e9e9;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all ease 0.4s;
  }
  .aside.active {
    left: 0;
  }
  .aside .mob-menu-btn {
    display: inline-flex;
  }
  .aside.active .mob-menu-btn .icon-menu {
    display: none;
  }
  .aside.active .mob-menu-btn .icon-close {
    display: inline-block;
  }
  .main-part {
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
