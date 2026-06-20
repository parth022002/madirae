"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Volume2, VolumeX } from "lucide-react";

export default function ProductMediaShowcase({ mainImage, images = [], video = null, productName = "" }) {
  // Combine all images into a unique list
  const allImages = Array.from(new Set([mainImage, ...images])).filter(Boolean);
  
  const [activeMedia, setActiveMedia] = useState(allImages[0] || "");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleSelectImage = (img) => {
    setActiveMedia(img);
    setIsVideoPlaying(false);
  };

  const handleSelectVideo = () => {
    setActiveMedia("video");
    setIsVideoPlaying(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Preview Container */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#161514] to-[#0a0909] shadow-2xl flex items-center justify-center p-6 sm:p-10 group">
        
        {/* Soft Gold Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,164,65,0.03),transparent_60%)] pointer-events-none" />

        {activeMedia === "video" && video ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <video 
              src={video} 
              className="w-full h-full object-contain rounded-xl" 
              autoPlay 
              muted={isMuted} 
              loop 
              playsInline 
              controls 
              preload="metadata" 
            />
            {/* Custom Sound Toggle Overlay */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-black/60 border border-white/10 text-gold hover:text-white transition backdrop-blur-sm"
              title={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image 
              src={activeMedia} 
              alt={`${productName} showcase`} 
              fill 
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-2 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {((allImages.length > 1) || video) && (
        <div className="flex flex-wrap gap-2.5 justify-center">
          
          {/* Image Thumbnails */}
          {allImages.map((img, idx) => {
            const isActive = activeMedia === img;
            return (
              <button
                key={idx}
                onClick={() => handleSelectImage(img)}
                className={`
                  relative h-14 w-14 rounded-lg overflow-hidden border bg-[#11100e] p-1 transition duration-200 shrink-0
                  ${isActive 
                    ? "border-gold shadow-glow-sm scale-95" 
                    : "border-white/10 hover:border-gold/50"
                  }
                `}
                aria-label={`View product image ${idx + 1}`}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={img} 
                    alt="" 
                    fill 
                    sizes="56px"
                    className="object-contain" 
                  />
                </div>
              </button>
            );
          })}

          {/* Video Thumbnail */}
          {video && (
            <button
              onClick={handleSelectVideo}
              className={`
                relative h-14 w-14 rounded-lg overflow-hidden border bg-black flex items-center justify-center transition duration-200 shrink-0
                ${activeMedia === "video" 
                  ? "border-gold shadow-glow-sm scale-95" 
                  : "border-white/10 hover:border-gold/50"
                }
              `}
              aria-label="Play product video preview"
            >
              {allImages[0] ? (
                <>
                  <div className="absolute inset-0 opacity-40">
                    <Image src={allImages[0]} alt="" fill sizes="56px" className="object-contain" />
                  </div>
                  <div className="z-10 h-6 w-6 rounded-full bg-gold/85 flex items-center justify-center text-ink shadow-sm">
                    <Play className="h-3 w-3 fill-ink ml-0.5" />
                  </div>
                </>
              ) : (
                <Play className="h-5 w-5 text-gold" />
              )}
            </button>
          )}

        </div>
      )}
    </div>
  );
}
