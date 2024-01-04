import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";


const ListShoppingsComponent = () => {

    let navigate = useNavigate();
	
	const[shoppings,setShoppings] = useState([]);
	const[users,setUsers] = useState([]);
	const[searchUserId,setSearchUserId] = useState('');
	const[searchCode,setSearchCode] = useState('');
    const[searchTotalPrice,setSearchTotalPrice] = useState('');
    const[searchDateTimeBeginning,setSearchDateTimeBeginning] = useState('');
    const[searchDateTimeEnd,setSearchDateTimeEnd] = useState('');
    const[showAdmin,setShowAdmin] = useState('');

    const handleChangeUserId = (event) => {
        setSearchUserId(event.target.value);
    }
    const handleChangeCode = (event) => {
        setSearchCode(event.target.value);
    }
    const handleChangeTotalPrice = (event) => {
        setSearchTotalPrice(event.target.value);
    }
    const handleChangeDateTimeBeginning = (event) => {
        setSearchDateTimeBeginning(event.target.value);
    }
    const handleChangeDateTimeEnd = (event) => {
        setSearchDateTimeEnd(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        refreshShoppings();
    }

    const deleteShopping = (id) => {
        ShoppingsService.deleteShopping(id).then( res => {
            refreshShoppings();
        });
    }

    const editShopping = (id) => {
        navigate(`/update-shopping/${id}`, {id});
    }

    const resultShopping = (id) => {
        navigate(`/resultshopping/${id}` , {id});
    }
    
   function formatDateTime  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(8, 10);
        const month = enteredValue.substring(5, 7);
        const year = enteredValue.substring(0, 4);
        const time = enteredValue.substring(11, 16);
        const formatedValue = day.concat(".", month, ".", year, ". ", time);
        return formatedValue;
    }

    const refreshShoppings = () => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
        }
         let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
     
         if (searchUserId !== "") {
           config.params.userId = searchUserId;
         }
         if (searchCode !== "") {
           config.params.code = searchCode;
         }
         if (searchTotalPrice !== "") {
           config.params.totalPrice = searchTotalPrice;
         }
          if (searchDateTimeBeginning !== "") {
           config.params.dateTimeBeginning = formatDateTime(searchDateTimeBeginning);
         }
          if (searchDateTimeEnd !== "") {
           config.params.dateTimeEnd = formatDateTime(searchDateTimeEnd);
         }
         UsersService.getAll().then((response) => {
                setUsers(response.data);
           });
         ShoppingsService.getShoppings(config).then((response) => {
                setShoppings(response.data);
         });
    }

    useEffect(() => {
		refreshShoppings();
     },[]);

     return (
        <div>
            {showAdmin && (
                
            <form onSubmit={handleSubmit}>

                <div className="ListFormBoxDiv">
               
                        <div className="nextBoxDiv">
                        <label>  User: </label>
                        <select className="selectForList" name="searchUserId" value={searchUserId} onChange={handleChangeUserId}> 
                                <option value={''}> --- Select ---</option>  
                                {users.map(user => (
                                <option value={user.id}>{user.username}</option> ))}
                        </select>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Code: </label>
                        <input className="inputForList" type="text" name="searchCode" placeholder=" Search by code" value={searchCode} onChange={handleChangeCode}/> 
                        </div>

                        <div className="nextBoxDiv">
                        <label> Total Price: </label>
                        <input className="inputForList" type="number" name="searchTotalPrice"  placeholder=" Search by price" value={searchTotalPrice} onChange={handleChangeTotalPrice}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> Beginning &#10095; </label>
                        <input className="inputForList" type="datetime-local"  value={searchDateTimeBeginning} onChange={handleChangeDateTimeBeginning}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> End  &#10094; </label>
                        <input className="inputForList" type="datetime-local"  value={searchDateTimeEnd} onChange={handleChangeDateTimeEnd}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
                        </div>

                </div>

            </form>
  
            )}


             {showAdmin && (
            <div className="tablemodel">
                 				
                     <div class="rowModel">
                         <p>Shoppings List</p>
                     </div>
                    <table>

                        <thead>
                            <tr>
                                <th> Code</th>
                                <th> Customer</th>
                                <th> Date and Time</th>
                                <th> Total Price</th>
                                <th> Update</th>
                                <th> Delete</th>
                                <th> Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            { shoppings.map( shopping => 
                                    <tr key = {shopping.id}>
                                         <td data-label="Code"> {shopping.code} </td>   
                                         <td data-label="Customer"> {shopping.userUsername} </td>
                                         <td data-label="Date & Time"> {shopping.dateTime}</td>
                                         <td data-label="Total Price"> {shopping.totalPrice}</td>
                                         <td data-label="Update">
                                             <button onClick={ () => editShopping(shopping.id)} className="btn btn-update"> <i className='fas fa-pencil-alt'></i> Update </button>
                                        </td>
                                        <td data-label="Delete">
                                             <button  onClick={ () => deleteShopping(shopping.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete  </button>
                                        </td>
                                        <td data-label="Result">
                                             <button  onClick={ () => resultShopping(shopping.id)} className="btn btn-select"> <i class="fa fa-calculator"></i> Result  </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="empty"></div>
             </div>
            )}
        </div>
    )

}

export default ListShoppingsComponent;


