import { motion } from 'framer-motion';
import { certifications } from '../content/education';

const getCertIcon = (name: string, issuer: string): JSX.Element => {
  const iconSize = 'w-10 h-10 rounded-md';

  if (name.includes('C#'))
    return <img src="https://skillicons.dev/icons?i=cs" alt="C#" className={iconSize} />;
  if (name.includes('JavaScript'))
    return <img src="https://skillicons.dev/icons?i=js" alt="JS" className={iconSize} />;
  if (name.includes('HTML'))
    return <img src="https://skillicons.dev/icons?i=html" alt="HTML" className={iconSize} />;
  if (name.includes('CSS'))
    return <img src="https://skillicons.dev/icons?i=css" alt="CSS" className={iconSize} />;
  if (issuer.includes('Google'))
    return (
      <img
        src="https://go-skill-icons.vercel.app/api/icons?i=googleanalytics"
        alt="Google Analytics"
        className={iconSize}
      />
    );
  if (issuer.includes('freeCodeCamp'))
    return <img src="https://skillicons.dev/icons?i=github" alt="FCC" className={iconSize} />; // FCC often associated with GitHub repo activities or simple code icon
  if (name.includes('Remote Work')) return <span className="text-3xl">🌐</span>;

  return <span className="text-3xl">📜</span>;
};

export function CertificationsSection(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, index) => (
        <a
          key={cert.id}
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-primary-rich-black/60 p-6 rounded-xl border border-white/10 hover:border-primary-mountain-meadow/50 transition-all group flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="pr-4">
                <h4 className="text-lg font-bold text-primary-anti-flash-white group-hover:text-primary-mountain-meadow transition-colors">
                  {cert.name}
                </h4>
                <p className="text-secondary-pistachio">{cert.issuer}</p>
              </div>
              <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {getCertIcon(cert.name, cert.issuer)}
              </div>
            </div>

            <div className="text-sm text-secondary-stone mb-4 font-mono mt-auto">{cert.date}</div>

            {cert.credentialId && (
              <div className="text-xs text-secondary-stone/70 mb-4">
                Credential ID: {cert.credentialId}
              </div>
            )}

            {cert.skills && (
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-secondary-pistachio border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 4 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-secondary-stone">
                    +{cert.skills.length - 4} more
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </a>
      ))}
    </div>
  );
}
