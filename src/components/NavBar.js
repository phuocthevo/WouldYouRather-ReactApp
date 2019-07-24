import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogoutUser } from '../actions/authedUser.js'
import {  Nav, Navbar, NavbarBrand , NavItem, NavLink } from "reactstrap";

class NavBar extends Component {

  render() {
    const userName =this.props.user ? this.props.user.name : null
    return (
      <div>
        <Navbar bg="dark" variant="info" light expand="md">
            <NavbarBrand><b>Would You Rather</b></NavbarBrand>
            {this.props.account && (
              <Fragment>
              <Nav className="ml-auto" bg='light'>
                <NavItem>
                  <NavLink tag={Link} to="/home">{userName}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/add">Add Question</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/leaderboard">LeaderBoard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/" onClick={()=>{
                      this.props.dispatch(handleLogoutUser())
                  }}>Log Out
                  </NavLink>
                </NavItem>
              </Nav>
              </Fragment>)}
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user:state.users[state.authedUser.account],
    account: state.authedUser.account
  }
}

export default connect(mapStateToProps)(NavBar)
