'use client'
import { useEffect, useRef, useCallback } from 'react'

const DOT_SPACING = 12
const DOT_RADIUS = 2
const MAX_RADIUS = 5.5
const INFLUENCE_RADIUS = 120
const LERP_SPEED = 0.12
const DOT_COLOR = 'rgba(255, 0, 0, 0.35)'

export default function InteractiveDotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef<number>()
  const dotsRef = useRef<{ x: number; y: number; r: number }[]>([])

  const buildGrid = useCallback((w: number, h: number) => {
    const dots: { x: number; y: number; r: number }[] = []
    for (let y = 0; y < h + DOT_SPACING; y += DOT_SPACING)
      for (let x = 0; x < w + DOT_SPACING; x += DOT_SPACING)
        dots.push({ x, y, r: DOT_RADIUS })
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildGrid(window.innerWidth, window.innerHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const handleMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = DOT_COLOR
      ctx.beginPath()

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const t = Math.max(0, 1 - dist / INFLUENCE_RADIUS)
        const target = DOT_RADIUS + (MAX_RADIUS - DOT_RADIUS) * t * t
        dot.r += (target - dot.r) * LERP_SPEED

        ctx.moveTo(dot.x + dot.r, dot.y)
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
      }

      ctx.fill()
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [buildGrid])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
