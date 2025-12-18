"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const Counter_1 = require("@/components/Counter");
function DashboardPage() {
    return (<div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">
          Compteur interactif
        </h2>
        <div className="p-6 bg-white rounded border shadow-sm">
          <div className="flex justify-center mb-6">
            <Counter_1.Counter />
          </div>
        </div>
      </div>
    </div>);
}
