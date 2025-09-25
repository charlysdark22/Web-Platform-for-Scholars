import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const defaultLang = localStorage.getItem('lang') || 'es';

const LanguageContext = createContext({
  lang: defaultLang,
  setLang: (lang: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState(defaultLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const setLang = (newLang: string) => {
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
