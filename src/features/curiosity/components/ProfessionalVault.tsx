import { Rocket, Library, Folder, Radio, Building2 } from 'lucide-react';
import { experience } from '@/content/experience';
import { education, certifications, organizations } from '@/content/education';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import { ProjectSatellite } from './ProjectSatellite';

export function ProfessionalVault() {
  const { projects, loading } = useGithubProjects();

  return (
    <section id="professional-vault" className="py-12 md:py-20">
      <FadeInOnScroll variant="fadeUp">
        <h2 className="text-3xl md:text-4xl font-curiosity-display mb-12 text-curiosity-primary border-b-2 border-curiosity-secondary/30 pb-2 inline-block">
          Professional Vault
        </h2>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Missions (Experience) */}
        <div className="space-y-6 lg:col-span-1">
          <h3 className="text-lg font-curiosity-display text-curiosity-secondary flex items-center gap-2">
            <Rocket className="w-5 h-5 text-curiosity-primary" />
            Missions
          </h3>
          <div className="space-y-4">
            {experience.slice(0, 3).map((exp, i) => (
              <FadeInOnScroll key={exp.id} delay={i * 0.1} variant="slideLeft">
                <div className="bg-curiosity-bg/40 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-curiosity-primary/30 transition-all group">
                  <h4 className="text-sm font-curiosity-display text-curiosity-text group-hover:text-curiosity-primary transition-colors">
                    {exp.role}
                  </h4>
                  <p className="text-[15px] text-curiosity-text-secondary font-mono opacity-60 mb-2">@ {exp.company}</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills?.slice(0, 3).map(skill => (
                      <span key={skill} className="text-[12px] px-1.5 py-0.5 rounded bg-white/5 text-curiosity-text-secondary border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        {/* Foundational Hubs (Education) */}
        <div className="space-y-6 lg:col-span-1">
          <h3 className="text-lg font-curiosity-display text-curiosity-secondary flex items-center gap-2">
            <Library className="w-5 h-5 text-curiosity-secondary" />
            Hubs
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <FadeInOnScroll key={edu.id} delay={i * 0.1} variant="slideLeft">
                <div className="bg-curiosity-bg/40 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-curiosity-secondary/30 transition-all group">
                  <h4 className="text-sm font-curiosity-display text-curiosity-text group-hover:text-curiosity-secondary transition-colors leading-tight">
                    {edu.school}
                  </h4>
                  <p className="text-[15px] text-curiosity-text-secondary font-curiosity-body mt-1">{edu.degree}</p>
                  <p className="text-[12px] font-mono text-curiosity-text-secondary/40 mt-2 italic">{edu.period}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        {/* Project Satellites (Visual Grid) */}
        <div className="space-y-6 lg:col-span-2">
          <h3 className="text-lg font-curiosity-display text-curiosity-accent flex items-center gap-2">
            <Folder className="w-5 h-5 text-curiosity-accent" />
            Project Satellites
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[200px] bg-curiosity-bg/20 animate-pulse rounded-2xl border border-white/5" />
              ))
            ) : (
              projects.slice(0, 4).map((project, i) => (
                <ProjectSatellite key={project.id} project={project} index={i} />
              ))
            )}
          </div>
          {projects.length > 4 && (
            <div className="flex justify-center mt-4">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                + {projects.length - 4} additional units detected in archive
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Signal Decryptions (Certifications - Small Grid) */}
      <div className="mt-12 space-y-6">
        <h3 className="text-lg font-curiosity-display text-curiosity-secondary flex items-center gap-2">
          <Radio className="w-5 h-5 text-curiosity-highlight" />
          Decryptions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {certifications.map((cert, i) => (
            <FadeInOnScroll key={cert.id} delay={i * 0.05} variant="scale">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-curiosity-bg/40 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-curiosity-primary/40 transition-all hover:-translate-y-1 group"
              >
                <h4 className="text-[15px] font-curiosity-display text-curiosity-text-secondary group-hover:text-curiosity-primary transition-colors line-clamp-2 leading-snug">
                  {cert.name}
                </h4>
                <p className="text-[12px] text-white/20 mt-1">{cert.issuer}</p>
              </a>
            </FadeInOnScroll>
          ))}
        </div>
        {/* Organizations (Foundational Nodes) */}
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-curiosity-display text-curiosity-secondary/60 flex items-center gap-2">
            <Building2 className="w-4 h-4 opacity-50" /> Nodes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizations.map((org, i) => (
              <FadeInOnScroll key={org.id} delay={i * 0.1} variant="scale">
                <div className="bg-curiosity-bg/20 backdrop-blur-sm p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-all">
                  <p className="text-[15px] font-curiosity-display text-curiosity-text-secondary">{org.name}</p>
                  <p className="text-[12px] font-mono text-white/20">{org.period}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
