// Footer.jsx
import { useState, useEffect } from "react";

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);
  return (
    <footer className="bg-black p-4 text-white text-center" role="contentinfo">
      © {year} InnovaOps.ai - All rights reserved
    </footer>
  );
}

export default Footer;
