import axios from 'axios';
import AuthenticationHeader from './AuthenticationHeader';

const SHOPPING_API_BASE_URL = "http://localhost:8080/api/shoppings";



    const getShoppings  = (config) => {
        return axios.get(SHOPPING_API_BASE_URL, config , { headers: AuthenticationHeader() });
    }

    const getShoppingById = (shoppingId) => {         
        return axios.get(SHOPPING_API_BASE_URL + '/' + shoppingId , { headers: AuthenticationHeader() });
    }

    const updateShopping = (shopping, shoppingId) => {
        return axios.put(SHOPPING_API_BASE_URL + '/' + shoppingId, shopping , { headers: AuthenticationHeader() });
    }

    const deleteShopping = (shoppingId) => {
        return axios.delete(SHOPPING_API_BASE_URL + '/' + shoppingId , { headers: AuthenticationHeader() });
    }

    const createShopping = (shopping) => {
        return axios.post(SHOPPING_API_BASE_URL , shopping , { headers: AuthenticationHeader() });
    }
    
    const buy = (shoppingId) => {
        return axios.post(SHOPPING_API_BASE_URL + '/' + shoppingId + '/buy' ,  { headers: AuthenticationHeader() } );
    }

const ShoppingsService = { 
    getShoppings, getShoppingById, updateShopping, deleteShopping, createShopping, buy
}

export default ShoppingsService;