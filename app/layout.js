"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
exports.metadata = {
    title: "Bloko Training",
    description: "Gestionnaire de produits",
};
function RootLayout({ children, }) {
    return (<html lang="fr">
      <body>{children}</body>
    </html>);
}
