"use client";

import { motion } from "framer-motion";
import React from "react";

const CardLoader = () => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl border-[1px] border-darkGray">
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-auto aspect-square bg-darkGray rounded-lg"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default CardLoader;
