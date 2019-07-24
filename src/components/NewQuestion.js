import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Card, CardBody, CardTitle,Button,Form,FormGroup,Row,Col,Input} from 'reactstrap';

class NewQuestion extends Component {
  state = {
    redirectHome: false,
    firstOp: '',
    secondOp: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  createQuestion = (e) => {
    e.preventDefault()
    const { firstOp, secondOp } = this.state
    const { dispatch, authedUser } = this.props
    dispatch(handleSaveQuestion( firstOp, secondOp, authedUser.account ))
    this.setState(() => ({redirectHome: true}))
  }

  render() {
    return this.state.redirectHome ? <Redirect to={`/home`} /> :
        (<Row className="justify-content-md-center">
            <Col  md="auto">
              <Card style={{ width: '25rem' }}>
                <CardBody>
                  <CardTitle><b>Would You Rather:</b></CardTitle>
                  <Form onSubmit={this.createQuestion}>
                    <FormGroup>
                      <Input type="text"
                        name="firstOp"
                        value={this.state.firstOp}
                        onChange={this.handleChange}
                        placeholder="Option One" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="text"
                        name="secondOp"
                        value={this.state.secondOp}
                        onChange={this.handleChange}
                        placeholder="Option Two" />
                    </FormGroup>
                    <Button type="submit" disabled={this.state.firstOp === '' || this.state.secondOp === ''}>Submit</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>)
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
