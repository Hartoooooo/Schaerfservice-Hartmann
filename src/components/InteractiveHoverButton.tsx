import React from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { motion, HTMLMotionProps } from "motion/react";

interface InteractiveHoverButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      animate="rest"
      ref={ref}
      className={clsx(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border p-2 text-center font-semibold",
        // Weißer Button, blaue Akzente
        "bg-white border-[var(--color-blue-600)] text-[var(--color-blue-600)]",
        className,
      )}
      {...props}
    >
      <span className="relative z-20 inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      {/* Circle expand background (Framer-like) */}
      <motion.div
        variants={{
          rest: { clipPath: "circle(0% at 85% 50%)" },
          hover: { clipPath: "circle(150% at 50% 50%)" },
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0 z-10 bg-[var(--color-blue-600)]"
      />
    </motion.button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };


