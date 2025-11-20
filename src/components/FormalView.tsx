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

export function FormalView(): JSX.Element {
  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-5xl mx-auto">
        {/* Profile Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
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
              <p className="text-md text-secondary-stone mt-2 flex items-center justify-center md:justify-start gap-2">
                <img 
                  src="https://flagcdn.com/w20/do.png" 
                  srcSet="https://flagcdn.com/w40/do.png 2x" 
                  width="20" 
                  height="15" 
                  alt="Dominican Republic Flag" 
                  className="rounded-sm shadow-sm"
                />
                {profile.location}
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Experience
          </h2>
          <ExperienceTimeline />
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Education
          </h2>
          <EducationSection />
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Licenses & Certifications
          </h2>
          <CertificationsSection />
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Skills & Technologies
          </h2>
          <SkillPills skills={skills} />
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Organizations Section (Penultimate) */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-anti-flash-white border-b-2 border-primary-mountain-meadow pb-2">
            Organizations
          </h2>
          <OrganizationsSection />
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <Contact profile={profile} />
        </section>
      </div>
    </div>
  );
}
