"use client";

import { motion, useAnimation } from "framer-motion";
import { useFlash } from "./FlashProvider";
import { LetterLabel, CHARLIE_MEDIUM, NEALE_MEDIUM } from "./LetterLabel";

export default function Contact({ direction = "top-right" }: { direction?: string }) {
  const { triggerFlash } = useFlash();
  const buttonControls = useAnimation();

  const getInitial = () => {
    switch (direction) {
      case "bottom-left": return { opacity: 0, x: -800, y: 800 };
      case "center":      return { opacity: 0, scale: 0.2 };
      case "top-right":   return { opacity: 0, x: 800, y: -800 };
      default:            return { opacity: 0, y: 50 };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerFlash();
    await buttonControls.start({
      x: [-15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    });
  };

  return (
    <div className="w-full px-6 sm:px-16 lg:px-32 relative z-10 overflow-hidden flex flex-col items-center">

      {/* CHARLIE NEALE — per-letter decorative header */}
      <motion.div
        initial={getInitial()}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
        className="self-start mb-10 flex flex-col gap-3"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <LetterLabel letterConfigs={CHARLIE_MEDIUM} />
          <LetterLabel letterConfigs={NEALE_MEDIUM} />
        </div>

        {/* Email — Permanent Marker, red, slight tilt */}
        <a
          href="mailto:charliefneale@outlook.com"
          style={{
            fontFamily: 'var(--font-marker)',
            fontSize: '18px',
            color: '#FF0000',
            display: 'inline-block',
            transform: 'rotate(-2deg)',
            textDecoration: 'none',
            letterSpacing: '1px',
            marginTop: '4px',
            marginLeft: '6px',
          }}
        >
          charliefneale@outlook.com
        </a>
      </motion.div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl relative">

        <motion.div
          initial={getInitial()}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
          className="bg-[var(--black)] p-8 sm:p-12 relative border-[6px] border-[var(--red)] drop-shadow-2xl w-full"
          style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
        >
          {/* Inner border */}
          <div
            className="absolute inset-2 border-[2px] border-[var(--red)] pointer-events-none opacity-50"
            style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10 mt-6 pl-4 sm:pl-8">

            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                style={{
                  fontFamily: 'var(--font-bangers)',
                  fontSize: '32px',
                  color: '#FF0000',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="What's your request?"
                className="outline-none resize-none w-full placeholder:text-gray-600"
                style={{
                  background: '#000',
                  border: 'none',
                  borderBottom: '3px solid #FF0000',
                  color: '#FFF',
                  fontFamily: 'var(--font-oswald)',
                  fontWeight: 500,
                  fontSize: '20px',
                  padding: '8px 4px',
                  caretColor: '#FF0000',
                }}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <motion.button
                type="submit"
                animate={buttonControls}
                whileHover={{ x: -4, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
                style={{
                  background: '#FF0000',
                  clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                  padding: '12px 56px',
                  boxShadow: '4px 4px 0px #000',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-oswald)',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#FFF',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    textShadow: '3px 3px 0px #000',
                    display: 'block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  SEND MESSAGE
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>

    </div>
  );
}
