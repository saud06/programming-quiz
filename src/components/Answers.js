import { Fragment } from 'react';
import Checkbox from './Checkbox';
import classes from './styles/Answers.module.css';

export default function Answers({options = [], handleChange, input}){
  return(
    <div className={classes.answers}> 
      {options.map((option, indx) => (
        <Fragment key={indx}>
          {input ? (
            <Checkbox className={classes.answer} type="checkbox" text={option.title} value={indx} checked={option.checked} onChange={(e) => handleChange(e, indx)} />
          ) : (
            <Checkbox className={`${classes.answer} ${option.correct ? classes.correct : option.checked ? classes.wrong : null}`} type="checkbox" text={option.title} defaultChecked={option.checked} disabled />
          )}
        </Fragment>
      ))}
    </div>
  );
}