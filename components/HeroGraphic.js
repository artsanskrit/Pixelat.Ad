"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const COLS = 24;
const ROWS = 24;
const BASE_SPEED = 14;     // frames between moves at level 1 (lower = faster)
const MIN_SPEED  = 4;      // fastest possible (capped)
const LEVEL_EVERY = 5;     // score points per level up

export default function HeroGraphic() {
  const canvasRef   = useRef(null);
  const stateRef    = useRef(null); // mutable game state (avoids stale closures)
  const rafRef      = useRef(null);

  const [score,    setScore]    = useState(0);
  const [level,    setLevel]    = useState(1);
  const [status,   setStatus]   = useState('PLAYING'); // 'PLAYING' | 'GAME_OVER'
  const [canvasSize, setCanvasSize] = useState(400);
  const [isFirstGameOver, setIsFirstGameOver] = useState(true);

  // ── Touch swipe tracking ──────────────────────────────────────────
  const touchStart = useRef(null);

  // ── Check localStorage for first game over ───────────────────────
  useEffect(() => {
    const seen = localStorage.getItem('pixelatad_gameover_seen');
    if (seen) setIsFirstGameOver(false);
  }, []);

  // ── Initialise / reset game state ────────────────────────────────
  const initState = useCallback(() => ({
    snake: [{ x: 12, y: 12 }, { x: 11, y: 12 }, { x: 10, y: 12 }],
    direction:     { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food:          { x: 18, y: 12 },
    frameCount:    0,
    score:         0,
    level:         1,
    isGameOver:    false,
  }), []);

  const spawnFood = (snake) => {
    let f;
    do {
      f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === f.x && s.y === f.y));
    return f;
  };

  const speedForLevel = (lvl) =>
    Math.max(MIN_SPEED, BASE_SPEED - (lvl - 1) * 1.5 | 0);

  // ── Canvas responsive sizing ──────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const frame = canvasRef.current?.parentElement;
      if (!frame) return;
      const w = Math.min(frame.clientWidth - 32, 400); // padding offset
      setCanvasSize(Math.max(240, w));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Main game loop ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width  = canvasSize;
    canvas.height = canvasSize;

    const cw = canvasSize / COLS;
    const ch = canvasSize / ROWS;

    // Seed initial state
    stateRef.current = initState();

    const colors = {
      bg:        '#050508',
      grid:      '#11111a',
      red:       '#e5333f',
      white:     '#e8e8f0',
      dim:       '#84849a',
      snakeHead: '#00f0ff',
      snakeGlow: 'rgba(0,240,255,0.25)',
    };

    const drawPixel = (x, y, color, glow) => {
      if (glow) {
        ctx.shadowColor = glow;
        ctx.shadowBlur  = 8;
      }
      ctx.fillStyle = color;
      ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
      ctx.shadowBlur = 0;
    };

    const drawGrid = () => {
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth   = 0.5;
      for (let i = 0; i <= COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * cw, 0); ctx.lineTo(i * cw, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * ch); ctx.lineTo(canvas.width, i * ch); ctx.stroke();
      }
    };

    const gameLoop = () => {
      const st = stateRef.current;

      // ── Clear ───────────────────────────────────────────────────
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      if (st.isGameOver) {
        rafRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // ── Update ──────────────────────────────────────────────────
      st.frameCount++;
      const speed = speedForLevel(st.level);
      if (st.frameCount >= speed) {
        st.frameCount = 0;
        st.direction  = st.nextDirection;

        const head = {
          x: st.snake[0].x + st.direction.x,
          y: st.snake[0].y + st.direction.y,
        };

        // Wall collision
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          st.isGameOver = true;
          setStatus('GAME_OVER');
          rafRef.current = requestAnimationFrame(gameLoop);
          return;
        }

        // Self collision
        if (st.snake.some(s => s.x === head.x && s.y === head.y)) {
          st.isGameOver = true;
          setStatus('GAME_OVER');
          rafRef.current = requestAnimationFrame(gameLoop);
          return;
        }

        st.snake.unshift(head);

        if (head.x === st.food.x && head.y === st.food.y) {
          const newScore = st.score + 10;
          const newLevel = Math.floor(newScore / (LEVEL_EVERY * 10)) + 1;
          st.score = newScore;
          st.level = newLevel;
          st.food  = spawnFood(st.snake);
          setScore(newScore);
          setLevel(newLevel);
        } else {
          st.snake.pop();
        }
      }

      // ── Render food ─────────────────────────────────────────────
      const blink = Math.floor(Date.now() / 300) % 2 === 0;
      if (blink) {
        ctx.fillStyle = 'rgba(229,51,63,0.2)';
        ctx.fillRect(st.food.x * cw - 2, st.food.y * ch - 2, cw + 4, ch + 4);
      }
      drawPixel(st.food.x, st.food.y, colors.red, colors.red);

      // ── Render snake ────────────────────────────────────────────
      for (let i = st.snake.length - 1; i >= 0; i--) {
        const isHead = i === 0;
        const shade = isHead
          ? colors.snakeHead
          : `rgba(${232 - i * 4}, ${232 - i * 4}, ${240 - i * 3}, ${Math.max(0.3, 1 - i * 0.04)})`;
        drawPixel(st.snake[i].x, st.snake[i].y, shade, isHead ? colors.snakeGlow : null);
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    };

    rafRef.current = requestAnimationFrame(gameLoop);

    // ── Keyboard controls ────────────────────────────────────────
    const handleKeyDown = (e) => {
      const st = stateRef.current;
      const nd = st.nextDirection;
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'W':
          if (st.direction.y !== 1)  st.nextDirection = { x: 0, y: -1 };
          e.preventDefault(); break;
        case 'ArrowDown':  case 's': case 'S':
          if (st.direction.y !== -1) st.nextDirection = { x: 0, y:  1 };
          e.preventDefault(); break;
        case 'ArrowLeft':  case 'a': case 'A':
          if (st.direction.x !== 1)  st.nextDirection = { x: -1, y: 0 };
          e.preventDefault(); break;
        case 'ArrowRight': case 'd': case 'D':
          if (st.direction.x !== -1) st.nextDirection = { x:  1, y: 0 };
          e.preventDefault(); break;
        case ' ':
          if (st.isGameOver) { stateRef.current = initState(); setStatus('PLAYING'); setScore(0); setLevel(1); }
          e.preventDefault(); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasSize, initState]);

  // ── Touch swipe handler ───────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return; // tap — ignore
    const st = stateRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && st.direction.x !== -1) st.nextDirection = { x:  1, y: 0 };
      if (dx < 0 && st.direction.x !==  1) st.nextDirection = { x: -1, y: 0 };
    } else {
      if (dy > 0 && st.direction.y !== -1) st.nextDirection = { x: 0, y:  1 };
      if (dy < 0 && st.direction.y !==  1) st.nextDirection = { x: 0, y: -1 };
    }
  };

  // ── D-pad button press ────────────────────────────────────────────
  const dpad = (dx, dy) => {
    const st = stateRef.current;
    if (!st) return;
    if (dx ===  1 && st.direction.x !== -1) st.nextDirection = { x:  1, y: 0 };
    if (dx === -1 && st.direction.x !==  1) st.nextDirection = { x: -1, y: 0 };
    if (dy ===  1 && st.direction.y !== -1) st.nextDirection = { x: 0, y:  1 };
    if (dy === -1 && st.direction.y !==  1) st.nextDirection = { x: 0, y: -1 };
  };

  const restart = () => {
    stateRef.current = initState();
    setStatus('PLAYING');
    setScore(0);
    setLevel(1);
    // After first game-over is dismissed, all future ones show compact screen
    localStorage.setItem('pixelatad_gameover_seen', '1');
    setIsFirstGameOver(false);
  };

  return (
    <div className="hero-graphic">
      <div className="hero-canvas-frame" style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
        
        {/* Canvas */}
        <canvas
          id="hero-graphic-canvas"
          ref={canvasRef}
          tabIndex={0}
          style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        {/* Game Over Overlay — First Time: full marketing message */}
        {status === 'GAME_OVER' && isFirstGameOver && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,5,8,0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            gap: '0.75rem',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#e5333f', letterSpacing: '0.1em', lineHeight: 1 }}>
              GAME_OVER
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#84849a', letterSpacing: '0.15em' }}>
              SCORE: {score.toString().padStart(4, '0')} · LVL {level}
            </div>
            <div style={{ width: '60%', height: '1px', background: 'var(--c-grid)', margin: '0.25rem 0' }} />
            <Image src="/logo.png" alt="Pixelat.Ad" width={140} height={35} style={{ height: '28px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
            <div style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', color: '#e8e8f0', lineHeight: 1.2 }}>
              Your brand is stuck<br/>
              <span style={{ color: '#e5333f' }}>in a loop.</span>
            </div>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: '#84849a', lineHeight: 1.6, maxWidth: '280px' }}>
              Just like this snake, your marketing<br/>might be going in circles.
              <br/>We fix that — <span style={{ color: '#00f0ff' }}>pixel by pixel.</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: '240px', marginTop: '0.25rem' }}>
              <Link
                href="/services"
                style={{
                  display: 'block',
                  background: '#e5333f',
                  color: '#fff',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  padding: '0.75rem 1rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
                  textDecoration: 'none',
                }}
              >
                Level Up Your Brand →
              </Link>
              <button
                onClick={restart}
                style={{
                  background: 'transparent',
                  border: '1px solid #222233',
                  color: '#84849a',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  padding: '0.65rem 1rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor='#e5333f'; e.target.style.color='#e8e8f0'; }}
                onMouseLeave={e => { e.target.style.borderColor='#222233'; e.target.style.color='#84849a'; }}
              >
                Try Again [ SPACE ]
              </button>
            </div>
          </div>
        )}

        {/* Game Over Overlay — Returning player: compact restart prompt */}
        {status === 'GAME_OVER' && !isFirstGameOver && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5,5,8,0.88)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            textAlign: 'center',
            gap: '0.6rem',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(2rem, 6vw, 3rem)', color: '#e5333f', letterSpacing: '0.1em', lineHeight: 1 }}>
              GAME_OVER
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#84849a', letterSpacing: '0.15em' }}>
              SCORE: {score.toString().padStart(4, '0')} · LVL {level}
            </div>
            <div style={{ width: '60%', height: '1px', background: 'var(--c-grid)', margin: '0.25rem 0' }} />
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: '#84849a' }}>
              Better luck next time, pixel warrior.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '220px', marginTop: '0.5rem' }}>
              <button
                onClick={restart}
                style={{
                  background: '#e5333f',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  padding: '0.75rem 1rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
                }}
              >
                Play Again [ SPACE ]
              </button>
              <Link
                href="/services"
                style={{
                  display: 'block',
                  background: 'transparent',
                  border: '1px solid #222233',
                  color: '#84849a',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  padding: '0.65rem 1rem',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                View Our Services
              </Link>
            </div>
          </div>
        )}

        {/* Meta bar */}
        <div className="hero-graphic-meta">
          <span>[ SNAKE_OS ]</span>
          <div className="meta-stats">
            <span>LVL:{level.toString().padStart(2,'0')}</span>
            <span>SCORE:{score.toString().padStart(4,'0')}</span>
            <span className={status === 'PLAYING' ? 'live-status' : ''} style={{ color: status === 'PLAYING' ? '#00f0ff' : '#e5333f' }}>
              {status}
            </span>
          </div>
        </div>

        {/* Mobile D-Pad */}
        <div className="snake-dpad">
          <button className="dpad-btn dpad-up"    onPointerDown={() => dpad( 0,-1)} aria-label="Up">▲</button>
          <button className="dpad-btn dpad-left"  onPointerDown={() => dpad(-1, 0)} aria-label="Left">◀</button>
          <button className="dpad-btn dpad-center" aria-hidden="true"></button>
          <button className="dpad-btn dpad-right" onPointerDown={() => dpad( 1, 0)} aria-label="Right">▶</button>
          <button className="dpad-btn dpad-down"  onPointerDown={() => dpad( 0, 1)} aria-label="Down">▼</button>
        </div>

      </div>
    </div>
  );
}
