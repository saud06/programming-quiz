import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState('');
  const [error, setError] = useState();
  const [loader, setLoader] = useState();

  const {signup} = useAuth();

  const navigate = useNavigate();

  // handle signup on submit button click
  async function handleSignup(e){
    e.preventDefault();

    if(password !== confirmPassword){
      return setError('Password and confirm password don\'t match !');
    }

    // call signup from useAuth()
    try {
      // remove error
      setError('');

      // show loader
      setLoader(true);

      // signup using email, password and username
      await signup(email, password, username);

      // redirect to home page after signup
      navigate('/');
    } catch (err) {
      console.log(err);

      // remove loader
      setLoader(false);

      // set error
      setError('Failed to signup !');
    }
  }

  return(
    <Form style={{height: '500px'}} onSubmit={handleSignup} >
      <TextInput type="text" placeholder="Input name" icon="person" required value={username} onChange={(e) => setUsername(e.target.value)} />

      <TextInput type="text" placeholder="Input email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Input password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

      <TextInput type="password" placeholder="Confirm password" icon="lock_clock" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <Checkbox type="checkbox" text="I agree to the Terms & Conditions" required value={agree} onChange={(e) => setAgree(e.target.value)} />

      {/* disable button after a click when loader is active */}
      <Button disabled={loader} type='submit'>
        <span>Submit now</span>
      </Button>

      {error && <p className='error'>{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}