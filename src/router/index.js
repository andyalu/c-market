import { createRouter, createWebHistory } from "vue-router";
import Catalog from "@/views/Catalog.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Cart from "@/views/Cart.vue";

const router = createRouter({
  history: createWebHistory("/c-market/#/"),
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Catalog",
      component: Catalog,
    },
    {
      path: "/product/:id",
      name: "Product",
      component: ProductDetail,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
  ],
});

export default router;
