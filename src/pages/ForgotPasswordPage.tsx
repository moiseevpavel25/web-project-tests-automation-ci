import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { validateForgotEmail, LS_KEYS } from '../utils';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-fill email from localStorage (set by Page 1)
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEYS.FORGOT_EMAIL);
    if (saved) {
      setEmail(saved);
    }
    // Clean up after reading
    localStorage.removeItem(LS_KEYS.FORGOT_EMAIL);
  }, []);

  const handleBack = () => {
    // Explicitly clear the forgot-email key (already removed on mount,
    // but clear again to be safe) and navigate back
    localStorage.removeItem(LS_KEYS.FORGOT_EMAIL);
    navigate('/');
  };

  const handleReset = () => {
    const err = validateForgotEmail(email);
    setEmailError(err ?? '');

    if (!err) {
      setEmail('');
      setShowSuccess(true);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError('');
    // Hide success message as soon as user starts typing
    if (showSuccess) setShowSuccess(false);
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
          Reset password
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-mono">
          Enter your email to receive instructions
        </p>
      </div>

      <div className="page-card animate-slide-up stagger-2">
        <div data-testid="forgot-password-form" className="space-y-5">

          {/* Email Field */}
          <div className="animate-slide-up stagger-3">
            <label htmlFor="forgot-email" className="field-label">
              Email address
            </label>
            <input
              id="forgot-email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`field-input ${emailError ? 'has-error' : ''}`}
              data-testid="forgot-email-input"
              autoComplete="email"
            />
            {emailError && (
              <p className="error-message" data-testid="forgot-email-error">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {emailError}
              </p>
            )}
          </div>

          {/* Reset button */}
          <div className="animate-slide-up stagger-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn-primary"
              data-testid="reset-password-button"
            >
              Reset password
            </button>
          </div>

          {/* Success message */}
          {showSuccess && (
            <div className="success-message animate-fade-in" data-testid="reset-success-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Please check your mailbox
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-ink-700 pt-4 animate-slide-up stagger-5">
            <button
              type="button"
              onClick={handleBack}
              className="btn-ghost"
              data-testid="back-to-login-button"
            >
              ← Back to login
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
