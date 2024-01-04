import React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import UsersService from '../../Services/UsersService';

const AddOrEditShoppingComponent = () => {

    const {id} = useParams();

    const[users,setUsers] = useState([]);
	const[userId,setUserId] = useState('');
	const[code,setCode] = useState('');
    const[totalPrice,setTotalPrice] = useState('');
    const[calendarData,setCalendarData] = useState('');
    
    const [message, setMessage] = useState("");
	const [messageCode, setMessageCode] = useState("");
	const [messageTotalPrice, setMessageTotalPrice] = useState("");
	const [messageDateTime, setMessageDateTime] = useState("");
	const [messageUserId, setMessageUserId] = useState("");	
	
	const dateTime = useMemo(() => {
        return formatDateTimeToString(calendarData);
    }, [calendarData]);	

    let navigate = useNavigate();


    const changeCodeHandler  = (event) => {
        setCode(event.target.value);
        setMessageCode("");
    }

    const changeTotalPriceHandler = (event) => {
        setTotalPrice(event.target.value);
        setMessageTotalPrice("");
    }

    const changeDatetimeHandler = (event) => {
        setCalendarData(event.target.value);
        setMessageDateTime("");
    }
    
    const changeUserIdHandler = (event) => {
        setUserId(event.target.value);
        setMessageUserId("");
    }

    const cancel  = () => {
        navigate('/shoppings');
    }

    const getTitle  = () => {
        if(id === '_add'){
            return  <p className="createupdateP text-center"> Add Shopping</p>
        }else{
            return <p className="createupdateP text-center"> Update Shopping</p>
        }
    }
    const getTotalPrice = () => {
        if(id === '_add'){
            return 
        }else{
            return <div className = "form-group-sm">
                        <label> Total Price: </label>
                            <input placeholder="TotalPrice" name="totalPrice" className="form-control" type="number" value={totalPrice} onChange={changeTotalPriceHandler}/>
                                {messageTotalPrice && (
							                <p className="messageP" > {messageTotalPrice} ! </p>
							    )}
                    </div>
        }
    }
    const getDatetime = () => {
        if(id === '_add'){
            return 
        }else{
            return <div className = "form-group-sm">
                        <label> Date and Time: </label>
                        <input type="datetime-local"  className="form-control"  value={calendarData} onChange={changeDatetimeHandler}/>
                        		{messageDateTime && (
							          <p className="messageP" > {messageDateTime} ! </p>
							    )}
                    </div>
        }
    }
    
    
   const checkFields = () => {
			if(code.trim().length === 0){
					setMessageCode("The Code field must not be empty");
			}
			if(totalPrice === '' || totalPrice<=0){
					setMessageTotalPrice("The Total Price field must be greater than zero");
			}
			if(calendarData.trim().length === 0){
					setMessageDateTime("The Date & Time field must not be empty");
			}
			if(userId === ''){
					setMessageUserId("The User field must not be empty");
			}
	}
	
	function formatDateTimeToString  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(8, 10);
        const month = enteredValue.substring(5, 7);
        const year = enteredValue.substring(0, 4);
        const time = enteredValue.substring(11, 16);
        const formatedValue = day.concat(".", month, ".", year, ". ", time);
        return formatedValue;
    }

    function formatStringToDateTime  (value)  {
        const enteredValue = value;
        const day = enteredValue.substring(0, 2);
        const month = enteredValue.substring(3, 5);
        const year = enteredValue.substring(6, 10);
        const time = enteredValue.substring(12, 17);
        const formatedValue = year.concat("-", month, "-", day, "T", time);
        return formatedValue;
    }

    const saveOrUpdateShopping = (e) => {
        e.preventDefault();
        let shopping = {code, totalPrice, dateTime, userId};
        console.log('shopping => ' + JSON.stringify(shopping));
		
		checkFields();
		
		if(code && totalPrice>0 && calendarData && userId) {
		        if(id === '_add'){
		            ShoppingsService.createShopping(shopping).then(response =>{
		                navigate('/shoppings');
		            })
		        	.catch((error) => {
				    	console.log('error: ' + error);
				    	setMessage("Data entry failed"); 
		  		    });
		        }
		        else{
		            ShoppingsService.updateShopping(shopping, id).then( response => {
		                navigate('/shoppings');
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
            UsersService.getAll().then((response) => {
                setUsers(response.data);
              });
        }
        else{
            UsersService.getAll().then((response) => {
                setUsers(response.data);
              });
            ShoppingsService.getShoppingById(id).then( (response) =>{
			    setCode(response.data.code);
				setTotalPrice(response.data.totalPrice);
				setCalendarData(formatStringToDateTime(response.data.dateTime));
				setUserId(response.data.userId);
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
                                        <label> Code: </label>
                                        <input placeholder="Code" name="code" className="form-control" value={code} onChange={changeCodeHandler}/>
                                                {messageCode && (
							                  	<p className="messageP" > {messageCode} ! </p>
							            		)}
                                    </div>
                                    { getTotalPrice() }
                                    { getDatetime() }
                                    <div className = "form-group-sm">
                                        <label> User: </label>
                                        <select name="userId" className="form-control"value={userId} onChange={changeUserIdHandler}> 
                                        <option value={''}> --- Choose ---</option>  
                                        {users.map(user => (
                                        <option value={user.id}>{user.username}</option> ))}
                                        </select>
                                                {messageUserId && (
							                  	<p className="messageP" > {messageUserId} ! </p>
							            		)}
                                    </div>

                                    <br/>
                                    <button className="btn btn-submit" onClick={saveOrUpdateShopping}> <i className='fas fa-sd-card'></i> Save </button>
                                    <button className="btn btn-cancel" onClick={cancel} style={{marginLeft: "10px"}}>  <i className='fas fa-undo-alt'></i> Cancel  </button>
                                    
                                          {message && (
							              <div className="form-group-sm">
							                  <p className="messageP" > {message} ! </p>
							              </div>
							            )}
							            
                                </form>
                            
                        </div>
                    </div>

               </div>
        </div>
    )


}

export default AddOrEditShoppingComponent;
