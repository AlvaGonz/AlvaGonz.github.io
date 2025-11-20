import { profile } from '../content/profile';
import { skills } from '../content/skills';
import { ProjectCard } from './ProjectCard';
import { SkillPills } from './SkillPills';
import { ExperienceTimeline } from './ExperienceTimeline';
import { EducationSection } from './EducationSection';
import { CertificationsSection } from './CertificationsSection';
import { OrganizationsSection } from './OrganizationsSection';
import { Contact } from './Contact';
import projectsData from '../data/generated/pinned.json';
import { Navbar } from './layout/Navbar';
import { AboutFormal } from './sections/AboutFormal';
import { Roadmap } from './sections/Roadmap';
import { useGitHubStats } from '@/hooks/useGitHubStats';

export function FormalView(): JSX.Element {
  const { data: githubData } = useGitHubStats();

  // Merge local project data with live GitHub data where possible
  const displayProjects = githubData?.repos.length 
    ? githubData.repos.slice(0, 6).map(repo => {
        // Find matching local project to preserve manual descriptions/colors if we wanted, 
        // but for "Formal" view, live data is usually better.
        // However, our local data has specific descriptions we might like.
        // Let's stick to the fetched data for freshness, but maybe map colors if we had a map.
        return {
          name: repo.name,
          description: repo.description || '',
          url: repo.url,
          stars: repo.stars,
          forks: repo.forks,
          language: repo.language ? { name: repo.language, color: '#3178C6' } : null, // Default color
          updatedAt: repo.updatedAt
        };
      })
    : projectsData.projects;

  return (
    <div className="min-h-screen p-8 md:p-16 bg-primary-rich-black">
      <Navbar />
      <div className="max-w-5xl mx-auto space-y-24 pt-16">
        {/* Profile / Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <img
            src={profile.avatar}
            alt={`${profile.name} profile`}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary-mountain-meadow shadow-scroll-modern"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary-anti-flash-white">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-mountain-meadow mb-4">
              {profile.role}
            </p>
            <p className="text-lg text-secondary-pistachio max-w-2xl">
              {profile.tagline}
            </p>
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

        {/* Roadmap Section */}
        <Roadmap variant="formal" />

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
            Skills & Technologies
          </h2>
          <SkillPills skills={skills} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
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
        </section>
      </div>
    </div>
  );
}
