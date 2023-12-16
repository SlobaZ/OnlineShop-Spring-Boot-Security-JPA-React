import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";
import { isEmail } from 'validator';

const AddOrEditUserComponent = () => {

    const {id} = useParams();

    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[email,setEmail] = useState('');
    const[showAdmin,setShowAdmin] = useState('');
    const[showWaiterAndAdmin,setShowWaiterAndAdmin] = useState('');
    
    const [message, setMessage] = useState("");
	const [messageUsername, setMessageUsername] = useState("");
	const [messagePassword, setMessagePassword] = useState("");
	const [messageEmail, setMessageEmail] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
            setShowWaiterAndAdmin(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_WAITER"));
        }
            UsersService.getUserById(id).then( (response) =>{
                setUsername(response.data.username);
				setPassword(response.data.password);
				setEmail(response.data.email);
                console.log(response.data);
            });
    },[]);   


    const updateUser = (e) => {
		
        e.preventDefault();
        let user = {username, password, email};
        console.log('user => ' + JSON.stringify(user));
		
		checkFields();
		
		if(messageUsername==="" && messagePassword==="" && messageEmail==="") {
		        UsersService.updateUser(user, id).then( response => {
		                navigate("/users"); 
		        },
		        (error) => {
		          const resMessage =
		            (error.response &&
		              error.response.data &&
		              error.response.data.message) ||
		              error.message ||
		              error.toString();
		          setMessage(resMessage);
		        });
		  }
        else {
			setMessage("Data entry failed");
		}
    }
    
    const changeUsernameHandler = (event) => {
        setUsername(event.target.value);
        setMessageUsername("");
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
        setMessagePassword("");
    }

	const changeEmailHandler = (event) => {
        setEmail(event.target.value);
        setMessageEmail("");
    }

    const cancel = () => { 
        navigate("/users");  
    }
    
    
    const checkFields = () => {
			if(username.length < 5 || username.length > 100){
					setMessageUsername("The username must be between 5 and 100 characters");
			}
			if(password.length < 5 || password.length > 100){
					setMessagePassword("The password must be between 6 and 100 characters");
			}
			if (!isEmail(email)) {
					setMessageEmail("This is not a valid email");
			}
	}

    return (
        <div>
            {showWaiterAndAdmin && (

                            <div className="col-12 offset-0">

                                <div className="col-xs-10 offset-xs-1  col-sm-8 offset-sm-2  col-md-8 offset-md-2  col-lg-6 offset-lg-3">
                                <div className="boxes">

                                <p className="createupdateP text-center">  Update User </p>
                                
                                <form>
                                    
                                    <div className = "form-group-sm">
                                        <label> Username: </label>
                                        <input placeholder="Username" name="username" className="form-control" value={username} onChange={changeUsernameHandler}/>
                                                {messageUsername && (
							                  	<p className="messageP" > {messageUsername} ! </p>
							            		)}
                                    </div>

                                    {showAdmin && ( 
                                    <div className = "form-group-sm">
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control" value={password} onChange={changePasswordHandler}/>
                                                {messagePassword && (
							                  	<p className="messageP" > {messagePassword} ! </p>
							            		)}
                                    </div>
                                    )}

                                    <div className = "form-group-sm">
                                        <label> E-mail: </label>
                                        <input placeholder="E-mail" name="email" className="form-control"  value={email} onChange={changeEmailHandler}/>
                                                {messageEmail && (
							                  	<p className="messageP" > {messageEmail} ! </p>
							            		)}
                                    </div>

                                    <br/>
                                    <button className="btn btn-submit" onClick={updateUser}> <i className='fas fa-sd-card'></i> Save</button>
                                    <button className="btn btn-cancel" onClick={cancel}> <i className='fas fa-undo-alt'></i> Cancel</button>

                                        {message && (
							              <div className="form-group-sm">
							                  <p className="messageP" > {message} ! </p>
							              </div>
							            )}
							            
                                </form>
                                <br/>

                                </div>
                                </div>
                            </div>


            )}
        </div>
    )


}

export default AddOrEditUserComponent;

