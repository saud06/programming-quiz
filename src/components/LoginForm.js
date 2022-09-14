import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Form from "./Form";
import TextInput from './TextInput';

export default function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const {login} = useAuth();

  const navigate = useNavigate();

  // handle login on submit button click
  async function handleLogin(e){
    e.preventDefault();

    // call login from useAuth()
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);

      // login using email, password and username
      await login(email, password);

      // redirect to home page after login
      navigate('/');
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to login !');
    }
  }
  
  return(
    <Form style={{height: '330px'}} onSubmit={handleLogin}>
      <TextInput type="text" placeholder="Enter email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Enter password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

      {/* disable button after a click when loader is active */}
      <Button disabled={loader} type='submit'>
        <span>Login now</span>
      </Button>

      {error && <p className='error'>{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link>.
      </div>
    </Form>
  );
}