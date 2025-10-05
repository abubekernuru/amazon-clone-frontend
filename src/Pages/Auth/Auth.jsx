import React, { useState } from 'react';
import classes from './SignUp.module.css';
import Layout from '../../components/Layout/Layout';
import { Link, useNavigate } from 'react-router'; // ✅ Import useNavigate from react-router
import { auth } from '../../Utility/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from 'react-spinners';

function Authentication() {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      if (isLogin) {
        //  Sign In existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in:', userCredential.user);
        // alert('Signed in successfully!');
        navigate('/');
      } else {
        //  Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Account created:', userCredential.user);
        // alert('Account created successfully!');
        navigate('/'); 
      }

      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // switch between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  return (
    <Layout>
      <section className={classes.auth}>
        {/* Amazon logo */}
        <Link to="/" className={classes.logo}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="amazon logo" 
          />
        </Link>

        {/* form */}
        <div className={classes.authContainer}>
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>

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
              />
            </div>

            {/* Sign In or Create button */}
            <button type="submit" className={classes.submitButton} disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ClipLoader size={20} color={"#fff"} loading={loading} />
                  <span style={{ marginLeft: '10px' }}>Please wait...</span>
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create your Amazon account'
              )}
            </button>
          </form>

          {/* Error message below the button */}
          {error && <p className={classes.errorMessage}>{error}</p>}

          <div className={classes.agreement}>
            <p>
              By continuing, you agree to Amazon clone's fake 
              <Link to="/conditions"> Conditions of Use</Link> and 
              <Link to="/privacy"> Privacy Notice</Link>.
            </p>
          </div>

          <div className={classes.divider}>
            <span>New to Amazon?</span>
          </div>

          <button 
            onClick={toggleMode}
            className={classes.createAccountButton}
          >
            {isLogin ? 'Create your Amazon account' : 'Sign In to existing account'}
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Authentication;
