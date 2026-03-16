import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Server, Terminal, Smartphone, Database, Zap, ExternalLink, Github, Linkedin, Mail, Smartphone as Phone, MapPin, Award, BookOpen } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="relative min-h-screen font-mono selection:bg-[#00f3ff] selection:text-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        <motion.div
          className="absolute inset-0 grid-bg opacity-30"
          style={{ y: backgroundY }}
        />
        {/* Neon glowing orbs */}
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-[#b000ff] rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse" />
        <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[150px] opacity-15" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 pb-40">

        {/* HERO SECTION */}
        <motion.section
          className="min-h-[80vh] flex flex-col justify-center items-start"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="flex items-center gap-2 text-[#00f3ff] mb-4">
            <Terminal size={20} />
            <span className="tracking-widest uppercase text-sm font-bold">System.out.println("Hello, World!");</span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-8xl font-black mb-4 tracking-tighter"
          >
            Pawan <span className="text-glow">Singh</span>
          </motion.h1>

          <motion.h2 variants={fadeIn} className="text-xl md:text-3xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
            Full-Stack Software Engineer specializing in <span className="text-[#00f3ff]">Next.js</span>, <span className="text-[#00f3ff]">React</span>, and <span className="text-[#b000ff]">Flutter</span>. Building scalable architectures and cross-platform apps.
          </motion.h2>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
            <a href="https://github.com/pawansingh" target="_blank" rel="noreferrer" className="flex items-center gap-2 box-glow px-6 py-3 rounded-md text-[#00f3ff] font-bold hover:bg-[#00f3ff]/10">
              <Github size={20} /> GitHub
            </a>
            <a href="https://linkedin.com/in/pawansingh" target="_blank" rel="noreferrer" className="flex items-center gap-2 box-glow-purple px-6 py-3 rounded-md text-[#b000ff] font-bold hover:bg-[#b000ff]/10">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="mailto:Pawan.singh23@lpu.in" className="flex items-center gap-2 box-glow px-6 py-3 rounded-md text-[#00f3ff] font-bold hover:bg-[#00f3ff]/10">
              <Mail size={20} /> Contact
            </a>
          </motion.div>

          <motion.div variants={fadeIn} className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={16} className="text-[#00f3ff]" /> Punjab, India</span>
            <span className="flex items-center gap-1"><Phone size={16} className="text-[#b000ff]" /> +91-9122251090</span>
          </motion.div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section
          className="mb-32 pt-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeIn} className="text-3xl font-bold mb-10 flex items-center gap-3">
            <span className="text-[#00f3ff]">{"<"}</span>
            <span className="text-glow">Skills</span>
            <span className="text-[#00f3ff]">{"/>"}</span>
            <div className="h-[1px] bg-gradient-to-r from-[#00f3ff]/50 to-transparent flex-1 ml-4" />
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard icon={<Code />} title="Languages" items="C++, JavaScript (ES6+), TypeScript, C, Python, Dart, SQL" delay={0} />
            <SkillCard icon={<Zap />} title="Frameworks" items="Next.js 16, React 19, HTML5/CSS3, Tailwind CSS, Flutter" delay={1} isPurple />
            <SkillCard icon={<Server />} title="Tools & Platforms" items="Docker, Git/GitHub, GitHub Actions, Firebase, Supabase" delay={2} />
            <SkillCard icon={<Database />} title="Core CS Skills" items="DBMS, OS, CN, SQL, OOPs" delay={3} isPurple />
            <SkillCard icon={<Smartphone />} title="Soft Skills" items="Problem-Solving, Leadership, Team Work, Adaptability" delay={4} />
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h3 variants={fadeIn} className="text-3xl font-bold mb-10 flex items-center gap-3">
            <span className="text-[#b000ff]">{"<"}</span>
            <span className="text-glow-purple">Projects</span>
            <span className="text-[#b000ff]">{"/>"}</span>
            <div className="h-[1px] bg-gradient-to-r from-[#b000ff]/50 to-transparent flex-1 ml-4" />
          </motion.h3>

          <div className="grid flex-col gap-8">
            <ProjectCard
              title="Nutrition Tracker"
              date="Nov '25 - Dec '25"
              role="Full-Stack Health Monitoring App"
              points={[
                "Architected a Next.js 16 app with React Server Components mapping to a 40% reduction in page load times.",
                "Conceptualized client data flow with TanStack Query and optimistic UI updates, eliminating 60% of redundant requests, backed by secure Supabase RLS and TypeScript.",
                "Orchestrated a multi-stage Docker build strategy that minimized production image size by 55% (<450MB).",
                "Established a GitHub Actions CI/CD pipeline for automated testing and zero-downtime deployment."
              ]}
              tech={["Next.js", "TypeScript", "Docker", "GitHub Actions", "Supabase", "Tailwind CSS"]}
              links={[{ label: "GitHub", url: "#" }]}
            />

            <ProjectCard
              title="Grievance Management App"
              date="Jun '25 - Jul '25"
              role="Cross-Platform Complaint Tracking System"
              points={[
                "Built a cross-platform grievance app using Flutter & Firebase, designed for real-time, 24/7 complaint tracking.",
                "Improved admin efficiency by 40% through secure role-based dashboards with real-time updates.",
                "Optimized user communication by enabling up to 5MB image uploads, increasing complaint clarity by 60%.",
                "Delivered a Material 3 UI that reduced user navigation time by 30%."
              ]}
              tech={["Flutter", "Firebase", "Firestore", "Provider", "Material 3"]}
              links={[{ label: "GitHub", url: "#" }, { label: "Live", url: "#" }]}
              isPurple
            />

            <ProjectCard
              title="Real-time OS Memory Tracker"
              date="Feb '25 - May '25"
              role="OS Simulation Tool"
              points={[
                "Engineered a Python-based OS memory visualizer using PyQt5 and Matplotlib with 1–2 second updates.",
                "Simulated 50+ memory allocation/deallocation simulations with clear fragmentation visuals.",
                "Enabled live tracking of CPU, RAM, and process metrics, improving analysis speed by 45%.",
                "Added interactive page/segment visualization, boosting conceptual clarity for learners by 60%."
              ]}
              tech={["Python", "PyQt5", "Matplotlib", "OS Simulation"]}
              links={[{ label: "GitHub", url: "#" }]}
            />
          </div>
        </motion.section>

        {/* ACHIEVEMENTS & EDUCATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeIn} className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="text-[#00f3ff]" /> <span className="text-glow">Achievements</span>
            </motion.h3>
            <div className="pl-4 border-l-2 border-[#00f3ff]/30 space-y-6 relative">
              <AchievementItem
                text="Solved 500+ coding problems across LeetCode, GFG & Codeforces, sharpening problem-solving skills."
                date="Dec '25"
              />
              <AchievementItem
                text="Earned top badges on LeetCode and HackerRank, including a 5-star rating in C++."
                date="Nov '25"
              />
              <AchievementItem
                text="Reached a peak LeetCode contest rating of 1415, showcasing competitive programming strength."
                date="Oct '25"
              />
            </div>

            <motion.h3 variants={fadeIn} className="text-2xl font-bold mb-6 mt-12 flex items-center gap-3">
              <BookOpen className="text-[#b000ff]" /> <span className="text-glow-purple">Certificates</span>
            </motion.h3>
            <ul className="space-y-3 text-gray-400">
              <motion.li variants={fadeIn} className="flex gap-2"><span className="text-[#b000ff]">▹</span> Master Generative Al & Tools (Udemy)</motion.li>
              <motion.li variants={fadeIn} className="flex gap-2"><span className="text-[#b000ff]">▹</span> Mobile App Dev using Flutter (CipherSchools)</motion.li>
              <motion.li variants={fadeIn} className="flex gap-2"><span className="text-[#b000ff]">▹</span> Cloud Computing (NPTEL)</motion.li>
            </ul>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeIn} className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[#b000ff]" /> <span className="text-glow-purple">Education</span>
            </motion.h3>
            <div className="space-y-6">
              <EduCard
                school="Lovely Professional University"
                location="Phagwara, Punjab"
                degree="Bachelor of Technology - CSE"
                mark="CGPA: 8.1"
                date="Aug '23 - Present"
              />
              <EduCard
                school="Swami Prakashanand Senior Secondary"
                location="Gopalganj, Bihar"
                degree="Intermediate"
                mark="80%"
                date="Apr '22 - Mar '23"
              />
              <EduCard
                school="Imperial Public School"
                location="Gopalganj, Bihar"
                degree="Matriculation"
                mark="90.8%"
                date="Apr '19 - Mar '20"
              />
            </div>
          </motion.section>
        </div>

      </div>
    </div>
  );
}

// Components

function SkillCard({ icon, title, items, delay, isPurple }) {
  const cn = isPurple ? "box-glow-purple" : "box-glow";
  const color = isPurple ? "text-[#b000ff]" : "text-[#00f3ff]";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: delay * 0.1 } }
      }}
      className={`${cn} p-6 rounded-lg`}
    >
      <div className={`flex items-center gap-3 mb-4 ${color}`}>
        {icon}
        <h4 className="font-bold uppercase tracking-wider text-sm">{title}</h4>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{items}</p>
    </motion.div>
  );
}

function ProjectCard({ title, date, role, points, tech, links, isPurple }) {
  const color = isPurple ? "text-[#b000ff]" : "text-[#00f3ff]";
  const border = isPurple ? "border-[#b000ff]/20" : "border-[#00f3ff]/20";
  const hoverBg = isPurple ? "hover:bg-[#b000ff]/10" : "hover:bg-[#00f3ff]/10";

  return (
    <motion.div
      variants={fadeIn}
      className={`border-l-4 ${border} pl-6 md:pl-10 relative group`}
    >
      <div className={`absolute w-3 h-3 rounded-full -left-[8px] top-2 ${isPurple ? 'bg-[#b000ff]' : 'bg-[#00f3ff]'} group-hover:scale-150 transition-transform`} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h4 className="text-2xl font-bold">{title}</h4>
        <span className="font-mono text-sm text-gray-500 bg-white/5 px-3 py-1 rounded inline-flex w-max">{date}</span>
      </div>

      <p className={`${color} mb-4 font-bold tracking-wide text-sm uppercase`}>{role}</p>

      <ul className="space-y-2 mb-6 text-gray-400 text-sm md:text-base pr-4">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className={color}>▹</span>
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
        {tech.map((t, i) => (
          <span key={i} className={`text-xs font-mono bg-[#111] px-2 py-1 rounded border ${border} ${color}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {links.map((link, i) => (
          <a key={i} href={link.url} className={`text-sm flex items-center gap-1 ${color} hover:underline decoration-dashed transition-all`}>
            {link.label === 'GitHub' ? <Github size={16} /> : <ExternalLink size={16} />}
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function AchievementItem({ text, date }) {
  return (
    <motion.div variants={fadeIn} className="relative">
      <div className="absolute w-2 h-2 rounded-full bg-[#00f3ff] -left-[21px] top-2" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-300">{text}</p>
        <span className="text-xs text-[#00f3ff] font-mono">{date}</span>
      </div>
    </motion.div>
  );
}

function EduCard({ school, location, degree, mark, date }) {
  return (
    <motion.div variants={fadeIn} className="box-glow p-5 rounded-lg border-l-4 border-l-[#b000ff] bg-opacity-50">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg">{school}</h4>
        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{date}</span>
      </div>
      <p className="text-sm text-[#b000ff] mb-2">{location}</p>
      <div className="flex justify-between items-end">
        <p className="text-sm text-gray-400 max-w-[70%]">{degree}</p>
        <span className="text-sm font-bold text-[#00f3ff] bg-[#00f3ff]/10 px-2 py-1 rounded">{mark}</span>
      </div>
    </motion.div>
  );
}
