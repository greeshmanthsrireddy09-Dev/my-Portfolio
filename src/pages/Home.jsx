import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="mb-10 sm:mb-16">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Backend Engineer
        </h1>

        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl">
          Passionate about building scalable backend systems. Specialize in
          designing reliable services and high-performance APIs.
        </p>

        {/* STATS */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "+4", label: "YEARS OF EXPERIENCE" },
            { value: "+15", label: "PROJECTS COMPLETED" },
            { value: "+4", label: "WORLDWIDE CLIENTS" },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-violet-500">
                {item.value}
              </div>
              <div className="text-xs tracking-widest text-neutral-400 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKED FOR + MARQUEE + CTA */}
      <section className="relative mt-6">

        {/* WORKED FOR — LEFT ALIGNED */}
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-white text-left mb-4">
          Previously At
        </h2>

        {/* CENTERED CONTENT COLUMN */}
        <div className="flex flex-col items-center gap-6">


          {/* MARQUEE */}
          <div className="w-full overflow-hidden">
            <Marquee />
          </div>


          {/* CTA — CENTERED */}
          <button
            onClick={() => navigate("/projects")}
            className="group text-neutral-400 hover:text-white transition flex items-center gap-2"
          >
            <span className="text-violet-500 group-hover:text-violet-400 font-medium">
              Explore Projects
            </span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>
      </section>
    </PageWrapper>
  );
}

/* ------------------------------------------------------------------ */
/* CONTINUOUS TEXT MARQUEE                                             */
/* ------------------------------------------------------------------ */

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
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap items-center"
        animate={{ x: [-width, 0] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...companies, ...companies].map((company, index) => (
          <span
            key={index}
            className="text-lg sm:text-xl font-medium text-neutral-300 opacity-80 hover:opacity-100 transition"
          >
            {company}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Home;
