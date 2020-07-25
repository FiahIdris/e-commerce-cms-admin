<template>
  <div class="container d-flex flex-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Setting</th>
        </tr>
      </thead>
      <tbody
        v-for="product in products"
        :key="product.id"
      >
        <tr>
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <img
              :src="product.image_url"
            />
          </td>
          <td>
            <a href="#" v-b-modal.modal-prevent-closing @click.prevent="param(product.id)"><i class="fas fa-pencil-alt fa-2x"></i></a>
            <a href="#" @click.prevent="deleteProduct(product.id)"><i class="fas fa-trash-alt fa-2x"></i></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal edit -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Edit product:"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="edit(id)">
          <b-form-group label="Name" label-for="name">
            <b-form-input id="name" v-model="name" required>{{product.name}}</b-form-input>
          </b-form-group>
          <b-form-group label="Price" label-for="price">
            <b-form-input id="price" v-model="price" required>{{product.price}}</b-form-input>
          </b-form-group>
          <b-form-group label="Stock" label-for="stock">
            <b-form-input id="stock" v-model="stock" required>{{product.stock}}</b-form-input>
          </b-form-group>
          <b-form-group label="Image_url" label-for="image_url">
            <b-form-input id="image_url" v-model="image_url" required>{{product.image_url}}</b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      name: '',
      price: '',
      stock: '',
      image_url: '',
      id: ''
    }
  },
  methods: {
    resetModal () {
      this.name = ''
      this.price = ''
      this.stock = ''
      this.image_url = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.edit(this.id)
    },
    edit (param) {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
      const dataEdit = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url,
        id: param
      }
      this.$store.dispatch('edit', dataEdit)
      this.$store.dispatch('fetchData')
    },
    param (id) {
      this.id = id
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.$store.dispatch('fetchData')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
  margin-top: 100px;
}
table{
  width: 100%;
  margin-top:20px;
}
thead{
  text-align: center;
  border-style: outset;
  border-color:#ffc8c8;
  font-size: 25px;
  color:white;
  top: 100px;
}
th{
  border-color:#ffc8c8;
  background-color: #fa9372;
  position: sticky;
  top:100px;
}
tbody{
  text-align: center;
  border-style: outset;
  border-color: #ffc8c8;
  color:#e84a5f;
}
td{
  padding-top:20px;
}
img {
  width: 100px;
  padding: auto;
}
a{
  color:#ffc8c8;
}
a:hover{
  color:#e84a5f;
}
button {
  background-color: #ffc8c8;
  color:#e84a5f;

}
button:hover {
  background-color:#e84a5f;
  color:white;
}
a{
  margin:10px;
}
form{
  font-family: 'Kalam', cursive;
  font-size: 20px;
}
b-form-input, b-modal{
  font-family: 'Kalam', cursive;
  font-size: 20px;
  height:30px;
  color:#e84a5f;
}

</style>
