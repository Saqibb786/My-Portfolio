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

    // Prioritize Frame 1 to unlock UI immediately
    const loadFirstFrame = () => {
        const img = new Image();
        img.src = `/media/ezgif-frame-001.webp`;
        img.onload = () => {
            imgArray[0] = img;
            setImages(prev => {
                const newArgs = [...prev];
                newArgs[0] = img;
                return newArgs;
            });
            setIsLoaded(true); // Unlock UI immediately
            loadRemainingFrames(); // Start background load
        };
        img.onerror = () => {
             console.error("Critical: Failed to load first frame.");
             // Try to unlock anyway to avoid total softlock
             setIsLoaded(true);
             loadRemainingFrames(); 
        };
    };

    const loadRemainingFrames = async () => {
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/media/ezgif-frame-${paddedIndex}.webp`;
        
        img.onload = () => {
           // Store safely
           setImages(prev => {
                const newArgs = [...prev]; // Copy current state (might be sparse)
                if (!newArgs[0] && imgArray[0]) newArgs[0] = imgArray[0]; // Ensure frame 1 persists
                newArgs[i - 1] = img;
                return newArgs;
           });
        };
        // No error blocking
      }
    };

    loadFirstFrame();
  }, []);

  // Track the last successfully rendered frame for fallback
  const lastRenderedRef = useRef<number>(0);

  // Draw frame logic
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Safety clamp
    let frameIdx = Math.round(index) - 1;
    if (frameIdx < 0) frameIdx = 0;
    if (frameIdx >= frameCount) frameIdx = frameCount - 1;

    let img = images[frameIdx];

    // FALLBACK LOGIC: Frame Hold Strategy
    // If the required frame isn't loaded yet, find the nearest previous loaded frame
    if (!img) {
      // 1. Try last successfully rendered frame
      if (images[lastRenderedRef.current]) {
        img = images[lastRenderedRef.current];
      } 
      // 2. Search backwards from current index for *any* loaded frame
      else {
        for (let i = frameIdx - 1; i >= 0; i--) {
          if (images[i]) {
            img = images[i];
            break;
          }
        }
      }
    }

    // If still no image (should rarely happen if frame 1 is loaded), fallback to Frame 1
    if (!img && images[0]) {
        img = images[0];
    }

    // If absolutely no images are loaded, do nothing (wait for loadFirstFrame)
    if (!img) return;

    // Update last successfully rendered frame index
    // We only update this if we are rendering the *target* frame, or maybe just whatever we render?
    // Actually, we should store the index of the image we *actually* used.
    // But since 'img' doesn't store its index, we just trust the loop.
    // Simpler: If direct access worked, update ref.
    if (images[frameIdx]) {
      lastRenderedRef.current = frameIdx;
    }

    // "object-fit: cover" logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas (crop sides)
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.width); // Scaling logic fix: width * (h/h) ? No. 
      // Correct math: Scale by height match
      // scale = canvas.height / img.height
      // drawWidth = img.width * scale
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
