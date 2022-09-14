import Answers from "./Answers";
import classes from './styles/Question.module.css';

export default function Question({answers = []}){
  return answers.map((answer, indx) => (
    <div className={classes.question} key={indx}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>

      <Answers input={false} options={answer.option}/>
    </div>
  ));
}