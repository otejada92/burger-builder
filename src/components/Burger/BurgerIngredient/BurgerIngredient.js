import React from 'react';
import classes from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';

const burgerIngredient = (props) =>{

    let ingredient = null;

    switch(props.type){
        case ('bread-botton'):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredient = ( <div className={classes.BreadTop}>
                                <div className={classes.Seed1}></div>
                                <div className={classes.Seed2}></div>
                            </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
        default:
            break;
    }
    return ingredient;
};

burgerIngredient.prototype = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient;