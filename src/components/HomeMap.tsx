"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionType } from "./ZoomNav";

export default function HomeMap({ onNavigate }: { onNavigate: (section: SectionType, x?: number, y?: number) => void }) {
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);
  const sharpCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const glowCanvas = glowCanvasRef.current;
    const sharpCanvas = sharpCanvasRef.current;
    if (!glowCanvas || !sharpCanvas) return;
    
    const glowCtx = glowCanvas.getContext("2d");
    const sharpCtx = sharpCanvas.getContext("2d");
    if (!glowCtx || !sharpCtx) return;

    const resizeAndDraw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = glowCanvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      [glowCanvas, sharpCanvas].forEach(canvas => {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      });
      [glowCtx, sharpCtx].forEach(ctx => {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);
      });

      // Chaotic Joker Victory Bolt Polygon (Percentages of w, h)
      const primaryPoints = [
        // Bottom Edge
        { x: -0.1, y: 1.1 },
        { x: 0.2, y: 1.1 },
        
        // Right/Lower Edge (Zigzagging up-right)
        { x: 0.35, y: 0.85 }, // Near PROJECTS
        { x: 0.25, y: 0.75 }, // notch
        { x: 0.55, y: 0.65 }, // spike
        { x: 0.40, y: 0.55 }, // deep cut
        { x: 0.65, y: 0.50 }, // Near EXPERIENCE
        { x: 0.60, y: 0.35 }, // notch
        { x: 0.85, y: 0.25 }, // spike
        { x: 0.80, y: 0.15 }, // notch
        { x: 1.1, y: -0.1 },  // Tip off-screen (CONTACT sits near here)
        
        // Top/Upper Edge (Zigzagging down-left)
        { x: 0.9, y: -0.1 }, 
        { x: 0.6, y: 0.15 }, // cut down
        { x: 0.65, y: 0.2 }, // spike out
        { x: 0.4, y: 0.35 }, // cut down
        { x: 0.45, y: 0.45 },// spike out
        { x: 0.1, y: 0.55 }, // deep cut down left
        { x: 0.2, y: 0.65 }, // spike out
        { x: 0.0, y: 0.8 },  // cut down
        { x: 0.05, y: 0.9 }, // spike out
        { x: -0.1, y: 1.0 }
      ];

      const drawPolygon = (ctx: CanvasRenderingContext2D, points: {x:number, y:number}[], dx=0, dy=0) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x * w + dx, points[0].y * h + dy);
        for(let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x * w + dx, points[i].y * h + dy);
        }
        ctx.closePath();
      };

      // 1. SECONDARY BACKGROUND SHADOW BOLT (Pure red, offset left and down)
      drawPolygon(sharpCtx, primaryPoints, -w * 0.04, h * 0.04);
      sharpCtx.fillStyle = "#FF0000"; // Pure red accent
      sharpCtx.fill();

      // 2. GLOW PASS (Rendered into glow canvas, CSS pulse animated)
      drawPolygon(glowCtx, primaryPoints);
      glowCtx.filter = "blur(30px)";
      glowCtx.fillStyle = "#FF0000";
      glowCtx.fill();

      // 3. MAIN PURE RED BOLT
      drawPolygon(sharpCtx, primaryPoints);
      sharpCtx.fillStyle = "#FF0000"; // Pure saturated red
      sharpCtx.fill();

      // 4. CUT-PAPER THICK STROKE
      sharpCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      sharpCtx.lineWidth = 6;
      sharpCtx.stroke();

      // 5. THIN WHITE 1px OUTLINE
      sharpCtx.strokeStyle = "#FFFFFF";
      sharpCtx.lineWidth = 1;
      sharpCtx.stroke();
    };

    resizeAndDraw();
    window.addEventListener("resize", resizeAndDraw);
    return () => window.removeEventListener("resize", resizeAndDraw);
  }, []);


  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start bg-[var(--black)] text-[var(--white)] overflow-hidden">
      
      {/* Background Halftone Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 0, 0, 0.18) 2px, transparent 2px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Canvas Glow Pass (CSS Pulse Animated) */}
      <canvas 
        ref={glowCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 bolt-pulse"
      />

      {/* Canvas Sharp Pass (Static) */}
      <canvas 
        ref={sharpCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Top Left Corner Identity Watermark */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20 flex flex-col items-start pointer-events-none">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="text-[59px] uppercase leading-none"
          style={{ 
            fontFamily: 'var(--font-bebas-neue)',
            color: 'var(--white)',
            textShadow: '3px 3px 0px var(--red), 5px 5px 0px rgba(0,0,0,0.8)'
          }}
        >
          Charlie Neale
        </motion.h1>

        <h2
          className="text-[23px] mt-1 tracking-widest uppercase text-gray-300 drop-shadow-md"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          UNDERGRADUATE · UNIVERSITY OF TORONTO
        </h2>

        <h3
          className="text-[20px] mt-[2px] tracking-wider uppercase drop-shadow-md"
          style={{ fontFamily: 'var(--font-bangers)', color: 'rgba(255, 0, 0, 0.7)' }}
        >
          COMPUTER SCIENCE · LEADERSHIP · ASTROPHYSICS
        </h3>
      </div>

      {/* Map Nodes Overlaid on Canvas Path */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
        {/* PROJECTS */}
        <MapNode 
          label="PROJECTS"
          section="projects"
          onNavigate={onNavigate}
          baseScale={1.0}
          rotation={-20}
          delay={0.8}
          direction="left"
          bottom="15%"
          left="30%"
        />

        {/* EXPERIENCE */}
        <MapNode 
          label="EXPERIENCE"
          section="experience"
          onNavigate={onNavigate}
          baseScale={0.75}
          rotation={10}
          delay={1.0}
          direction="left"
          top="28%"
          left="28%"
        />

        {/* CONTACT */}
        <MapNode 
          label="CONTACT"
          section="contact"
          onNavigate={onNavigate}
          baseScale={0.56}
          rotation={-15}
          delay={1.2}
          direction="right"
          top="20%"
          left="62%"
        />
      </div>

    </div>
  );
}

// Helper component for perspective nodes
const MapNode = ({ 
  label,
  section,
  onNavigate,
  top, left, right, bottom, 
  baseScale, 
  rotation = 0,
  delay,
  direction
}: { 
  label: string;
  section: "projects" | "experience" | "contact";
  onNavigate: (section: "projects" | "experience" | "contact", x: number, y: number) => void;
  top?: string; left?: string; right?: string; bottom?: string;
  baseScale: number;
  rotation?: number;
  delay: number;
  direction: 'left' | 'right';
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      // Call onNavigate with the hardcoded section literal directly from this closure
      console.log(`[MapNode] ${section} clicked — origin X:${originX} Y:${originY}`);
      onNavigate(section, originX, originY);
    }
  };

  return (
    <div 
      className="absolute flex flex-col items-center pointer-events-auto" 
      style={{ top, left, right, bottom, transform: `scale(${baseScale}) rotate(${rotation}deg)` }}
    >
      <motion.div
        ref={nodeRef}
        initial={{ x: direction === 'left' ? -150 : 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 100, damping: 14 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="group p5-interactive flex flex-col items-center"
      >
        <div 
          className="px-12 py-5 border-[5px] border-[#FF0000] bg-[var(--black)] text-[var(--white)] group-hover:bg-[#FF0000] transition-colors duration-200 shadow-[0_0_30px_8px_rgba(255,0,0,0.6)]"
          style={{ 
            clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)',
          }}
        >
          <span className="text-6xl tracking-widest block drop-shadow-md" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            {label}
          </span>
        </div>
        <span 
          className="mt-4 text-2xl tracking-[0.2em] text-[var(--red)] group-hover:text-[var(--white)] transition-colors drop-shadow-md" 
          style={{ fontFamily: 'var(--font-bangers)', textShadow: '2px 2px 0px var(--black)' }}
        >
          CLICK TO ENTER
        </span>
      </motion.div>
    </div>
  );
};
