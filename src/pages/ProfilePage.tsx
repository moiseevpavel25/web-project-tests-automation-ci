import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { validateName, saveProfile } from '../utils';

const OCCUPATIONS = ['Writer', 'Engineer', 'Developer', 'Marketing', 'CEO', 'Designer', 'Doctor'];

const INTERESTS = [
  { id: 'manual', label: 'Manual testing' },
  { id: 'automation', label: 'Automation testing' },
  { id: 'performance', label: 'Performance testing' },
  { id: 'localization', label: 'Localization testing' },
  { id: 'api', label: 'API testing' },
];

const MAX_DOB = '2026-03-06';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dob?: string;
  occupation?: string;
  interests?: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const toggleInterest = (label: string) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
    if (errors.interests) {
      setErrors((e) => ({ ...e, interests: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: FormErrors = {};

    const fnErr = validateName(firstName, 'First name');
    if (fnErr) newErrors.firstName = fnErr;

    const lnErr = validateName(lastName, 'Last name');
    if (lnErr) newErrors.lastName = lnErr;

    if (!dob) newErrors.dob = 'Please enter your birth date.';

    if (!occupation) newErrors.occupation = 'Please enter your occupation.';

    if (interests.length === 0) newErrors.interests = 'Please choose at least one interest.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      saveProfile({ firstName, lastName, dob, occupation, interests });
      navigate('/summary');
    }
  };

  return (
    <Layout width="lg">
      {/* Header with logo */}
      <div className="mb-8 flex items-center gap-4 animate-slide-up stagger-1">
        <img
          src="https://picsum.photos/seed/qalogo/56/56"
          alt="Platform logo"
          className="w-14 h-14 rounded-xl object-cover ring-2 ring-ink-600"
          data-testid="profile-logo"
        />
        <div>
          <h1 className="text-2xl font-semibold text-slate-300">
            Please tell us about yourself
          </h1>
          <p className="text-sm text-slate-400 font-mono mt-0.5">
            Complete your profile to continue
          </p>
        </div>
      </div>

      <div className="page-card animate-slide-up stagger-2">
        <div data-testid="profile-form" className="space-y-6">

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* First Name */}
            <div className="animate-slide-up stagger-3">
              <label htmlFor="first-name" className="field-label">First name</label>
              <input
                id="first-name"
                type="text"
                placeholder="Your First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((err) => ({ ...err, firstName: undefined }));
                }}
                className={`field-input ${errors.firstName ? 'has-error' : ''}`}
                data-testid="profile-first-name-input"
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p className="error-message" data-testid="profile-first-name-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                    <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="animate-slide-up stagger-4">
              <label htmlFor="last-name" className="field-label">Last name</label>
              <input
                id="last-name"
                type="text"
                placeholder="Your Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((err) => ({ ...err, lastName: undefined }));
                }}
                className={`field-input ${errors.lastName ? 'has-error' : ''}`}
                data-testid="profile-last-name-input"
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p className="error-message" data-testid="profile-last-name-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                    <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth + Occupation row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Date of Birth */}
            <div className="animate-slide-up stagger-5">
              <label htmlFor="dob" className="field-label">Date of birth</label>
              <input
                id="dob"
                type="date"
                placeholder="Your Date of Birth"
                value={dob}
                max={MAX_DOB}
                onChange={(e) => {
                  setDob(e.target.value);
                  if (errors.dob) setErrors((err) => ({ ...err, dob: undefined }));
                }}
                className={`field-input ${errors.dob ? 'has-error' : ''}`}
                data-testid="profile-dob-input"
              />
              {errors.dob && (
                <p className="error-message" data-testid="profile-dob-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                    <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="animate-slide-up stagger-6">
              <label htmlFor="occupation" className="field-label">Occupation</label>
              <select
                id="occupation"
                value={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value);
                  if (errors.occupation) setErrors((err) => ({ ...err, occupation: undefined }));
                }}
                className={`field-select ${errors.occupation ? 'has-error' : ''}`}
                data-testid="profile-occupation-select"
              >
                <option value="" disabled hidden>Your occupation</option>
                {OCCUPATIONS.map((occ) => (
                  <option key={occ} value={occ} data-testid={`occupation-option-${occ.toLowerCase()}`}>
                    {occ}
                  </option>
                ))}
              </select>
              {errors.occupation && (
                <p className="error-message" data-testid="profile-occupation-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                    <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {errors.occupation}
                </p>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="animate-slide-up stagger-7">
            <label className="field-label mb-3">Interests</label>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
              data-testid="profile-interests-group"
            >
              {INTERESTS.map(({ id, label }) => (
                <label
                  key={id}
                  className="checkbox-item"
                  data-testid={`interest-label-${id}`}
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(label)}
                    onChange={() => toggleInterest(label)}
                    className="w-4 h-4 rounded border-ink-600 bg-ink-800 text-neon-600
                               focus:ring-neon-500/30 focus:ring-2 cursor-pointer
                               accent-neon-600"
                    data-testid={`interest-checkbox-${id}`}
                  />
                  <span className="text-sm text-slate-400 font-mono leading-tight">{label}</span>
                </label>
              ))}
            </div>
            {errors.interests && (
              <p className="error-message mt-2" data-testid="profile-interests-error">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                  <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {errors.interests}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary"
              data-testid="profile-submit-button"
            >
              Continue to Summary →
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
