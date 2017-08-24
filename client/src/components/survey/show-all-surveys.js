import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { connect } from 'react-redux';

import LoaderHOC from '../hoc/loader';
import * as actions from '../../actions';
import './show-all-surveys.css';

class ShowAllSurveys extends React.Component {

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteSurvey(e.target.getAttribute('data-id'));
  }

  renderSurveys() {
    let index = 0;
    return this.props.survey.surveysList.map((survey) => {
      return (
        <Link to={`/survey/${survey._id}`} className='list-group-item list-group-itme-action' key={index++}>
          {survey.question}
          { 
            $('#menu_my').hasClass('active')
            ? <button className='btn btn-danger delete' data-id={survey._id} onClick={this.handleDelete}>Delete</button>
            : '' 
          }
        </Link>
      );
    });
  }
  
  render() {
    return <div>{this.renderSurveys()}</div>;
  }

}
 
const ShowAllSurveysWithLoader = LoaderHOC('survey')(ShowAllSurveys);
export default connect(null, actions)(ShowAllSurveysWithLoader);