import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import AuthenticationService from "../../Services/AuthenticationService";


const ListUsersComponent = () => {

    let navigate = useNavigate();

    const user = AuthenticationService.getCurrentUser();
	    
    let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
	
	const[showAdmin,setShowAdmin] = useState('');
    const[showUserAndAdmin,setShowUserAndAdmin] = useState('');
	const[users,setUsers] = useState([]);
	const[username,setUsername] = useState('');
	const[email,setEmail] = useState('');
	const[showSearch,setShowSearch] = useState(false);

    let[page,setPage] = useState(1);
    let[pageNum,setPageNum] = useState(0);

    
	const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

	const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

	const handleSubmit = (event) => {
        event.preventDefault();  
        getUsers();
    }

    const deleteUser = (id) => {
        try {
            UsersService.deleteUser(id).then( res => {
                getUsers();
            });
        }
        catch (error) {
                console.log(error);
        }
    }

	const addUser = () => {
        navigate("/register");
    }

    const updateUser = (id) => {
        navigate(`/update-user/${id}`, {id});
    }

	
	const getUsers = () => {

        return new Promise((resolve, reject) => {

            if (username !== "") {
            config.params.username = username;
            }
            if (email !== "") {
                config.params.email = email;
            }
            config.params.pageNum = pageNum;

            try {
                UsersService.getUsers(config).then((res) => {
                    resolve(setUsers(res.data));
                }); 
            }
            catch (error) {
                reject(console.log(error));
            }
      });
        
	}

    const plusPage =()=> {
        page++;
        setPage(page);
        pageNum++;
        setPageNum(pageNum);
        getUsers();
  }
    
  const minusPage =()=> {
        if(pageNum>0){
              page--;
              setPage(page--);
              pageNum--;
              setPageNum(pageNum);
              getUsers();
        }
  }

  async function getAll() {
    await getUsers();
  }


    useEffect(() => {
        if (user) {
			setShowAdmin(user.roles.includes("ROLE_ADMIN"));
            setShowUserAndAdmin(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER"));
	    }
		getAll();
    },[]);
	
	
	
	return (
           
            <div>


				   
                <button className="btn btn-select" onClick={ () => setShowSearch(!showSearch)}> <i className='fas fa-plus'></i> Search</button>
                <br/><br/>
                { showSearch && (

                <form onSubmit={handleSubmit}>

                    <div className="ListFormBoxDiv">

                        <div className="nextBoxDiv">
                        <label>  Username: </label>
                        <input className="inputForList" type="text" name="username"  placeholder="Search by username" value={username} onChange={handleChangeUsername}/>
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label className="nextLabel">  E-mail: </label>
                        <input className="inputForList" type="text" name="email"  placeholder="Search by e-mail" value={email} onChange={handleChangeEmail}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i className='fas fa-search'></i> Search</button>
                        </div>

                    </div>

                </form>

                )}

              
			   {showUserAndAdmin && ( 
                 <div className="tablemodel">

                <div className="rowModel">
                 <p>Users List</p>
                    <button className="btn btn-add" onClick={ addUser}> <i className='fas fa-plus'></i> Add User</button>
                 </div>

                        <table>
                                <thead>
                                <tr>
                                    <th> ID</th>
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
                                             <td data-label="ID"> {user.id} </td>  
                                             <td data-label="UserName"> {user.username} </td>  
                                             {showAdmin && (  <td data-label="Password"> {user.password}</td>  )}
                                             <td data-label="E-mail"> {user.email}</td>
                                             <td data-label="Update"> <button onClick={ () => updateUser(user.id)} className="btn btn-update">  <i className='fas fa-pencil-alt'></i> Update </button> </td>
                                             {showAdmin && ( 
                                              <td data-label="Delete"><button onClick={ () => deleteUser(user.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete </button></td>
                                          )}
                                         
                                        </tr>
                                    )}
                        </table>

                        <div className="pagination">
                            <button className="btn btn-pagination" onClick={minusPage}> <i className='fas fa-less-than'></i> <i className='fas fa-less-than'></i> Previous  </button>
                            <label> {page} </label>
                            <button className="btn btn-pagination" onClick={plusPage}> Next  <i className='fas fa-greater-than'></i> <i className='fas fa-greater-than'></i> </button> 
                        </div>

                        <div className="empty"></div>
                 </div>
			
			)}
			
        </div>
            
        )

	
	
}

export default ListUsersComponent;

