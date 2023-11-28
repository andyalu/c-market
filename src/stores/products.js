import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: [],
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
      let targetItem = this.cart.filter(
        (currItem) => currItem.id === product.id
      )[0];

      if (targetItem) {
        targetItem.quantity += 1;
        console.log(targetItem.quantity);
      } else {
        this.cart = [...this.cart, { ...product, quantity: 1 }];
      }
      // this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
