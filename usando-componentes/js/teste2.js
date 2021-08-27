Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="product">
  <div class="product-image">
  <img :src="image" />
  </div>
  <div class="product-info">
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
  <a :href="link" target="_blank">Clique aqui para comprar</a>
  <p v-if="inStock">Em estoque</p>
  <p v-else :class="{ tex: !inStock}">Fora de estoque</p>
  <p>Frete: {{ shipping }}</p
  <h3>{{ sale }}</h3>

  <product-details :details="details"></product-details>

  <h4>tamanhos:</h4>
  <ul>
    <li v-for="size in sizes">{{ size }}</li>
  </ul>
  <h4>Cores:</h4>

  <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
    :style="{ backgroundColor: variant.color }" @mouseover="updateProduct(index)">
  </div>

  <button v-on:click="addToCart" :disable="!inStock" :class="{ disabledButton: !inStock}">Adicione ao carrinho</button>
  <button v-on:click="removeFromCart" :disable="!inStock" :class="{ disabledButton: !inStock}">Remover do carrinho</button>
  

  </div>
  </div>
  </div>`,


  data() {
    return {
      brand: "Vue majestic",
      product: 'Meias',
      description: 'Um par de meias quentinhas',
      selectedVariant: 0,
      link: "https://www.youtube.com/watch?v=o6OPInMHOyI",
      details: ["80% OFF", "100% Algodão"],
      variants: [
        {
          variantId: 2234,
          color: "green",
          variantImage: "../images/greenSocks.png",
          variantQuantity: 10
        },
        {
          variantId: 3423,
          color: "blue",
          variantImage: "../images/blueSocks.png",
          variantQuantity: 0,
        }
      ],
      sizes: ["35", "36", "37", "38"],
      onSale: true
    }
  },
  methods: {
    addToCart () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    removeFromCart() {
      this.$emit("remove-of-cart", this.variants[this.selectedVariant].variantId)
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
    },
    shipping() {
      if (this.premium) {
        return "Grátis"
      }
      return 2.99
    }
  }

})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id){
      this.cart.push(id)
    },
    removeCart(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
        }
      }
    }
  }
})