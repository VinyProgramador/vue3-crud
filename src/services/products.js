import { http } from "./config";

export default {
    listar: () => {
        return http.get('products')
    },
    salvar: (product) => {
        return http.post('products', product)
    },
    atualizar: (id, product) => {
        return http.put(`products/${id}`, product)
    },
    remover: (id, product) => {
        return http.delete(`products/${id}`, product)
    }
}