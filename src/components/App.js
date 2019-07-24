import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import LogInPage from '../components/LogInPage'
import Leaderboard from '../components/Leaderboard'
import NewQuestion from '../components/NewQuestion'
import ChooseOption from '../components/ChooseOption'
import ViewPoll from '../components/ViewPoll'
import NavBar from './NavBar'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from './ErrorPage'
import { handleInitialData } from '../actions/shared'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
      <header >
        <img src={logo} className=" App-logo" alt="logo" />
      </header>
      <BrowserRouter>
          <LoadingBar/>
            <NavBar/>
            {this.props.loading === true ? null : (
            <Switch>
                <Route exact path="/" component={LogInPage}/>
                <ProtectedRoute exact path="/home" component={Dashboard} isAuthenticated={this.props.account}/>
                <ProtectedRoute exact path="/question/:question_id" component={ChooseOption} isAuthenticated={this.props.account} />
                <ProtectedRoute exact path="/question/:question_id/results" component={ViewPoll} isAuthenticated={this.props.account}/>
                <ProtectedRoute exact path="/add" component={NewQuestion} isAuthenticated={this.props.account}/>
                <ProtectedRoute exact path="/leaderboard" component={Leaderboard} isAuthenticated={this.props.account}/>
                <Route component={ErrorPage} />
            </Switch>
            )}
      </BrowserRouter>
      </div>

    )
  }
}

function mapStateToProps({authedUser}) {
    return {
        account: authedUser.account,
    }
}

export default connect(mapStateToProps)(App)
