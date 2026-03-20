import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { validateEmail, validatePassword, LS_KEYS } from '../utils';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Clear state on mount (handles back-navigation from Page 2)
  useEffect(() => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  }, []);

  const handleForgotPassword = () => {
    // Save current email value to localStorage so Page 2 can pick it up
    localStorage.setItem(LS_KEYS.FORGOT_EMAIL, email);
    navigate('/forgot-password');
  };

  const handleLogin = () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr ?? '');
    setPasswordError(pErr ?? '');

    if (!eErr && !pErr) {
      navigate('/profile');
    }
  };

  return (
    <Layout width="sm">
      {/* Brand header */}
      <div className="mb-8 animate-slide-up stagger-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-neon-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 4.5" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">QA Sandbox</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-300 leading-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-mono">
          Sign in to continue training
        </p>
      </div>

      <div className="page-card animate-slide-up stagger-2">
        <div data-testid="login-form" className="space-y-5">

          {/* Email Field */}
          <div className="animate-slide-up stagger-3">
            <label htmlFor="email" className="field-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              className={`field-input ${emailError ? 'has-error' : ''}`}
              data-testid="login-email-input"
              autoComplete="email"
            />
            {emailError && (
              <p className="error-message" data-testid="login-email-error">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="animate-slide-up stagger-4">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              className={`field-input ${passwordError ? 'has-error' : ''}`}
              data-testid="login-password-input"
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="error-message" data-testid="login-password-error">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {passwordError}
              </p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end animate-slide-up stagger-5">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-mono text-neon-600 hover:text-neon-400 transition-colors duration-150 underline underline-offset-2"
              data-testid="forgot-password-link"
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <div className="animate-slide-up stagger-6 pt-1">
            <button
              type="button"
              onClick={handleLogin}
              className="btn-primary"
              data-testid="login-submit-button"
            >
              Sign In
            </button>
          </div>

        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-xs font-mono text-ink-600 mt-6 animate-slide-up stagger-7">
        credentials: test@test.com / qwerty123
      </p>
    </Layout>
  );
}
