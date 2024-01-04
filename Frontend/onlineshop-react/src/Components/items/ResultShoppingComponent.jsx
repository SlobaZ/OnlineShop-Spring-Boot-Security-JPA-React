import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import ItemsService from '../../Services/ItemsService';
import AuthenticationService from "../../Services/AuthenticationService";

const ResultShoppingComponent = () => {

    const {id} = useParams();

    const[items,setItems] = useState([]);
    const[shopping,setShopping] = useState('');

    let navigate = useNavigate();

    const refreshResult = () => {
        const user = AuthenticationService.getCurrentUser();
        if (!user) {
            navigate('/login');
        }
        else{
          ItemsService.getAllsByShoppingId(id).then( response => {
                setItems(response.data);
          });
          ShoppingsService.getShoppingById(id).then((response) => {
                setShopping(response.data);
          });
        }
    }

    useEffect(() => {
        refreshResult();
     },[]);

     return (
        <div>

        <div className="tablemodel">
            
                <div className="rowModel">
                <p>Shopping Result</p>
                </div>
             
            <table className="x">
            <tbody>
            
            <tr>
                <td>User : </td>
                <td>{shopping.userUsername}</td>
            </tr>

            <tr>
                <td>Shopping ID : </td>
                <td>{shopping.id}</td>
            </tr>
            <tr>
                <td>Code of shopping : </td>
                <td>{shopping.code}</td>
            </tr>

			</tbody>
            </table>
        <br/>
        <br/>

                <div className="rowModel">
                <p>Purchased items:</p>
                </div>
        
            <form>   
                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Product price</th>
                                <th>Pieces</th>
                                <th>Item price</th>
                            </tr>
                        </thead>
                        <tbody>
                            { items.map( item => item.itemPrice >0 &&
                                    <tr key = {item.id}>
                                         <td> {item.id} </td> 
                                         <td> {item.productName} </td>   
                                         <td> {item.productPrice}</td>
                                         <td> {item.itemQuantity}</td>
                                         <td> {item.itemPrice}</td>
                                    </tr> 
                                )}

                        </tbody>
                    </table>

                 </form> 
            <br/>
            <br/>
                <h3>Total shopping price : &nbsp;&nbsp; &nbsp; {shopping.totalPrice} </h3>
            <br/>
                <h6>Date and time of shopping : &nbsp;&nbsp; &nbsp; {shopping.dateTime} </h6>
        </div>
                <div className="empty"></div>
     </div>
          
    )
    

}

export default ResultShoppingComponent;

