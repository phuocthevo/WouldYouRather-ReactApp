import React, { Component } from 'react'
import {Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom'

class ErrorPage extends Component{
  render(){
    return(<Row className="justify-content-md-center">
        <Col  md="auto">
        <Link to='/'>
          ERROR! CLICK GO BACK TO HOME PAGE
        </Link>
        </Col>
      </Row>)
  }
}
export default ErrorPage
