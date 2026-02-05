"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: any }) { // Using any for MotionValue type briefly or import MotionValue
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Total frames based on user provided assets (001 to 125)
  const frameCount = 125;
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Map scroll (0-1) to frame index (1-125)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/media/ezgif-frame-${paddedIndex}.png`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages(imgArray);
            setIsLoaded(true);
          }
        };
        imgArray[i - 1] = img; // 0-based index for array
      }
    };

    loadImages();
  }, []);

  // Draw frame logic
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || images.length === 0) return;

    // Safety clamp
    let frameIdx = Math.round(index) - 1;
    if (frameIdx < 0) frameIdx = 0;
    if (frameIdx >= frameCount) frameIdx = frameCount - 1;

    const img = images[frameIdx];
    if (!img) return;

    // "object-fit: cover" logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas (crop sides)
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller than canvas (crop top/bottom)
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Enable high quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame
        renderFrame(frameIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init

    return () => window.removeEventListener("resize", handleResize);
  }, [images]); // Re-bind if images load

  // Subscribe to scroll changes to render
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      requestAnimationFrame(() => renderFrame(latest));
    }
  });

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded) {
        renderFrame(1);
    }
  }, [isLoaded]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
      />
      {/* Loading Indicator (Optional) - fades out */}
      {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white font-mono text-sm opacity-50">
              LOADING EXPERIENCE...
            </div>
      )}
    </div>
  );
}
