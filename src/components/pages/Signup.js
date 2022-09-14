import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import signupImage from '../assets/images/signup.svg';
import Illustration from '../Illustration';

import SignupForm from '../SignupForm';

export default function Signup() {
  const {currentUser} = useAuth();

  return currentUser ? (
    <Navigate to='/' />
  ) : (
    <>
      <h1>Create an account</h1>

      <div className="column">
        <Illustration image={signupImage} alt="Signup" />
        <SignupForm />
      </div>
    </>
  );
}