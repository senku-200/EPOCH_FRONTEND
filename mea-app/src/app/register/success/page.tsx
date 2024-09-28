// pages/success.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-white h-auto min-h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaCheckCircle className="text-green-500 text-8xl mb-4 md:text-6xl" />
        <h1 className="text-3xl font-bold md:text-4xl">Thank You for Your Registration!</h1>
        <p className="mt-4 text-center text-lg md:text-xl px-4 md:px-0">
          We will send a confirmation mail within 24 hours.
        </p>
      </motion.div>
      <motion.button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-2 bg-orange-600 rounded-full text-lg font-semibold hover:bg-orange-500 transition duration-300"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go to Home
      </motion.button>
    </div>
  );
};

export default Page;
