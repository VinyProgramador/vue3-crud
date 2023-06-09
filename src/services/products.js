import { http } from "./config";

export default {
    listar: () => {
        return http.get('products')
    },
    salvar: (product) => {
        return http.post('products', product)
    }
}