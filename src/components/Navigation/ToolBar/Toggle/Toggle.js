import React from 'react';
import classes from '../Toggle/Toggle.module.css';

const toggle = (props) => {
    return (    
    <div className={classes.Toggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    );
}

export default toggle;