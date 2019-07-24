import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import {Redirect} from "react-router-dom";
import { Card, CardBody, CardTitle,CardImg,Button,Form,ListGroup,ListGroupItem,Row,Col} from 'reactstrap';

class ChooseOption extends Component {
    state = {
        selected: '',
        isSubmit: false
    };

    handleSubmit(e, questionId) {
        e.preventDefault()
        this.props.dispatch(handleAddQuestionAnswer({
          authedUser: this.props.authedUser.account,
          qid: questionId,
          answer: this.state.selected
          }))
        this.setState(() => ({
            selected: '',
            isSubmit: true
        }))
    }

    handleInputChange = (e) => {
      this.setState({selected:e.target.value})
    }

  render() {
    return this.state.isSubmit===true? <Redirect to={`/question/${this.props.id}/results`}/>:
        (
          <Row className="justify-content-md-center">
            <Col  md="auto">
              <Card  style={{ width: '18rem' }}>
                <CardImg variant="top" width="285" height="285" className="img-rounded text-center " src={this.props.users[this.props.question.author].avatarURL} />
                <CardBody>
                    <CardTitle className="text-center" ><b>{this.props.users[this.props.question.author].name}</b> asks would you rather:</CardTitle>
                    <Form onSubmit={(e) => this.handleSubmit(e, this.props.id)}>
                        <ListGroup>
                          <ListGroupItem>
                            <input type="radio"
                                   name="questionPoll"
                                   id="optionOne"
                                   value="optionOne"
                                   onChange={this.handleInputChange}
                            /> {this.props.question.optionOne.text}
                          </ListGroupItem>
                          <ListGroupItem>
                            <input type="radio"
                                   name="questionPoll"
                                   id="optionTwo"
                                   value="optionTwo"
                                   onChange={this.handleInputChange}
                            />{this.props.question.optionTwo.text}
                          </ListGroupItem>
                        </ListGroup>
                        <Button
                            className='vote-btn'
                            type='submit'
                            disabled={this.state.selected === ''}
                        >Submit
                        </Button>
                    </Form>
                </CardBody>
              </Card>
            </Col>
        </Row>
      )
    }
  }

function mapStateToProps({ questions, users, authedUser }, props) {
  const id = props.match.params.question_id
  return {
    question : questions[id],
    users,
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(ChooseOption)
