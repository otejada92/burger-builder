import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>;
        if(this.props.ingredients) {
            const purchasedRedirect  = this.props.purchased ? <Redirect to="/"/> : null;
            summary = <div>
                        {purchasedRedirect}
                        <CheckoutSummary 
                            ingredients={this.props.ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler} 
                            checkoutContinue={this.checkoutContinueHandler}/>
                        <Route 
                            path={this.props.match.path + '/contact-data'} 
                            component={ContactData}/>   
                    </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut);