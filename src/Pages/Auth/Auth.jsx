import React, { useState } from 'react';
import classes from './SignUp.module.css';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router';
import { auth } from '../../Utility/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from 'react-spinners';

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log('Form submitted:', formData);
    const { name, email, password } = formData;
    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      setLoading(true);
      if (isLogin) {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in:', userCredential.user);
        alert('Signed in successfully');
      } else {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Account created:', userCredential.user);
        alert('Account created successfully');
        // optional: switch to login mode after successful signup
        setIsLogin(true);
      }
      // Clear form after successful auth
      setFormData({ name: '', email: '', password: '' });
      setLoading(false);
    } catch (error) {
      console.error('Authentication error:', error);
      // Friendly message for beginners
      alert(error.message || 'Authentication failed. Please try again.');
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className={classes.loaderContainer}>
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
    
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <Layout>
      <section className={classes.auth}>
        {/* Logo */}
        <Link to="/" className={classes.logo}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="amazon logo" 
          />
        </Link>
        
        {/* Form Container */}
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
            
            <button type="submit" className={classes.submitButton}>
              {isLogin ? 'Sign In' : 'Create your Amazon account'}
            </button>
          </form>
          
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