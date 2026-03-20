import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
};

export default function Layout({ children, width = 'md' }: LayoutProps) {
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

      {/* Glow blob */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(78,255,168,0.06) 0%, transparent 70%)',
        }}
      />

      <div className={`relative z-10 flex-1 flex items-center justify-center px-4 py-12`}>
        <div className={`w-full ${widthClasses[width]} animate-slide-up`}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-ink-600 text-xs font-mono">QA SANDBOX — TRAINING PLATFORM</p>
      </div>
    </div>
  );
}
