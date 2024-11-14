import React from "react";
import Logo from "@theme/Logo";

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className="navbar__brand gap-2"
      imageClassName="h-10 w-10"
      titleClassName="font-heading text-xl font-medium"
    />
  );
}
