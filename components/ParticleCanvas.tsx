import React, { useRef, useEffect } from 'react';

interface ParticleCanvasProps {
  isActive: boolean;
  themeColor: string;
  mousePosition: { x: number; y: number };
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ isActive, themeColor, mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameId = useRef<number>();

  const rgbaColor = themeColor.replace('rgba(', '').replace(')', '').split(',').map(Number);
  const particleColor = `rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, 0.7)`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          radius: Math.random() * 1.5 + 0.5,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height,
        });
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        // Interaction with mouse
        const dist = Math.hypot(p.x - mousePosition.x, p.y - mousePosition.y);
        if (dist < 150) {
          const angle = Math.atan2(p.y - mousePosition.y, p.x - mousePosition.x);
          p.x += Math.cos(angle) * 1;
          p.y += Math.sin(angle) * 1;
        } else {
            // Return to original position
             if (Math.hypot(p.x - p.originalX, p.y - p.originalY) > 1) {
                p.x += (p.originalX - p.x) * 0.01;
                p.y += (p.originalY - p.y) * 0.01;
             }
        }
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isActive, particleColor, mousePosition]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" />;
};

export default ParticleCanvas;
