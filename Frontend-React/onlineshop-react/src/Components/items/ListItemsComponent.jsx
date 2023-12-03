import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import ShoppingsService from '../../Services/ShoppingsService';
import ItemsService from '../../Services/ItemsService';

const ListItemsComponent = () => {

    const {id} = useParams();

    const[shopping,setShopping] = useState('');
    const[items,setItems] = useState([]);
    const[itemQuantity,setItemQuantity] = useState('');

    let navigate = useNavigate();

    const changeItemQuantityHandler = (event) => {
        setItemQuantity(event.target.value);
    }
    
    const resetItem = (id) => {
        ItemsService.resetItem(id).then( res => {
            setItems(items);
        });
    }

    const buyItem = (id, itemQuantity) => {  
        ItemsService.buyItem(id, itemQuantity).then( res => {
            setItems(items);
        });
    }

    const buy = (id) => {
        ShoppingsService.buy(id).then( res => {
        });
        navigate(`/resultshopping/${id}` , {id});
        window.location.reload(); 
    }

    const refreshItem = () => {
		ShoppingsService.getShoppingById(id).then((response) => {
            setShopping(response.data);
          });
        ItemsService.getAllsByShoppingId(id).then((response) => {
            setItems(response.data);
        });
    }


    useEffect(() => {
		refreshItem();
     },[]);


     return (
        <div>
             
              <form>   
              <div className="tablemodel">
                 				
                    <div class="rowModel">
                        <p>Items List</p>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Pieces</th>
                                <th>Price of Item</th>
                                <th>Actions</th>
                                <th>Reset</th>
                            </tr>
                        </thead>
                        <tbody>
                            { items.map( item => 
                                    <tr key = {item.id}>
                                         <td data-label="Id"> {item.id} </td> 
                                         <td data-label="Product"> {item.productName} </td>   
                                         <td data-label="Quantity"> {item.productQuantity}</td>
                                         <td data-label="Price"> {item.productPrice}</td>
                                         <td data-label="Pieces">
                                         <input key = {item.id} placeholder="Item Quantity" name="itemQuantity" className="inputForList" 
                                            value={itemQuantity[item.id]} onChange={changeItemQuantityHandler} />
                                         </td>
                                         <td data-label="Price of Item"> {item.itemPrice}</td>
                                         <td data-label="Actions"> 
                                         <button onClick={ () => buyItem(item.id, itemQuantity)} className="btn btn-select"> <i class='fas fa-plus'></i> Select Item </button> 
                                         </td>
                                         <td data-label="Reset">
                                             <button onClick={ () => resetItem(item.id)} className="btn btn-cancel"> <i class='fas fa-undo-alt'></i> Reset </button>
                                         </td>
                                    </tr>
                                )}
                            <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><button onClick={ () => buy(shopping.id)} className="btn btn-update">
                                        <i class='fas fa-caret-right'></i> <i class="fa fa-shopping-basket"></i> <i class='fas fa-caret-left'></i>  Buy
                                        </button></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                        </tbody>
                    </table>

                    <div className="empty"></div>

                    </div>
                 </form>

        </div>
    )


}

export default ListItemsComponent;

/*

import React, { Component } from 'react'
import ItemsService from '../../services/ItemsService'
import ShoppingsService from '../../services/ShoppingsService'

class ListItemsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
				shopping: {},
                items: [],
                itemQuantity: ''
        };
        
        this.changeItemQuantityHandler = this.changeItemQuantityHandler.bind(this);
        
    }

	changeItemQuantityHandler= (event) => {
        this.setState({itemQuantity: event.target.value});
    }
    
    resetItem(id){
        ItemsService.resetItem(id).then( res => {
            this.setState({items: this.state.items});
        });
    }

    buyItem(id, itemQuantity){
        ItemsService.buyItem(id, itemQuantity).then( res => {
            this.setState({items: this.state.items});
        });
    }

    buy(id){
        ShoppingsService.buy(id).then( res => {
        });
        this.props.history.push(`/resultshopping/${id}`);
    }

    componentDidMount(){
        this.refreshItem();
    }

    refreshItem() {
		ShoppingsService.getShoppingById(this.state.id).then((response) => {
            this.setState({ shopping: response.data });
          });
        ItemsService.getAllsByShoppingId(this.state.id).then((response) => {
          this.setState({ items: response.data });
        });
      }


    render() {
		const { shopping } = this.state;
        return (
            <div>
                <br></br>
                 <h2 className="text-center">Items List</h2>
                 <br></br>
              
                 <div className = "row">
                 
                  <form>   
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>ID</th>
									<th>Product</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Pieces</th>
									<th>Price of Item</th>
									<th>Actions</th>
									<th>Reset</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.items.map(
                                        item => 
                                        <tr key = {item.id}>
                                             <td> {item.id} </td> 
                                             <td> {item.productName} </td>   
                                             <td> {item.productQuantity}</td>
                                             <td> {item.productPrice}</td>
                                             <td>
                                             <input key = {item.id} placeholder="Item Quantity" name="itemQuantity" className="form-control" 
                                                value={this.state.itemQuantity[item.id]} onChange={this.changeItemQuantityHandler} />
                                             </td>
                                             <td> {item.itemPrice}</td>
                                             <td> 
                                             <button onClick={ () => this.buyItem(item.id,this.state.itemQuantity)} className="btn btn-primary">Select Item </button> 
                                             </td>
                                             <td>
                                                 <button onClick={ () => this.resetItem(item.id)} className="btn btn-info">Reset </button>
                                             </td>
                                        </tr>
                                    )
                                }
                                <tr>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td><button onClick={ () => this.buy(shopping.id)} className="btn btn-danger">Buy</button></td>
											<td></td>
											<td></td>
										</tr>
                            </tbody>
                        </table>
 					</form>
                 </div>

            </div>
        )
    }
}

export default ListItemsComponent


*/