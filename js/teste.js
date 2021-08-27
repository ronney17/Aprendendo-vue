var app = new Vue({
  el: '#app',
  data: {
    brand: "Vue majestic",
    product: 'Meias',
    description: 'Um par de meias quentinhas',
    selectedVariant: 0,
    link: "https://www.youtube.com/watch?v=o6OPInMHOyI",
    details: ["80% OFF", "Frete grátis", "100% Algodão"],
    variants: [
      {
        color: "green",
        variantImage: "./images/greenSocks.png",
        variantQuantity: 10
      },
      {
        color: "blue",
        variantImage: "./images/blueSocks.png",
        variantQuantity: 0,
      }
    ],
    sizes: ["35", "36", "37", "38"],
    cart: 0,
    onSale: true
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    removeFromCart() {
      this.cart -= 1
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + " Estão em promoção!"
      }
        return this.brand + ' ' + this.product + " Não estão em promoção"
    }
  }
})