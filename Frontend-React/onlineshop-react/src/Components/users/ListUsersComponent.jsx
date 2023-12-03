import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";


const ListUsersComponent = () => {

    let navigate = useNavigate();
	
	const[showAdmin,setShowAdmin] = useState('');
    const[showWaiterAndAdmin,setShowWaiterAndAdmin] = useState('');
	const[users,setUsers] = useState([]);
	const[searchUsername,setSearchUsername] = useState('');
	const[searchEmail,setSearchEmail] = useState('');
	const[showSearch,setShowSearch] = useState(false);

    
	const handleChangeUsername = (event) => {
        setSearchUsername(event.target.value);
    }

	const handleChangeEmail = (event) => {
        setSearchEmail(event.target.value);
    }

	const handleSubmit = (event) => {
        event.preventDefault();  
        refreshUsers();
    }

    const deleteUser = (id) => {
        UsersService.deleteUser(id).then( res => {
            refreshUsers();
         });
    }

	const addUser = () => {
        navigate("/register");
    }

	
	const refreshUsers = () => {
		const user = AuthenticationService.getCurrentUser();
	    if (user) {
			setShowAdmin(user.roles.includes("ROLE_ADMIN"));
            setShowWaiterAndAdmin(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_WAITER"));
	    }
		let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
        if (searchUsername !== "") {
          config.params.username = searchUsername;
        }
        if (searchEmail !== "") {
            config.params.email = searchEmail;
          }
        UsersService.getUsers(config).then((res) => {
           setUsers(res.data);
        });
        
	}


    useEffect(() => {

		refreshUsers();

      },[]);
	
	
	
	return (
           
            <div>

                <button className="btn btn-select" onClick={ () => setShowSearch(!showSearch)}> <i class='fas fa-plus'></i> Search</button>
                <br/><br/>
                { showSearch && (

                <form onSubmit={handleSubmit}>

                    <div className="ListFormBoxDiv">

                        <div className="nextBoxDiv">
                        <label>  Username: </label>
                        <input className="inputForList" type="text" name="searchUsername"  placeholder="Search by username" value={searchUsername} onChange={handleChangeUsername}/>
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label className="nextLabel">  E-mail: </label>
                        <input className="inputForList" type="text" name="searchEmail"  placeholder="Search by e-mail" value={searchEmail} onChange={handleChangeEmail}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i class='fas fa-search'></i> Search</button>
                        </div>

                    </div>

                </form>

                )}

              
                {showWaiterAndAdmin && ( 
                 <div className="tablemodel">

                <div className="rowModel">
                 <p>Users List</p>
                    <button className="btn btn-add" onClick={ addUser}> <i class='fas fa-plus'></i> Add User</button>
                 </div>

                        <table>
                                <thead>
                                <tr>
                                    <th> UserName</th>
                                    {showAdmin && (   <th> Password</th>   )}
                                    <th> E-mail</th>
                                    <th class="fixno"> Update</th>
                                    {showAdmin && ( 
                                    <th class="fixno"> Delete</th>
                                    )}
                                </tr>
                                </thead>
                                { users.map( user => 
                                        <tr key = {user.id}>
                                             <td data-label="UserName"> {user.username} </td>  
                                             {showAdmin && (  <td data-label="Password"> {user.password}</td>  )}
                                             <td data-label="E-mail"> {user.email}</td>
                                             <td data-label="Update"><Link className="btn btn-update" to={`/update-user/${user.id}`} >Update</Link> </td>
                                             {showAdmin && ( 
                                              <td data-label="Delete"><button onClick={ () => deleteUser(user.id)} className="btn btn-delete"> <i class='fas fa-trash-alt'></i> Delete </button></td>
                                          )}
                                         
                                        </tr>
                                    )}
                        </table>
                        <div className="empty"></div>
                 </div>
                )}

			<br/>
        </div>
            
        )

	
	
}

export default ListUsersComponent;

