import axios from 'axios';
import AuthenticationHeader from './AuthenticationHeader';

const ITEMS_API_BASE_URL = "http://localhost:8080/api/shoppings/{shoppingId}/items";
const ITEMS_API_BASE_URLS = "http://localhost:8080/api/shoppings/";



    const getAllsByShoppingId  = (shoppingId) => {
        return axios.get(ITEMS_API_BASE_URLS + shoppingId + '/items' ,  { headers: AuthenticationHeader() } );
    }

    const createItem = (item) => {
        return axios.post(ITEMS_API_BASE_URL, item ,  { headers: AuthenticationHeader() } );
    }

    const getItemById  = (itemId) => {
        return axios.get(ITEMS_API_BASE_URL + '/' + itemId ,  { headers: AuthenticationHeader() } );
    }

    const deleteItem  = (itemId) => {
        return axios.delete(ITEMS_API_BASE_URL + '/' + itemId ,  { headers: AuthenticationHeader() } );
    }
    
    const buyItem = (itemId, itemQuantity) => {
        return axios.post(ITEMS_API_BASE_URL + '/' + itemId + '/' + itemQuantity + '/buyItem' ,  { headers: AuthenticationHeader() } );
    }
    
    const resetItem  = (itemId) => {
        return axios.post(ITEMS_API_BASE_URL + '/' + itemId  + '/resetItem' ,  { headers: AuthenticationHeader() } );
    }

const ItemsService = { 
    getAllsByShoppingId, createItem, getItemById, deleteItem, buyItem, resetItem
}

export default ItemsService;