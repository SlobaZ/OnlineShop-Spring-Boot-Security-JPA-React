import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import AuthenticationService from "../../Services/AuthenticationService";

const CreateItemsComponent = () => {

    let navigate = useNavigate();

    const[user,setUser] = useState('');
    const[shopping,setShopping] = useState('');

    const startShopping  = (id) => {
        navigate(`/startshopping/${id}` , {id});
    }

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        if (!user) {
            navigate('/login');
        }
        else{
            setUser(AuthenticationService.getCurrentUser());
        ShoppingsService.createShopping().then((response) => {
            setShopping(response.data);
          });
        }
    },[]); 

    return (
        <div>
            <br/>
             <div className="tablemodel">

             <div class="rowModel">
                <p>Start Shopping</p>
             </div>

            <table className="x">
            
            <tbody>
            <tr>
                <td>User : </td>
                <td>{user.username}</td>
            </tr>
            <tr>
                <td>Shopping ID : </td>
                <td>{shopping.id}</td>
            </tr>
            <tr>
                <td>Shopping Code : </td>
                <td>{shopping.code}</td>
            </tr>
            <tr>
                <td> - </td>
                <td> - </td>
            </tr>
            <tr>
                <td>Start : </td>
                <td><button onClick={ () => startShopping(shopping.id)} className="btn btn-mode" > 
                <i className='fas fa-angle-double-left'></i>  <i className="fa fa-shopping-cart"></i>   Start Shopping <i className='fas fa-angle-double-right'></i>
                </button></td>
            </tr>
            
            </tbody>
            </table>

            <div className="empty"></div>

          </div>   

    </div>
          
    )


}

export default CreateItemsComponent;
