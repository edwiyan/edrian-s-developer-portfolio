import { ExternalLink, Github } from "lucide-react";
import nuevaEcija from "../images/nuevaecija.png";
import capstone from "../images/928.png";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Nueva Ecija Explorer",
      description: "A tourism web platform showcasing Nueva Ecija's hidden gems, featuring interactive guides to tourist spots, local delicacies, and travel resources.",
      image: nuevaEcija,
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://nuevaecijaexplorer.com/",
    },
    {
      title: "928 Credit Concept Lending Management System",
      description: "Another project showcasing your skills. Highlight the key features and your role in the development.",
      image: capstone,
      technologies: ["PHP", "Bootstrap", "MySQL"],
      liveUrl: "",
    },
    // {
    //   title: "Project Name 3",
    //   description: "Describe the impact of this project. What did you learn? What makes it special?",
    //   image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    //   technologies: ["Vue.js", "Firebase", "TailwindCSS"],
    //   liveUrl: "",
    // },
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;