'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); // Always start with English
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side rendered
  useEffect(() => {
    setIsClient(true);
    // Clear any existing language preference to ensure clean state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('i18nextLng');
    }
  }, []);

  const currentLanguageObj = languages.find(lang => lang.code === currentLang) || languages[0];

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }

  // Handle language changes
  const handleLanguageChange = (languageCode: string) => {
    // Import i18n dynamically and change language
    import('@/i18n').then((module) => {
      const i18n = module.default;
      i18n.changeLanguage(languageCode);
      setCurrentLang(languageCode);
    });
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-2 py-1 bg-background hover:bg-accent transition-all duration-300"
        >
          <span className="text-lg">{currentLanguageObj.flag}</span>
          <span className="text-sm font-medium">
            {currentLanguageObj.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-background border border-border"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center gap-2 cursor-pointer hover:bg-accent",
              currentLang === language.code && "bg-accent text-accent-foreground"
            )}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 