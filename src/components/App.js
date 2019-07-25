import React, { Component, Fragment } from 'react'
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
      <header>
        <img src={logo} className=" App-logo" alt="logo" />
      </header>
      <BrowserRouter>
          <Fragment>
          <LoadingBar/>
          <NavBar/>
            {this.props.loading === true ? null : (
            <Switch>
                <Route exact path="/" component={LogInPage}/>
                {this.props.account===undefined? <Route path="/" component={LogInPage}/>:(
                    <Switch>
                      <Route exact path="/home" component={Dashboard} />
                      <Route exact path="/question/:question_id" component={ChooseOption}  />
                      <Route exact path="/question/:question_id/results" component={ViewPoll} />
                      <Route exact path="/add" component={NewQuestion} />
                      <Route exact path="/leaderboard" component={Leaderboard} />
                      <Route component={ErrorPage}/>
                    </Switch>
               )}
            </Switch>)}
          </Fragment>
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
