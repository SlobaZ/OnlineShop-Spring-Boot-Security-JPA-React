import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
        ProductsService.deleteProduct(id).then( response => {
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
                        <input className="inputForList" type="text" name="searchName" placeholder=" Search by name" value={searchName} onChange={handleChangeName}/>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Brand: </label>
                        <input className="inputForList" type="text" name="searchBrand" placeholder=" Search by brand" value={searchBrand} onChange={handleChangeBrand}/> 
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Category: </label>
                        <select className="selectForList" name="searchCategory" value={searchCategory} onChange={handleChangeCategory}> 
                                <option value={''}>-Select category-</option>  
                                {categories.map(category => (
                                <option value={category}>{category}</option> ))}
                        </select>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Price: </label>
                        <input className="inputForList" type="number" name="searchPrice" placeholder=" Search by price" value={searchPrice} onChange={handleChangePrice}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
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
                                             <td data-label="Update"> <button onClick={ () => editProduct(product.id)} className="btn btn-update"> <i className='fas fa-pencil-alt'></i> Update </button> </td>
                                             )}   
                                             {showAdmin && ( 
                                              <td data-label="Delete"> <button onClick={ () => deleteProduct(product.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete </button> </td>
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

