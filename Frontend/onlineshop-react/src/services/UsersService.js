import axios from 'axios';
import authHeader from './auth-header';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UsersService { 
	
	getAlls(){
		return axios.get(USER_API_BASE_URL + '/sve' );
	}

    getUsers(config){
        return axios.get(USER_API_BASE_URL, config );
    }


    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId , { headers: authHeader() });
    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user , { headers: authHeader() });
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId , { headers: authHeader() });
    }


}

export default new UsersService()