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
