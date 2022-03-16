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
