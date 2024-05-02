import React from 'react';
import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";


const ListShoppingsComponent = () => {

    let navigate = useNavigate();
    
    let[pageNum,setPageNum] = useState(0);

    const user = AuthenticationService.getCurrentUser();

    let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
    	
	const[shoppings,setShoppings] = useState([]);
	const[users,setUsers] = useState([]);
    const[showAdmin,setShowAdmin] = useState('');

	const[userId,setUserId] = useState('');
	const[code,setCode] = useState('');
    const[totalPrice,setTotalPrice] = useState('');
    const[dateTimeBeginning,setDateTimeBeginning] = useState('');
    const[dateTimeEnd,setDateTimeEnd] = useState('');

    const handleChangeUserId = (event) => {
        setUserId(event.target.value);
        pageNum=0;
        setPageNum(pageNum);
    }
    const handleChangeCode = (event) => {
        setCode(event.target.value);
        pageNum=0;
        setPageNum(pageNum);
    }
    const handleChangeTotalPrice = (event) => {
        setTotalPrice(event.target.value);
        pageNum=0;
        setPageNum(pageNum);
    }
    const handleChangeDateTimeBeginning = (event) => {
        setDateTimeBeginning(event.target.value);
        pageNum=0;
        setPageNum(pageNum);
    }
    const handleChangeDateTimeEnd = (event) => {
        setDateTimeEnd(event.target.value);
        pageNum=0;
        setPageNum(pageNum);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        pageNum=0;
        setPageNum(pageNum);
        getShoppings();
    }

    const deleteShopping = (id) => {
        ShoppingsService.deleteShopping(id).then( res => {
            getShoppings();
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


    let getShoppings = () => {
        return new Promise((resolve, reject) => {

            if (userId !== "") {
                config.params.userId = userId;
              }
              if (code !== "") {
                config.params.code = code;
              }
              if (totalPrice !== "") {
                config.params.totalPrice = totalPrice;
              }
               if (dateTimeBeginning !== "") {
                config.params.dateTimeBeginning = formatDateTime(dateTimeBeginning);
              }
               if (dateTimeEnd !== "") {
                config.params.dateTimeEnd = formatDateTime(dateTimeEnd);
              }
                config.params.pageNum =  pageNum;

          try {   
                if(pageNum===0){
                    resolve(
                        ShoppingsService.getShoppings(config).then((response) => {
                            setShoppings(response.data);
                        })
                    );
                }
                else {
                    resolve(
                        ShoppingsService.getShoppings(config).then((response) => {
                                response.data.map((item) =>  {
                                    setShoppings(shoppings => [...shoppings, item]);
                                })
                        })
                    );
                }
          }
          catch (error) {
              reject(console.log(error));
          }
      });
  }

  const getUsers =()=> {
    return new Promise((resolve, reject) => {
      try {
            resolve(
                UsersService.getAll().then((response) => {
                    setUsers(response.data);
                })
            );
      }
      catch (error) {
          reject(console.log(error));
      }
  });
}

const loadMore =async()=>  {
    pageNum++;
    setPageNum(pageNum);
    await getShoppings();
}

 const onScroll =()=> {
    if(document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.documentElement.clientHeight)){
            setTimeout(() => {
                loadMore();
            }, 1000);
      }
}

window.onscroll = function() {onScroll()};

async function getAll() {
        await getUsers();
        await getShoppings();
}

useEffect(() => {
        if (user) {
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
        }
		getAll();
},[]);



     return (
        <div>
            {showAdmin && (
                
            <form onSubmit={handleSubmit}>

                <div className="ListFormBoxDiv">
               
                        <div className="nextBoxDiv">
                        <label>  User: </label>
                        <select className="selectForList" name="userId" value={userId} onChange={handleChangeUserId}> 
                                <option value={''}> --- Select ---</option>  
                                {users.map(user => (
                                <option value={user.id}>{user.username}</option> ))}
                        </select>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Code: </label>
                        <input className="inputForList" type="text" name="code" placeholder=" Search by code" value={code} onChange={handleChangeCode}/> 
                        </div>

                        <div className="nextBoxDiv">
                        <label> Total Price: </label>
                        <input className="inputForList" type="number" name="totalPrice"  placeholder=" Search by price" value={totalPrice} onChange={handleChangeTotalPrice}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> Beginning &#10095; </label>
                        <input className="inputForList" type="datetime-local"  value={dateTimeBeginning} onChange={handleChangeDateTimeBeginning}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> End  &#10094; </label>
                        <input className="inputForList" type="datetime-local"  value={dateTimeEnd} onChange={handleChangeDateTimeEnd}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
                        </div>

                </div>

            </form>
  
            )}


             {showAdmin && (
            <div className="tablemodel">
                 				
                     <div className="rowModel">
                         <p>Shoppings List</p>
                     </div>
                    <table>

                        <thead>
                            <tr>
                                <th> O/N </th>
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
                            { shoppings.map( (shopping, index) => 
                                    <tr key = {shopping.id}>
                                         <td data-label="O/N"> { index+1 } </td>
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
                                             <button  onClick={ () => resultShopping(shopping.id)} className="btn btn-select"> <i className="fa fa-calculator"></i> Result  </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <div className="div-load">
                    <button className="btn btn-submit" onClick={ () =>loadMore()}> <i className="fas fa-sync fa-spin"></i>  Load  more </button> 
                    </div>

                    <div className="empty"></div>
             </div>
            )}
        </div>
    )

}

export default ListShoppingsComponent;


