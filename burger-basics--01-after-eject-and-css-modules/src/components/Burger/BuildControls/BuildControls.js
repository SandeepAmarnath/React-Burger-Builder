import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
// added = {() => props.ingredientAdded(control.type)}

const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Meat', type : 'meat'},


];

                         
   
const buildControls = (props) => (

    <div className = {classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>




        {controls.map(control =>{
           return <BuildControl label={control.label} 
           key={control.label} 
           added = {() => props.ingredientAdded(control.type)}
           removed = {() => props.ingredientRemoved(control.type)}
           disabledIn = {props.disabledInformation[control.type]} />
        })}
        <button disabled={!props.purchasable} className = {classes.OrderButton} onClick={props.purchased}>ORDER NOW</button>

    </div>



);
export default buildControls;