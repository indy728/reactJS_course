import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactInfo.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import { purchaseBurger } from '../../../store/actions'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { updateObject } from '../../../shared/utility'

const textInputElement = (placeholder, type, validation) => {
    let tie = {
        elementType: 'input',
        elementConfig: {
            type: type || 'text',
            placeholder: placeholder,
        },
        value: '',
        validation: validation || {
          required: true,
        },
        touched: false,
        valid: false
    }

    return tie
}

class ContactInfo extends Component {
    state = {
        orderForm: {
            name: textInputElement('Your Name'),
            street: textInputElement('Your Street Address'),
            city: textInputElement('City'),
            state: textInputElement('State'),
            zip: textInputElement(
                'Zip Code',
                null,
                {
                    required: true,
                    touched: false,
                    length: {
                        absMin: 3,
                        absMax: 6
                    }
                }),
            email: textInputElement('Your Email', 'email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ],
                },
                value: 'fastest',
                valid: true,
            },
        },
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) return true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            isValid = (
                value.length >= rules.length.absMin && value.length <= rules.length.absMax && isValid
            )
        }

        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props)
        // this.setState({loading: true});
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.total,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
        // '/orders' creates a page or a set just for orders
        // '.json' is necessary for firebase
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(er => {
        //         this.setState({loading: false});
        //     })
    }

    // 2-way binding for form values
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value)
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // }
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputIdentifier]
        // }
        // updatedFormElement.touched = true
        // updatedFormElement.value = event.target.value
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        // updatedOrderForm[inputIdentifier] = updatedFormElement

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            value: event.target.value,
            touched: true,
        })
        
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        // console.log(updatedFormElement)

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        const formElementsArray = []

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactInfo}>
                <h4>Enter your contact info:</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios))