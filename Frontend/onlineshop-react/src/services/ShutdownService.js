import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/shutdown";

class ShutdownService { 
	
	shutdown(){
		return axios.get(API_BASE_URL );
	}

    

}

export default new ShutdownService()