import { profile } from '../content/profile';

export function HeroLegacy(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-primary-dark-green to-primary-rich-black border-b-4 border-[#2F5A78] transition-all duration-500">
      <section className="text-center py-4">
        <h1 className="text-2xl md:text-3xl font-semibold uppercase text-primary-anti-flash-white mb-2">
          {profile.name}
        </h1>
        <p className="text-lg md:text-xl font-medium text-primary-anti-flash-white mb-4">
          <strong>{profile.role}</strong>
        </p>
        <img
          src={profile.avatar}
          alt={`${profile.name} profile`}
          className="mx-auto h-24 md:h-32 rounded-full transition-transform duration-500 hover:scale-125 object-cover border-2 border-primary-mountain-meadow"
        />
        <hr className="border-t-2 border-primary-mountain-meadow my-4 w-3/4 mx-auto" />
      </section>
    </header>
  );
}

