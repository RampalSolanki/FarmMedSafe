export const ANIMAL_TYPES = [
  { value: 'cow', label: '🐄 Cow', icon: '🐄' },
  { value: 'buffalo', label: '🐃 Buffalo', icon: '🐃' },
  { value: 'goat', label: '🐐 Goat', icon: '🐐' },
  { value: 'sheep', label: '🐑 Sheep', icon: '🐑' },
  { value: 'other', label: '🐾 Other', icon: '🐾' }
];

export const MEDICINE_CATEGORIES = [
  { value: 'antibiotic', label: '💊 Antibiotic', color: 'red' },
  { value: 'painkiller', label: '💉 Painkiller', color: 'orange' },
  { value: 'vaccine', label: '🩺 Vaccine', color: 'green' },
  { value: 'vitamin', label: '🍎 Vitamin', color: 'blue' },
  { value: 'dewormer', label: '🐛 Dewormer', color: 'purple' },
  { value: 'other', label: '📦 Other', color: 'gray' }
];

export const ROUTES = {
  oral: '💊 Oral',
  injection: '💉 Injection',
  topical: '🧴 Topical',
  intravenous: '🩸 Intravenous'
};

export const VALIDATION_STATUS = {
  safe: { label: '✅ Safe', color: 'green', bg: 'bg-green-100', text: 'text-green-700' },
  warning: { label: '⚠️ Warning', color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  unsafe: { label: '🚫 Unsafe', color: 'red', bg: 'bg-red-100', text: 'text-red-700' }
};

export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me'
  },
  animals: {
    base: '/animals',
    getById: (id) => `/animals/${id}`
  },
  medicines: {
    catalog: '/medicines/catalog',
    entry: '/medicines/entry',
    history: '/medicines/history'
  },
  admin: {
    stats: '/admin/stats',
    farmers: '/admin/farmers',
    unsafeEntries: '/admin/unsafe-entries'
  }
};

export const APP_CONFIG = {
  name: 'FarmMedSafe',
  version: '1.0.0',
  description: 'Smart Livestock Medicine Tracking System',
  company: 'SIH 2025'
};