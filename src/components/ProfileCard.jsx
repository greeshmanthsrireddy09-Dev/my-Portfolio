import { motion } from "framer-motion";
import avatar from "../assets/Memoji.png";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate(); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 40px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.25)",
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[320px] rounded-3xl bg-neutral-900/80 border border-neutral-800 p-6 shadow-xl"
    >
      <div className="relative mx-auto w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600">
        <img
          src={avatar}
          alt="Greeshmanth Srireddy"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white text-center">
        Greeshmanth Srireddy
      </h2>

      <p className="mt-1 text-sm text-violet-400 text-center font-medium">
        Software Engineer
      </p>

      <p className="text-xs text-neutral-400 mt-1 text-center">
        United States
      </p>

      {/* ✅ CORRECT NAVIGATION */}
      <motion.button
        onClick={() => navigate("/contact")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 w-full rounded-xl bg-violet-600 hover:bg-violet-500 transition
                   text-white font-medium py-3"
      >
        Let’s Talk
      </motion.button>
    </motion.div>
  );
}

export default ProfileCard;
