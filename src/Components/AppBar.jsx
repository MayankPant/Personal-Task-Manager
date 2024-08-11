import React, { Component } from 'react';
import logo from '../assets/resources/logo.svg';
import '../styles/AppBar.css'
import Button from './Button.jsx';



const Logo = ({ logo, title }) => {
  return (
    <div className='logo'>
      <img src={logo} alt='Task Manager' />
      <label>{title.toUpperCase()}</label>
    </div>
  );
};
const buttonStyles = {
    backgroundColor: '#eee25b',
    color: '#673AB7',
    padding: '10px',
}

const NavItem = ({navItemName, onClick, styles}) => {
    return (
        <Button text={navItemName} onClick={onClick} styles = {styles} />
    )
}

class AppBar extends Component {
    home() {

    }
  render() {
    return (
      <div className='app-bar'>
        <Logo logo={logo} title={"Task Manager"} />
        <div className='nav-items'>
            <NavItem navItemName={'HOME'} onClick={this.home} styles={buttonStyles} />
            <NavItem navItemName={'ABOUT'} onClick={this.home} styles={buttonStyles}  />
            <NavItem navItemName={'CONTACT'} onClick={this.home} styles={buttonStyles} />
        </div>
      </div>
    );
  }
}

export default AppBar;
