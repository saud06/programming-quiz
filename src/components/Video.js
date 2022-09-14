import classes from './styles/Video.module.css';

export default function Videos({title, id, noq}) {
  return(
    <div className={classes.video}>
      <div className={classes.video}>
        {/* get thumbnail image by id from youtube */}
        <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />

        <p>{title}</p>
        
        <div className={classes.qmeta}>
          <p>{noq} Questions</p>
          {/* assuming each question contains 5 points */}
          <p>Total Points: {noq*5}</p>
        </div>
      </div>
    </div>
  );
}