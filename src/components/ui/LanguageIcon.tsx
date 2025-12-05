interface LanguageIconProps {
  language: string;
  className?: string;
}

export function LanguageIcon({ language, className }: LanguageIconProps) {
  let iconName = language.toLowerCase().replace('#', 'sharp').replace('++', 'pp');

  if (language === 'C#') {
    iconName = 'cs';
  }

  return (
    <img
      src={`https://skillicons.dev/icons?i=${iconName}`}
      alt={`${language} icon`}
      className={`w-full h-full ${className}`}
      title={language}
    />
  );
}