import axios from 'axios';
import authHeader from './auth-header';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products";

class ProductsService { 

    getCategories(){
        return axios.get(PRODUCT_API_BASE_URL + '/category');
    }

    getProducts(config){
        return axios.get(PRODUCT_API_BASE_URL, config);
    }

    createProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product, { headers: authHeader() });
    }

    getProductById(productId){
        return axios.get(PRODUCT_API_BASE_URL + '/' + productId, { headers: authHeader() });
    }

    updateProduct(product, productId){
        return axios.put(PRODUCT_API_BASE_URL + '/' + productId, product, { headers: authHeader() });
    }

    deleteProduct(productId){
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productId, { headers: authHeader() });
    }


}

export default new ProductsService()