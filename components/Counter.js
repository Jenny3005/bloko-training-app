"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = Counter;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
function Counter() {
    const [count, setCount] = (0, react_1.useState)(0);
    return (<div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
      <button_1.Button onClick={() => setCount(count - 1)} variant="outline" size="lg" className="w-12 h-12 text-xl">
        -
      </button_1.Button>

      <div className="px-6 py-3 bg-white rounded border min-w-20 text-center">
        <span className="text-3xl font-bold text-gray-900">{count}</span>
      </div>

      <button_1.Button onClick={() => setCount(count + 1)} variant="outline" size="lg" className="w-12 h-12 text-xl">
        +
      </button_1.Button>
    </div>);
}
