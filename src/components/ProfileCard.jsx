import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/Memoji.png";

const MotionCard = motion.article;
const MotionButton = motion.button;

function ProfileCard() {
  const navigate = useNavigate();

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full max-w-[340px] sm:max-w-[380px] rounded-3xl border border-neutral-800 bg-neutral-900/80 p-5 sm:p-6 shadow-xl"
    >
      <div className="relative mx-auto w-full max-w-[290px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600">
        <img
          src={avatar}
          alt="Greeshmanth Srireddy"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <h2 className="mt-5 text-xl sm:text-2xl font-semibold text-white text-center">
        Greeshmanth Srireddy
      </h2>

      <p className="mt-1 text-sm sm:text-base text-violet-400 text-center font-medium">
        Backend Engineer
      </p>

      <p className="mt-1 text-xs sm:text-sm text-neutral-400 text-center">
        United States
      </p>

      <MotionButton
        onClick={() => navigate("/contact")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 w-full rounded-xl bg-violet-600 hover:bg-violet-500 transition text-white font-medium py-3"
      >
        Let&apos;s Talk
      </MotionButton>
    </MotionCard>
  );
}

export default ProfileCard;
