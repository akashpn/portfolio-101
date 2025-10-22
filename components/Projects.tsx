import React, { forwardRef } from 'react';
import { SectionId, SectionTheme } from '../types';
import ProjectTile from './ProjectTile';
import AnimateOnScroll from './AnimateOnScroll';
import { IconCode, IconBrush, IconChart, IconMobile, IconMusic, IconVr, IconEye, IconCar, IconJoystick } from './Icons';
import { PROJECTS_DATA } from '../constants';

interface ProjectsProps {
    activeTheme: SectionTheme;
}

const ICONS: { [key: string]: React.ReactNode } = {
  code: <IconCode />,
  chart: <IconChart />,
  brush: <IconBrush />,
  mobile: <IconMobile />,
  music: <IconMusic />,
  vr: <IconVr />,
  eye: <IconEye />,
  car: <IconCar />,
  joystick: <IconJoystick />,
};

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ activeTheme }, ref) => {
  return (
    <section ref={ref} id={SectionId.Projects} className="min-h-screen flex flex-col justify-center py-20">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Projects</h2>
      </AnimateOnScroll>

      <AnimateOnScroll delay={150}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project) => (
              <div key={project.id} className="transition-all duration-500">
                   <a href={project.url} target="_blank" rel="noopener noreferrer" className="h-full block">
                      <ProjectTile
                          glowColor={activeTheme.glowColor}
                          icon={ICONS[project.icon] || <IconCode />}
                          title={project.name}
                          description={project.description}
                      />
                  </a>
              </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
});

export default Projects;