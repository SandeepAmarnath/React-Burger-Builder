import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This can be a functional component. Doesnt have to be class component. It was a fucntional component before 
    // but turned in to the class component as I wanted to test componentDidUpdate lifecycle. Now you can remove that method
    componentDidUpdate(){
        console.log('[OrderSummary] will update');
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{

            return <li key={igKey}><span style={{textTransform:"capitalize "}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
            });


        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious burger with the following ingredients : </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <Button btnType = "Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType = "Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>

            </Aux>

        );
    }
}


   

   


export default OrderSummary;