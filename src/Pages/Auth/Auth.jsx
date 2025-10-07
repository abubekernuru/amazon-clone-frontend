import React, { useContext, useState } from 'react';
import classes from './SignUp.module.css';
import Layout from '../../components/Layout/Layout';
import { Link, useLocation, useNavigate } from 'react-router'; 
import { auth } from '../../Utility/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ClipLoader } from 'react-spinners';
import { DataContext } from '../../components/DataProvider/DataProvider';

function Authentication() {
  const navigate = useNavigate(); 
  const [, dispatch] = useContext(DataContext);
  const navStateData = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields.");
      return;
    }

    // Password validation for signup
    if (!isLogin && password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in:', userCredential.user);
        
        // Dispatch user to context
        dispatch({
          type: "SET_USER",
          user: userCredential.user,
        });
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update profile with display name
        if (name) {
          await updateProfile(userCredential.user, {
            displayName: name
          });
        }
        
        console.log('Account created:', userCredential.user);
        
        // Dispatch user to context
        dispatch({
          type: "SET_USER",
          user: {
            ...userCredential.user,
            displayName: name
          },
        });
      }

      const redirectPath = navStateData.state?.redirect || '/';
      navigate(redirectPath, { replace: true });

      // Clear form
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Authentication error:', err);
      
      // error messages
      let errorMessage = 'Authentication failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  return (
    <Layout>
      <section className={classes.auth}>
        <Link to="/" className={classes.logo}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="amazon logo" 
          />
        </Link>

        <div className={classes.authContainer}>
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>

          {navStateData.state?.msg && (
            <p className={classes.redirectMessage}>
              {navStateData.state.msg}
            </p>
          )}

          <form onSubmit={handleSubmit} className={classes.authForm}>
            {!isLogin && (
              <div className={classes.formGroup}>
                <label htmlFor="name">Your name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}

            <div className={classes.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className={classes.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={isLogin ? undefined : 6}
              />
            </div>

            <button 
              type="submit" 
              className={classes.submitButton} 
              disabled={loading}
            >
              {loading ? (
                <span className={classes.loadingContent}>
                  <ClipLoader size={20} color={"#fff"} loading={loading} />
                  <span>Please wait...</span>
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create your Amazon account'
              )}
            </button>
          </form>

          {error && <p className={classes.errorMessage}>{error}</p>}

          <div className={classes.agreement}>
            <p>
              By continuing, you agree to Amazon clone's fake 
              <Link to="/conditions"> Conditions of Use</Link> and 
              <Link to="/privacy"> Privacy Notice</Link>.
            </p>
          </div>

          <div className={classes.divider}>
            <span>{isLogin ? 'New to Amazon?' : 'Already have an account?'}</span>
          </div>

          <button 
            onClick={toggleMode}
            className={classes.createAccountButton}
            disabled={loading}
            type="button"
          >
            {isLogin ? 'Create your Amazon account' : 'Sign In to existing account'}
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Authentication;