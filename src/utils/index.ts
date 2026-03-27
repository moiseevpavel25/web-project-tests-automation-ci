// ─── Сurrent date for all calculations ───────────────────────────
export const CURRENT_DATE = new Date();

// ─── localStorage keys ────────────────────────────────────────────────────────
export const LS_KEYS = {
  FORGOT_EMAIL: 'qa_forgot_email',
  PROFILE: 'qa_profile',
} as const;

// ─── Email validation ─────────────────────────────────────────────────────────
export type EmailError =
  | 'Please enter your email address.'
  | 'incorrect email format.'
  | 'Incorrect email address.';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): EmailError | null {
  if (!value.trim()) return 'Please enter your email address.';
  if (!EMAIL_REGEX.test(value)) return 'incorrect email format.';
  if (value !== 'test@test.com') return 'Incorrect email address.';
  return null;
}

export function validateForgotEmail(value: string): EmailError | null {
  if (!value.trim()) return 'Please enter your email address.';
  if (!EMAIL_REGEX.test(value)) return 'incorrect email format.';
  if (value !== 'test@test.com') return 'Incorrect email address.';
  return null;
}

// ─── Password validation ──────────────────────────────────────────────────────
export function validatePassword(value: string): string | null {
  if (!value) return 'Please enter your password.';
  if (value !== 'qwerty123') return 'Incorrect password.';
  return null;
}

// ─── Name validation ──────────────────────────────────────────────────────────
const NAME_REGEX = /^[A-Za-z-]{2,}$/;

export function validateName(
  value: string,
  field: 'First name' | 'Last name'
): string | null {
  if (!value.trim()) return `Please enter your ${field}.`;
  if (!NAME_REGEX.test(value)) return `Invalid ${field} format.`;
  return null;
}

// ─── Age calculation ──────────────────────────────────────────────────────────
export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const current = CURRENT_DATE;

  let age = current.getFullYear() - birth.getFullYear();

  const monthDiff = current.getMonth() - birth.getMonth();
  const dayDiff = current.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

// ─── Profile data type ────────────────────────────────────────────────────────
export interface ProfileData {
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  interests: string[];
}

export function saveProfile(data: ProfileData): void {
  localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify(data));
}

export function loadProfile(): ProfileData | null {
  const raw = localStorage.getItem(LS_KEYS.PROFILE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProfileData;
  } catch {
    return null;
  }
}
