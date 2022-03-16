import React, { Component } from 'react'
import UsersService from '../../services/UsersService';
import AuthService from "../../services/auth.service";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            email: '',
            password: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }


    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (user) {
          this.setState({
            currentUser: user,
            showModerator: user.roles.includes("ROLE_MODERATOR"),
            showAdmin: user.roles.includes("ROLE_ADMIN"),
          });
        }
            UsersService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({username: user.username,
                    email: user.email,
                    password : user.password
                });
            });
        }        
   
    updateUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, email: this.state.email, password: this.state.password};
        console.log('user => ' + JSON.stringify(user));

            UsersService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
       
    }
    
    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }
    

    cancel(){
        this.props.history.push('/users');
    }


    render() {
        const { showAdmin } = this.state;
        return (
            <div>
                <br></br>
                {showAdmin && (
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    <h3 className="text-center">Update User</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Username: </label>
                                            <input placeholder="Username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeUsernameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
                )}
            </div>
        )
    }
}

export default CreateUserComponent
