import React from "react";
import { motion } from "framer-motion";
import { BsRocketFill } from "react-icons/bs";

const RocketVideoUploadAnimation = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8">
    <div className="relative w-full max-w-2xl bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Uploading...</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="relative mt-6 h-64">
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white bg-gray-700 p-8 rounded-full"
          initial={{ y: 0 }}
          animate={{ y: -200 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <BsRocketFill className="text-white" size={30} />
          </motion.div>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            Uploading...
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default RocketVideoUploadAnimation;
