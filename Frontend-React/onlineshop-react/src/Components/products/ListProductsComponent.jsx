import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductsService from '../../Services/ProductsService';
import AuthenticationService from "../../Services/AuthenticationService";

const ListProductsComponent = () => {

    let navigate = useNavigate();
	
	const[products,setProducts] = useState([]);
	const[categories,setCategories] = useState([]);
	const[searchName,setSearchName] = useState('');
	const[searchBrand,setSearchBrand] = useState('');
	const[searchCategory,setSearchCategory] = useState('');
	const[searchPrice,setSearchPrice] = useState('');
	const[showAdmin,setShowAdmin] = useState('');
	
	const handleChangeName = (event) => {
        setSearchName(event.target.value);
    }

	const handleChangeBrand = (event) => {
        setSearchBrand(event.target.value);
    }
	const handleChangeCategory = (event) => {
        setSearchCategory(event.target.value);
    }

	const handleChangePrice = (event) => {
        setSearchPrice(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        refreshProducts();
    }

    const addProduct = () => {
        navigate('/addorupdate-product/_add');
    }

    const editProduct  = (id) => {
        navigate(`/addorupdate-product/${id}` , {id});
    }

	const deleteProduct = (id) => {
        ProductsService.deleteProduct(id).then( res => {
            refreshProducts();
         });
    }

	const refreshProducts = () => {
        const user = AuthenticationService.getCurrentUser();
	    if (user) {
	      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
	    }
        let config = { params: {} };
    
        if (searchName !== "") {
          config.params.name = searchName;
        }
        if (searchBrand !== "") {
          config.params.brand = searchBrand;
        }
        if (searchCategory !== "") {
            config.params.category = searchCategory;
          }
        if (searchPrice !== "") {
          config.params.price = searchPrice;
        }
        ProductsService.getCategories().then((response) => {
				setCategories(response.data);
          });
        ProductsService.getProducts(config).then((response) => {
          		setProducts(response.data);
        });
      }


    useEffect(() => {
		refreshProducts();
     },[]);



	return (
        <div>
        
                <form onSubmit={handleSubmit}>

                    <div className="ListFormBoxDiv">

                        <div className="nextBoxDiv">
                        <label>  Name: </label>
                        <input className="inputForList" type="text" name="searchName" value={searchName} onChange={handleChangeName}/>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Brand: </label>
                        <input className="inputForList" type="text" name="searchBrand" value={searchBrand} onChange={handleChangeBrand}/> 
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Category: </label>
                        <select className="selectForList" name="searchCategory" value={searchCategory} onChange={handleChangeCategory}> 
                                <option value={''}> --- Select ---</option>  
                                {categories.map(category => (
                                <option value={category}>{category}</option> ))}
                        </select>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Price: </label>
                        <input className="inputForList" type="text" name="searchPrice" value={searchPrice} onChange={handleChangePrice}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i class='fa fa-search'></i> Search</button>
                        </div>
                    </div>

                </form>
        


        <div className="tablemodel">
                 				
				  <div class="rowModel">
                      <p>Products List</p>
                      {showAdmin && (
                        <button className="btn btn-add" onClick={ addProduct }> <i class='fas fa-plus'></i> Add Product </button>
                        )}
                  </div>

                        <table>

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Brand</th>
                                    <th> Photo</th>
                                    <th> Quantity</th>
                                    <th> Price</th>
                                    <th> Category</th>
                                    {showAdmin && (    <th> Update </th> )}
                                    {showAdmin && (    <th> Delete </th> )}
                                </tr>
                            </thead>
                            <tbody>
                                { products.map( product => 
                                        <tr key = {product.id}>
                                             <td data-label="Name"> {product.name} </td>   
                                             <td data-label="Brand"> {product.brand} </td> 
                                             <td data-label="Photo"> <img src={process.env.PUBLIC_URL + '/images/' + product.photo} alt="slika" width="65" height="65" /></td>
                                             <td data-label="Quantity"> {product.quantity}</td>
                                             <td data-label="Price"> {product.price}</td>
                                             <td data-label="Category"> {product.category}</td>
                                             {showAdmin && ( 
                                             <td data-label="Update"> <button onClick={ () => editProduct(product.id)} className="btn btn-update"> <i class='fas fa-pencil-alt'></i> Update </button> </td>
                                             )}   
                                             {showAdmin && ( 
                                              <td data-label="Delete"> <button onClick={ () => deleteProduct(product.id)} className="btn btn-delete"> <i class='fas fa-trash-alt'></i> Delete </button> </td>
                                             )}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
						<div className="empty"></div>
        </div>

        </div>
        )


	
	
	
}

export default ListProductsComponent;



/*

return (
            <div>
                <br/>
                 <div className="searchDiv">
                <form onSubmit={handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Name: 
                    <input type="text" name="searchName" value={searchName} onChange={handleChangeName}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Brand: 
                    <input type="text" name="searchBrand" value={searchBrand} onChange={handleChangeBrand}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Category: 
                    <select name="searchCategory" value={searchCategory} onChange={handleChangeCategory}> 
                            <option value={''}> --- Odaberi ---</option>  
                            {categories.map(category => (
                            <option value={category}>{category}</option> ))}
                    </select>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Price: 
                    <input type="text" name="searchPrice" value={searchPrice} onChange={handleChangePrice}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <button type="submit" className="btn btn-search"> <i class='fa fa-search'></i> Search</button>
                    </div>

                </form>
                </div>

                 
                 {showAdmin && (
                 <div className = "row">
                    <button className="btn btn-add" onClick={ addProduct }> <i class='fas fa-plus'></i> Add Product </button>
                 </div>
                  )}
					
				<br></br>
				<h2 className="text-center">Product List</h2>
                <br></br>

                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Brand</th>
                                    <th> Photo</th>
                                    <th> Quantity</th>
                                    <th> Price</th>
                                    <th> Category</th>
                                    {showAdmin && (    <th> Actions</th>  )}
                                </tr>
                            </thead>
                            <tbody>
                                { products.map( product => 
                                        <tr key = {product.id}>
                                             <td> {product.name} </td>   
                                             <td> {product.brand} </td> 
                                             <td><img src={process.env.PUBLIC_URL + '/images/' + product.photo} alt="slika" width="65" height="65" /></td>
                                             <td> {product.quantity}</td>
                                             <td> {product.price}</td>
                                             <td> {product.category}</td>
                                             {showAdmin && ( 
                                             <td>
                                                 <button onClick={ () => editProduct(product.id)} className="btn btn-update"> <i class='fas fa-pencil-alt'></i> Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => deleteProduct(product.id)} className="btn btn-delete"> <i class='fas fa-trash-alt'></i> Delete </button>
                                             </td>
                                             )}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
						<div className="empty"></div>
                 </div>

            </div>
        )

*/








/*

import React, { Component } from 'react'
import ProductsService from '../../services/ProductsService'
import AuthService from "../../services/auth.service";

class ListProductsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                products: [],
                categories: [],
                searchName: '',
                searchBrand: '',
                searchCategory: '',
                searchPrice: ''
                
        };
        
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshProducts();
    }

    deleteProduct(id){
        ProductsService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.id !== id)});
        });
    }

    editProduct(id){
        this.props.history.push(`/addorupdate-product/${id}`);
    }

    componentDidMount(){
        this.refreshProducts();
    }

    refreshProducts() {
        const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModerator: user.roles.includes("ROLE_MODERATOR"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
        let config = { params: {} };
    
        if (this.state.name !== "") {
          config.params.name = this.state.searchName;
        }
        if (this.state.brand !== "") {
          config.params.brand = this.state.searchBrand;
        }
        if (this.state.category !== "") {
            config.params.category = this.state.searchCategory;
          }
        if (this.state.price !== "") {
          config.params.price = this.state.searchPrice;
        }
        ProductsService.getCategories().then((response) => {
            this.setState({ categories: response.data });
          });
        ProductsService.getProducts(config).then((response) => {
          this.setState({ products: response.data });
        });
      }

    addProduct(){
        this.props.history.push('/addorupdate-product/_add');
    }

    render() {
        const { showAdmin } = this.state;
        return (
            <div>
                <br/>
                 <div className="searchDiv">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Name: 
                    <input type="text" name="searchName" value={this.state.searchName} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Brand: 
                    <input type="text" name="searchBrand" value={this.state.searchBrand} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Category: 
                    <select name="searchCategory" value={this.state.searchCategory} onChange={this.handleChange}> 
                            <option value={''}> --- Odaberi ---</option>  
                            {this.state.categories.map(category => (
                            <option value={category}>{category}</option> ))}
                    </select>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Price: 
                    <input type="text" name="searchPrice" value={this.state.searchPrice} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>

                 
                 {showAdmin && (
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProduct}> Add Product</button>
                 </div>
                  )}
					
				<br></br>
				<h2 className="text-center">Product List</h2>
                <br></br>

                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Brand</th>
                                    <th> Photo</th>
                                    <th> Quantity</th>
                                    <th> Price</th>
                                    <th> Category</th>
                                    {showAdmin && (    <th> Actions</th>  )}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                             <td> {product.name} </td>   
                                             <td> {product.brand} </td> 
                                             <td><img src={process.env.PUBLIC_URL + '/images/' + product.photo} alt="slika" width="65" height="65" /></td>
                                             <td> {product.quantity}</td>
                                             <td> {product.price}</td>
                                             <td> {product.category}</td>
                                             {showAdmin && ( 
                                             <td>
                                                 <button onClick={ () => this.editProduct(product.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduct(product.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                             )}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListProductsComponent

*/
