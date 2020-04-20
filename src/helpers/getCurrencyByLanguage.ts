const languages = {
  en: 'USD',
  uk: 'UAH',
  ru: 'RUR',
  fallback: 'EUR',
} as {[key: string]: string};

export default (lang: string): string => {
  const shortLang = lang.slice(0, 2);
  return languages[shortLang] || languages.fallback;
};
