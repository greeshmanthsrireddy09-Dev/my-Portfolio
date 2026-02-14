import { motion } from "framer-motion";

const MotionDiv = motion.div;

function PageWrapper({ children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl 2xl:max-w-5xl mx-auto px-1 sm:px-2 lg:px-4 pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-24"
    >
      {children}
    </MotionDiv>
  );
}

export default PageWrapper;
