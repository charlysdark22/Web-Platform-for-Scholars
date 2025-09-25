import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

const THEMES = [
  { value: 'light', labelKey: 'light' },
  { value: 'dark', labelKey: 'dark' },
];

export default function Settings() {
  const { lang, setLang } = useLanguage();
  const [theme, setTheme] = useState('light');
  const [saved, setSaved] = useState(false);
  const t = translations[lang];

  // Cambia el idioma global
  const handleLanguageChange = (value: string) => {
    setLang(value);
  };

  // Cambia el tema (mock, solo frontend)
  const handleThemeChange = (value: string) => {
    setTheme(value);
    document.documentElement.classList.toggle('dark', value === 'dark');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{t.settings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block font-medium mb-2">{t.language}</label>
              <Select value={lang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">{t.theme}</label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t.selectTheme} />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(theme => (
                    <SelectItem key={theme.value} value={theme.value}>{t[theme.labelKey]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave}>{t.save}</Button>
            {saved && <div className="text-green-600 mt-2">{t.saved}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
