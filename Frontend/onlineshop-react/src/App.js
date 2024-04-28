import React from 'react';
import {useState, useEffect} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.jpg';

import "./header.css";
import "./forms.css";
import "./table.css";
import "./buttons.css";
import "./App.css";
import "./footer.css"; 

import DarkModeService from "./Services/DarkModeService";
import AuthenticationService from "./Services/AuthenticationService";

import LoginComponent from "./Components/LoginComponent";
import RegisterComponent from "./Components/RegisterComponent";
import ProfileComponent from "./Components/ProfileComponent";
import ListProductsComponent from "./Components/products/ListProductsComponent.jsx";
import AddOrEditProductComponent from "./Components/products/AddOrEditProductComponent.jsx";
import CreateItemsComponent from "./Components/items/CreateItemsComponent.jsx";
import ListItemsComponent from "./Components/items/ListItemsComponent.jsx";
import ResultShoppingComponent from "./Components/items/ResultShoppingComponent.jsx";
import ListShoppingsComponent from "./Components/shoppings/ListShoppingsComponent.jsx";
import AddOrEditShoppingComponent from "./Components/shoppings/AddOrEditShoppingComponent.jsx";
import ListUsersComponent from "./Components/users/ListUsersComponent.jsx";
import AddOrEditUserComponent from "./Components/users/AddOrEditUserComponent.jsx";

function App() {

	const[showMenu, setShowMenu] = useState(false);
	const[screenWidth, setScreenWidth] = useState();
	const[currentUser,setCurrentUser] = useState(undefined);
	const[showAdmin,setShowAdmin] = useState(false);
	

        
	const logOut = () => {
		  AuthenticationService.logout();
		  setCurrentUser(false);
		  setShowAdmin(false);
		  window.location.reload();
	}
		

	  const showNavigation  = (showMenu) => { 
		    if(showMenu===false){
		       setShowMenu(true);
		    }
		    else{
		      setShowMenu(false);
		    }
		}
		
		
	const updateDimensions = () => {
		  setScreenWidth(window.innerWidth);
	}
		
    const addDarkMode = () => {
        DarkModeService.setDarkMode();
    }
		
			
	useEffect(() => {
		
	window.addEventListener('resize' , updateDimensions);
	
    const user = AuthenticationService.getCurrentUser();
	if (user) {
		setCurrentUser(user);
		setShowAdmin(user.roles.includes("ROLE_ADMIN"));
	}
    const mode = DarkModeService.getDarkMode();
    if(mode==="dark"){
      DarkModeService.addDarkMode();
    }
  },[]);      


	return (
      <div className="fullscreensize">      
      
      <div className="header">   

      <div className="header-logo">
              <img src={logo} alt="Logo" />
      </div>

      <div className="header-text">
              <h1> <i className='fas fa-globe'></i> OnlineShop </h1>
      </div>
      
      <div  id="active"><p onClick={ () => showNavigation(showMenu)}>  <i className="fa fa-bars"></i> </p></div>


    <div className="navbar">
      
		{ (showMenu || window.innerWidth > 767 || screenWidth > 767 ) && (
			
        <div className="menu">
        
        <div className="item"><p><Link to={"/products"}> <i className="fa fa-cubes"></i> Products </Link></p></div> 
        
        <div className="item"><p><Link to={"/buy"}> <i className="fa fa-shopping-basket"></i> Buy </Link></p></div> 

        { showAdmin &&  (
        <div className="item"><p><Link to={"/shoppings"}> <i className="fa fa-cart-arrow-down"></i> Shoppings </Link></p></div>
        )}

        { showAdmin &&  (
        <div className="item"><p><Link to={"/users"}> <i className='fa fa-users'></i> Users </Link></p></div>
        )}
        
        {currentUser ? (
        <div className="itemX">
        <p><Link to={"/profile"}> <i className='fas fa-user-alt'></i> {currentUser.username} </Link></p>
        <p onClick={logOut}><Link to={"/"}> <i className="fas fa-sign-out-alt"></i> LogOut </Link></p>
        </div>
        ) : (
        <div className="itemX">
        <p><Link to={"/login"}> <i className="fas fa-sign-in-alt"></i> Login </Link></p>
        <p><Link to={"/register"}> <i className="fa fa-edit"></i> Sign Up </Link></p>
        </div>
        )}
        </div>
        
		 )}
    </div>
	
    </div>  

       <div className="screensize" >
       <Routes>      
          <Route exact path="/"  element={<ListProductsComponent/>} />  
          <Route path="/products"  element={<ListProductsComponent/>} />  
          <Route path="/addorupdate-product/:id"  element={<AddOrEditProductComponent/>} />
          <Route path="/buy"  element={<CreateItemsComponent/>} /> 
          <Route path="/startshopping/:id"  element={<ListItemsComponent/>} /> 
          <Route path="/resultshopping/:id"  element={<ResultShoppingComponent/>} /> 
          <Route path="/shoppings"  element={<ListShoppingsComponent/>} />
          <Route path="/update-shopping/:id"  element={<AddOrEditShoppingComponent/>} /> 
          <Route path="/login"  element={<LoginComponent/>} />  
          <Route path="/register"  element={<RegisterComponent/>} />  
          <Route path="/profile"  element={<ProfileComponent/>} /> 
          <Route path="/users"  element={<ListUsersComponent/>} />  
          <Route path="/update-user/:id"  element={<AddOrEditUserComponent/>} /> 
                         
      </Routes>

        </div>

        <div className="footer">
          <div className="footer-text">
              <p className="text-center">OnlineShop Spring Boot Security JPA React</p>
          </div>
          <div className="footer-mode">
              <button className="btn btn-mode" onClick={ () => addDarkMode()}> Mode </button>
          </div>
        </div>
        

      </div>
    );


 
}

export default App;


