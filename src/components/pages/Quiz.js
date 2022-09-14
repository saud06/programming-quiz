import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import Progressbar from '../Progressbar';

const initialState = null;

const reducer = (state, action) => {
  switch(action.type){
    case 'questions':
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        });
      });

      return action.value;
    case 'answer':
      const questions = _.cloneDeep(state);

      questions[action.questionID].options[action.optionIndex].checked = action.value;

      return questions;
    default:
      return state;
  }
}

export default function Quiz(){
  const {currentUser} = useAuth();
  const {id} = useParams();
  const {loader, error, questions} = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index){
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // handle when the user clicks next to get the next question
  function nextQuestion(){
    if(currentQuestion + 1 < questions.length){
      setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion + 1);
    }
  }

  // handle when the user clicks prev to get the prev question
  function prevQuestion(){
    if(currentQuestion >= 1 && currentQuestion <= questions.length){
      setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion - 1);
    }
  }

  // submit quiz
  async function submit(){
    const {uid} = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });

    <Navigate to={{
      pathname: `/result/${id}`,
      state: {
        qna
      }
    }} />
  }

  // calculate percentage of progress
  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return !currentUser ? (
    <Navigate to='/login' />
  ) : (
    <>
      {loader && <div>Loading...</div>}
      {error && <div>There was an error !</div>}

      {!loader && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers input options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
          <Progressbar next={nextQuestion} prev={prevQuestion} submit={submit} percentage={percentage} />
        </>
      )}
    </>
  );
}