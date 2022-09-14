export default function Checkbox({className, type, text, ...rest}){
  return(
    <label className={className}>
      <input type={type} {...rest} />  <span>{text}</span>
    </label>
  );
}