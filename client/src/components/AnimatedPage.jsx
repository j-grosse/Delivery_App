import React from 'react';
import { motion } from "framer-motion"; // framer motion library

const animations = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

const AnimatedPage = ({ children }) => {
  return (
    // different page transition animations

    // <motion.div
    //   variants={animations}
    //   initial="initial"
    //   animate="animate"
    //   exit="exit"
    //   transition={{ duration: 1 }}
    // >

    <motion.div
      initial={{ opacity: 0.5, x: 0 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: [0.61, 0.1, 0.88, 1],
        },
      }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
