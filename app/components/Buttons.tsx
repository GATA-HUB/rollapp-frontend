"use client";

import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const WalletButton = ({ children, onClick, disabled }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-center px-4 py-2 rounded-lg gap-2 bg-darkGray bg-opacity-100 hover:bg-primary hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out`}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ease-in-out`}
      >
        <svg
          className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V15H16C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9H20V7C20 6.44772 19.5523 6 19 6ZM16 10H20V14H16C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM21 17V15V9V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
            fill=""
          />
        </svg>
      </div>

      <span
        className={`accent text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
      >
        {children}
      </span>
    </div>
  );
};

export const PrimaryMintButton = ({ children, onClick, disabled }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        border: "1px solid rgba(1, 239, 156, 1)",
        boxShadow: "4px 4px 0px #01EF9C",
      }}
      className="group w-full flex px-4 py-2 rounded-lg gap-2 bg-black cursor-pointer items-center justify-center"
    >
      <svg
        className="fill-white group-hover:fill-primary transition-all duration-300 ease-in-out"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.2258 12.9666C9.87378 13.3536 8.35781 13.0147 7.29289 11.9497L5.17157 9.82843C3.60948 8.26633 3.60948 5.73367 5.17157 4.17157C6.73367 2.60948 9.26633 2.60948 10.8284 4.17157L12.9497 6.29289C14.0147 7.35781 14.3536 8.87378 13.9666 10.2258C15.3186 9.83879 16.8346 10.1777 17.8995 11.2426L20.0208 13.364C21.5829 14.9261 21.5829 17.4587 20.0208 19.0208C18.4587 20.5829 15.9261 20.5829 14.364 19.0208L12.2426 16.8995C11.1777 15.8346 10.8388 14.3186 11.2258 12.9666ZM12.2426 7L10.1213 4.87868C8.94975 3.70711 7.05025 3.70711 5.87868 4.87868C4.70711 6.05025 4.70711 7.94975 5.87868 9.12132L8 11.2426C9.05111 12.2938 10.6882 12.4018 11.8598 11.5669L10.8284 10.5355C10.6332 10.3403 10.6332 10.0237 10.8284 9.82843C11.0237 9.63316 11.3403 9.63316 11.5355 9.82843L12.5669 10.8598C13.4018 9.68816 13.2938 8.05111 12.2426 7ZM12.6255 12.3326C11.7906 13.5042 11.8986 15.1413 12.9497 16.1924L15.0711 18.3137C16.2426 19.4853 18.1421 19.4853 19.3137 18.3137C20.4853 17.1421 20.4853 15.2426 19.3137 14.0711L17.1924 11.9497C16.1413 10.8986 14.5042 10.7906 13.3326 11.6255L14.364 12.6569C14.5592 12.8521 14.5592 13.1687 14.364 13.364C14.1687 13.5592 13.8521 13.5592 13.6569 13.364L12.6255 12.3326Z"
          fill=""
        />
      </svg>

      <span
        className={`buttonText text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
      >
        {children}
      </span>
    </motion.div>
  );
};

export const PrimaryStakeButton = ({ children, onClick, disabled }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        border: "1px solid rgba(1, 239, 156, 1)",
        boxShadow: "4px 4px 0px #01EF9C",
      }}
      className="group w-full flex px-4 py-2 rounded-lg gap-2 bg-black cursor-pointer items-center justify-center"
    >
      <svg
        className="stroke-white group-hover:stroke-primary transition-all duration-300 ease-in-out"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4.46317"
          y="7.78606"
          width="14.242"
          height="3"
          transform="rotate(-15.9989 4.46317 7.78606)"
          stroke=""
        />
        <rect x="5.5" y="12.5" width="14" height="3" stroke="" />
        <rect x="5.5" y="17.5" width="14" height="3" stroke="" />
      </svg>

      <span
        className={`buttonText text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
      >
        {children}
      </span>
    </motion.div>
  );
};

export const PrimaryButton = ({ children, onClick, disabled }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        border: "1px solid rgba(1, 239, 156, 1)",
        boxShadow: "4px 4px 0px #01EF9C",
      }}
      className="group w-full flex px-4 py-2 rounded-lg gap-2 bg-black cursor-pointer items-center justify-center"
    >
      <span
        className={`buttonText text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
      >
        {children}
      </span>
    </motion.div>
  );
};

export const SecondaryButton = ({ children, onClick, disabled }: Props) => {
  if (disabled) {
    return (
      <div
        className={`group flex items-center justify-center px-4 py-2 rounded-lg gap-2 bg-black transition-all duration-300 ease-in-out`}
      >
        <span
          className={`buttonText text-textGray transition-all duration-300 ease-in-out`}
        >
          {children}
        </span>
      </div>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className={`group flex items-center justify-center px-4 py-2 rounded-lg gap-2 bg-darkGray bg-opacity-100 hover:bg-primary hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out`}
      >
        <span
          className={`buttonText text-white group-hover:text-primary transition-all duration-300 ease-in-out`}
        >
          {children}
        </span>
      </div>
    );
  }
};
