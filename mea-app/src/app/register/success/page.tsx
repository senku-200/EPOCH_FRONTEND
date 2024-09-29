// pages/success.tsx
"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen bg-gray-900">
      <motion.div
        className="flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaCheckCircle className="text-green-500 text-6xl mb-4 sm:text-8xl" />
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
          Thank You for Your Registration!
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          We will send a confirmation mail within 24 hours.
        </p>
      </motion.div>
      <motion.button
        onClick={() => router.push("/")}
        className="mt-8 px-4 py-2 bg-orange-600 rounded-full text-lg font-semibold hover:bg-orange-500 transition duration-300 sm:px-6 sm:py-2 sm:text-xl"
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
