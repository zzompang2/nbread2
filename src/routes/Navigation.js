import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import { Home, DollarSign, Mail } from "../icons";
export default function Navigation() {
  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">N BREAD</Link>
      </div>
      <div className="menu-list">
        <Link to="/">
          <Home />
        </Link>
        <Link to="/calculation">
          <DollarSign />
        </Link>
        <Link to="/inquiry">
          <Mail />
        </Link>
      </div>
    </div>
  );
}
