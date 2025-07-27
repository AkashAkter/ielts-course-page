"use client";

import type React from "react"; // Added React import
import { useState } from "react";
import type { Media } from "@/types/product";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
  media: Media[];
}

const getYouTubeId = (url: string) => {
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : url; // If it's already just the ID, return it
};

const getThumbnailUrl = (resourceValue: string, thumbnailUrl?: string) => {
  if (thumbnailUrl) return thumbnailUrl;
  const youtubeId = getYouTubeId(resourceValue);
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
};

const getEmbedUrl = (resourceValue: string) => {
  const youtubeId = getYouTubeId(resourceValue);
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ media }) => {
  // Explicitly defined as React.FC
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter and combine all valid media (videos and images)
  const allMedia =
    media?.filter(
      (item) =>
        (item.resource_type === "video" || item.resource_type === "image") &&
        item.resource_value
    ) || [];

  if (allMedia.length === 0) {
    return (
      <section className="bg-white rounded-lg p-4 xl:p-6 shadow-sm">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm xl:text-base">
            Preview will be available soon
          </p>
        </div>
      </section>
    );
  }

  const currentItem = allMedia[currentIndex];

  const selectItem = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const nextItem = () => selectItem((currentIndex + 1) % allMedia.length);
  const prevItem = () =>
    selectItem((currentIndex - 1 + allMedia.length) % allMedia.length);

  return (
    <section className=" p-4 xl:p-6 ">
      <div className="space-y-4">
        {/* Main Media Display */}
        <div className="aspect-video bg-black overflow-hidden relative">
          {currentItem.resource_type === "video" ? (
            !isPlaying ? (
              <div className="relative w-full h-full">
                <Image
                  src={
                    getThumbnailUrl(
                      currentItem.resource_value,
                      currentItem.thumbnail_url
                    ) || "/placeholder.svg"
                  }
                  alt={currentItem.name || "Video thumbnail"}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                  aria-label="Play video"
                >
                  <div className="bg-white/90 rounded-full p-3 shadow-lg hover:scale-105 transition-transform">
                    <Play className="text-green-600 w-6 h-6 fill-current" />
                  </div>
                </button>
              </div>
            ) : (
              <iframe
                src={getEmbedUrl(currentItem.resource_value)}
                title={currentItem.name || "Course preview video"}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )
          ) : (
            <Image
              src={currentItem.resource_value || "/placeholder.svg"}
              alt={currentItem.name || "Course image"}
              fill
              className="object-cover"
              unoptimized
            />
          )}

          {/* Navigation Arrows */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevItem}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all"
                aria-label="Next"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}
        </div>

        {/* Media Thumbnails */}
        {allMedia.length > 1 && (
          <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
            {allMedia.map((item, index) => (
              <button
                key={`${item.resource_value}-${index}`}
                onClick={() => selectItem(index)}
                className={`flex-shrink-0 relative w-24 h-16 overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-offset-2 ring-green-600"
                    : "opacity-80 hover:opacity-100"
                }`}
                aria-label={`View media ${index + 1}`}
              >
                {item.resource_type === "video" ? (
                  <>
                    <Image
                      src={
                        getThumbnailUrl(
                          item.resource_value,
                          item.thumbnail_url
                        ) || "/placeholder.svg"
                      }
                      alt={item.name || `Video thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="text-white w-4 h-4 fill-current" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.resource_value || "/placeholder.svg"}
                    alt={item.name || `Image ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlayer;
