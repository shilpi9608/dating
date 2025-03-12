'use client';

import { useEffect, useRef } from 'react';

export default function FallingLeaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create leaves
    const leaves = [];
    const leafColors = [
      '#ffb7c5', // Light pink
      '#ffc8d6', // Lighter pink
      '#ffd9e2', // Very light pink
      '#ffe0e9', // Almost white pink
      '#ffecf1', // Extremely light pink
    ];

    const createLeaf = () => {
      return {
        x: Math.random() * canvas.width,
        y: -50 - Math.random() * 100, // Start above the viewport
        size: 15 + Math.random() * 15,
        speed: 1 + Math.random() * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        opacity: 0.6 + Math.random() * 0.4,
      };
    };

    // Initialize leaves
    for (let i = 0; i < 30; i++) {
      leaves.push(createLeaf());
    }

    // Draw a cherry blossom leaf
    const drawLeaf = (leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate((leaf.rotation * Math.PI) / 180);
      ctx.globalAlpha = leaf.opacity;

      // Draw a simple flower petal shape
      ctx.beginPath();
      ctx.fillStyle = leaf.color;

      // Draw a 5-petal flower
      for (let i = 0; i < 5; i++) {
        ctx.ellipse(
          0,
          0,
          leaf.size / 2,
          leaf.size,
          (i * 72 * Math.PI) / 180,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }

      // Draw center
      ctx.beginPath();
      ctx.fillStyle = '#fff9c4';
      ctx.arc(0, 0, leaf.size / 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update each leaf
      leaves.forEach((leaf, index) => {
        // Update position
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.y / 50) * 0.5;
        leaf.rotation += leaf.rotationSpeed;

        // Draw the leaf
        drawLeaf(leaf);

        // Reset leaf if it's off screen
        if (leaf.y > canvas.height + 50) {
          leaves[index] = createLeaf();
        }
      });

      requestAnimationFrame(animate);
    };

    // Draw blooming trees on the sides
    const drawTree = (x, y, flip = false) => {
      ctx.save();
      if (flip) {
        ctx.scale(-1, 1);
        x = -x;
      }

      // Draw trunk
      ctx.fillStyle = '#8d6e63';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 15, y - 80);
      ctx.lineTo(x - 5, y - 80);
      ctx.lineTo(x + 5, y);
      ctx.fill();

      // Draw branches
      ctx.beginPath();
      ctx.moveTo(x - 10, y - 60);
      ctx.lineTo(x - 40, y - 100);
      ctx.lineTo(x - 38, y - 102);
      ctx.lineTo(x - 8, y - 62);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - 7, y - 40);
      ctx.lineTo(x - 50, y - 60);
      ctx.lineTo(x - 48, y - 64);
      ctx.lineTo(x - 5, y - 44);
      ctx.fill();

      // Draw blossoms
      const drawBlossomCluster = (cx, cy, size) => {
        const numBlossoms = 5 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numBlossoms; i++) {
          const bx = cx + (Math.random() - 0.5) * size * 2;
          const by = cy + (Math.random() - 0.5) * size * 2;
          const bSize = size / 4 + Math.random() * (size / 4);

          ctx.globalAlpha = 0.7 + Math.random() * 0.3;
          ctx.fillStyle =
            leafColors[Math.floor(Math.random() * leafColors.length)];

          // Draw a simple flower
          for (let j = 0; j < 5; j++) {
            ctx.beginPath();
            ctx.ellipse(
              bx,
              by,
              bSize / 2,
              bSize,
              (j * 72 * Math.PI) / 180,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }

          // Draw center
          ctx.beginPath();
          ctx.fillStyle = '#fff9c4';
          ctx.arc(bx, by, bSize / 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      };

      // Draw blossom clusters
      ctx.globalAlpha = 0.9;
      drawBlossomCluster(x - 40, y - 100, 20);
      drawBlossomCluster(x - 50, y - 60, 25);
      drawBlossomCluster(x - 10, y - 90, 30);

      ctx.restore();
    };

    // Draw initial trees
    const drawTrees = () => {
      // Left tree
      drawTree(100, canvas.height - 50);

      // Right tree
      drawTree(canvas.width - 100, canvas.height - 50, true);
    };

    // Start animation
    animate();

    // Draw trees when canvas is ready
    drawTrees();

    // Redraw trees on resize
    window.addEventListener('resize', drawTrees);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', drawTrees);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full pointer-events-none'
      aria-hidden='true'
    />
  );
}
