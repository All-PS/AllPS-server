import React from "react";
import logo from "assets/images/logo.png";
import logoLight from "assets/images/logo-light.png";

const Logo = ({ className, type = "default" }) => {
  const logoSrc = type === "light" ? logoLight : logo; // '==' 대신 '===' 쓰라고하네요

  return (
    <a href="/">
      <img src={logoSrc} alt="AllPS 로고" className={`${className}`} />
    </a>
  );
};

export default Logo;
