import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ProductsService from '../../Services/ProductsService';

const AddOrEditProductComponent = () => {
	
	const {id} = useParams();

    const[name,setName] = useState('');
	const[brand,setBrand] = useState('');
	const[quantity,setQuantity] = useState('');
	const[price,setPrice] = useState('');
	const[photo,setPhoto] = useState('');

    let navigate = useNavigate();
	
	    
    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const changeBrandHandler = (event) => {
        setBrand(event.target.value);
    }

    const changeQuantityHandler = (event) => {
        setQuantity(event.target.value);
    }

    const changePriceHandler = (event) => {
        setPrice(event.target.value);
    }

    const changePhotoHandler = (event) => {
		setPhoto(event.target.files[0].name);
    }

    const cancel = () => {
        navigate('/products');
    }

    const getTitle= () => {
        if(id === '_add'){
            return   <p className="createupdateP text-center">  Add Product </p>
        }else{
            return  <p className="createupdateP text-center">  Update Product </p>
        }
    }

    const saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {name, brand, quantity, price, photo};                        
        console.log('product => ' + JSON.stringify(product));
		if(id === '_add'){
            ProductsService.createProduct(product).then( res => { 
                navigate('/products');
            });
        }
		else{
            ProductsService.updateProduct(product, id).then( res => { 
                navigate('/products');
            });
        }
    }


	useEffect(() => {
		if(id === '_add'){
            return
        }
		else{
            ProductsService.getProductById(id).then( (response) =>{
			    setName(response.data.name);
				setBrand(response.data.brand);
				setQuantity(response.data.quantity);
				setPrice(response.data.price);
				setPhoto(response.data.photo);
            });
        }    
	},[]); 
	
	
	return (
            <div>

                    <div className="col-12 offset-0">

                        <div className="col-xs-10 offset-xs-1  col-sm-8 offset-sm-2  col-md-8 offset-md-2  col-lg-6 offset-lg-3">
                        <div className="boxes">

                                 {getTitle()} 

                                    <form>
                                        <div className = "form-group-sm">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={name} onChange={changeNameHandler}/>
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Brand: </label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
                                                value={brand} onChange={changeBrandHandler}/>
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Quantity: </label>
                                            <input placeholder="Quantity" name="quantity" className="form-control" 
                                                value={quantity} onChange={changeQuantityHandler}/>
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={price} onChange={changePriceHandler}/>
                                        </div>

                                        <div className = "form-group-sm">
                                            <label> Photo: </label>
                                            <input type="file" name="photo"  className="form-control" 
                                                 onChange={changePhotoHandler}/>
                                        </div>

                                        <br/>
                                        <button className="btn btn-submit" onClick={saveOrUpdateProduct}>  <i class='fas fa-sd-card'></i> Save </button>
                                        <button className="btn btn-cancel" onClick={cancel} style={{marginLeft: "10px"}}> <i class='fas fa-undo-alt'></i> Cancel </button>
                                    </form>
                                
                            </div>
                        </div>

                   </div>
            </div>
        )
	  
	
}

export default AddOrEditProductComponent;




/*

import React, { Component } from 'react'
import ProductsService from '../../services/ProductsService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            brand: '',
            quantity: '',
            price: '',
            photo: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            ProductsService.getProductById(this.state.id).then( (res) =>{
                let product = res.data;
                this.setState({name: product.name,
                    brand: product.brand,
                    quantity: product.quantity,
                    price : product.price,
                    photo: product.photo
                });
            });
        }        
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {name: this.state.name, brand: this.state.brand, quantity: this.state.quantity, 
                        price: this.state.price, photo: this.state.photo};                        
        console.log('product => ' + JSON.stringify(product));
		if(this.state.id === '_add'){
            ProductsService.createProduct(product).then( res => { 
                this.props.history.push('/products');
            });
        }else{
            ProductsService.updateProduct(product, this.state.id).then( res => { 
                this.props.history.push('/products');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeBrandHandler= (event) => {
        this.setState({brand: event.target.value});
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changePhotoHandler= (event) => {
        this.setState({photo: event.target.files[0].name});
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        return (
            <div>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Brand: </label>
                                            <input placeholder="Brand" name="brand" className="form-control" 
                                                value={this.state.brand} onChange={this.changeBrandHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantity: </label>
                                            <input placeholder="Quantity" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Photo: </label>
                                            <input type="file" name="photo"  className="form-control" 
                                                 onChange={this.changePhotoHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProductComponent

*/
