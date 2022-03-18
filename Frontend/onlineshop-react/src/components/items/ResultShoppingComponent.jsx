import React, { Component } from 'react'
import ShoppingsService from '../../services/ShoppingsService'
import ItemsService from '../../services/ItemsService'
import AuthService from "../../services/auth.service";

class ResultShoppingComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
        id: this.props.match.params.id,
        	items: [],
            user: {},
            shopping: {},
            
        };
    }
 

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        if (!user) {
            this.props.history.push('/login');
        }
        else{
          ItemsService.getAllsByShoppingId(this.state.id).then( response => {
            this.setState({items: response.data});
          });
          ShoppingsService.getShoppingById(this.state.id).then((response) => {
            this.setState({ shopping: response.data });
          });
            this.setState({
                user: AuthService.getCurrentUser()
              });

        }
    }


    render() {
        const { shopping } = this.state;
        const { user } = this.state;
        return (
            <div>
                <br/>
                 <h2 className="text-center">Shopping result</h2>
                 <br/>
                 
                <table className = "tableresultshopping">
                <tr>
                    <td>User : </td>
                    <td>{user.username}</td>
                </tr>

                <tr>
                    <td>Shopping ID : </td>
                    <td>{shopping.id}</td>
                </tr>
                <tr>
                    <td>Code of shopping : </td>
                    <td>{shopping.code}</td>
                </tr>

                </table>
			<br/>
			<br/>
                 <h3>Purchased items:</h3>
            
                <form>   
                        <table className = "tableresultshoppingitems">

                            <thead>
                                <tr>
                                    <th>ID</th>
									<th>Product</th>
									<th>Product price</th>
									<th>Pieces</th>
									<th>Item price</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.items.map(
                                        item => item.itemPrice >0 &&
                                        <tr key = {item.id}>
                                             <td> {item.id} </td> 
                                             <td> {item.productName} </td>   
                                             <td> {item.productPrice}</td>
                                             <td> {item.itemQuantity}</td>
                                             <td> {item.itemPrice}</td>
                                        </tr> 
                                    )}

                            </tbody>
                        </table>
 					</form> 
				<br/>
				<br/>
                	<h2>Total shopping price : &nbsp;&nbsp; &nbsp;&nbsp; {shopping.totalPrice} </h2>
				<br/>
					<h6>Date and time of shopping : &nbsp;&nbsp; &nbsp; {shopping.dateTime} </h6>
                 </div>
              
        )
    }
}

export default ResultShoppingComponent
 