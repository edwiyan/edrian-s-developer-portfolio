import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "edrianreyes.basc@gmail.com",
      href: "mailto:edrianreyes.basc@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+63 963 366 1334",
      href: "tel:+639633661334",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bulacan, Philippines",
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium text-accent uppercase tracking-wider mb-6">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-light">Let's Work Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Info - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center space-y-8"
        >
          <div className="text-center max-w-lg">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Contact Information
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <div className="space-y-4 w-full max-w-md">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
