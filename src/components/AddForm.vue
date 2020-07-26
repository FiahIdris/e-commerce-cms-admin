<template>
  <div>
     <Navbar />
  <div class="container">
    <div class="col-sm-12 col-lg-6">
      <img v-if="image_url" v-bind:src="image_url" />
      <h4 v-else>Your product image will appear here</h4>
    </div>
    <div class="col-sm-12 col-lg-6 form-add">
      <form @submit="newProduct">
        <div class="form-group">
          <label for="name">product name:</label>
          <input type="text" class="form-control" v-model="name"/>
        </div><br>
        <div class="form-group">
          <label for="price">price:</label>
          <input type="number" class="form-control" v-model="price"/>
        </div><br>
        <div class="form-group">
          <label for="stock">stock:</label>
          <input type="number" class="form-control" v-model="stock"/>
        </div><br>
        <div class="form-group">
          <label for="image_url">image_url:</label>
          <input type="text" class="form-control" v-model="image_url"/>
        </div><br>
        <div class="d-flex div-btn">
          <button class="btn">Add</button>
          <button @click.prevent="cancel" class="btn">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from '../components/Navigation.vue'
export default {
  name: 'AddForm',
  components: {
    Navbar
  },
  data () {
    return {
      name: '',
      price: 0,
      stock: 0,
      image_url: ''
    }
  },
  methods: {
    cancel () {
      this.$router.push('/products')
    },
    newProduct () {
      const newProduct = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url
      }
      this.$store.dispatch('newProduct', newProduct)
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
.container {
  background: hsla(0, 100%, 89%, 1);
  background: radial-gradient(circle, hsla(0, 100%, 89%, 1) 0%, hsla(0, 100%, 67%, 1) 100%);
  background: -moz-radial-gradient(circle, hsla(0, 100%, 89%, 1) 0%, hsla(0, 100%, 67%, 1) 100%);
  background: -webkit-radial-gradient(circle, hsla(0, 100%, 89%, 1) 0%, hsla(0, 100%, 67%, 1) 100%);
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#ffc8c8", endColorstr="#ff5858", GradientType=1 );
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  margin: 100px auto;
}
.col-lg-6 {
  padding-top:10px;
}
.form-add{
  margin-top: 10px;
}
.form-group{
  height:40px;
  color: white;
  text-shadow: #e84a5f;
}
img {
  margin-top: 20px;
  width: 100%;
  height: auto;
}
input{
  height:40px;
  font-size: 15px;
  color: #fa9372;
  font-family: 'Kalam', cursive;
}
button {
  width:70px;
  margin-right: 10px;
  margin-top: 30px;
  background-color: #fbd07c;
  color: #e84a5f;
}
button:hover{
  color:white;
  background-color:#fa9372;
}
.div-btn{
  margin-bottom: 20px;
}
h4{
  text-align: center;
  margin:200px auto;
  color:#ffed00;
}
</style>
