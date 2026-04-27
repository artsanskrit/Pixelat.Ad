"use client";

import { useEffect, useRef, useState } from 'react';

export default function HeroGraphic() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('PLAYING'); // PLAYING or GAME_OVER

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set fixed physical size for sharp pixels
    canvas.width = 400;
    canvas.height = 400;
    
    // Pixel grid configuration
    const cols = 32;
    const rows = 32;
    const cw = canvas.width / cols;
    const ch = canvas.height / rows;
    
    // Palettes
    const colors = {
      bg: '#050508',
      grid: '#11111a',
      red: '#e5333f',
      white: '#e8e8f0',
      dim: '#84849a',
      circuit: '#222233',
      snakeHead: '#00f0ff',
      food: '#e5333f'
    };

    // Game State
    let snake = [{ x: 16, y: 16 }, { x: 15, y: 16 }, { x: 14, y: 16 }];
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let food = { x: 24, y: 16 };
    let frameCount = 0;
    const speed = 6; // Move every 6 frames (approx 10fps at 60Hz)
    let animationFrameId;
    let isGameOver = false;

    const spawnFood = () => {
      let newFood;
      while (true) {
        newFood = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
        // Check if food spawns on snake
        const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        if (!onSnake) break;
      }
      food = newFood;
    };

    const handleKeyDown = (e) => {
      // Prevent quick reverse causing self-collision
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
          e.preventDefault(); // Prevent scrolling
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
          e.preventDefault();
          break;
        case ' ': // Spacebar to restart
          if (isGameOver) {
            resetGame();
          }
          e.preventDefault();
          break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const resetGame = () => {
      snake = [{ x: 16, y: 16 }, { x: 15, y: 16 }, { x: 14, y: 16 }];
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      isGameOver = false;
      setScore(0);
      setStatus('PLAYING');
      spawnFood();
    };

    const drawPixel = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * cw, y * ch, cw - 1, ch - 1);
    };

    const drawGrid = () => {
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cw, 0);
        ctx.lineTo(i * cw, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * ch);
        ctx.lineTo(canvas.width, i * ch);
        ctx.stroke();
      }
    };

    const drawGameOver = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.red;
      ctx.font = '30px "VT323", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

      ctx.fillStyle = colors.white;
      ctx.font = '16px "Space Mono", monospace';
      ctx.fillText('PRESS SPACE TO RESTART', canvas.width / 2, canvas.height / 2 + 20);
    };

    const gameLoop = () => {
      // Clear
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();

      if (isGameOver) {
        drawGameOver();
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      // Update Logic at specific intervals to control speed
      frameCount++;
      if (frameCount >= speed) {
        frameCount = 0;
        direction = nextDirection;
        
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        
        // Wall collision (wrap around or die. let's die on walls for classic snake)
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
          isGameOver = true;
          setStatus('GAME_OVER');
        }

        // Self collision
        if (!isGameOver) {
          for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
              isGameOver = true;
              setStatus('GAME_OVER');
              break;
            }
          }
        }

        if (!isGameOver) {
          snake.unshift(head);
          
          // Food collision
          if (head.x === food.x && head.y === food.y) {
            setScore(s => s + 10);
            spawnFood();
          } else {
            snake.pop(); // Remove tail
          }
        }
      }

      // Render
      drawPixel(food.x, food.y, colors.food);
      // Food blink effect
      if (Math.floor(Date.now() / 200) % 2 === 0) {
        ctx.fillStyle = 'rgba(229, 51, 63, 0.5)';
        ctx.fillRect(food.x * cw - 2, food.y * ch - 2, cw + 3, ch + 3);
      }

      for (let i = 0; i < snake.length; i++) {
        const color = i === 0 ? colors.snakeHead : colors.white;
        drawPixel(snake[i].x, snake[i].y, color);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-graphic">
      <div className="hero-canvas-frame">
        <canvas id="hero-graphic-canvas" ref={canvasRef} tabIndex={0}></canvas>
        <div className="hero-graphic-meta">
          <span>[ SNAKE_OS ]</span>
          <div className="meta-stats">
            <span>SCORE: {score.toString().padStart(4, '0')}</span>
            <span>{status === 'PLAYING' ? 'LIVE' : 'HALTED'}</span>
            <span className={status === 'PLAYING' ? 'live-status' : ''} style={{color: status === 'PLAYING' ? '#00f0ff' : '#e5333f'}}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
