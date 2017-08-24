import React from 'react';
import styled from 'styled-components';

import VoteForm from './vote-form';
import ResultsChart from './results-chart';
import LoaderHOC from '../hoc/loader';

const SurveyContainer = styled.div`
  > h1 {
    text-align: center;
    padding: 10px;
  }
`

const SurveyBody = styled.div`
  display: flex;
  width: 96vw;
  margin: 10px 2vw;
  padding: 2em;
  justify-content: space-around;
  background-color: rgb(240,240,240);
  box-shadow: 0px 0px 2px grey;

  @media (max-width: 900px) {
    display: block;
  }

  > form {
    display: inline-block;
    vertical-align: top;
    min-width: 320px;
    margin: 20px;

    @media (max-width: 900px) {
      display: block;
      width: 300px;
      margin: 0 auto;

      > h2 { text-align: center; }
    }

    > h2 {
      font-size: 1.5em;
    }

    > button { 
      margin: 10px;
    }
  }

  > div {
    width: 60%;
    height: 400px;

    @media (max-width: 900px) {
      width: 100%;
      height: auto;
    }
  }

`

const Survey = (props) => {
  const { question, options } = props.survey;
  return (
    <SurveyContainer>
      <h1>{question}</h1>
      <SurveyBody>
        <VoteForm survey={props.survey}/>
        <div>
          <ResultsChart options={options} />
        </div>
      </SurveyBody>
    </SurveyContainer>
  );
}


export default LoaderHOC('survey')(Survey);