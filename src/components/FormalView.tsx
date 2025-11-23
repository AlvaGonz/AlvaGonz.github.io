import { profile } from '../content/profile';
import { skills } from '../content/skills';
import type { Project } from '../content/types';
import { ProjectCard } from './ProjectCard';
import { SkillPills } from './SkillPills';
import { ExperienceTimeline } from './ExperienceTimeline';
import { EducationSection } from './EducationSection';
import { CertificationsSection } from './CertificationsSection';
import { OrganizationsSection } from './OrganizationsSection';
import { Contact } from './Contact';
import projectsData from '../data/generated/pinned.json';
import { AboutFormal } from './sections/AboutFormal';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { LeetcodeStats } from './formal/LeetcodeStats';
import { GithubActivity } from './formal/GithubActivity';
import { DailyVerse } from './formal/DailyVerse';
import { DuolingoWidget } from './formal/DuolingoWidget';

export function FormalView(): JSX.Element {
  const { data: githubData } = useGitHubStats();

  // Merge local project data with live GitHub data where possible
  const displayProjects = githubData?.topRepos.length
    ? githubData.topRepos.slice(0, 6).map(repo => {
      return {
        name: repo.name,
        description: repo.description || '',
        url: repo.url,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language ? { name: repo.language.name, color: repo.language.color } : null,
        updatedAt: repo.updatedAt
      };
    })
    : projectsData.projects.map((project: any) => ({
      name: project.name,
      description: project.description,
      url: project.url,
      stars: project.stars,
      forks: project.forks,
      language: project.language
        ? (typeof project.language === 'string'
          ? { name: project.language, color: '#3178C6' }
          : { name: project.language.name, color: project.language.color })
        : null,
      updatedAt: project.updatedAt
    }));

  return (
    <div className="min-h-screen p-8 md:p-16 bg-primary-rich-black">
      <div className="max-w-5xl mx-auto space-y-24 pt-8">
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
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((project: Project, index: number) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Top Languages Section */}
        <section id="languages">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Top Languages
          </h2>
          <div className="bg-primary-rich-black/40 rounded-2xl p-6 border border-white/5 backdrop-blur-sm flex justify-center md:justify-start">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=AlvaGonz&layout=compact&langs_count=7&theme=dark"
              alt="Top Languages"
              className="max-w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
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
