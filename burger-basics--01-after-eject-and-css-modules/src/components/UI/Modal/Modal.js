import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'


class Modal extends Component{

    componentDidUpdate(){

        console.log('[Modal] componentDidUpdate');
        
    }

    shouldComponentUpdate=(nextProps,nextState)=>{ // next is basically when the change occurs the next is the present one and this is the previous one

        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
         
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className = {classes.Modal}
                    style = {{transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                opacity : this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
    
            </Aux>
    
        );
    }
 
    
    
   
};

export default Modal;
