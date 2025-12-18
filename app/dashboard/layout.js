"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
function DashboardLayout({ children, }) {
    return (<div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <link_1.default href="/dashboard">
            <h1 className="text-2xl font-bold text-black hover:text-gray-700 cursor-pointer transition-colors">
              Dashboard
            </h1>
          </link_1.default>
          <nav className="flex gap-2">
            <link_1.default href="/dashboard">
              <button_1.Button variant="ghost" className="text-black hover:text-gray-900 hover:bg-gray-100">
                Dashboard
              </button_1.Button>
            </link_1.default>
            <link_1.default href="/dashboard/products">
              <button_1.Button variant="ghost" className="text-black hover:text-gray-900 hover:bg-gray-100">
                Produits
              </button_1.Button>
            </link_1.default>
            <link_1.default href="/dashboard/products/new">
              <button_1.Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                Nouveau produit
              </button_1.Button>
            </link_1.default>
          </nav>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-7xl mx-auto p-6 bg-white">{children}</main>
    </div>);
}
