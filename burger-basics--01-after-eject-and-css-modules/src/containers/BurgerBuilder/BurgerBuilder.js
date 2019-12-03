import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component {

    state = {

        ingredients : null, /*comes from backend in componentDidMount*/
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading:false,
        error:false

       
    }

    componentDidMount(){
        axios.get('https://react-my-burger-a25b2.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients:response.data})
            }).catch(error=>{
                this.setState({error:true})
            });
    }
     
    // To show the ordersummary
    purchaseHandler = () => {

        this.setState({
            purchasing:true
        })
    }
    
    // To hide the orderSummary
    purchaseCancelHandler = () =>{
        this.setState({
            purchasing:false
        })
    }

    // To continue after clicking continue button in checkout
    purchaseContinueHandler = () => {

        
        // this.setState({loading:true});
        // // alert('You Continue!');
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer:{

        //         name:'Max',
        //         address:{
        //             street:'Teststreet 1',
        //             zipcode: '413453',
        //             country:'Germany'
        //         },
        //         email:'test@test.com',
        //         deliveryMethod:'fastest'
                 
        //     }
        // }

        // axios.post('/orders.json',order).then(response=>this.setState({loading:false,purchasing:false})).catch(error=>this.setState({loading:false,purchasing:false}));
            



        const queryParams = [];
        for(let i in this.state.ingredients){
            console.log(encodeURIComponent(i) + "="+this.state.ingredients[encodeURIComponent(i)]);
            queryParams.push(encodeURIComponent(i) + "="+this.state.ingredients[encodeURIComponent(i)]);
        
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');

        
        // this.props.history.push("/checkout");
        this.props.history.push({
            pathname:"/checkout",
            search:'?'+queryString
            

    });
   
    
    // console.log(this.props);

    }
    // updating purchasable

    updatePurchasable = (ingredients) => {
        
        const numberOfIngredients = Object.keys(ingredients).map(igKey => { //[salad, meat, cheese, bacon]
            return ingredients[igKey] //[0,0,0,0]
        }).reduce((sum,el)=>{
            return sum+el;
            
        },0)

        this.setState({
           purchasable:numberOfIngredients>0
        })
    }





    // update handlers

    // Add handler
    addIngredientHandler = (type) => {



        // updating ingredient
        const currentIngredient = this.state.ingredients[type];
        const newIngredient = currentIngredient + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        
        updatedIngredients[type] = newIngredient;


        // updating price
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        // updating state with new price and ingredient
        

        this.setState ({
            ingredients : updatedIngredients,
            totalPrice:updatedPrice
        })

        // now state ingredient is {salad : 1, meat:0, cheese:0, bacon:0}
        this.updatePurchasable(updatedIngredients);

        
    }


    // Remove Handler

    removeIngredientHandler = (type) => {


        // We get error if we try to remove the item which isn't present in the burger (I mean if the state is 0 for item)

        if(this.state.ingredients[type]<=0){
            return;
        }

        // updating ingredient

        const updatedIngredients  = {
            ...this.state.ingredients
        } 

        updatedIngredients[type] = updatedIngredients[type] - 1;
        

        // updating price
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]; 

        // updating state

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        
        this.updatePurchasable(updatedIngredients);
    }




    render(){



        const disabledInfo = {

            ...this.state.ingredients
        }

        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary = null;
        

       






        let burger = this.state.error? <p>The ingredients can't be loaded</p>:<Spinner/>;


        if(this.state.ingredients){

            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls ingredientAdded = {this.addIngredientHandler} 
                               ingredientRemoved = {this.removeIngredientHandler}
                               disabledInformation = {disabledInfo}
                               price = {this.state.totalPrice} 
                               purchasable = {this.state.purchasable}
                               purchased = {this.purchaseHandler}
                               />
            </Aux>
            );


            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            purchaseCanceled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice}/>

        }

        if(this.state.loading){

            orderSummary = <Spinner/>
        }
        
        return(
            <Aux>

                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                     
                </Modal>
                {burger}

                
            </Aux>
        );

    }
}

// export default withErrorHandler(BurgerBuilder);
export default withErrorHandler(BurgerBuilder,axios);
