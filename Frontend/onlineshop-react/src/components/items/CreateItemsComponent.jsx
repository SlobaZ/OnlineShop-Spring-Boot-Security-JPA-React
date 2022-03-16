import React, { Component } from 'react'
import ShoppingsService from '../../services/ShoppingsService'
import AuthService from "../../services/auth.service";

class CreateItemsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            shopping: {},
        };
    }

    startShopping(id){
        this.props.history.push(`/startshopping/${id}`);
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (!user) {
            this.props.history.push('/login');
        }
        else{
            this.setState({
                user: AuthService.getCurrentUser()
              });
            const username = String(user.username);  
        ShoppingsService.createShopping(username).then((response) => {
            this.setState({ shopping: response.data });
          });
        }
    }


    render() {
        const { shopping } = this.state;
        const { user } = this.state;
        return (
            <div>
                <br/>
                 <h2 className="text-center">Start Shopping</h2>
                 <br/>
                 <br/>

                <table className = "tablestartshopping">
                <tr>
                    <td>User : </td>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>Shopping ID : </td>
                    <td>{shopping.id}</td>
                </tr>
                <tr>
                    <td>Shopping Code : </td>
                    <td>{shopping.code}</td>
                </tr>
                <tr>
                    <td> - </td>
                    <td> - </td>
                </tr>
                <tr>
                    <td>Start : </td>
                    <td><button onClick={ () => this.startShopping(shopping.id)} className="btn btn-primary" > Start Shopping</button></td>
                </tr>
                </table>

                 

                 </div>
              
        )
    }
}

export default CreateItemsComponent
