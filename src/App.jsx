import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Layers, Cpu, Database, Smartphone, GraduationCap, Trophy, ChevronRight, Network, Braces, BrainCircuit, HardDrive, Share2, Server, Menu, X } from 'lucide-react';
import { 
  SiCplusplus, SiJavascript, SiTypescript, SiPython, SiDart, 
  SiReact, SiNextdotjs, SiTailwindcss, SiRedux, SiFramer, 
  SiFlutter, SiFirebase, SiNodedotjs, SiExpress, SiSupabase, 
  SiDocker, SiGit, SiGithubactions, SiPostman 
} from 'react-icons/si';

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
// AMAZING INTERACTIVE BACKGROUND COMPONENT (Upgraded)
// ----------------------------------------------------
function InteractiveBackground() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const canvasRef = useRef(null);

  // Slow, smooth, overdamped spring to create a "liquid-like" lingering trail
  const springX = useSpring(mouseX, { stiffness: 20, damping: 15, mass: 2 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 15, mass: 2 });

  useEffect(() => {
    let animationFrameId;
    let points = [];
    
    // Canvas setup for Liquid Memory Trail
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener("resize", resize);
      resize();

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Age all points
        for (let i = 0; i < points.length; i++) {
          points[i].age += 1;
        }

        // Remove dead points (live for 120 frames = ~2 seconds)
        points = points.filter(p => p.age < 120);

        if (points.length > 1) {
          ctx.globalCompositeOperation = "screen";
          
          for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];
            
            const life = 1 - (p1.age / 120);
            
            if (life > 0) {
              // Outer liquid glow (Teal/Cyan trace)
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              
              ctx.lineWidth = 140 * life; // Massive liquid outer gradient spread
              ctx.strokeStyle = `rgba(45, 212, 191, ${life * 0.12})`; // Teal-400
              ctx.stroke();

              // Inner thick liquid core (Violet/Pink)
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineWidth = 50 * life;
              ctx.strokeStyle = `rgba(167, 139, 250, ${life * 0.25})`; // Violet-400
              ctx.stroke();
              
              // Tight brilliant center
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineWidth = 15 * life;
              ctx.strokeStyle = `rgba(244, 114, 182, ${life * 0.4})`; // Pink-400
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        // Add point with tiny offset randomness to break rigid lines
        points.push({ 
          x: e.clientX, 
          y: e.clientY, 
          age: 0 
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [mouseX, mouseY]);

  // Spotlight revealing detailed dots around the cursor - tighter & brighter
  const spotMask = useMotionTemplate`radial-gradient(450px circle at ${springX}px ${springY}px, black, transparent 80%)`;
  // Focused intense glow centered on cursor - vivid elegant gradient core
  const glowMask = useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, black, transparent 100%)`;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030305]">
      
      {/* Dynamic Ambient Breathing Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 80, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[130px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 80, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-600/20 blur-[130px]"
      />

      {/* 1. Base dim grid across the whole screen */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
      
      {/* 2. Liquid Memory Canvas Trail (subtle blurred tail) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] mix-blend-screen opacity-60 blur-[8px] md:blur-[12px]" />

      {/* 3. Interactive Dot Pattern revealed rapidly by Mouse Cursor */}
      <motion.div 
        className="absolute inset-0 z-10 bg-dot-pattern mix-blend-screen opacity-100"
        style={{ WebkitMaskImage: spotMask, maskImage: spotMask }}
      />
      
      {/* 4. Extremely Crisp Core Cursor Glow */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-500/70 via-purple-500/70 to-pink-500/70 mix-blend-screen opacity-100 blur-[50px]"
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
// NAVBAR COMPONENT
// ----------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Arsenal', href: '#skills' },
    { name: 'Works', href: '#projects' },
    { name: 'Journey', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#030305]/80 backdrop-blur-md border-b border-indigo-500/10 shadow-lg shadow-black/50' : 'py-6 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 hover:opacity-80 transition-opacity">
          PS.
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2.5 text-sm font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:-translate-y-0.5">
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#030305]/95 backdrop-blur-xl border-b border-indigo-500/10 py-4 px-6 flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center px-5 py-3 text-sm font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </motion.nav>
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
      
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:px-12 sm:py-32">
        
        {/* HERO SECTION */}
        <motion.section 
          id="home"
          className="min-h-[85vh] flex flex-col justify-center items-start pt-10 scroll-mt-24"
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
              <TiltCard><SocialLink href="https://github.com/Pawan1618" icon={<Github size={24} />} /></TiltCard>
              <TiltCard><SocialLink href="https://www.linkedin.com/in/pawansingh1618/" icon={<Linkedin size={24} />} /></TiltCard>
              <TiltCard><SocialLink href="mailto:Pawan.singh23@lpu.in" icon={<Mail size={24} />} /></TiltCard>
            </div>
          </motion.div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          id="skills"
          className="py-32 scroll-mt-24"
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
            <TiltCard><SkillNode icon={<Code2 className="text-indigo-400"/>} title="Languages" skills={[
              { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
              { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
              { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
              { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
              { name: "Dart", icon: <SiDart className="text-[#0175C2]" /> },
              { name: "SQL", icon: <Database className="text-zinc-400" /> }
            ]} /></TiltCard>
            <TiltCard><SkillNode icon={<Layers className="text-purple-400"/>} title="Frontend" skills={[
              { name: "React 19", icon: <SiReact className="text-[#61DAFB]" /> },
              { name: "Next.js 16", icon: <SiNextdotjs className="text-white" /> },
              { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
              { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
              { name: "Framer", icon: <SiFramer className="text-white" /> }
            ]} /></TiltCard>
            <TiltCard><SkillNode icon={<Smartphone className="text-pink-400"/>} title="Mobile" skills={[
              { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
              { name: "Dart", icon: <SiDart className="text-[#0175C2]" /> },
              { name: "Material 3", icon: <Layers className="text-[#E8F0FE]" /> },
              { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> }
            ]} /></TiltCard>
            <TiltCard><SkillNode icon={<Database className="text-blue-400"/>} title="Backend" skills={[
              { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
              { name: "Express", icon: <SiExpress className="text-white" /> },
              { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
              { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
              { name: "REST", icon: <Network className="text-zinc-400" /> }
            ]} /></TiltCard>
            <TiltCard><SkillNode icon={<Cpu className="text-emerald-400"/>} title="Tools & DevOps" skills={[
              { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
              { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
              { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
              { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> }
            ]} /></TiltCard>
            <TiltCard><SkillNode icon={<Layers className="text-orange-400"/>} title="Core CS Concs." skills={[
              { name: "Data Structures", icon: <Braces className="text-indigo-400" /> },
              { name: "Algorithms", icon: <BrainCircuit className="text-purple-400" /> },
              { name: "DBMS", icon: <HardDrive className="text-blue-400" /> },
              { name: "OS", icon: <Server className="text-emerald-400" /> },
              { name: "CN", icon: <Share2 className="text-pink-400" /> }
            ]} /></TiltCard>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects"
          className="py-32 scroll-mt-24"
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
          id="experience"
          className="py-32 scroll-mt-24"
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
          id="contact"
          className="py-32 scroll-mt-24"
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
          <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide rounded-lg bg-white/5 text-zinc-300 border border-white/10 overflow-hidden group/skill hover:bg-white/10 transition-colors">
            {skill.icon && <span className="text-[14px] opacity-90 group-hover/skill:opacity-100 group-hover/skill:scale-110 transition-transform duration-300">{skill.icon}</span>}
            <span>{skill.name || skill}</span>
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
