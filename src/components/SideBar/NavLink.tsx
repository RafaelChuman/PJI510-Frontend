import React from "react";
import { ElementType } from "react";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

interface NavLinkProps {
  icon: IconType;
  navComponent: string;
  href: string;
}

export function NavLinkComponent({ icon, navComponent, href }: NavLinkProps) {
  return (
    <div className="NavLink">
      <NavLink to={href}>
        {React.createElement(icon)}&nbsp; {navComponent}
      </NavLink>
    </div>
  );
}
