import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionArticle = motion.article;

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0.65, 0.2, 1] },
  },
};

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <PageWrapper>
      <MotionDiv
        style={{ scaleX: useScroll().scrollYProgress }}
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
      />

      <MotionSection
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        initial="hidden"
        animate="show"
        variants={sectionReveal}
        className="relative rounded-3xl border border-neutral-800 bg-neutral-900/65 p-6 sm:p-8 overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-violet-600/20 blur-3xl" />

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight max-w-3xl">
          Backend systems engineered for scale, speed, and reliability.
        </h1>

        <p className="mt-4 text-neutral-300 text-[15px] sm:text-[17px] leading-[1.75] max-w-2xl">
          I build cloud-ready APIs and services with clear architecture and
          production confidence.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 font-medium transition"
          >
            Explore Projects <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center rounded-xl border border-neutral-700 text-neutral-200 px-5 py-2.5 font-medium hover:border-neutral-500 transition"
          >
            Let&apos;s Talk
          </button>
        </div>
      </MotionSection>

      <MotionSection
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { value: "4+", label: "Years Experience" },
          { value: "15+", label: "Projects Completed" },
          { value: "4", label: "Worldwide Clients" },
        ].map((item) => (
          <MotionArticle
            key={item.label}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-center"
          >
            <p className="text-3xl font-semibold text-violet-400">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-400">
              {item.label}
            </p>
          </MotionArticle>
        ))}
      </MotionSection>

      <MotionSection
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionReveal}
        className="mt-8"
      >
        <div className="flex items-center justify-between gap-4 mb-3">
          <h2 className="font-display text-xl sm:text-2xl text-white">Previously At</h2>
        </div>
        <Marquee />
      </MotionSection>
    </PageWrapper>
  );
}

function Marquee() {
  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  const companies = ["HDFC", "TCS", "WMU", "Optum"];

  return (
    <div className="relative overflow-hidden h-14 sm:h-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

      <MotionDiv
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap items-center"
        animate={{ x: [-width, 0] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        {[...companies, ...companies].map((company, index) => (
          <span
            key={`${company}-${index}`}
            className="text-xl sm:text-2xl font-bold text-white/95 tracking-wide opacity-95 hover:text-white transition"
          >
            {company}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}

export default Home;

