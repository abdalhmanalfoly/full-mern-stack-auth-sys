import React from 'react';
import { motion } from 'framer-motion' ;

function FloatingShape({ color, size, top, left, delay }) {
  return (
    <motion.div
      animate={{
        x: ["0%", "100%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: delay,
      }}
      aria-hidden="true"
      
      className={`absolute rounded-full opacity-20 blur-xl ${color} ${size} ${top} ${left}`}
    />
  )
}

export default FloatingShape
