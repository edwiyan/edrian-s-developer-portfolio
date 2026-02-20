import { ExternalLink, Github, ArrowUpRight, Calendar, Code } from "lucide-react";
import { useState, useEffect } from "react";
import nuevaEcija from "../images/nuevaecija.png";
import capstone from "../images/928.png";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  year?: string;
  status?: "completed" | "in-progress" | "archived";
}

const ProjectsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      title: "Nueva Ecija Explorer",
      description: "A comprehensive tourism web platform showcasing Nueva Ecija's hidden gems, featuring interactive guides to tourist spots, local delicacies, and travel resources with real-time updates.",
      image: nuevaEcija,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      liveUrl: "https://nuevaecijaexplorer.com/",
      githubUrl: "https://github.com/edwiyan/edrian-s-developer-portfolio", // Add if available
      year: "2025",
      status: "completed",
    },
    {
      title: "928 Credit Concept Lending Management System",
      description: "Enterprise-level lending management system that streamlines loan processing, payment tracking, customer management, and automated reporting with advanced security features.",
      image: capstone,
      technologies: ["PHP", "Bootstrap", "MySQL", "JavaScript"],
      liveUrl: "",
      githubUrl: "", // Add if available
      year: "2025",
      status: "completed",
    },
  ];

  const getStatusBadge = (status: Project["status"]) => {
    const statusConfig = {
      completed: { text: "Completed", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
      "in-progress": { text: "In Progress", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
      archived: { text: "Archived", className: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
    };
    
    const config = statusConfig[status || "completed"];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config.className}`}>
        {config.text}
      </span>
    );
  };

  return (
    <section id="projects" className="relative py-24 bg-secondary/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Code size={16} />
            Featured Work
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-accent">
            My <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent max-w-3xl mx-auto leading-relaxed">
            Explore my latest projects that showcase modern development practices, user-centered design, 
            and scalable architecture solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-dark dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden bg-gradient-to-r from-transparent via-border to-transparent transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                animationDelay: `${index * 200}ms`,
                boxShadow: hoveredCard === index 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                  : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Project Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {getStatusBadge(project.status)}
                </div>

                {/* Year Badge */}
                {project.year && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                )}

                {/* Hover Overlay with Quick Actions */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-colors transform hover:scale-105"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors transform hover:scale-105"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github size={18} />
                      Code
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-3 text-white dark:text-white group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white dark:text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:text-primary transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-4">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group/link"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink size={16} />
                        View Project
                        <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-600 font-medium">
                        <ExternalLink size={16} />
                        Private Project
                      </span>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary font-medium transition-colors"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github size={16} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-black font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Let's Connect
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
