import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import AuthenticationService from "../../Services/AuthenticationService";

const CreateItemsComponent = () => {

    let navigate = useNavigate();

    const[user,setUser] = useState('');
    const[shopping,setShopping] = useState('');

    const startShopping  = (id) => {
        navigate(`/startshopping/${id}` , {id});
    }

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        if (!user) {
            navigate('/login');
        }
        else{
            setUser(AuthenticationService.getCurrentUser());
        ShoppingsService.createShopping().then((response) => {
            setShopping(response.data);
          });
        }
    },[]); 

    return (
        <div>
            <br/>
             <div className="tablemodel">

             <div class="rowModel">
                <p>Start Shopping</p>
             </div>

            <table className="x">
            <tr>
                <td>User : </td>
                <td>{user.username}</td>
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
                <td><button onClick={ () => startShopping(shopping.id)} className="btn btn-mode" > 
                <i class='fas fa-angle-double-left'></i> Start Shopping <i class='fas fa-angle-double-right'></i>
                </button></td>
            </tr>
            </table>

            <div className="empty"></div>

          </div>   

    </div>
          
    )


}

export default CreateItemsComponent;

/*

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
        ShoppingsService.createShopping().then((response) => {
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


*/