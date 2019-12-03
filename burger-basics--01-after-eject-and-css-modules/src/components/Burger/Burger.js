import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
                         
   
const burger = (props) => {
                         
    //   Object.keys(props.ingredients)-- this gives [salad,bacon,cheese,meat], no values are given

   let  transformedIngredients = Object.keys(props.ingredients)
                                .map(igKey=>{
                                    return [...Array(props.ingredients[igKey])].map((_,i)=>{

                                        return <BurgerIngredient type={igKey} key={igKey+i}/>
                                    });
                                })
                                .reduce((arr,currentElement)=>{

                                    return arr.concat(currentElement);
                            
                                },[]);


// Note that if you assign the result till reduce to another variable and then call reduce on that new variable it will
// work but you get the unique key problem. So better to write this way



    if( transformedIngredients.length===0){
       transformedIngredients = <p>Please start adding ingredients! </p>
    }
                                    
    
    return(
                            
        <div className = {classes.Burger}>

            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            
            <BurgerIngredient type="bread-bottom"/>
         


        </div>
        
        
    );
};
export default burger;