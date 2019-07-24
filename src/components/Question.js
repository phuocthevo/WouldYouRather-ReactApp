import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle,CardImg,ListGroup,ListGroupItem } from 'reactstrap';

class Question extends Component {

  render() {
    const hasVoted = this.props.question.optionOne.votes.includes(this.props.authedUser.account)
                  || this.props.question.optionTwo.votes.includes(this.props.authedUser.account)

    const pollLink = this.props.displayQues === 'answered' ?
    `/question/${this.props.id}/results`:
    `/question/${this.props.id}`

    return ((this.props.displayQues === 'answered' && hasVoted !== true)
      || (this.props.displayQues === 'unanswered' && hasVoted === true)) ? null :
      (<Card style={{ width: '14rem' }}>
            <CardImg variant="top" width="220" height="220" className="img-rounded text-center " src={this.props.user.avatarURL} />
            <CardBody>
              <Link to={pollLink}>
                <CardTitle className="text-center" ><b>{this.props.user.name}</b> asks would you rather:</CardTitle>
              </Link>
              <ListGroup>
                <ListGroupItem>{this.props.question.optionOne.text}</ListGroupItem>
                <ListGroupItem>{this.props.question.optionTwo.text}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
      )
  }
}

function mapStateToProps({ questions, users,authedUser }, { id,displayQues}) {
  return {
    question:questions[id],
    id,
    user:users[questions[id].author],
    authedUser,
    displayQues
  }
}

export default connect(mapStateToProps)(Question)
