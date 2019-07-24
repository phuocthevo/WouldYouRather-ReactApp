import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';


class Dashboard extends Component {
    state = {
        active: 'unanswered'
    };

    render() {
        return (
            <div>
            <Nav tabs>
                  <NavItem>
                    <NavLink
                    onClick={(e) => this.setState(() => ({
                        active: 'unanswered'}))}>
                    Unanswered Questions
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      onClick={(e) => this.setState(() => ({
                          active: 'answered'}))}>
                    Answered Questions
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.active}>
              <TabPane tabId="unanswered">
                <Row className="justify-content-md-center">
                  {this.props.unanswered.map((id) =>
                    <Col key={id} sm="6" md="4">
                      <Question id={id} displayQues='unanswered'/>
                    </Col>
                  )}
                </Row>
              </TabPane>
              <TabPane tabId="answered">
                <Row className="justify-content-md-center">
                  {this.props.answered.map((id) =>
                    <Col key={id} sm="6" md="4">
                      <Question id={id} displayQues='answered'/>
                    </Col>
                  )}
                </Row>
              </TabPane>
            </TabContent>
          </div>
        )
    }
}

function mapStateToProps ({ questions, users, authedUser }) {
  const answered = Object.keys(users[authedUser.account].answers)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  const unanswered = Object.keys(questions).filter(id => !answered.includes(id))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {
    unanswered,
    answered
  }
}
export default connect(mapStateToProps)(Dashboard);
