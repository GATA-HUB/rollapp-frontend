"use client";

import { motion } from "framer-motion";
import React from "react";

const LargeCardLoader = () => {
  return (
    <div className="flex py-4 pl-4 pr-6 justify-between items-center rounded-xl border-[1px] border-darkGray bg-black">
      <div className="flex w-48 items-center gap-4">
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-darkGray rounded-md"
        />
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-6 bg-darkGray rounded-lg"
        />
      </div>

      <div className="w-32 flex flex-col gap-2">
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-2  bg-darkGray rounded-lg"
        />
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-6 bg-darkGray rounded-lg"
        />
      </div>

      <div className="w-32 flex flex-col gap-2">
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-2  bg-darkGray rounded-lg"
        />
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-6 bg-darkGray rounded-lg"
        />
      </div>
    </div>
  );
};

export default LargeCardLoader;
