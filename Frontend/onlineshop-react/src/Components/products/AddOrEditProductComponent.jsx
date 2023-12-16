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
	
	const [message, setMessage] = useState("");
	const [messageName, setMessageName] = useState("");
	const [messageBrand, setMessageBrand] = useState("");
	const [messageQuantity, setMessageQuantity] = useState("");
	const [messagePrice, setMessagePrice] = useState("");		
	const [messagePhoto, setMessagePhoto] = useState("");

    let navigate = useNavigate();
	
	    
    const changeNameHandler = (event) => {
        setName(event.target.value);
        setMessageName("");
    }

    const changeBrandHandler = (event) => {
        setBrand(event.target.value);
        setMessageBrand("");
    }

    const changeQuantityHandler = (event) => {
        setQuantity(event.target.value);
        setMessageQuantity("");
    }

    const changePriceHandler = (event) => {
        setPrice(event.target.value);
        setMessagePrice("");
    }

    const changePhotoHandler = (event) => {
		setPhoto(event.target.files[0].name);
		setMessagePhoto("");
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
    
    const checkFields = () => {
			if(name.trim().length === 0){
					setMessageName("The Name field must not be empty");
			}
			if(brand.trim().length === 0){
					setMessageBrand("The Brand field must not be empty");
			}
			if(quantity === "" || quantity<=0){
					setMessageQuantity("The Quantity field must be greater than zero");
			}
			if(price === "" || price<=0){
					setMessagePrice("The Price field must be greater than zero");
			}
			if(photo.trim().length === 0){
					setMessagePhoto("The Photo field must not be empty");
			}
	}
    
   
    

    const saveOrUpdateProduct = (e) => {
		
        e.preventDefault();
        let product = {name, brand, quantity, price, photo};                        
        console.log('product => ' + JSON.stringify(product));

        checkFields();
        
		if(name && brand && quantity>0 && price>0 && photo) {
                if(id === '_add'){
                    ProductsService.createProduct(product).then( response => { 
                        navigate('/products');
                    })
                    .catch((error) => {
                        console.log('error: ' + error);
                        setMessage("Data entry failed"); 
                    });
                }
                
                else {
                    ProductsService.updateProduct(id, product).then( response => { 
                        navigate('/products');
                    })
                    .catch((error) => {
                        console.log('error: ' + error);
                        setMessage("Data entry failed"); 
                    });
                }
        }
        else {
            setMessage("Data entry failed");
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
                                            <input placeholder="Name" name="name" className="form-control" value={name} onChange={changeNameHandler}  />
                                                {messageName && (
							                  	<p className="messageP" > {messageName} ! </p>
							            		)}
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Brand: </label>
                                            <input placeholder="Brand" name="brand" className="form-control" value={brand} onChange={changeBrandHandler}  />
                                                {messageBrand && (
							                  	<p className="messageP" > {messageBrand} ! </p>
							            		)}
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Quantity: </label>
                                            <input placeholder="Quantity" name="quantity" className="form-control" type="number" value={quantity} onChange={changeQuantityHandler}  />
                                                {messageQuantity && (
							                  	<p className="messageP" > {messageQuantity} ! </p>
							            		)}
                                        </div>
                                        <div className = "form-group-sm">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" type="number" value={price} onChange={changePriceHandler}  />
                                            	{messagePrice && (
							                  	<p className="messageP" > {messagePrice} ! </p>
							            		)}
                                        </div>

                                        <div className = "form-group-sm">
                                            <label> Photo: </label>
                                            <input type="file" name="photo"  className="form-control" onChange={changePhotoHandler}  />
                                            	{messagePhoto && (
							                  	<p className="messageP" > {messagePhoto} ! </p>
							            		)}
                                        </div>

                                        <br/>
                                        <button className="btn btn-submit" onClick={saveOrUpdateProduct}>  <i className='fas fa-sd-card'></i> Save </button>
                                        <button className="btn btn-cancel" onClick={cancel} style={{marginLeft: "10px"}}> <i className='fas fa-undo-alt'></i> Cancel </button>
                                        
                                        {message && (
							              <div className="form-group-sm">
							                  <p className="messageP" > {message} ! </p>
							              </div>
							            )}
                                       
                                    </form>
                                
                            </div>
                        </div>

                   </div>
                   <div className="empty"></div>
            </div>
        )
	  
	
}

export default AddOrEditProductComponent;


