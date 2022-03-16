import React, { Component } from 'react'
import ItemsService from '../../services/ItemsService'
import ShoppingsService from '../../services/ShoppingsService'

class ListItemsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    buy(){
        ShoppingsService.buy(this.state.id).then( res => {
        });
        this.props.history.push('/');
    }

    componentDidMount(){
        this.refreshItem();
    }

    refreshItem() {
        ItemsService.getAllsByShoppingId(this.state.id).then((response) => {
          this.setState({ items: response.data });
        });
      }


    render() {
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
											<td><button onClick={ () => this.buy()} className="btn btn-danger">Buy</button></td>
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
