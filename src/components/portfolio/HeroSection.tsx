import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
const HeroSection = () => {
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Main gradient orb */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 2,
        ease: "easeOut"
      }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{
        background: "radial-gradient(circle, hsl(0 85% 50% / 0.15) 0%, transparent 70%)"
      }} />
        
        {/* Floating orbs */}
        <motion.div animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute top-20 right-20 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
        <motion.div animate={{
        y: [20, -20, 20],
        x: [10, -10, 10]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center my-[80px]">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent">
              <Sparkles size={16} className="animate-pulse" />
              Front-End Developer
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
            <span className="text-gradient-light">Hi, I'm</span>
            <br />
            <span className="text-gradient">Edrian Christian</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            A passionate front-end developer specializing in building beautiful,
            responsive, and user-friendly web interfaces using{" "}
            <span className="text-foreground font-medium">React.js</span> and modern CSS frameworks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="#experience" className="btn-outline">
              View My Work
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="flex items-center justify-center gap-4">
            {[{
            icon: Github,
            href: "https://github.com",
            label: "GitHub"
          }, {
            icon: Linkedin,
            href: "https://linkedin.com",
            label: "LinkedIn"
          }, {
            icon: Mail,
            href: "mailto:edrian@example.com",
            label: "Email"
          }].map((social, index) => <motion.a key={social.label} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} whileHover={{
            scale: 1.1,
            y: -2
          }} whileTap={{
            scale: 0.95
          }} className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors duration-300" aria-label={social.label}>
                <social.icon size={20} />
              </motion.a>)}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 1
      }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.a href="#about" animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;