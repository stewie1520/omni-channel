import { AnimatePresence, motion } from "framer-motion";

export const StepMotion = (props: any) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex h-full flex-col items-center justify-center space-y-8 "
        initial={{
          translateY: "10%",
          opacity: 0,
        }}
        transition={{ duration: 0.3 }}
        animate={{
          opacity: 1,
          translateY: "0%",
        }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};
