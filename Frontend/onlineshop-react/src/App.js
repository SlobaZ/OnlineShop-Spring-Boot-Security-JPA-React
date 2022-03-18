import React, { Component } from "react";
import { HashRouter,Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.jpg';
import exit from './exit.jpg';

import AuthService from "./services/auth.service";
import ShutdownService from "./services/ShutdownService";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import ListProductsComponent from "./components/products/ListProductsComponent.jsx";
import CreateProductComponent from "./components/products/CreateProductComponent.jsx";
import Profile from "./components/profile.component";
import ListUsersComponent from "./components/users/ListUsersComponent.jsx";
import CreateUserComponent from "./components/users/CreateUserComponent.jsx";
import ListShoppingsComponent from "./components/shoppings/ListShoppingsComponent.jsx";
import CreateShoppingComponent from "./components/shoppings/CreateShoppingComponent.jsx";
import CreateItemsComponent from "./components/items/CreateItemsComponent.jsx"
import ListItemsComponent from "./components/items/ListItemsComponent.jsx";
import ResultShoppingComponent from "./components/items/ResultShoppingComponent.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  
  shutdown() {
    ShutdownService.shutdown();
  }

  render() {
    const { currentUser, showAdmin} = this.state;

    return (
      <div>      
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        
        <div className="logo">
        <img src={logo} width="50" height="50" alt="Logo" />
        </div>
        
          <Link to={"/"} className="navbar-brand">
            OnlineShop
          </Link>
          
          <div className="navbar-nav mr-auto ml-4">
           
            <li className="nav-item ml-2">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-item ml-2">
              <Link to={"/buy"} className="nav-link">
                Buy
              </Link>
            </li>
            
            {showAdmin && (
            <li className="nav-item ml-2">
              <Link to={"/shoppings"} className="nav-link">
                Shoppings
              </Link>
            </li>
            )}
            
            {showAdmin && (
              <li className="nav-item ml-3">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}

          </div>
          
          {currentUser ? (
            <div className="navbar-nav ml-auto mr-4">
             
              <li className="nav-item mr-4">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item mr-1">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto mr-4" >
              <li className="nav-item mr-4">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item mr-1">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
                            
            </div>
          )}
          
          
          <div>
               <a href="/"  onClick={this.shutdown}>
                    <img src={exit} width="30" height="30" />
               </a>
        	</div>
          
          
        </nav>

       <div className="container mt-3">
		<HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={ListProductsComponent} />
            <Route exact path="/addorupdate-product/:id" component={CreateProductComponent} />
            <Route exact path="/users" component={ListUsersComponent} />
	          <Route exact path="/update-user/:id" component={CreateUserComponent} />
			  <Route exact path="/shoppings" component={ListShoppingsComponent} />
	          <Route exact path="/update-shopping/:id" component={CreateShoppingComponent} />
			  <Route exact path="/buy" component={CreateItemsComponent} />
            <Route exact path="/startshopping/:id" component={ListItemsComponent} />
            <Route exact path="/resultshopping/:id" component={ResultShoppingComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
		</HashRouter>
        </div>
      </div>
    );
  }
}

export default App;
