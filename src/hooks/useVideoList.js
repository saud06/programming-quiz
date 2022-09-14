import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from "react";

export default function useVideoList(page){
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos(){
      const db = getDatabase();
      const videosRef = ref(db, 'videos');
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt('' + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoader(true);

        // request firebase database
        const snapshot = await get(videoQuery);

        setLoader(false);

        // check if snapshot has data. return true / false
        if(snapshot.exists()){
          // get previous state data first
          setVideos((prevVideos) => {
            // return an array of previous destructured value, plus values from snapshot object
            return [...prevVideos, Object.values(snapshot.val())];
          });
        } else{
          // After all the loads when snapshot doesn't exist, setHasMore to false
          setHasMore(false);
        }
      } catch (err) {
        console.log(err);

        setLoader(false);
        setError(true);
      }
    }

    fetchVideos();
  }, [page]);

  return {
    loader,
    error,
    videos,
    hasMore,
  }
}