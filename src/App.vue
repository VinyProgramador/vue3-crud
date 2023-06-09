<template>
  <div id="app">
    <nav>
      <div>
        <a href="#">Products</a>
      </div>
    </nav>

    <div>
      <form @submit.prevent="salvar">
        <div>
          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome"
            v-model="product.name"
          />
        </div>
        <div>
          <label for="quantidade">Quantidade</label>
          <input
            type="number"
            min="1"
            id="quantidade"
            placeholder="QTD"
            v-model="product.quantity"
          />
        </div>
        <div>
          <label for="valor">Valor</label>
          <input
            type="text"
            id="valor"
            placeholder="Valor"
            v-model="product.price"
          />
        </div>

        <button class="btn-save">Salvar</button>
      </form>

      <div class="product-colums">
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>QTD</th>
              <th>VALOR</th>
              <th>OPÇÕES</th>
            </tr>
          </thead>

          <tbody>
            <template v-if="produtos.length">
              <tr v-for="produto in produtos" :key="produto.id">
                <td>{{ produto.name }}</td>
                <td>{{ produto.quantity }}</td>
                <td>R$ {{ parseFloat(produto.price).toFixed(2) }}</td>
                <td>
                  <button @click="editar(produto)" class="btn-edit">
                    Editar
                  </button>
                  <button @click="remover(produto.id)" class="btn-delete">
                    Remover
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <b>
                <h6>Não há produtos cadastrados ainda..</h6>
              </b>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "./services/products";
export default {
  data() {
    return {
      product: {
        id: "",
        name: "",
        quantity: "",
        price: "",
      },
      produtos: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Product.listar().then((res) => {
        this.produtos = res.data;
      });
    },
    salvar() {
      if (
        this.product.name == "" ||
        this.product.quantity == "" ||
        this.product.price <= 0
      ) {
        return alert("Há campos vazios!");
      } else if (!this.product.id) {
        return Product.salvar(this.product).then((res) => {
          console.log(res);
          alert("Salvo com sucesso!");
          window.location.reload(false);
          this.listar();
        });
      } else {
        return Product.atualizar(this.product.id, this.product).then((res) => {
          console.log(res);
          alert("Atualizado com sucesso!");
          window.location.reload(false);
          this.listar();
        });
      }
    },
    editar(produto) {
      this.product = produto;
    },
    remover(id) {
      Product.remover(id)
        .then((res) => {
          this.listar();
          console.log(res);
        })
        .then((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
* {
  font-family: monospace;
  font-size: 1rem;
}

body {
  font-family: monospace;
  margin: 0;
  padding: 0;
}

nav {
  background-color: #0a0c10;
  padding: 10px;
}

nav a {
  color: #5ae982;
  font-weight: 700;
  text-decoration: none;
}

form {
  margin: 30px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: gray;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.btn-edit,
.btn-delete,
.btn-save {
  background-color: #2ea34f;
  color: #f2f2f2;
  padding: 6px 16px;
  width: 100px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
}

.btn-edit {
  background-color: cadetblue;
}
.btn-delete {
  background-color: brown;
}

.product-colums {
  overflow-x: auto;
}

.product-colums table {
  width: 100%;
  border-collapse: collapse;
}

.product-colums th,
.product-colums td {
  padding: 30px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-colums th {
  background-color: #f2f2f2;
}

.product-colums tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-colums tbody tr:hover {
  background-color: #f5f5f5;
}

tr button {
  margin: 15px;
  width: 100px;
}

.btn {
  background-color: lightgray;
  color: black;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #5ae982;
  color: white;
}

.btn-danger {
  background-color: lightgray;
  color: red;
}

h6 {
  color: gray;
  margin: 30px;
}
</style>


