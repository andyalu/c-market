import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: [],
    currentSortedProducts: [],
  }),

  actions: {
    fetchProductsFromDB() {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => {
          this.products = json.products;
        });
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    sortByCategory(category) {
      console.log(category.toLowerCase());
    },
  },
});
