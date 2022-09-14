import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from "react";

export default function useQuestions(videoID){
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions(){
      const db = getDatabase();
      const quizRef = ref(db, 'quiz/' + videoID + 'questions');
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoader(true);

        // request firebase database
        const snapshot = await get(quizQuery);

        setLoader(false);

        // check if snapshot has data. return true / false
        if(snapshot.exists()){
          // get previous state data first
          setQuestions((prevQuestions) => {
            // return an array of previous destructured value, plus values from snapshot object
            return [...prevQuestions, Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);

        setLoader(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loader,
    error,
    questions,
  }
}