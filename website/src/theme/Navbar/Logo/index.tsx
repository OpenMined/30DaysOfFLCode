import React from "react";
import Logo from "@theme/Logo";

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className="navbar__brand gap-2"
      imageClassName="w-10 h-10"
      titleClassName="text-xl font-medium"
    />
  );
}
