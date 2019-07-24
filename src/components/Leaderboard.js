import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class Leaderboard extends Component {

  render() {
    const userOrder = Object.keys(this.props.users).map(id => ({
      id: id,
      answer : Object.keys(this.props.users[id].answers).length,
      question : Object.keys(this.props.users[id].questions).length,
    })).sort((a, b) => b.answer+b.question - a.answer-a.question)

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Profile</th>
            <th>Questions Asked</th>
            <th>Questions Answered</th>
            <th>Total Point </th>
          </tr>
        </thead>
        <tbody>
          {userOrder.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td><img src={this.props.users[user.id].avatarURL}  width="30" height="30"  className='avatar' alt='Profile Pic'/></td>
              <td>{user.question}</td>
              <td>{user.answer}</td>
              <td>{user.answer+user.question}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
