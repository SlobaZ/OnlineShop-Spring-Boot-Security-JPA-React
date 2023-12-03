import axios from 'axios';
import AuthenticationHeader from './AuthenticationHeader';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/products";


    const getCategories  = () => {
        return axios.get(PRODUCT_API_BASE_URL + '/category');
    }

    const getProducts  = (config) => {
        return axios.get(PRODUCT_API_BASE_URL, config);
    }

    const createProduct  = (product) => {
        return axios.post(PRODUCT_API_BASE_URL, product, { headers: AuthenticationHeader() });
    }

    const getProductById  = (productId) => {
        return axios.get(PRODUCT_API_BASE_URL + '/' + productId, { headers: AuthenticationHeader() });
    }

    const updateProduct = (product, productId) => {
        return axios.put(PRODUCT_API_BASE_URL + '/' + productId, product, { headers: AuthenticationHeader() });
    }

    const deleteProduct = (productId) => {
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productId, { headers: AuthenticationHeader() });
    }

const ProductsService = { 
	getCategories, getProducts, createProduct, getProductById, updateProduct, deleteProduct
}

export default ProductsService;