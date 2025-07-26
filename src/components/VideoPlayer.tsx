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

  // Filter only video media with proper null checks
  const videos =
    media?.filter(
      (item) => item.resource_type === "video" && item.resource_value
    ) || [];

  if (videos.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Course Preview
        </h3>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Video preview will be available soon</p>
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
    <section className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Course Preview</h3>

      <div className="relative">
        {/* Main Video Player */}
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo.resource_value}`}
            title={currentVideo.name}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Video Navigation */}
        {videos.length > 1 && (
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevVideo}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={videos.length <= 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-sm text-gray-600">
              {currentVideoIndex + 1} of {videos.length}
            </span>

            <button
              onClick={nextVideo}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={videos.length <= 1}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Video Title */}
        <h4 className="font-semibold text-gray-800 mb-2">
          {currentVideo.name}
        </h4>

        {/* Video Thumbnails Slider */}
        {videos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {videos.map((video, index) => (
              <button
                key={`${video.name}-${index}`}
                onClick={() => setCurrentVideoIndex(index)}
                className={`flex-shrink-0 relative ${
                  index === currentVideoIndex ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="relative w-24 h-16 overflow-hidden rounded">
                  {video.thumbnail_url ? (
                    <Image
                      src={video.thumbnail_url}
                      alt={video.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src={`https://img.youtube.com/vi/$${video.resource_value}/mqdefault.jpg`}
                      alt={video.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <Play size={16} className="text-white" />
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
