import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../actions';
import Survey from './survey';



class showSurvey extends React.Component {
  componentWillMount() {
    this.props.fetchSurvey(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.deselectSurvey();
  }

  render() {
    console.log('show-survey:', this.props)   
    return (
      <Survey survey={this.props.survey.selectedSurvey} />
    )
  }
}

const mapStateToProps = (state) => {
  return { survey: state.survey };
}

export default connect(mapStateToProps, actions)(showSurvey);