import type { Profile } from '../content/types';

interface ContactProps {
  profile: Profile;
}

export function Contact({ profile }: ContactProps): JSX.Element {
  return (
    <div className="bg-primary-dark-green rounded-xl p-8 border border-secondary-pine">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
        Contact
      </h2>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 rounded-lg hover:bg-[#0077b5]/20 transition-all font-medium flex items-center gap-3 group"
          aria-label="LinkedIn profile"
        >
          <img 
            src="https://skillicons.dev/icons?i=linkedin" 
            alt="LinkedIn" 
            className="w-6 h-6 group-hover:scale-110 transition-transform" 
          />
          <span>LinkedIn</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/5 text-primary-anti-flash-white border border-white/10 rounded-lg hover:bg-white/10 transition-all font-medium flex items-center gap-3 group"
          aria-label="GitHub profile"
        >
          <img 
            src="https://skillicons.dev/icons?i=github" 
            alt="GitHub" 
            className="w-6 h-6 group-hover:scale-110 transition-transform bg-white rounded-full" 
          />
          <span>GitHub</span>
        </a>
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all font-medium flex items-center gap-3 group"
            aria-label="Send email"
          >
            <img 
              src="https://skillicons.dev/icons?i=gmail" 
              alt="Email" 
              className="w-6 h-6 group-hover:scale-110 transition-transform" 
            />
            <span>Email</span>
          </a>
        )}
      </div>
    </div>
  );
}
