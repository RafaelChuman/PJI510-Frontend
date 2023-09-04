import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="NavLink">
      <p className="NavSectionText">
        {title}
      </p>
      <div >
        {children}
      </div>
    </div>
  );
}
