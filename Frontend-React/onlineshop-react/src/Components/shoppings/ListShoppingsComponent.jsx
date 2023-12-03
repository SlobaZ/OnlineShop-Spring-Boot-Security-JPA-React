import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

    const refreshShoppings = () => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {
            setShowAdmin(user.roles.includes("ROLE_ADMIN"));
        }
         let config = { params: {} };
     
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
           config.params.dateTimeBeginning = searchDateTimeBeginning;
         }
          if (searchDateTimeEnd !== "") {
           config.params.dateTimeEnd = searchDateTimeEnd;
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
                                <option value={''}> --- Choose ---</option>  
                                {users.map(user => (
                                <option value={user.id}>{user.username}</option> ))}
                        </select>
                        </div>

                        <div className="nextBoxDiv">
                        <label>  Code: </label>
                        <input className="inputForList" type="text" name="searchCode" value={searchCode} onChange={handleChangeCode}/> 
                        </div>

                        <div className="nextBoxDiv">
                        <label> Total Price: </label>
                        <input className="inputForList" type="text" name="searchTotalPrice" value={searchTotalPrice} onChange={handleChangeTotalPrice}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> Beginning: </label>
                        <input className="inputForList" type="text" name="searchDateTimeBeginning" placeholder=" Date Time " value={searchDateTimeBeginning} onChange={handleChangeDateTimeBeginning}/> 
                        </div>
                        
                        <div className="nextBoxDiv">
                        <label> End: </label>
                        <input className="inputForList" type="text" name="searchDateTimeEnd" placeholder=" Date Time " value={searchDateTimeEnd} onChange={handleChangeDateTimeEnd}/> 
                        </div>

                        <div className="nextBoxDivButon">
                        <button type="submit" className="btn btn-search"> <i class='fa fa-search'></i> Search</button>
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
                                             <button onClick={ () => editShopping(shopping.id)} className="btn btn-update"> <i class='fas fa-pencil-alt'></i> Update </button>
                                        </td>
                                        <td data-label="Delete">
                                             <button  onClick={ () => deleteShopping(shopping.id)} className="btn btn-delete"> <i class='fas fa-trash-alt'></i> Delete  </button>
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





/*


import React, { Component } from 'react'
import ShoppingsService from '../../services/ShoppingsService'
import UsersService from '../../services/UsersService'
import AuthService from "../../services/auth.service";

class ListShoppingsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                shoppings: [],
                users: [],
                searchUserId: '',
                searchCode: '',
                searchTotalPrice: '',
                searchDateTimeBeginning : '',
                searchDateTimeEnd: ''
        };
        
        this.editShopping = this.editShopping.bind(this);
        this.deleteShopping = this.deleteShopping.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
       this.refreshShoppings();
    }

    deleteShopping(id){
        ShoppingsService.deleteShopping(id).then( res => {
            this.setState({shoppings: this.state.shoppings.filter(shopping => shopping.id !== id)});
        });
    }

    editShopping(id){
        this.props.history.push(`/update-shopping/${id}`);
    }

    componentDidMount(){
        this.refreshShoppings();
    }

    refreshShoppings() {
       const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModerator: user.roles.includes("ROLE_MODERATOR"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
        let config = { params: {} };
    
        if (this.state.userId !== "") {
          config.params.userId = this.state.searchUserId;
        }
        if (this.state.code !== "") {
          config.params.code = this.state.searchCode;
        }
        if (this.state.totalPrice !== "") {
          config.params.totalPrice = this.state.searchTotalPrice;
        }
         if (this.state.dateTimeBeginning !== "") {
          config.params.dateTimeBeginning = this.state.searchDateTimeBeginning;
        }
         if (this.state.dateTimeEnd !== "") {
          config.params.dateTimeEnd = this.state.searchDateTimeEnd;
        }
        UsersService.getAlls().then((response) => {
            this.setState({ users: response.data });
          });
        ShoppingsService.getShoppings(config).then((response) => {
          this.setState({ shoppings: response.data });
        });
      }


    render() {
    const { showAdmin } = this.state;
        return (
            <div>
                <br/>
                {showAdmin && (
                 <div className="searchShoppings">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  User: 
                    <select name="searchUserId" value={this.state.searchUserId} onChange={this.handleChange}> 
                            <option value={''}> --- Choose ---</option>  
                            {this.state.users.map(user => (
                            <option value={user.id}>{user.username}</option> ))}
                    </select>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  Code: 
                    <input type="text" name="searchCode" value={this.state.searchCode} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control"> Total Price: 
                    <input type="text" name="searchTotalPrice" value={this.state.searchTotalPrice} onChange={this.handleChange}/> 
                    </label>
                    </div>
                    
                    <div className="form-group">
                    <label className="form-control"> Date Time Beginning: 
                    <input type="text" name="searchDateTimeBeginning" value={this.state.searchDateTimeBeginning} onChange={this.handleChange}/> 
                    </label>
                    </div>
                    
                    <div className="form-group">
                    <label className="form-control"> Date Time End: 
                    <input type="text" name="searchDateTimeEnd" value={this.state.searchDateTimeEnd} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>
				)}
                 <h2 className="text-center">Shoppings List</h2>
                 <br></br>
                 {showAdmin && (
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Code</th>
                                    <th> Customer</th>
                                    <th> Date and Time</th>
                                    <th> Total Price</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.shoppings.map(
                                        shopping => 
                                        <tr key = {shopping.id}>
                                             <td> {shopping.code} </td>   
                                             <td> {shopping.userUsername} </td>
                                             <td> {shopping.dateTime}</td>
                                             <td> {shopping.totalPrice}</td>
                                             <td>
                                                 <button onClick={ () => this.editShopping(shopping.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteShopping(shopping.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
				)}
            </div>
        )
    }
}

export default ListShoppingsComponent

*/