import React from 'react';
import _ from 'lodash';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

function SurveyFormReview({ onCancel, formValues, submitSurvey, history }) {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    )
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      > 
      Back 
      </button>
      <button 
        className="teal btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
        >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

const selector = formValueSelector('surveyForm');

const mapStateToProps = state => {
  const formValues = selector(state, 'title', 'subject', 'body', 'recipients');
  return { formValues };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));