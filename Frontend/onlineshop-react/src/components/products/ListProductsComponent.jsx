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
