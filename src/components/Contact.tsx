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
          className="px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] transition-colors font-medium flex items-center gap-2"
          aria-label="LinkedIn profile"
        >
          <span>LinkedIn</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-secondary-stone text-white rounded-lg hover:bg-primary-dark-green transition-colors font-medium flex items-center gap-2"
          aria-label="GitHub profile"
        >
          <span>GitHub</span>
        </a>
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 bg-primary-mountain-meadow text-primary-rich-black rounded-lg hover:bg-primary-caribbean-green transition-colors font-medium"
            aria-label="Send email"
          >
            Email
          </a>
        )}
      </div>
    </div>
  );
}

