import React, { Component } from 'react';
import Input from  '../../components/UI/Input/Input';
import Button from  '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity, updateObject } from '../../shared/utility';

class Auth extends Component {
    
    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    autoComplete: "on"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    mingLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false
    }


    inputChangedHandler = (event, controlName) => {
        
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({controls: updatedControls});

    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
        
        if(this.props.isAuthenticated && this.state.is) {
            this.props.history.push('/');
        }
    }

    switchAuthModeHandler = () => {
        
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp};
        });
    }
    
    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementArray =  [];
        for (let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map(element => (
            <Input 
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)}
                />
        ));

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null
        if(this.props.isAuthenticated && this.props.buildingBurger) {
            authRedirect = <Redirect to='/checkout'/>
        } 
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={(event) => this.submitHandler(event)}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
        <Button 
            clicked={this.switchAuthModeHandler}
            btnType='Danger'> SWITCH TO { this.state.isSignUp ? 'SIGNIN' : 'SIGN UP'}
        </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Auth);