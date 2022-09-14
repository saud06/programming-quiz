import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import Video from './Video';

export default function Videos() {
  const [page, setPage] = useState(1);
  const {loader, error, videos, hasMore} = useVideoList(page);

  return(
    <>
      { videos.length > 0 && (
        // wrap the videos with infinite scroll 
        <InfiniteScroll dataLength={videos.length} hasMore={hasMore} loader="Loading..." next={() => setPage(page + 8)}>
          {videos.map((video, index) => 
          // check if the video has any quesiton
          video[index].noq > 0 ? (
            <Link to={`/quiz/${video[index].youtubeID}`} key={video[index].youtubeID}>
              <Video title={video[index].title} id={video[index].youtubeID} noq={video[index].noq} />
            </Link>
          ) : (
            <Video title={video[index].title} id={video[index].youtubeID} noq={video[index].noq} key={video[index].youtubeID} />
          ))}
        </InfiniteScroll>
      )}
      {!loader && videos.length === 0 && (
        <div className=''>No data found !</div>
      )}
      {error && (
        <div className=''>There was an error !</div>
      )}
      {loader && (
        <div className=''>Loading...</div>
      )}
    </>
  );
}