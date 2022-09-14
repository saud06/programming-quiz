import _ from 'lodash';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';

export default function Result(){
  const {id} = useParams();
  const {currentUser} = useAuth();
  const {navigate} = useNavigate();
  const {state} = navigate;
  const {qna} = state;
  const {loader, error, answers} = useAnswers(id);

  // calculate score
  function calculateScore(){
    let score = 0;

    answers.forEach((question, indx1) => {
      let correctIndices = [];
      let checkedIndices = [];

      question.option.forEach((option, indx2) => {
        if(option.correct) correctIndices.push(indx2);

        if(qna[indx1].options[indx2].checked){
          checkedIndices.push(indx2);
          option.checked = true;
        }
      });

      if(_.isEqual(correctIndices, checkedIndices)) score = score + 5;
    });

    return score;
  }

  const userScore = calculateScore();

  return !currentUser ? (
    <Navigate to='/login' />
  ) : (
    <>
      {loader && <div>Loading...</div>}
      {error && <div>There was an error !</div>}
      
      {!loader && !error && answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}