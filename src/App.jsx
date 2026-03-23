import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Layers, Cpu, Database, Smartphone, GraduationCap, Trophy, ChevronRight, Network, Braces, BrainCircuit, HardDrive, Share2, Server, Menu, X, Sun, Moon } from 'lucide-react';
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
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovering = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        isHovering.set(1);
      } else {
        isHovering.set(0);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Slower, organic springs for blobs
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 40, mass: 1 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 40, mass: 1 });
  
  // Extra delayed springs for secondary shapes
  const delayedX = useSpring(mouseX, { damping: 60, stiffness: 20, mass: 2 });
  const delayedY = useSpring(mouseY, { damping: 60, stiffness: 20, mass: 2 });

  const hoverSpring = useSpring(isHovering, { damping: 20, stiffness: 200 });

  // Floating Geometrics
  const floatY1 = useTransform(smoothY, [0, 1], ["-15%", "15%"]);
  const floatX1 = useTransform(smoothX, [0, 1], ["-15%", "15%"]);
  
  const floatY2 = useTransform(delayedY, [0, 1], ["10%", "-10%"]);
  const floatX2 = useTransform(delayedX, [0, 1], ["10%", "-10%"]);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#09090b] pointer-events-none" />
      
      {/* Abstract Glowing Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        {/* Blob 1 - Indigo */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-600/30 rounded-full blur-[100px] mix-blend-screen"
          style={{ x: useTransform(smoothX, [0, 1], ["-30%", "40%"]), y: useTransform(smoothY, [0, 1], ["-30%", "40%"]), scale: useTransform(hoverSpring, [0, 1], [1, 1.4]) }}
        />
        {/* Blob 2 - Pink */}
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] bg-pink-600/30 rounded-full blur-[100px] mix-blend-screen"
          style={{ x: useTransform(delayedX, [0, 1], ["40%", "-30%"]), y: useTransform(delayedY, [0, 1], ["30%", "-40%"]), scale: useTransform(hoverSpring, [0, 1], [1, 1.5]) }}
        />
        {/* Blob 3 - Purple */}
        <motion.div 
          className="absolute bottom-[-10%] left-1/3 w-[50vw] h-[30vw] bg-purple-600/20 rounded-[100%] blur-[120px] mix-blend-screen"
          style={{ x: useTransform(smoothX, [0, 1], ["20%", "-20%"]), y: useTransform(delayedY, [0, 1], ["-20%", "20%"]) }}
        />
      </div>

      {/* Floating Geometric Wireframes */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
         <motion.div 
           className="absolute top-[20%] right-[15%] w-32 h-32 border border-indigo-400"
           style={{ x: floatX1, y: floatY1, rotate: useTransform(smoothX, [0, 1], [0, 90]) }}
         />
         <motion.div 
           className="absolute bottom-[25%] left-[10%] w-48 h-48 border border-pink-400 rounded-full border-dashed"
           style={{ x: floatX2, y: floatY2, rotate: useTransform(delayedY, [0, 1], [0, -180]) }}
         />
         <motion.div 
           className="absolute top-[60%] right-[30%] w-24 h-24 border-2 border-purple-500"
           style={{ x: floatX1, y: floatY2, rotate: useTransform(smoothY, [0, 1], [45, 135]), borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
         />
      </div>
      
      {/* Tech Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
        style={{
          x: useTransform(mouseX, v => (v * (typeof window !== 'undefined' ? window.innerWidth : 1000)) - 16),
          y: useTransform(mouseY, v => (v * (typeof window !== 'undefined' ? window.innerHeight : 1000)) - 16),
          rotate: useTransform(hoverSpring, [0, 1], [0, 45]),
          scale: useTransform(hoverSpring, [0, 1], [1, 1.5])
        }}
      >
        <div className="w-full h-full border-2 border-white absolute transition-all duration-300" style={{ borderRadius: '4px' }} />
        <div className="w-1 h-1 bg-white absolute" />
        <motion.div 
          className="w-full h-full absolute border border-white opacity-50"
          style={{ rotate: 45, scale: useTransform(hoverSpring, [0, 1], [0, 1.2]), opacity: useTransform(hoverSpring, [0, 1], [0, 1]) }}
        />
      </motion.div>

      {/* Trailing Crosshair */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] hidden md:block transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        style={{
          x: useTransform(smoothX, v => (v * (typeof window !== 'undefined' ? window.innerWidth : 1000)) - 24),
          y: useTransform(smoothY, v => (v * (typeof window !== 'undefined' ? window.innerHeight : 1000)) - 24),
          scale: useTransform(hoverSpring, [0, 1], [1, 0.8]),
          color: useTransform(hoverSpring, [0, 1], ["rgba(255, 255, 255, 0.8)", "rgba(236, 72, 153, 1)"])
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" strokeWidth="2.5" fill="none">
          <line x1="50" y1="0" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="100" />
          <line x1="0" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="100" y2="50" />
          <circle cx="50" cy="50" r="40" strokeDasharray="10 10" className="animate-spin-slow" style={{ animationDuration: '6s' }} />
        </svg>
      </motion.div>
      
      {/* Global CSS to hide actual cursor when hovering custom cursor element */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, input, textarea, [role="button"] {
            cursor: none !important;
          }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); transform-origin: center; }
          to { transform: rotate(360deg); transform-origin: center; }
        }
      `}</style>
    </>
  );
}

// ----------------------------------------------------
// 3D HOVER TILT CARD COMPONENT
// ----------------------------------------------------
function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snappy but smooth 3D tilting
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Moderate tilt effect: 10 degrees max
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
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
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      className={className}
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} 
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
 }

 function CertificateCard({ title, issuer, date, imageSrc, link }) {
  return (
  <motion.div variants={fadeIn} className="glass-card p-6 md:p-8 rounded-3xl shadow-2xl shadow-black/20 h-full flex flex-col group relative overflow-hidden">
   {/* Subtle hover gradient */}
   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-colors duration-700 pointer-events-none" />

   {/* Image Preview */}
   <div className="w-full aspect-[4/3] rounded-xl bg-[#030305] overflow-hidden relative mb-6 border border-white/5 shadow-inner">
   <img 
    src={imageSrc} 
    alt={title}
    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
   />
   <a href={link} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
    <span className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
    Verify <ExternalLink size={16} />
    </span>
   </a>
   </div>
   
   {/* Content */}
   <div className="flex flex-col flex-1 relative z-20">
   <div className="flex justify-between items-start gap-4 mb-3">
    <h4 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-emerald-300 transition-colors">{title}</h4>
   </div>
   <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
    <span className="text-emerald-400 font-bold text-sm tracking-wide bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{issuer}</span>
    <span className="text-zinc-400 font-bold text-sm ml-auto">{date}</span>
   </div>
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
 const [theme, setTheme] = useState('dark');

 useEffect(() => {
   setTheme(document.body.classList.contains('light-theme') ? 'light' : 'dark');
   const handleScroll = () => {
     setScrolled(window.scrollY > 50);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const toggleTheme = () => {
   const newTheme = theme === 'dark' ? 'light' : 'dark';
   if (newTheme === 'light') {
     document.body.classList.add('light-theme');
   } else {
     document.body.classList.remove('light-theme');
   }
   setTheme(newTheme);
 };

 const navLinks = [
 { name: 'Home', href: '#home' },
 { name: 'About', href: '#about' },
 { name: 'Arsenal', href: '#skills' },
 { name: 'Works', href: '#projects' },
 { name: 'Certificates', href: '#certifications' },
 { name: 'Milestones', href: '#experience' },
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
 <a href="#home" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 transition-opacity">
 PS.
 </a>
 
 {/* Desktop Menu */}
 <div className="hidden md:flex items-center gap-8">
 {navLinks.map((link, i) => (
 <a 
 key={i} 
 href={link.href} 
 className="text-sm font-semibold text-zinc-400 transition-colors relative"
 >
 {link.name}
 <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all"></span>
 </a>
 ))}
 <button onClick={toggleTheme} className="p-2 rounded-full border border-white/10 text-zinc-300 transition-colors flex items-center justify-center bg-white/5">
   {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
 </button>
 </div>

 {/* Mobile Menu Toggle */}
 <button 
 className="md:hidden text-zinc-400 transition-colors"
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
 className="text-lg font-medium text-zinc-300 transition-colors py-2 border-b border-white/5"
 >
 {link.name}
 </a>
 ))}
 <div className="flex flex-col gap-3 mt-2">
   <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-full border border-white/10 text-zinc-300 transition-colors bg-white/5">
     {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
   </button>
 </div>
 </motion.div>
 )}
 </motion.nav>
 );
}

// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
export default function App() {
 const [showResume, setShowResume] = useState(false);

 return (
 <div className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30">
 
 {/* Custom Magic Interactive Background */}
 <InteractiveBackground />
 
 <Navbar />

 <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8 sm:px-12 sm:pt-24 sm:pb-8">
 
 {/* HERO SECTION */}
 <motion.section 
 id="home"
 className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 scroll-mt-24 mt-4"
 initial="hidden"
 animate="show"
 variants={staggerContainer}
 >
 <div className="flex-1 flex flex-col justify-center items-start self-stretch">
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
 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 leading-[1.1] drop-shadow-2xl"
 >
 Hi, I'm <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
 Pawan Singh.
 </span>
 </motion.h1>
 </TiltCard>

 <TiltCard>
 <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-8 font-light drop-shadow-md">
 A passionate Full-Stack Software Engineer building scalable, intuitive, and modern digital experiences. Specializing in <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Next.js</span>, and <span className="text-white font-medium">Flutter</span>.
 </motion.p>
 </TiltCard>

 <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-5 relative z-20">
 <TiltCard>
 <button onClick={() => setShowResume(true)} className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
 View Resume
 </button>
 </TiltCard>
 <div className="flex items-center gap-4 ml-4">
 <TiltCard><SocialLink href="https://github.com/Pawan1618" icon={<Github size={24} />} /></TiltCard>
 <TiltCard><SocialLink href="https://www.linkedin.com/in/pawansingh1618/" icon={<Linkedin size={24} />} /></TiltCard>
 <TiltCard><SocialLink href="mailto:Pawan.singh23@lpu.in" icon={<Mail size={24} />} /></TiltCard>
 </div>
 </motion.div>
 </div>

 <div className="flex-1 flex justify-center md:justify-end items-center w-full relative z-10 pt-10 md:pt-0">
 <TiltCard className="inline-block">
 <motion.div variants={fadeIn} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full p-2 glass-card bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 blur-2xl opacity-50 transition-opacity duration-700 pointer-events-none" />
 <img src="/images/pic.png" alt="Pawan Singh" className="relative z-10 w-full h-full object-cover rounded-full border border-white/10 shadow-2xl transition-transform duration-500" />
 </motion.div>
 </TiltCard>
 </div>
  </motion.section>

  {/* ABOUT & EDUCATION SECTION */}
  <motion.section 
  id="about"
  className="py-4 md:py-6 scroll-mt-20 mt-8"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  >
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
  {/* About Me */}
  <motion.div variants={fadeIn} className="flex flex-col justify-center">
  <TiltCard>
  <div className="flex flex-col gap-1 mb-6">
  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">About Me</h2>
  <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
  </div>
  </TiltCard>
  <TiltCard className="h-full">
  <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xl shadow-indigo-500/5 border border-white/5 h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 pointer-events-none" />
    <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-6 relative z-10">
      Hello! I'm <span className="text-white font-bold">Pawan Singh</span>. I am an engineer driven by relentless curiosity and a passion for solving intricate puzzles. For me, development isn't just about writing code—it's about architecting digital systems that are as elegant underneath as they are visually arresting on the surface.
    </p>
    <p className="text-zinc-300 text-lg leading-relaxed font-medium relative z-10">
      When I'm not designing dynamic web applications or cross-platform mobile experiences, you can usually find me grinding through competitive programming hurdles or exploring the incredible world of Generative AI. I believe that integrating strong underlying computer science fundamentals with cutting-edge modern tools is the key to building the future.
    </p>
  </div>
  </TiltCard>
  </motion.div>

  {/* Education */}
  <motion.div variants={fadeIn}>
  <TiltCard>
  <div className="flex items-center gap-3 mb-6">
  <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
  <GraduationCap size={24} />
  </div>
  <h3 className="text-2xl font-bold text-white drop-shadow-md">Education</h3>
  </div>
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
  </div>
  </motion.section>

  {/* SKILLS SECTION */}
  <motion.section 
  id="skills"
 className="py-4 md:py-6 scroll-mt-20 mt-8"
 initial="hidden"
 whileInView="show"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 >
 <TiltCard>
 <motion.div variants={fadeIn} className="flex flex-col gap-1 mb-4">
 <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">Technical Arsenal</h2>
 <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
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
 className="py-4 md:py-6 scroll-mt-20"
 initial="hidden"
 whileInView="show"
 viewport={{ once: true, margin: "-100px" }}
 variants={staggerContainer}
 >
 <TiltCard>
 <motion.div variants={fadeIn} className="flex flex-col gap-1 mb-4">
 <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">Selected Works</h2>
 <div className="h-1.5 w-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-1 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
 </motion.div>
 </TiltCard>

 <div className="flex flex-col gap-6">
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

  {/* CERTIFICATES SECTION */}
  <motion.section 
  id="certifications"
  className="py-4 md:py-6 scroll-mt-20 mt-8"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  >
  <TiltCard>
  <motion.div variants={fadeIn} className="flex flex-col gap-1 mb-6">
  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">Certificates</h2>
  <div className="h-1.5 w-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-1 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
  </motion.div>
  </TiltCard>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <TiltCard className="h-full">
   <CertificateCard 
   title="Master Generative AI & Tools"
   issuer="Udemy"
   date="Aug '25"
   imageSrc="/images/master.png"
   link="https://drive.google.com/file/d/10MoNUKOgE8rbNeY9UzTJoiFvpFqVwNGP/view?usp=drive_link"
   />
  </TiltCard>
  <TiltCard className="h-full">
   <CertificateCard 
   title="Mobile App Dev using Flutter"
   issuer="CipherSchools"
   date="Jul '25"
   imageSrc="/images/flutter.png"
   link="https://drive.google.com/file/d/1wi5_gFsNW3DQzVpe9kYiLlMzItbaAZzH/view?usp=drive_link"
   />
  </TiltCard>
  <TiltCard className="h-full">
   <CertificateCard 
   title="Cloud Computing"
   issuer="NPTEL"
   date="Apr '25"
   imageSrc="/images/cloud.png"
   link="https://drive.google.com/file/d/1OO8g3R3XOYyEkbYxXmXgKwSFoimxTLi7/view?usp=drive_link"
   />
  </TiltCard>
  </div>
  </motion.section>

  {/* MILESTONES SECTION */}
  <motion.section 
  id="experience"
  className="py-4 md:py-6 scroll-mt-20 mt-8"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  >
  <TiltCard>
  <motion.div variants={fadeIn} className="flex flex-col gap-1 mb-6">
  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">Key Milestones</h2>
  <div className="h-1.5 w-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-1 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
  </motion.div>
  </TiltCard>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <TiltCard className="h-full">
  <MilestoneCard 
  title="Problem Solving Excellence"
  desc="Solved 500+ coding problems across LeetCode, GFG & Codeforces. Earned top badges on LeetCode and HackerRank."
  />
  </TiltCard>
  <TiltCard className="h-full">
  <MilestoneCard 
  title="Competitive Programming"
  desc="Reached a peak LeetCode contest rating of 1415, demonstrating strong algorithm intuition under time constraints."
  />
  </TiltCard>
  </div>
  </motion.section>
 
 {/* CONTACT SECTION */}
 <motion.section 
 id="contact"
 className="py-4 md:py-6 scroll-mt-20"
 initial="hidden"
 whileInView="show"
 viewport={{ once: true, margin: "-100px" }}
 >
 <TiltCard cursorOffset="none" className="max-w-4xl mx-auto w-full">
 <div className="glass-panel p-8 md:p-12 rounded-[2rem] text-left relative overflow-hidden shadow-2xl shadow-indigo-500/10 border border-indigo-500/20 w-full">
 <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-50 pointer-events-none" />
 <div className="relative z-10 w-full" >
 <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
 Contact Form
 </h2>
 <p className="text-zinc-300 mb-8 font-medium leading-relaxed text-base md:text-lg" >
 Please contact me directly at <a href="mailto:Pawan.singh23@lpu.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">Pawan.singh23@lpu.in</a> or drop your info here.
 </p>
 
 <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
 <div className="flex flex-col md:flex-row gap-6">
 <div className="flex-1 flex flex-col gap-2">
 <label className="text-sm font-bold text-zinc-300 ml-1">Full name</label>
 <input 
 type="text" 
 placeholder="Your Name" 
 className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
 />
 </div>
 <div className="flex-1 flex flex-col gap-2">
 <label className="text-sm font-bold text-zinc-300 ml-1">Email Address</label>
 <input 
 type="email" 
 placeholder="you@example.com" 
 className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
 />
 </div>
 </div>
 
 <div className="flex flex-col gap-2">
 <label className="text-sm font-bold text-zinc-300 ml-1">Your Message</label>
 <textarea 
 placeholder="Tell me about about your project," 
 rows="4"
 className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium resize-none"
 ></textarea>
 <p className="text-xs text-zinc-500 font-medium ml-1 mt-1">
 I'll never share your data with anyone else. Pinky promise!
 </p>
 </div>
 
 <button 
 type="submit" 
 className="mt-2 w-full sm:w-auto self-start bg-white text-black font-bold px-10 py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
 >
 Send Message
 </button>
 </form>
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
 
 <div className="flex items-center gap-4">
 <TiltCard><SocialLink href="https://github.com/Pawan1618" icon={<Github size={20} />} /></TiltCard>
 <TiltCard><SocialLink href="https://www.linkedin.com/in/pawansingh1618/" icon={<Linkedin size={20} />} /></TiltCard>
 <TiltCard><SocialLink href="mailto:Pawan.singh23@lpu.in" icon={<Mail size={20} />} /></TiltCard>
 </div>

 <TiltCard><p className="text-zinc-500 text-sm flex items-center gap-2 font-medium">Built with <span className="text-indigo-400">React</span> & <span className="text-indigo-400">Tailwind</span></p></TiltCard>
 </motion.footer>

 </div>

 {/* RESUME MODAL */}
 <AnimatePresence>
  {showResume && (
  <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
  >
  <motion.div 
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  className="bg-[#12121a] border border-white/10 p-4 sm:p-6 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
  >
  <div className="flex justify-between items-center mb-4 shrink-0">
  <h3 className="text-2xl font-bold text-white tracking-tight">Resume</h3>
  <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
  <a 
  href="https://drive.google.com/file/d/1BkKz9Ipjx3AXNkz69mZVvUqZ9-Fro4Ep/view?usp=drive_link" 
  target="_blank" 
  rel="noreferrer"
  className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform hover:scale-105"
  >
  Download Resume
  </a>
  <button 
  onClick={() => setShowResume(false)}
  className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
  >
  <X size={20} />
  </button>
  </div>
  </div>
  <div className="flex-1 bg-white/5 rounded-xl overflow-hidden border border-white/10 relative">
  <iframe 
  src="https://drive.google.com/file/d/1BkKz9Ipjx3AXNkz69mZVvUqZ9-Fro4Ep/preview" 
  className="absolute inset-0 w-full h-full border-0"
  allow="autoplay"
  ></iframe>
  </div>
  </motion.div>
  </motion.div>
  )}
 </AnimatePresence>
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
 className="p-3 rounded-full glass-card text-zinc-300 transition-colors shadow-lg shadow-black/20 block"
 >
 {icon}
 </a>
 );
}

function SkillNode({ icon, title, skills }) {
 return (
 <motion.div variants={fadeIn} className="glass-card p-6 h-full rounded-2xl shadow-2xl shadow-black/20">
 <div className="flex items-center gap-4 mb-5" >
 <div className="p-3 rounded-2xl bg-white/5 border border-white/10 transition-colors">
 {icon}
 </div>
 <h4 className="text-xl font-bold tracking-tight text-white">{title}</h4>
 </div>
 <div className="flex flex-wrap gap-2" >
 {skills.map((skill, i) => (
 <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide rounded-lg bg-white/5 text-zinc-300 border border-white/10 overflow-hidden transition-colors">
 {skill.icon && <span className="text-[14px] opacity-90 transition-transform duration-300">{skill.icon}</span>}
 <span>{skill.name || skill}</span>
 </span>
 ))}
 </div>
 </motion.div>
 );
}

function ProjectCase({ title, date, description, features, tags, link, image }) {
 return (
 <motion.div variants={fadeIn} className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-black/30">
 {/* Subtle hover gradient inner shadow */}
 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition-opacity duration-700 pointer-events-none" />
 
 <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-center lg:items-center" >
 
 {image && (
 <div className="w-[100%] sm:w-[500px] lg:w-[400px] xl:w-[480px] shrink-0 flex items-center justify-center rounded-2xl glass-card border border-white/5 bg-[#000000] p-0 overflow-hidden shadow-2xl" >
 <img src={image} alt={title} className="w-[100%] h-auto max-h-[350px] object-cover rounded-2xl transition-transform duration-700 opacity-95 drop-shadow-lg" />
 </div>
 )}

 <div className="flex-1 flex flex-col relative z-20" >
 <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
 <a href={link} target="_blank" rel="noreferrer" className="block relative z-[100] cursor-pointer pointer-events-auto">
 <h3 className="text-3xl font-extrabold tracking-tight text-white transition-all duration-300">{title}</h3>
 </a>
 <span className="text-indigo-300/80 font-medium text-sm px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">{date}</span>
 </div>
 
 <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium" >
 {description}
 </p>

 <ul className="space-y-3 mb-8 flex-1" >
 {features.map((feature, i) => (
 <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed text-sm">
 <ChevronRight className="shrink-0 text-indigo-400 mt-1" size={16} />
 <span>{feature}</span>
 </li>
 ))}
 </ul>

 <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10" >
 <div className="flex flex-wrap gap-2">
 {tags.map((tag, i) => (
 <span key={i} className="px-4 py-1.5 text-xs font-bold tracking-wide rounded-full bg-white/5 text-white border border-white/10">
 {tag}
 </span>
 ))}
 </div>

 <a href={link} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-bold transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-[100] cursor-pointer pointer-events-auto">
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
 <div className={`relative flex items-center justify-between w-full ${alignRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
 
 {/* Invisible Spacer to balance the layout on desktop */}
 <div className="hidden md:block w-[calc(50%-2.5rem)]" />

 {/* The Dot (absolutely centered on desktop) */}
 <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#09090b] bg-indigo-500 - transition-all duration-300 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 shadow-lg" />
 
 {/* The Content Card (swaps sides automatically based on the flex direction) */}
 <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 rounded-3xl shadow-xl shadow-black/20 text-left">
 <div className="flex flex-col gap-1 mb-3" >
 <span className="text-indigo-400 text-sm font-bold tracking-widest uppercase">{date}</span>
 <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h4>
 </div>
 <p className="text-zinc-400 mb-4 font-medium" >{subtitle}</p>
 <div className="inline-block px-4 py-1.5 rounded-lg bg-white/5 text-zinc-100 text-sm font-bold tracking-wide border border-white/10" >
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
 <div >
 <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 drop-shadow-sm">{title}</h4>
 <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-medium" >
 {desc}
 </p>
 </div>
 </motion.div>
 );
}
