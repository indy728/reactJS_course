import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
// import * as actionTypes from '../../store/actions/actionTypes'
// import * as actions from '../../store/actions/index'
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount () {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data})
        //     })
        //     .catch(er => {this.setState({error: true})})
        this.props.onInitIngredients()
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceIncrease = INGREDIENT_PRICES[type]
    //     const oldPrice = this.props.total
    //     const newPrice = oldPrice + priceIncrease
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     if (oldCount <=0 ) {
    //         return
    //     }
    //     const updatedCount =  oldCount - 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceReduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.props.total
    //     const newPrice = oldPrice - priceReduction
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    // purchaseContinueHandler = () => {
    //     const queryParams = []

    //     for (let i in this.props.ings) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    //     }

    //     queryParams.push("price=" + this.props.total)
    //     const queryString = queryParams.join('&');

    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients Can't be Loaded!</p> : <Spinner />
        if (this.props.ings) {
            burger = 
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        price={this.props.total}
                        more={this.props.onIngredientAdded}
                        less={this.props.onIngredientRemoved}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    /> 
                </Aux>
            orderSummary = 
                <OrderSummary
                    ingredients={this.props.ings} 
                    purchaseCanceled={this.purchaseCancelHandler}    
                    purchaseContinued={this.purchaseContinueHandler}   
                    price={this.props.total} 
                />
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        error: state.burger.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
