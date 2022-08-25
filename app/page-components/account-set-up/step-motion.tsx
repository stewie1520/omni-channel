import { AnimatePresence, motion } from "framer-motion";

export const StepMotion = (props: any) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center justify-center space-y-8 "
        initial={{
          translateY: "10%",
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
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
