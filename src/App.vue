<template>
  <div id="app">
    <nav>
      <div class="navbar navbar-dark bg-primary">
        <a href="#" class="navbar-brand">Products</a>
      </div>
    </nav>

    <div class="container">
      <form>
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="nome"
            placeholder="Nome"
          />
        </div>
        <div class="mb-3">
          <label for="quantidade" class="form-label">Quantidade</label>
          <input
            type="number"
            class="form-control"
            id="quantidade"
            placeholder="QTD"
          />
        </div>
        <div class="mb-3">
          <label for="valor" class="form-label">Valor</label>
          <input
            type="text"
            class="form-control"
            id="valor"
            placeholder="Valor"
          />
        </div>

        <button class="btn btn-primary">
          Salvar<i class="bi bi-save"></i>
        </button>
      </form>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th>NOME</th>
              <th>QTD</th>
              <th>VALOR</th>
              <th>OPÇÕES</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{ produto.name }}</td>
              <td>{{ produto.quantity }}</td>
              <td>{{ produto.price }}</td>
              <td>
                <button class="btn btn-primary">
                  <i class="bi bi-pencil">Editar</i>
                </button>
                <button class="btn btn-danger">
                  <i class="bi bi-trash">Remover</i>
                </button>
              </td>
            </tr>
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
      produtos: [],
    };
  },
  mounted() {
    Product.listar().then((res) => {
      this.produtos = res.data; // Atribui os dados à variável produtos
    });
  },
};
</script>

<style>
tr button {
  margin: 0px 5px 0px 5px;
}


</style>
