import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { SectionId, SectionTheme } from '../types';
import AnimateOnScroll from './AnimateOnScroll';
import { SKILLS_CATEGORIES, SKILLS_DATA_GRAPH } from '../constants';

interface SkillsProps {
  activeTheme: SectionTheme;
  mousePosition: { x: number; y: number };
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  radius: number;
  text: string;
  category: string;
  relations: string[];
}

const Skills = forwardRef<HTMLElement, SkillsProps>(({ activeTheme, mousePosition }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Use a ref to hold the latest mouse position to avoid re-triggering effects
  const mousePosRef = useRef(mousePosition);
  useEffect(() => {
    mousePosRef.current = mousePosition;
  }, [mousePosition]);


  // Effect for initializing and resizing nodes
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      if(canvasRef.current){
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      
      const newNodes: Node[] = [];
      const skillsByCategory: { [key: string]: typeof SKILLS_DATA_GRAPH } = {};
      
      SKILLS_DATA_GRAPH.forEach(skill => {
        if (!skillsByCategory[skill.category]) {
          skillsByCategory[skill.category] = [];
        }
        skillsByCategory[skill.category].push(skill);
      });
      
      SKILLS_CATEGORIES.forEach((category, categoryIndex) => {
        const skills = skillsByCategory[category] || [];
        const x = (width / (SKILLS_CATEGORIES.length + 1)) * (categoryIndex + 1);
        
        skills.forEach((skill, skillIndex) => {
          const y = (height / (skills.length + 1)) * (skillIndex + 1);
          newNodes.push({
            id: skill.id,
            x, y, vx: 0, vy: 0, originalX: x, originalY: y,
            radius: 8, text: skill.name, category: skill.category,
            relations: skill.relations,
          });
        });
      });
      setNodes(newNodes);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect for physics animation loop
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const mouseX = mousePosRef.current.x - containerRect.left;
      const mouseY = mousePosRef.current.y - containerRect.top;

      setNodes(currentNodes =>
        currentNodes.map(node => {
          let { x, y, vx, vy } = node;

          // Mouse repulsion
          const distToMouse = Math.hypot(x - mouseX, y - mouseY);
          if (distToMouse < 120) {
            const angle = Math.atan2(y - mouseY, x - mouseX);
            const repulsionForce = 0.2;
            vx += Math.cos(angle) * repulsionForce;
            vy += Math.sin(angle) * repulsionForce;
          }

          // Spring force to original position
          vx += (node.originalX - x) * 0.01;
          vy += (node.originalY - y) * 0.01;

          // Damping
          vx *= 0.92;
          vy *= 0.92;

          x += vx;
          y += vy;
          return { ...node, x, y, vx, vy };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Empty dependency array ensures the loop starts once

  // Effect for drawing on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || nodes.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rgbaColor = activeTheme.glowColor.replace('rgba(', '').replace(')', '').split(',').map(Number);

    // FIX: Explicitly type `nodesById` to resolve type inference issues where properties on `nodeB` could not be accessed.
    const nodesById: Map<string, Node> = new Map(nodes.map(node => [node.id, node]));
    const drawnConnections = new Set<string>();

    nodes.forEach(nodeA => {
      if (!nodeA.relations) return;
      
      nodeA.relations.forEach(relatedId => {
        const nodeB = nodesById.get(relatedId);
        if (!nodeB) return;

        const connectionId = [nodeA.id, nodeB.id].sort().join('-');
        if (drawnConnections.has(connectionId)) return;
        drawnConnections.add(connectionId);
        
        const isHovered = hoveredNodeId === nodeA.id || hoveredNodeId === nodeB.id;
        
        const opacity = isHovered ? 0.8 : 0.15;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = `rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, ${opacity})`;
        ctx.lineWidth = isHovered ? 1.5 : 0.5;
        ctx.stroke();
      });
    });
  }, [nodes, activeTheme.glowColor, hoveredNodeId]);

  return (
    <section ref={ref} id={SectionId.Skills} className="min-h-screen flex flex-col justify-center py-20">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Skills Network</h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <div ref={containerRef} className="relative w-full h-[500px]">
          <canvas ref={canvasRef} className="absolute inset-0" />
          {nodes.map(node => (
            <div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                willChange: 'left, top'
              }}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              <div 
                className="w-4 h-4 rounded-full bg-slate-400 transition-all duration-300"
                style={{
                  transform: `scale(${hoveredNodeId === node.id ? 1.5 : 1})`, // Subtler scale effect
                  backgroundColor: hoveredNodeId === node.id ? activeTheme.glowColor.replace('0.2', '1') : undefined,
                  boxShadow: `0 0 12px ${activeTheme.glowColor.replace('0.2', '0.6')}`
                }}
              />
              <span 
                className="absolute left-5 top-1/2 w-max px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs transition-all duration-300 delay-100 pointer-events-none z-10"
                style={{
                  opacity: hoveredNodeId === node.id ? 1 : 0,
                  transform: `translateY(-50%) ${hoveredNodeId === node.id ? 'translateX(0)' : 'translateX(-10px)'}`,
                }}
              >
                {node.text}
              </span>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
});

export default Skills;