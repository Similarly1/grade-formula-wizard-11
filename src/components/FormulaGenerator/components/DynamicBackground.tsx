
import { useEffect, useMemo, useRef } from 'react';

interface DynamicBackgroundProps {
  pointsMax: number;
  seuilMinimalPoints: number;
  noteMin: number;
  noteMax: number;
}

export const DynamicBackground = ({ pointsMax, seuilMinimalPoints, noteMin, noteMax }: DynamicBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate colors based on parameters
  const colors = useMemo(() => {
    // Color mapping based on parameter values
    const color1 = getColorForPointsMax(pointsMax);
    const color2 = getColorForSeuilMinimal(seuilMinimalPoints);
    const color3 = getColorForNoteRange(noteMin, noteMax);
    
    return [color1, color2, color3];
  }, [pointsMax, seuilMinimalPoints, noteMin, noteMax]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawBackground(ctx, canvas.width, canvas.height, colors);
      }
    });

    resizeObserver.observe(document.body);

    // Draw initial background
    drawBackground(ctx, canvas.width, canvas.height, colors);

    return () => {
      resizeObserver.disconnect();
    };
  }, [colors]);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    colors: string[]
  ) => {
    // Create gradient with multiple color stops
    const gradient = ctx.createRadialGradient(
      width * 0.3, height * 0.3, 0,
      width * 0.5, height * 0.5, Math.max(width, height) * 0.8
    );
    
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some "blob" effects
    drawBlob(ctx, width * 0.7, height * 0.3, Math.min(width, height) * 0.4, colors[0] + "88");
    drawBlob(ctx, width * 0.2, height * 0.7, Math.min(width, height) * 0.3, colors[1] + "88");
  };

  const drawBlob = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    radius: number, 
    color: string
  ) => {
    ctx.beginPath();
    ctx.filter = "blur(60px)";
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.filter = "none";
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Helper functions to map parameters to colors
function getColorForPointsMax(pointsMax: number): string {
  if (pointsMax <= 20) return "#8B5CF6"; // Purple
  if (pointsMax <= 25) return "#D946EF"; // Pink
  if (pointsMax <= 30) return "#EA384C"; // Red
  if (pointsMax <= 40) return "#881337"; // Dark red
  return "#581C87"; // Dark purple
}

function getColorForSeuilMinimal(seuil: number): string {
  if (seuil <= 10) return "#33C3F0"; // Sky blue
  if (seuil <= 15) return "#F97316"; // Orange
  if (seuil <= 20) return "#FACC15"; // Yellow
  return "#22C55E"; // Green
}

function getColorForNoteRange(min: number, max: number): string {
  const diff = max - min;
  if (diff <= 2) return "#6366F1"; // Indigo
  if (diff <= 4) return "#3B82F6"; // Blue
  if (diff <= 6) return "#06B6D4"; // Cyan
  return "#14B8A6"; // Teal
}
