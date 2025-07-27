"use client";

import { useState } from "react";
import type { Media } from "@/types/product";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
  media: Media[];
}

export default function VideoPlayer({ media }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter only video media with proper null checks
  const videos =
    media?.filter(
      (item) => item.resource_type === "video" && item.resource_value
    ) || [];

  if (videos.length === 0) {
    return (
      <section className="bg-white rounded-lg p-4 xl:p-6">
        <h3 className="text-lg xl:text-2xl font-bold mb-3 xl:mb-4 text-[#111827]">
          Course Preview
        </h3>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm xl:text-base">
            Video preview will be available soon
          </p>
        </div>
      </section>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="bg-white rounded-lg p-3 xl:p-6">
      <h3 className="text-lg xl:text-2xl font-bold mb-3 xl:mb-4 text-[#111827]">
        Course Preview
      </h3>

      <div className="relative">
        {/* Main Video Player */}
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-3 xl:mb-4">
          {!isPlaying ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {currentVideo.thumbnail_url ? (
                <Image
                  src={currentVideo.thumbnail_url || "/placeholder.svg"}
                  alt={currentVideo.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={`https://img.youtube.com/vi/${currentVideo.resource_value}/mqdefault.jpg`}
                  alt={currentVideo.name}
                  fill
                  className="object-cover"
                />
              )}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition"
              >
                <Play size={50} className="text-white" />
              </button>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.resource_value}?autoplay=1`}
              title={currentVideo.name}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>

        {/* Video Navigation */}
        {videos.length > 1 && (
          <div className="flex items-center justify-between mb-3 xl:mb-4">
            <button
              onClick={prevVideo}
              className="flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-2"
              disabled={videos.length <= 1}
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>

            <span className="text-xs xl:text-sm text-gray-600">
              {currentVideoIndex + 1} of {videos.length}
            </span>

            <button
              onClick={nextVideo}
              className="flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-2"
              disabled={videos.length <= 1}
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
        )}

        {/* Video Title */}
        <h4 className="font-semibold text-[#111827] mb-2 xl:mb-3 text-sm xl:text-base leading-tight">
          {currentVideo.name}
        </h4>

        {/* Video Thumbnails Slider - Mobile: Small thumbnails below */}
        {videos.length > 1 && (
          <div className="flex gap-1 xl:gap-2 overflow-x-auto pb-2">
            {videos.map((video, index) => (
              <button
                key={`${video.name}-${index}`}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 relative ${
                  index === currentVideoIndex ? "ring-2 ring-[#1CAB55]" : ""
                } rounded overflow-hidden`}
              >
                <div className="relative w-16 h-10 xl:w-24 xl:h-16">
                  {video.thumbnail_url ? (
                    <Image
                      src={video.thumbnail_url || "/placeholder.svg"}
                      alt={video.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={`https://img.youtube.com/vi/${video.resource_value}/mqdefault.jpg`}
                      alt={video.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Play size={10} className="text-white xl:w-3 xl:h-3" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
