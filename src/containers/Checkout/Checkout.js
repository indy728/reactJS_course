import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import ContactInfo from './ContactInfo/ContactInfo'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
// import * as actions from '../../store/actions'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // // componentDidMount() {
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price'){
    //             price = +param[1];
    //         }
    //         else (
    //             ingredients[param[0]] = +param[1]
    //         )
    //     }
    //     this.setState({ingredients: ingredients, price: price});
    // }

    // componentDidMount() {
    //     this.props.onPurchaseInit()
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-info')
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = ( 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-info'} 
                        component={ContactInfo} 
                        // render={(props) => (<ContactInfo ingredients={this.props.ings} price={this.props.total} {...props} />)}
                    />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onPurchaseInit: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout)
