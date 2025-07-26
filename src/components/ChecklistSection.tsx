/* eslint-disable react/no-unescaped-entities */
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
    <section className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">What You'll Get</h3>
      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            {item.icon ? (
              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                <Image
                  src={item.icon || "/placeholder.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <Check size={12} className="text-white" />
              </div>
            )}
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
