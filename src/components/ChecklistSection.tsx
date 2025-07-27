/* eslint-disable react/no-unescaped-entities */
"use client";

import type { Checklist } from "@/types/product";
import { Check } from "lucide-react";
import Image from "next/image";

interface ChecklistSectionProps {
  checklist: Checklist[];
}

export default function ChecklistSection({ checklist }: ChecklistSectionProps) {
  if (checklist.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-lg p-4 xl:p-6">
      <h3 className="text-lg xl:text-2xl font-bold mb-3 xl:mb-4 text-[#111827]">
        What You'll Get
      </h3>
      <div className="space-y-2 xl:space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-2 xl:gap-3">
            {item.icon ? (
              <div className="flex-shrink-0 w-4 h-4 xl:w-5 xl:h-5 mt-0.5">
                <Image
                  src={item.icon || "/placeholder.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-4 h-4 xl:w-5 xl:h-5 bg-[#1CAB55] rounded-full flex items-center justify-center mt-0.5">
                <Check size={10} className="text-white xl:w-3 xl:h-3" />
              </div>
            )}
            <span className="text-gray-700 text-sm xl:text-base leading-relaxed">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
