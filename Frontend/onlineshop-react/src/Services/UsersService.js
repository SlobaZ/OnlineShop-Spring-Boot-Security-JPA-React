import axios from 'axios';
import AuthenticationHeader from './AuthenticationHeader';

const USER_API_BASE_URL = "http://localhost:8080/api/users";


	const getAll = () => {
		return axios.get(USER_API_BASE_URL + '/all' , { headers: AuthenticationHeader() } );
	}
 
    const getUsers = (config) => {
        return axios.get(USER_API_BASE_URL , config  );
    }


    const getUserById = (userId) => {
        return axios.get(USER_API_BASE_URL + '/' + userId , { headers: AuthenticationHeader() });
    }

    const updateUser = (user, userId) => {
        return axios.put(USER_API_BASE_URL + '/' + userId, user , { headers: AuthenticationHeader() });
    }

    const deleteUser = (userId) => {
        return axios.delete(USER_API_BASE_URL + '/' + userId , { headers: AuthenticationHeader() });
    }
    
const UsersService = { 
    getAll, getUsers, getUserById, updateUser, deleteUser
}

export default UsersService;