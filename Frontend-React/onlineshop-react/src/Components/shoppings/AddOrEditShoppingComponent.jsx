import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import UsersService from '../../Services/UsersService';

const AddOrEditShoppingComponent = () => {

    const {id} = useParams();

    const[users,setUsers] = useState([]);
	const[userId,setUserId] = useState('');
	const[code,setCode] = useState('');
    const[totalPrice,setTotalPrice] = useState('');
    const[dateTime,setDateTime] = useState('');

    let navigate = useNavigate();


    const changeCodeHandler  = (event) => {
        setCode(event.target.value);
    }

    const changeTotalPriceHandler = (event) => {
        setTotalPrice(event.target.value);
    }

    const changeDatetimeHandler = (event) => {
        setDateTime(event.target.value);
    }
    
    const changeUserIdHandler = (event) => {
        setUserId(event.target.value);
    }

    const cancel  = () => {
        navigate('/shoppings');
    }

    const getTitle  = () => {
        if(id === '_add'){
            return  <p className="createupdateP text-center"> Add Shopping</p>
        }else{
            return <p className="createupdateP text-center"> Update Shopping</p>
        }
    }
    const getTotalPrice = () => {
        if(id === '_add'){
            return 
        }else{
            return <div className = "form-group-sm">
                        <label> Total Price: </label>
                            <input placeholder="TotalPrice" name="totalPrice" className="form-control" 
                            value={totalPrice} onChange={changeTotalPriceHandler}/>
                    </div>
        }
    }
    const getDatetime = () => {
        if(id === '_add'){
            return 
        }else{
            return <div className = "form-group-sm">
                        <label> Date and Time: </label>
                        <input placeholder="DateTime" name="dateTime" className="form-control" 
                        value={dateTime} onChange={changeDatetimeHandler}/>
                    </div>
        }
    }

    const saveOrUpdateShopping = (e) => {
        e.preventDefault();
        let shopping = {code, totalPrice, dateTime, userId};
        console.log('shopping => ' + JSON.stringify(shopping));

        if(id === '_add'){
            ShoppingsService.createShopping(shopping).then(response =>{
                navigate('/shoppings');
            });
        }else{
            ShoppingsService.updateShopping(shopping, id).then( response => {
                navigate('/shoppings');
            });
        }
    }

    useEffect(() => {
        if(id === '_add'){
            UsersService.getAll().then((response) => {
                setUsers(response.data);
              });
        }else{
            UsersService.getAll().then((response) => {
                setUsers(response.data);
              });
            ShoppingsService.getShoppingById(id).then( (response) =>{
			    setCode(response.data.code);
				setTotalPrice(response.data.totalPrice);
				setDateTime(response.data.dateTime);
				setUserId(response.data.userId);
            });
        }  
	},[]); 


    return (
        <div>
            <div className="col-12 offset-0">

                <div className="col-xs-10 offset-xs-1  col-sm-8 offset-sm-2  col-md-8 offset-md-2  col-lg-6 offset-lg-3">
                <div className="boxes">

                                {getTitle()} 
                                <form>
                                    <div className = "form-group-sm">
                                        <label> Code: </label>
                                        <input placeholder="Code" name="code" className="form-control" 
                                            value={code} onChange={changeCodeHandler}/>
                                    </div>
                                    { getTotalPrice() }
                                    { getDatetime() }
                                    <div className = "form-group-sm">
                                        <label> User: </label>
                                        <select name="userId" className="form-control" 
                                        value={userId} onChange={changeUserIdHandler}> 
                                        <option value={''}> --- Choose ---</option>  
                                        {users.map(user => (
                                        <option value={user.id}>{user.username}</option> ))}
                                        </select>
                                    </div>

                                    <br/>
                                    <button className="btn btn-submit" onClick={saveOrUpdateShopping}> <i class='fas fa-sd-card'></i> Save </button>
                                    <button className="btn btn-cancel" onClick={cancel} style={{marginLeft: "10px"}}>  <i class='fas fa-undo-alt'></i> Cancel  </button>
                                </form>
                            
                        </div>
                    </div>

               </div>
        </div>
    )


}

export default AddOrEditShoppingComponent;


/*

import React, { Component } from 'react'
import ShoppingsService from '../../services/ShoppingsService';
import UsersService from '../../services/UsersService';

class CreateShoppingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            id: this.props.match.params.id,
            code: '',
            totalPrice: '',
            dateTime: '',
            userId: ''
        }
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeTotalPriceHandler = this.changeTotalPriceHandler.bind(this);
        this.changeDatetimeHandler = this.changeDatetimeHandler.bind(this); 
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.saveOrUpdateShopping = this.saveOrUpdateShopping.bind(this);
    }


    componentDidMount(){

        if(this.state.id === '_add'){
            UsersService.getAlls().then((response) => {
                this.setState({ users: response.data });
              });
        }else{
            UsersService.getAlls().then((response) => {
                this.setState({ users: response.data });
              });
            ShoppingsService.getShoppingById(this.state.id).then( (res) =>{
                let shopping = res.data;
                this.setState({code: shopping.code,
                    totalPrice: shopping.totalPrice,
                    dateTime : shopping.dateTime,
                    userId : shopping.userId
                    
                });
            });
        }        
    }
    saveOrUpdateShopping = (e) => {
        e.preventDefault();
        let shopping = {code: this.state.code, totalPrice: this.state.totalPrice, dateTime: this.state.dateTime, userId: this.state.userId};
        console.log('shopping => ' + JSON.stringify(shopping));

        if(this.state.id === '_add'){
            ShoppingsService.createShopping(shopping).then(res =>{
                this.props.history.push('/shoppings');
            });
        }else{
            ShoppingsService.updateShopping(shopping, this.state.id).then( res => {
                this.props.history.push('/shoppings');
            });
        }
    }
    
    changeCodeHandler= (event) => {
        this.setState({code: event.target.value});
    }

    changeTotalPriceHandler= (event) => {
        this.setState({totalPrice: event.target.value});
    }

    changeDatetimeHandler= (event) => {
        this.setState({dateTime: event.target.value});
    }
    
    changeUserIdHandler= (event) => {
        this.setState({userId: event.target.value});
    }

    cancel(){
        this.props.history.push('/shoppings');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Shopping</h3>
        }else{
            return <h3 className="text-center">Update Shopping</h3>
        }
    }
    getTotalPrice(){
        if(this.state.id === '_add'){
            return 
        }else{
            return <div className = "form-group">
                        <label> Total Price: </label>
                            <input placeholder="TotalPrice" name="totalPrice" className="form-control" 
                            value={this.state.totalPrice} onChange={this.changeTotalPriceHandler}/>
                    </div>
        }
    }
    getDatetime(){
        if(this.state.id === '_add'){
            return 
        }else{
            return <div className = "form-group">
                        <label> Date and Time: </label>
                        <input placeholder="DateTime" name="dateTime" className="form-control" 
                        value={this.state.dateTime} onChange={this.changeDatetimeHandler}/>
                    </div>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Code: </label>
                                            <input placeholder="Code" name="code" className="form-control" 
                                                value={this.state.code} onChange={this.changeCodeHandler}/>
                                        </div>
                                        {
                                            this.getTotalPrice()
                                        }
                                        {
                                            this.getDatetime()
                                        }
                                        <div className = "form-group">
                                            <label> User: </label>
                                            <select name="userId" className="form-control" 
                                            value={this.state.userId} onChange={this.changeUserIdHandler}> 
                                            <option value={''}> --- Choose ---</option>  
                                            {this.state.users.map(user => (
                                            <option value={user.id}>{user.username}</option> ))}
                                            </select>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateShopping}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateShoppingComponent

*/