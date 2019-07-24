import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle,Progress,Row,Col,ListGroupItem,ListGroup} from 'reactstrap';


class ViewPoll extends Component {
  render() {
    const {question,authedUser,users} = this.props

    const optionOneAmount = question.optionOne.votes.length
    const optionTwoAmount = question.optionTwo.votes.length
    const allVotes = optionOneAmount + optionTwoAmount

    const optionOnePercentage = parseInt((optionOneAmount / allVotes) * 100, 10)
    const optionTwoPercentage = parseInt((optionTwoAmount / allVotes) * 100, 10)
      return (
        <Row className="justify-content-md-center">
          <Col  md="auto">
            <Card  style={{ width: '40rem' }}>
                  <CardBody>
                      <CardTitle className="text-center" ><b>{users[authedUser.account].name}</b> chose {users[authedUser.account].answers[question.id]}</CardTitle>
                        <ListGroup>
                            <ListGroupItem> Option 1: {question.optionOne.text} ({optionOneAmount} votes)
                            </ListGroupItem>
                            <ListGroupItem> Option 2: {question.optionTwo.text} ({optionTwoAmount} votes)
                            </ListGroupItem>
                        </ListGroup>
                        <Progress multi>
                                <Progress animated bar color="warning" value={optionOnePercentage} >Option 1: {optionOnePercentage}% </Progress>
                                <Progress animated bar color="danger" value={optionTwoPercentage} >Option 2: {optionTwoPercentage}% </Progress>
                        </Progress>
                  </CardBody>
                </Card>
          </Col>
        </Row>
      )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  return {
    question:questions[props.match.params.question_id],
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(ViewPoll)
