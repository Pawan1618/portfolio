import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Layers, Cpu, Database, Smartphone, GraduationCap, Trophy, ChevronRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// ----------------------------------------------------
// AMAZING INTERACTIVE BACKGROUND COMPONENT
// ----------------------------------------------------
function InteractiveBackground() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Spotlight revealing detailed dots around the cursor
  const spotMask = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black, transparent 80%)`;
  // Focused intense glow centered on cursor
  const glowMask = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, black, transparent 100%)`;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#09090b]">
      {/* 1. Base dim grid across the whole screen */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* 2. Interactive Dot Pattern revealed by Mouse Cursor */}
      <motion.div 
        className="absolute inset-0 z-10 bg-dot-pattern mix-blend-screen opacity-100"
        style={{ WebkitMaskImage: spotMask, maskImage: spotMask }}
      />
      
      {/* 3. Intense Ambient Core Cursor Glow */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500/40 to-pink-500/40 mix-blend-color-dodge opacity-100 blur-[80px]"
        style={{ WebkitMaskImage: glowMask, maskImage: glowMask }}
      />
    </div>
  );
}

// ----------------------------------------------------
// 3D HOVER TILT CARD COMPONENT
// ----------------------------------------------------
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High stiffness for snappy but smooth 3D tilting
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of mouse relative to the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage range: -0.5 to 0.5
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className={`preserve-3d ${className}`}
    >
      <div 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30">
      
      {/* Custom Magic Interactive Background */}
      <InteractiveBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:px-12 sm:py-32">
        
        {/* HERO SECTION */}
        <motion.section 
          className="min-h-[85vh] flex flex-col justify-center items-start pt-10"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <TiltCard>
            <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border-white/10 text-sm font-medium text-indigo-300 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              Available for new projects & roles
            </motion.div>
          </TiltCard>

          <TiltCard>
            <motion.h1 
              variants={fadeIn}
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl"
            >
              Hi, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Pawan Singh.
              </span>
            </motion.h1>
          </TiltCard>

          <TiltCard>
            <motion.p variants={fadeIn} className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-12 font-light drop-shadow-md">
              A passionate Full-Stack Software Engineer building scalable, intuitive, and modern digital experiences. Specializing in <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Next.js</span>, and <span className="text-white font-medium">Flutter</span>.
            </motion.p>
          </TiltCard>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-5">
            <TiltCard>
              <a href="mailto:Pawan.singh23@lpu.in" className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Get In Touch
              </a>
            </TiltCard>
            <div className="flex items-center gap-4 ml-4">
              <TiltCard><SocialLink href="https://github.com/pawansingh" icon={<Github size={24} />} /></TiltCard>
              <TiltCard><SocialLink href="https://linkedin.com/in/pawansingh" icon={<Linkedin size={24} />} /></TiltCard>
              <TiltCard><SocialLink href="mailto:Pawan.singh23@lpu.in" icon={<Mail size={24} />} /></TiltCard>
            </div>
          </motion.div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          className="py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <TiltCard>
            <motion.div variants={fadeIn} className="flex flex-col gap-2 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">Technical Arsenal</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            </motion.div>
          </TiltCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TiltCard><SkillNode icon={<Code2 className="text-indigo-400"/>} title="Languages" skills={["C++", "JavaScript", "TypeScript", "Python", "Dart", "SQL"]} /></TiltCard>
            <TiltCard><SkillNode icon={<Layers className="text-purple-400"/>} title="Frontend" skills={["React 19", "Next.js 16", "Tailwind CSS", "Redux", "Framer"]} /></TiltCard>
            <TiltCard><SkillNode icon={<Smartphone className="text-pink-400"/>} title="Mobile" skills={["Flutter", "Dart", "Material 3", "Firebase"]} /></TiltCard>
            <TiltCard><SkillNode icon={<Database className="text-blue-400"/>} title="Backend" skills={["Node.js", "Express", "Firebase", "Supabase", "REST"]} /></TiltCard>
            <TiltCard><SkillNode icon={<Cpu className="text-emerald-400"/>} title="Tools & DevOps" skills={["Docker", "Git", "GitHub Actions", "Postman"]} /></TiltCard>
            <TiltCard><SkillNode icon={<Layers className="text-orange-400"/>} title="Core CS Concs." skills={["Data Structures", "Algorithms", "DBMS", "OS", "CN"]} /></TiltCard>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          className="py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <TiltCard>
            <motion.div variants={fadeIn} className="flex flex-col gap-2 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">Selected Works</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-2 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
            </motion.div>
          </TiltCard>

          <div className="flex flex-col gap-12">
            <TiltCard>
              <ProjectCase 
                title="Nutrition Tracker"
                date="Nov 2025"
                description="A deeply optimized, full-stack health monitoring application architected with Next.js App Router."
                features={[
                  "Implemented React Server Components mapping to a 40% reduction in page load times.",
                  "Conceptualized client data flow with TanStack Query and optimistic UI updates, cutting redundant requests by 60%.",
                  "Orchestrated a multi-stage Docker build minimizing production image size by 55%.",
                  "Established robust GitHub Actions CI/CD for automated testing & zero-downtime deployment."
                ]}
                tags={["Next.js", "TypeScript", "Supabase", "Docker", "Tailwind", "CI/CD"]}
                link="https://pawan1618.github.io/nutrition"
                image="/images/nutrition.png"
              />
            </TiltCard>

            <TiltCard>
              <ProjectCase 
                title="Grievance Management App"
                date="Jul 2025"
                description="Cross-platform complaint tracking system built for real-time reporting and administrative efficiency."
                features={[
                  "Built a cross-platform app using Flutter & Firebase for 24/7 real-time tracking.",
                  "Improved admin efficiency by 40% with secure, role-based dashboards.",
                  "Optimized multi-media handling with 5MB image uploads, increasing visual clarity.",
                  "Delivered an intuitive Material 3 UI reducing navigation time by 30%."
                ]}
                tags={["Flutter", "Firebase", "Firestore", "Provider", "Material 3"]}
                link="https://pawan1618.github.io/grievance_management_app/"
                image="/images/grievance.png"
              />
            </TiltCard>

            <TiltCard>
              <ProjectCase 
                title="OS Memory Tracker Visualizer"
                date="May 2025"
                description="An educational Python-based operating system memory visualizer with live simulation tracking."
                features={[
                  "Engineered a visualizer using PyQt5 & Matplotlib offering 1-2s update latency.",
                  "Simulated 50+ memory allocation algorithms with clear metrics.",
                  "Enabled live tracking of CPU, RAM, and process metrics.",
                  "Added interactive page/segment visualization to boost learning comprehension."
                ]}
                tags={["Python", "PyQt5", "Matplotlib", "OS Concepts"]}
                link="https://github.com/Pawan1618/Real-timeMemoryResourceAllocationTracker"
                image="/images/memory.png"
              />
            </TiltCard>
          </div>
        </motion.section>

        {/* EXPERIENCE / EDU / ACHIEVEMENTS */}
        <motion.section 
          className="py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Education */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <TiltCard>
                <motion.div variants={fadeIn} className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white drop-shadow-md">Education</h3>
                </motion.div>
              </TiltCard>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.2rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                <TimelineItem 
                  title="B.Tech - CSE"
                  subtitle="Lovely Professional University"
                  date="2023 - Present"
                  grade="CGPA: 8.1"
                  alignRight={false}
                />
                <TimelineItem 
                  title="Intermediate"
                  subtitle="Swami Prakashanand Sen. Sec."
                  date="2022 - 2023"
                  grade="80%"
                  alignRight={true}
                />
                <TimelineItem 
                  title="Matriculation"
                  subtitle="Imperial Public School"
                  date="2019 - 2020"
                  grade="90.8%"
                  alignRight={false}
                />
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
               <TiltCard>
                <motion.div variants={fadeIn} className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <Trophy size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white drop-shadow-md">Milestones</h3>
                </motion.div>
               </TiltCard>

              <div className="space-y-6">
                <TiltCard>
                  <MilestoneCard 
                    title="Problem Solving Excellence"
                    desc="Solved 500+ coding problems across LeetCode, GFG & Codeforces. Earned top badges on LeetCode and HackerRank."
                  />
                </TiltCard>
                <TiltCard>
                  <MilestoneCard 
                    title="Competitive Programming"
                    desc="Reached a peak LeetCode contest rating of 1415, demonstrating strong algorithm intuition under time constraints."
                  />
                </TiltCard>
                <TiltCard>
                  <MilestoneCard 
                    title="Certifications"
                    desc="Master Generative AI & Tools (Udemy) • Mobile App Dev using Flutter (CipherSchools) • Cloud Computing (NPTEL)"
                  />
                </TiltCard>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* CONTACT SECTION */}
        <motion.section 
          className="py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <TiltCard cursorOffset="none">
            <div className="glass-panel p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-indigo-500/10 border border-indigo-500/20">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-50 pointer-events-none" />
              <div className="relative z-10" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
                  Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">extraordinary.</span>
                </h2>
                <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                  I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                </p>
                <div style={{ transform: "translateZ(50px)" }}>
                  <a href="mailto:Pawan.singh23@lpu.in" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-indigo-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                    <Mail size={24} /> Say Hello
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.section>

        {/* FOOTER */}
        <motion.footer 
          className="pt-10 pb-10 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <TiltCard><p className="text-zinc-500 text-sm font-medium">© {new Date().getFullYear()} Pawan Singh. All rights reserved.</p></TiltCard>
          <TiltCard><p className="text-zinc-500 text-sm flex items-center gap-2 font-medium">Built with <span className="text-indigo-400">React</span> & <span className="text-indigo-400">Tailwind</span></p></TiltCard>
        </motion.footer>

      </div>
    </div>
  );
}

// Sub Components

function SocialLink({ href, icon }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="p-3 rounded-full glass-card text-zinc-300 hover:text-white hover:bg-white/10 transition-colors shadow-lg shadow-black/20 block"
    >
      {icon}
    </a>
  );
}

function SkillNode({ icon, title, skills }) {
  return (
    <motion.div variants={fadeIn} className="glass-card p-6 h-full rounded-2xl group shadow-2xl shadow-black/20">
      <div className="flex items-center gap-4 mb-5" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <h4 className="text-xl font-bold tracking-tight text-white">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1.5 text-xs font-medium tracking-wide rounded-lg bg-white/5 text-zinc-300 border border-white/10">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCase({ title, date, description, features, tags, link, image }) {
  return (
    <motion.div variants={fadeIn} className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group shadow-2xl shadow-black/30">
      {/* Subtle hover gradient inner shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-center lg:items-center" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        
        {image && (
          <div className="w-[100%] sm:w-[500px] lg:w-[400px] xl:w-[480px] shrink-0 flex items-center justify-center rounded-2xl glass-card border border-white/5 bg-[#000000] p-0 overflow-hidden shadow-2xl" style={{ transform: "translateZ(20px)" }}>
            <img src={image} alt={title} className="w-[100%] h-auto max-h-[350px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100 drop-shadow-lg" />
          </div>
        )}

        <div className="flex-1 flex flex-col relative z-20" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
            <a href={link} target="_blank" rel="noreferrer" className="block relative z-[100] cursor-pointer pointer-events-auto">
              <h3 className="text-3xl font-extrabold tracking-tight text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 transition-all duration-300">{title}</h3>
            </a>
            <span className="text-indigo-300/80 font-medium text-sm px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">{date}</span>
          </div>
          
          <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium" style={{ transform: "translateZ(10px)" }}>
            {description}
          </p>

          <ul className="space-y-3 mb-8 flex-1" style={{ transform: "translateZ(20px)" }}>
            {features.map((feature, i) => (
              <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed text-sm">
                <ChevronRight className="shrink-0 text-indigo-400 mt-1" size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10" style={{ transform: "translateZ(30px)" }}>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="px-4 py-1.5 text-xs font-bold tracking-wide rounded-full bg-white/5 text-white border border-white/10">
                  {tag}
                </span>
              ))}
            </div>

            <a href={link} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-bold hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-[100] cursor-pointer pointer-events-auto">
              Explore <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ title, subtitle, date, grade, alignRight }) {
  return (
    <TiltCard className="w-full">
      <div className={`relative flex items-center justify-between group w-full ${alignRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        
        {/* Invisible Spacer to balance the layout on desktop */}
        <div className="hidden md:block w-[calc(50%-2.5rem)]" />

        {/* The Dot (absolutely centered on desktop) */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#09090b] bg-indigo-500 group-hover:bg-pink-400 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] group-hover:scale-125 transition-all duration-300 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 shadow-lg" />
        
        {/* The Content Card (swaps sides automatically based on the flex direction) */}
        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 rounded-3xl shadow-xl shadow-black/20 text-left">
          <div className="flex flex-col gap-1 mb-3" style={{ transform: "translateZ(20px)" }}>
            <span className="text-indigo-400 text-sm font-bold tracking-widest uppercase">{date}</span>
            <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h4>
          </div>
          <p className="text-zinc-400 mb-4 font-medium" style={{ transform: "translateZ(10px)" }}>{subtitle}</p>
          <div className="inline-block px-4 py-1.5 rounded-lg bg-white/5 text-zinc-100 text-sm font-bold tracking-wide border border-white/10" style={{ transform: "translateZ(30px)" }}>
            {grade}
          </div>
        </div>
        
      </div>
    </TiltCard>
  );
}

function MilestoneCard({ title, desc }) {
  return (
    <motion.div variants={fadeIn} className="glass-card p-6 md:p-8 rounded-3xl border-l-[6px] border-l-pink-500 shadow-xl shadow-black/20 h-full">
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 drop-shadow-sm">{title}</h4>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-medium" style={{ transform: "translateZ(20px)" }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
