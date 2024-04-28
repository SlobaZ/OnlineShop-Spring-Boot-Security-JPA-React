import React from 'react';
import {useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import ItemsService from '../../Services/ItemsService';

const ListItemsComponent = () => {

    const {id} = useParams();

    const[shopping,setShopping] = useState('');
    const[items,setItems] = useState([]);
    const[itemQuantity,setItemQuantity] = useState('');

    const [message, setMessage] = useState("");

    const[itemIdShow,setItemIdShow] = useState('');
    
    
    let navigate = useNavigate();

    const changeItemQuantityHandler = (event) => {
        setItemQuantity(event.target.value);
        setMessage("");
    }
    
    const resetItem = (id) => {
        ItemsService.resetItem(id).then( response => {
            setMessage("");
            setItems(items);
            refreshItems();
        });
    }



    const buyItem  = (id, itemQuantity) => {  
        ItemsService.buyItem(id, itemQuantity).then( response => {
            if(response.status===201){
                refreshItems();
            }     
            console.log(response.status);     
        })
        .catch((error) => {
		    	setMessage("Data entry failed !"); 
                setItemIdShow(id);
                console.log('error: ' + error);
  		});
    }


    const buy = (id) => {
        ShoppingsService.buy(id).then( response => {
        });
        navigate(`/resultshopping/${id}` , {id});
        window.location.reload(); 
    }

    const refreshItems = () => {
		ShoppingsService.getShoppingById(id).then((response) => {
            setShopping(response.data);
          });
        ItemsService.getAllsByShoppingId(id).then((response) => {
            setItems(response.data);
        });
    }


    useEffect(() => {
		refreshItems();
     },[]);


     return (
        <div>
             
              <form>   
              <div className="tablemodel">
                 				
                    <div className="rowModel">
                        <p>Items List</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Pieces</th>
                                <th>Price of Items</th>
                                <th>Actions</th>
                                <th>Reset</th>
                            </tr>
                        </thead>
                        <tbody>
                        { items.map( item => 
                                    <tr key = {item.id}>
                                         <td data-label="Id"> {item.id} </td> 
                                         <td data-label="Product"> {item.productName} </td>   
                                         <td data-label="Quantity"> {item.productQuantity}</td>
                                         <td data-label="Price"> {item.productPrice}</td>
                                         <td data-label="Pieces">
                                         <input key = {item.id} placeholder=" Item Quantity" name="itemQuantity" className="inputForList" type="number"
                                            value={itemQuantity[item.id]} onChange={changeItemQuantityHandler} />
                                            {item.id===itemIdShow && ( <p className="messageP"> {message} </p> )}
                                         </td>
                                         <td data-label="Price of Items"> {item.itemPrice} </td>
                                         <td data-label="Actions"> 
                                         <button onClick={ ()=> buyItem(item.id, itemQuantity)} className="btn btn-select"> <i className='fas fa-plus'></i> Select Item </button> 
                                         </td>
                                         <td data-label="Reset">
                                             <button onClick={ ()=> resetItem(item.id)} className="btn btn-cancel"> <i className='fas fa-undo-alt'></i> Reset </button>
                                         </td>
                                    </tr>
                                )}
                            <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td> {message && ( <p className="messageP"> {message} </p> )} </td>
                                        <td><button onClick={ ()=> buy(shopping.id)} className="btn btn-update">
                                        <i className='fas fa-caret-right'></i> <i className="fa fa-shopping-basket"></i> <i className='fas fa-caret-left'></i>  Buy
                                        </button></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                        </tbody>
                    </table>

                    <div className="empty"></div>

                    </div>
                 </form>

        </div>
    )


}

export default ListItemsComponent;
