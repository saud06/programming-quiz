import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from "react";

export default function useAnswers(videoID){
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers(){
      const db = getDatabase();
      const answerRef = ref(db, 'answers/' + videoID + 'questions');
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoader(true);

        // request firebase database
        const snapshot = await get(answerQuery);

        setLoader(false);

        // check if snapshot has data. return true / false
        if(snapshot.exists()){
          // get previous state data first
          setAnswers((prevAnswers) => {
            // return an array of previous destructured value, plus values from snapshot object
            return [...prevAnswers, Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);

        setLoader(false);
        setError(true);
      }
    }

    fetchAnswers();
  }, [videoID]);

  return {
    loader,
    error,
    answers,
  }
}