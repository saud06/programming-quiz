import { useRef, useState } from 'react';
import Button from './Button';
import classes from './styles/Progressbar.module.css';

export default function Progressbar({next, prev, submit, progress}){
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  // Toggle tooltip
  function toggleTooltip(){
    if(tooltip){
      setTooltip(false);
      tooltipRef.current.style.display = 'none';
    } else{
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = 'block';
    }
  }
  
  return(
    <div className={classes.progressBar}>
      <div className={classes.backButton} onclick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>

      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>{progress}% Complete!</div>

        <div className={classes.rangeBody}>
          <div className={classes.progress} style={{width: `${progress}%`}} onMouseOver={toggleTooltip} onMouseOut={toggleTooltip}></div>
        </div>
      </div>
      
      <Button className={classes.next} onclick={progress === 100 ? submit : next}>
        <span>{progress === 100 ? 'Submit Quiz' : 'Next Question'}</span>

        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}