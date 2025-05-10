import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="home-container">
      <hr className="my-2" />
      <div className="text-center">
        <p>BZOSoft &copy; {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
