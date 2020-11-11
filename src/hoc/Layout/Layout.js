import React, { Component } from 'react'
import Aux from '../_Aux/_Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer : false})
    }

    sideDrawerOpenHandler = () =>{
        this.setState( (prevState) =>{
            return  {showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
        return (<Aux>
            <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                 {this.props.children}
            </main>
        </Aux>)};
}
export default Layout;