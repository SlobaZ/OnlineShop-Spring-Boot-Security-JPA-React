import axios from 'axios';
import authHeader from './auth-header';

const ITEMS_API_BASE_URL = "http://localhost:8080/api/shoppings/{shoppingId}/items";
const ITEMS_API_BASE_URLS = "http://localhost:8080/api/shoppings/";

class ItemsService { 

	getAllsByShoppingId(shoppingId){
        return axios.get(ITEMS_API_BASE_URLS + shoppingId + '/items' ,  { headers: authHeader() } );
    }

    createItem(item){
        return axios.post(ITEMS_API_BASE_URL, item ,  { headers: authHeader() } );
    }

    getItemById(itemId){
        return axios.get(ITEMS_API_BASE_URL + '/' + itemId ,  { headers: authHeader() } );
    }


    deleteItem(itemId){
        return axios.delete(ITEMS_API_BASE_URL + '/' + itemId ,  { headers: authHeader() } );
    }
    
    buyItem(itemId,itemQuantity){
        return axios.post(ITEMS_API_BASE_URL + '/' + itemId + '/' + itemQuantity + '/buyItem' ,  { headers: authHeader() } );
    }
    
    resetItem(itemId){
        return axios.post(ITEMS_API_BASE_URL + '/' + itemId  + '/resetItem' ,  { headers: authHeader() } );
    }


}

export default new ItemsService()