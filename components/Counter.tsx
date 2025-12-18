"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
      <Button
        onClick={() => setCount(count - 1)}
        variant="outline"
        size="lg"
        className="w-12 h-12 text-xl"
      >
        -
      </Button>

      <div className="px-6 py-3 bg-white rounded border min-w-20 text-center">
        <span className="text-3xl font-bold text-gray-900">{count}</span>
      </div>

      <Button
        onClick={() => setCount(count + 1)}
        variant="outline"
        size="lg"
        className="w-12 h-12 text-xl"
      >
        +
      </Button>
    </div>
  );
}
