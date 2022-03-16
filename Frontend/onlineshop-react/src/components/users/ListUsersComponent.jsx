import React, { Component } from 'react'
import UsersService from '../../services/UsersService'
import AuthService from "../../services/auth.service";

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: [],
                searchUsername: '',
                searchEmail: ''
        };
        
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});  
    }
    
    handleSubmit(event) {
        event.preventDefault();  
        this.refreshUsers();
    }

    deleteUser(id){
        UsersService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    editUser(id){
        this.props.history.push(`/update-user/${id}`);
    }

    componentDidMount(){
        this.refreshUsers();
    }

    refreshUsers() {
    
      const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModerator: user.roles.includes("ROLE_MODERATOR"),
        showAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
        let config = { params: {} };
    
        if (this.state.username !== "") {
          config.params.username = this.state.searchUsername;
        }
        if (this.state.email !== "") {
          config.params.email = this.state.searchEmail;
        }
        
        UsersService.getUsers(config).then((response) => {
          this.setState({ users: response.data });
        });
      }

    addUser(){
        this.props.history.push('/register');
    }

    render() {
    const { showAdmin } = this.state;
        return (
           
            <div>
                <br/>
                {showAdmin && (
                 <div className="searchDiv">
                <form onSubmit={this.handleSubmit}>
                   
                    <div className="form-group">
                    <label className="form-control">  Username: 
                    <input type="text" name="searchUsername" value={this.state.searchUsername} onChange={this.handleChange}/>
                    </label>
                    </div>

                    <div className="form-group">
                    <label className="form-control">  E-mail: 
                    <input type="text" name="searchEmail" value={this.state.searchEmail} onChange={this.handleChange}/> 
                    </label>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Search" />
                    </div>

                </form>
                </div>
                )}
                
                 
                 {showAdmin && (
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 )}


                 <br></br>
				<h2 className="text-center">User List</h2>
				 <br></br>
			
                 {showAdmin && (
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> UserName</th>
                                    <th> E-mail</th>
                                    <th> Password</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> {user.username} </td>   
                                             <td> {user.email}</td>
                                             <td> {user.password}</td>
                                             <td>
                                                 <button onClick={ () => this.editUser(user.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
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

export default ListUsersComponent
