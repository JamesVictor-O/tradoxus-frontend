'use client';

import { LanguageSwitcher } from './LanguageSwitcher';

export function LanguageSwitcherWrapper() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>
  );
} 