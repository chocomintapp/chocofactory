import React from "react";
import { Link } from "react-router-dom";

import { name } from "../../configs.json";

export const Footer: React.FC = () => {
  return (
    <footer className="text-center font-medium p-6 text-xs text-gray-400">
      <Link to="/">@{name}</Link>
    </footer>
  );
};
