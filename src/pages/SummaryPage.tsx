import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { loadProfile, calculateAge } from '../utils';

export default function SummaryPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile());

  useEffect(() => {
    // Re-read on mount in case data was just saved
    setProfile(loadProfile());
  }, []);

  if (!profile) {
    return (
      <Layout width="sm">
        <div className="page-card text-center animate-slide-up" data-testid="summary-no-data">
          <p className="text-slate-400 font-mono text-sm mb-4">No profile data found.</p>
          <button
            className="btn-primary"
            onClick={() => navigate('/profile')}
            data-testid="summary-go-back-button"
          >
            Complete your profile
          </button>
        </div>
      </Layout>
    );
  }

  const age = calculateAge(profile.dob);
  const interestsList = profile.interests.join(', ');

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      {/* Top accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-neon-500 to-transparent" />

      {/* Grid noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(78,255,168,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(78,255,168,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(78,255,168,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex-1">

        {/* ─── Header ─── */}
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-8 animate-slide-up stagger-1">
          <div className="flex items-center gap-4">
            <img
              src="https://picsum.photos/seed/qalogo/56/56"
              alt="Platform logo"
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-ink-600"
              data-testid="summary-logo"
            />
            <div>
              <h1 className="text-2xl font-semibold text-slate-300">
                Your information
              </h1>
              <p className="text-sm text-slate-400 font-mono mt-0.5">
                Profile summary
              </p>
            </div>
          </div>
        </div>

        {/* ─── Office Hero Image ─── */}
        <div
          className="w-full animate-slide-up stagger-2"
          style={{ height: '300px' }}
          data-testid="summary-hero-image-container"
        >
          <img
            src="https://picsum.photos/1200/300?grayscale"
            alt="Office"
            className="w-full object-cover"
            style={{ height: '300px', objectFit: 'cover' }}
            data-testid="summary-hero-image"
          />
          {/* Overlay gradient for blending */}
          <div
            className="relative"
            style={{
              marginTop: '-300px',
              height: '300px',
              background: 'linear-gradient(to right, rgba(10,10,15,0.5) 0%, transparent 30%, transparent 70%, rgba(10,10,15,0.5) 100%)',
            }}
          />
        </div>

        {/* ─── Summary card ─── */}
        <div className="max-w-4xl mx-auto px-6 py-10 animate-slide-up stagger-3">
          <div className="page-card">

            {/* Greeting tag */}
            <div className="inline-flex items-center gap-2 bg-neon-600/10 border border-neon-600/30 rounded-full px-3 py-1 mb-6">
              <div className="w-1.5 h-1.5 bg-neon-500 rounded-full animate-pulse" />
              <span className="text-neon-500 text-xs font-mono uppercase tracking-wider">
                Profile Complete
              </span>
            </div>

            {/* Summary paragraph */}
            <p
              className="text-slate-300 text-base leading-relaxed font-sans"
              data-testid="summary-text"
            >
              Hello{' '}
              <span className="text-neon-400 font-semibold" data-testid="summary-first-name">
                {profile.firstName}
              </span>{' '}
              <span className="text-neon-400 font-semibold" data-testid="summary-last-name">
                {profile.lastName}
              </span>
              . Welcome to our platform. As we see, you are{' '}
              <span className="text-neon-400 font-semibold" data-testid="summary-age">
                {age}
              </span>{' '}
              years old. Your occupation is{' '}
              <span className="text-neon-400 font-semibold" data-testid="summary-occupation">
                {profile.occupation}
              </span>{' '}
              and we happy to see your interests:{' '}
              <span className="text-slate-200 font-medium" data-testid="summary-interests">
                {interestsList}
              </span>
              . Thank you!
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-ink-700">
              <div data-testid="summary-meta-name">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Name</p>
                <p className="text-slate-300 font-medium text-sm">
                  {profile.firstName} {profile.lastName}
                </p>
              </div>
              <div data-testid="summary-meta-age">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Age</p>
                <p className="text-slate-300 font-medium text-sm">{age} years</p>
              </div>
              <div data-testid="summary-meta-occupation">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Role</p>
                <p className="text-slate-300 font-medium text-sm">{profile.occupation}</p>
              </div>
              <div data-testid="summary-meta-dob">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Born</p>
                <p className="text-slate-300 font-medium text-sm">{profile.dob}</p>
              </div>
            </div>

            {/* Interests chips */}
            <div className="mt-6" data-testid="summary-interests-chips">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 bg-ink-800 border border-ink-600 rounded-full px-3 py-1 text-xs font-mono text-slate-400"
                    data-testid={`summary-interest-chip-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="w-1 h-1 bg-neon-600 rounded-full" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-ink-700">
              <button
                onClick={() => navigate('/profile')}
                className="btn-ghost flex-1"
                data-testid="summary-edit-button"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-primary flex-1"
                data-testid="summary-logout-button"
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-ink-600 text-xs font-mono">QA SANDBOX — TRAINING PLATFORM</p>
      </div>
    </div>
  );
}
