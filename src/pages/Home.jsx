import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* 🔹 Animation config for company names */
const companyTextAnim = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};



function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="mb-20">
       <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
  Software Engineer <br />
  <span className="text-violet-500">
   
  </span>
</h1>


       <p className="text-neutral-400 text-center text-[17px] leading-[1.7] font-normal max-w-2xl">
Software Engineer with 4+ years of experience building scalable backend and distributed systems.
Experienced in designing high-performance services, APIs, and data pipelines using Java and Python.
Strong focus on clean architecture, system reliability, and performance at scale.
</p>

      </section>

      

      {/* WORKED FOR — CONTINUOUS MARQUEE */}
<section className="mb-24 overflow-hidden">
  <h2 className="font-display text-2xl font-semibold text-white mb-8">
  Worked For
</h2>


  <div className="relative w-full overflow-hidden">
    <motion.div
  className="flex gap-16 whitespace-nowrap"
  animate={{ x: ["0%", "-50%"] }}
  transition={{
    repeat: Infinity,
    repeatType: "loop",
    duration: 12,   // ⬅️ FAST
    ease: "linear",
  }}
>

      {[
        "Optum",
        "HDFC",
        "TCS",
        "WMU",
        "Optum",
        "HDFC",
        "TCS",
        "WMU",
      ].map((company, index) => (
        <span
          key={index}
          className="text-3xl sm:text-4xl font-bold text-neutral-300"
        >
          {company}
        </span>
      ))}
    </motion.div>
  </div>
</section>

      {/* CTA */}
      <section>
        <p className="text-neutral-400">
          Interested in my work? Explore my projects or reach out.
        </p>
      </section>
    </PageWrapper>
  );
}

export default Home;
