import React from "react";
import { Link } from "react-router-dom";

import { name } from "../../configs.json";

export const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 text-xs text-tertiary">
      <Link to="/">@{name}</Link>
    </footer>
  );
};
