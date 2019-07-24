import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { handleLoginUser } from '../actions/authedUser.js'
import {Redirect} from 'react-router-dom';

class LogInPage extends Component {
  state = {
    choice: ''
  }

  handleChange = (e) => {
    this.setState({choice:e.target.value})
  }

  render() {
    return this.props.authedUser!==undefined ? <Redirect to='/home'/> :
      (<Row className="justify-content-md-center">
          <Col  md="auto">
          <Form id="Login" onSubmit={(e)=>{
              e.preventDefault();
              this.props.dispatch(handleLoginUser(this.state.choice))
          }}>
            <FormGroup>
              <Label for="userId">Login</Label>
              <Input id="userId" type='select' name='select' value={this.state.choice}
                    onChange={(e) => this.handleChange(e)}>
                  <option></option>
                  {Object.keys(this.props.users).map((user) =>
                      <option key={this.props.users[user].id}
                              value={this.props.users[user].id}>{this.props.users[user].name}
                      </option>
                  )}
              </Input>
            </FormGroup>
            <input type="submit" value='Submit' disabled={this.state.choice === ''}/>
          </Form>
        </Col>
      </Row>)
    }
}

function mapStateToProps(state) {
  return {
    users:state.users,
    authedUser: state.authedUser.account
  }
}

export default connect(mapStateToProps)(LogInPage)
