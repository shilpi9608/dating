'use client';

import { useEffect, useRef } from 'react';

export default function FallingLeaves() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define leaf colors for cherry blossoms (pink) and autumn leaves (red/orange/yellow)
    const cherryBlossomColors = [
      '#ffb7c5',
      '#ffc8d6',
      '#ffd9e2',
      '#ffe0e9',
      '#ffecf1',
    ];
    const autumnColors = [
      '#ff7b00',
      '#ffab40',
      '#ffd54f',
      '#8d6e63',
      '#a52a2a',
    ];

    // Change this to `cherryBlossomColors` for a cherry blossom effect
    const leafColors = autumnColors;

    // Create leaf objects
    const leaves = [];
    const createLeaf = () => {
      return {
        x: Math.random() * canvas.width,
        y: -50 - Math.random() * 100, // Start above screen
        size: 15 + Math.random() * 20, // Leaf size variation
        speed: 1 + Math.random() * 2, // Falling speed
        sway: (Math.random() - 0.5) * 2, // Left-right movement
        rotation: Math.random() * 360, // Random start rotation
        rotationSpeed: (Math.random() - 0.5) * 2, // Rotation speed
        color: leafColors[Math.floor(Math.random() * leafColors.length)], // Random color
        opacity: 0.6 + Math.random() * 0.4, // Random opacity
      };
    };

    // Generate leaves
    for (let i = 0; i < 40; i++) {
      leaves.push(createLeaf());
    }

    // Draw a single leaf
    const drawLeaf = (leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate((leaf.rotation * Math.PI) / 180);
      ctx.globalAlpha = leaf.opacity;

      // Draw a maple leaf or cherry blossom petal
      ctx.fillStyle = leaf.color;
      ctx.beginPath();

      if (leafColors === autumnColors) {
        // Maple-style leaf
        for (let i = 0; i < 5; i++) {
          ctx.ellipse(
            0,
            0,
            leaf.size / 3,
            leaf.size,
            (i * 72 * Math.PI) / 180,
            0,
            2 * Math.PI
          );
        }
      } else {
        // Cherry blossom petal
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
        }
      }
      ctx.fill();

      ctx.restore();
    };

    // Animate leaves
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach((leaf, index) => {
        // Falling motion
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.y / 50) * leaf.sway; // Swaying effect
        leaf.rotation += leaf.rotationSpeed; // Rotation effect

        drawLeaf(leaf);

        // Reset leaf when it falls out of view
        if (leaf.y > canvas.height + 50) {
          leaves[index] = createLeaf();
        }
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
