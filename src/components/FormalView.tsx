import { ProjectCard } from './ProjectCard';
import { profile } from '../content/profile';
import { skills } from '../content/skills';


import { SkillPills } from './SkillPills';
import { ExperienceTimeline } from './ExperienceTimeline';
import { EducationSection } from './EducationSection';
import { CertificationsSection } from './CertificationsSection';
import { OrganizationsSection } from './OrganizationsSection';
import { Contact } from './Contact';
import { AboutFormal } from './sections/AboutFormal';
import { LeetcodeStats } from './formal/LeetcodeStats';
import { GithubActivity } from './formal/GithubActivity';
import { DailyVerse } from './formal/DailyVerse';
import { TopLanguages } from './github/TopLanguages';
import { DuolingoWidget } from './formal/DuolingoWidget';
import { useEffect, useState } from 'react';
import { fetchPinnedProjects, fetchAllPublicRepos, validateToken, GitHubRepository } from '../lib/github-client';

export function FormalView(): JSX.Element {
  const [projects, setProjects] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        // 1. Validar token (solo en desarrollo)
        if (import.meta.env.DEV) {
          await validateToken();
        }

        // 2. Intentar obtener repos pinneados
        let repos = await fetchPinnedProjects();

        // 3. Si no hay pinneados, obtener todos los repos
        if (repos.length === 0) {
          console.log('ℹ️ No pinned repositories found, fetching all public repos...');
          repos = await fetchAllPublicRepos(6);
        }

        setProjects(repos);

        // Log éxito
        if (repos.length > 0) {
          console.log(`✅ Loaded ${repos.length} repositories from GitHub`);
        } else {
          setError('No repositories found');
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load projects: ${errorMsg}`);
        console.error('❌ Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Rendering logic
  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="projects-error">
        <p>{error}</p>
        <p className="text-sm">
          Make sure VITE_GITHUB_TOKEN is set in .env.local
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return <div className="projects-empty">No projects available</div>;
  }

  return (
    <div className="min-h-screen p-8 md:p-16 bg-primary-rich-black">
      <div className="max-w-5xl mx-auto space-y-24 pt-8">
        {/* Profile / Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <img
            src={profile.avatar_formal}
            alt={`${profile.name} profile`}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary-mountain-meadow shadow-scroll-modern"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary-anti-flash-white">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-mountain-meadow mb-4">{profile.role}</p>
            <p className="text-lg text-secondary-pistachio max-w-2xl">{profile.tagline}</p>
            <div className="flex items-center gap-2 mt-2 text-md text-secondary-stone justify-center md:justify-start">
              <img
                src="https://flagcdn.com/w40/do.png"
                srcSet="https://flagcdn.com/w80/do.png 2x"
                width="20"
                height="15"
                alt="Dominican Republic Flag"
                className="rounded-sm shadow-sm opacity-80"
              />
              <span>{profile.location}</span>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutFormal />

        {/* Experience Section */}
        <section id="experience">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Experience
          </h2>
          <ExperienceTimeline />
        </section>

        {/* Education Section */}
        <section id="education">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Education
          </h2>
          <EducationSection />
        </section>

        {/* Certifications Section */}
        <section id="certifications">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Licenses & Certifications
          </h2>
          <CertificationsSection />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Skills
          </h2>
          <SkillPills skills={skills} />
        </section>

        {/* Spoken Languages Section */}
        <section id="spoken-languages">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Languages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-rich-black/50 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇩🇴</span>
                <div>
                  <h3 className="font-bold text-white">Spanish</h3>
                  <p className="text-sm text-secondary-stone">Native</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary-mountain-meadow/20 text-primary-mountain-meadow text-xs font-bold border border-primary-mountain-meadow/30">
                Native
              </div>
            </div>
            <DuolingoWidget />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Projects
          </h2>
          {loading && <div className="projects-loading">Loading projects...</div>}
          {error && (
            <div className="projects-error">
              <p>{error}</p>
              <p className="text-sm">
                Make sure VITE_GITHUB_TOKEN is set in .env.local
              </p>
            </div>
          )}
          {projects.length === 0 && !loading && !error && <div className="projects-empty">No projects available</div>}
          {!loading && !error && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* Top Languages Section */}
        <section id="github-stats">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Top Languages
          </h2>
          <TopLanguages />
        </section>

        {/* Activity & Achievements Section */}
        <section id="activity-achievements">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Activity & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LeetcodeStats />
            <GithubActivity />
          </div>
        </section>

        {/* Organizations Section (Penultimate) */}
        <section id="organizations">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Organizations
          </h2>
          <OrganizationsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <Contact profile={profile} />
          <DailyVerse />
        </section>
      </div>
    </div>
  );
}
