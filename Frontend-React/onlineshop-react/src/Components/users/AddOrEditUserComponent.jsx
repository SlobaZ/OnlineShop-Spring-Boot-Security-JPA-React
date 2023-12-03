import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";

const AddOrEditUserComponent = () => {

    const {id} = useParams();

    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[email,setEmail] = useState('');
    const[showAdmin,setShowAdmin] = useState('');
    const[showWaiterAndAdmin,setShowWaiterAndAdmin] = useState('');

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

        UsersService.updateUser(user, id).then( res => {
                navigate("/users"); 
        });
    }
    
    const changeUsernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

	const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const cancel = () => { 
        navigate("/users");  
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
                                        <input placeholder="Username" name="username" className="form-control" 
                                            value={username} onChange={changeUsernameHandler}/>
                                    </div>

                                    {showAdmin && ( 
                                    <div className = "form-group-sm">
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control" 
                                            value={password} onChange={changePasswordHandler}/>
                                    </div>
                                    )}

                                    <div className = "form-group-sm">
                                        <label> E-mail: </label>
                                        <input placeholder="E-mail" name="email" className="form-control" 
                                            value={email} onChange={changeEmailHandler}/>
                                    </div>

                                    <br/>
                                    <button className="btn btn-submit" onClick={updateUser}> <i class='fas fa-sd-card'></i> Save</button>
                                    <button className="btn btn-cancel" onClick={cancel}> <i class='fas fa-undo-alt'></i> Cancel</button>


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

