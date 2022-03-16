import axios from 'axios';
import authHeader from './auth-header';

const SHOPPING_API_BASE_URL = "http://localhost:8080/api/shoppings";

class ShoppingsService { 

    getShoppings(config){
        return axios.get(SHOPPING_API_BASE_URL, config , { headers: authHeader() });
    }

    getShoppingById(shoppingId){
        return axios.get(SHOPPING_API_BASE_URL + '/' + shoppingId , { headers: authHeader() });
    }

    updateShopping(shopping, shoppingId){
        return axios.put(SHOPPING_API_BASE_URL + '/' + shoppingId, shopping , { headers: authHeader() });
    }

    deleteShopping(shoppingId){
        return axios.delete(SHOPPING_API_BASE_URL + '/' + shoppingId , { headers: authHeader() });
    }

    createShopping(username){
        return axios.post(SHOPPING_API_BASE_URL + '/createshopping/', username,  { headers: authHeader() });
    }
    
    buy(shoppingId){
        return axios.post(SHOPPING_API_BASE_URL + '/' + shoppingId + '/buy' ,  { headers: authHeader() } );
    }


}

export default new ShoppingsService()