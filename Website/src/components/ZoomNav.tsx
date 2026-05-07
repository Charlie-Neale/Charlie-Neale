"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeMap from "./HomeMap";
import SectionPanel from "./SectionPanel";

export type SectionType = "projects" | "experience" | "contact" | null;

// ── Easing ────────────────────────────────────────────────────────────────────
// Aggressive ease-in: starts slow, ends at full speed → feels like acceleration
const ACCEL_EASE: [number, number, number, number] = [0.4, 0, 1, 1];
// Aggressive ease-out: starts at full speed, brakes smoothly → feels like deceleration
const DECEL_EASE: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Map animation keyframes ───────────────────────────────────────────────────
const MAP_IDLE = { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 };
// MAP_EXITED is now computed dynamically per node click
type MapAnimState = typeof MAP_IDLE;

// Panel fades in while map is still sliding
const PANEL_APPEAR_DELAY_MS = 400;
// Panel exit duration before map rides back
const PANEL_EXIT_MS = 300;

export default function ZoomNav() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [showPanel, setShowPanel]         = useState(false);

  const [mapAnim, setMapAnim]             = useState<MapAnimState>(MAP_IDLE);
  const [mapTransition, setMapTransition] = useState<object>({
    duration: 0.65,
    ease: ACCEL_EASE,
  });

  // ── Stale-closure guard ───────────────────────────────────────────────────
  const targetSectionRef  = useRef<SectionType>(null);
  const timerRefs         = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Stores the computed exit state so back nav reverses the exact same path
  const lastExitRef       = useRef<MapAnimState>(MAP_IDLE);
  const mapContainerRef   = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };
  const schedule = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timerRefs.current.push(t);
  };

  const navigateTo = (section: SectionType, nodeCenterX?: number, nodeCenterY?: number) => {
    clearTimers();

    if (section === null) {
      // ── BACK ─────────────────────────────────────────────────────────────
      // 1. Panel exits to top-right (AnimatePresence handles the exit animation)
      setShowPanel(false);

      // 2. After panel is gone, decelerate map back along the exact same path
      schedule(() => {
        // Map is currently at lastExitRef.current; animate back to idle
        if (mapContainerRef.current) {
          mapContainerRef.current.style.transformOrigin = '50% 50%';
        }
        setMapTransition({ duration: 0.6, ease: DECEL_EASE });
        setMapAnim(MAP_IDLE);
        // 3. Clean up section after map settles
        schedule(() => setActiveSection(null), 650);
      }, PANEL_EXIT_MS);
      return;
    }

    // ── FORWARD ──────────────────────────────────────────────────────────────
    // Step 1: Lock in target section via ref
    targetSectionRef.current = section;

    // Step 2: Compute dynamic travel distance from node's screen position
    let exitAnim: MapAnimState = { x: -800, y: 600, scale: 2.5, rotate: 4, opacity: 0 };
    if (nodeCenterX !== undefined && nodeCenterY !== undefined) {
      const travelX = -(nodeCenterX / window.innerWidth)  * 900;
      const travelY =  ((window.innerHeight - nodeCenterY) / window.innerHeight) * 900;

      exitAnim = { x: travelX, y: travelY, scale: 2.5, rotate: 4, opacity: 0 };

      // Anchor transform origin to the node's screen position BEFORE framer-motion animates
      if (mapContainerRef.current) {
        mapContainerRef.current.style.transformOrigin = `${nodeCenterX}px ${nodeCenterY}px`;
      }
    }

    // Step 3: Store exit anim so back navigation reverses the same path
    lastExitRef.current = exitAnim;

    // Step 4: Blast the map along the computed rail vector
    setMapTransition({ duration: 0.7, ease: ACCEL_EASE });
    setMapAnim(exitAnim);

    // Step 5: At 400ms (map still flying), reveal the panel arriving from top-right
    schedule(() => {
      setActiveSection(targetSectionRef.current);
      setShowPanel(true);
    }, PANEL_APPEAR_DELAY_MS);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--black)]">

      {/* ── Map container — always mounted, animated as a single unit ── */}
      <motion.div
        ref={mapContainerRef}
        animate={mapAnim}
        transition={mapTransition as never}
        style={{ willChange: "transform" }}
        className="absolute inset-0 w-full h-full"
      >
        <HomeMap onNavigate={navigateTo} />
      </motion.div>

      {/* ── Section panel — arrives from top-right, exits back that way ── */}
      <AnimatePresence>
        {showPanel && activeSection && (
          <motion.div
            key={`panel-${activeSection}`}
            // Arrive from top-right direction (where you were heading)
            initial={{ opacity: 0, x: 200, y: -150 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            // Exit back toward top-right
            exit={{ opacity: 0, x: 300, y: -200 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-30"
          >
            <SectionPanel section={activeSection} onBack={() => navigateTo(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
