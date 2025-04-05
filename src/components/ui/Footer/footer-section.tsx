"use client";

import { ExternalLink } from "lucide-react";

function Footerdemo() {
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <span>Creado por <a href="https://www.youtube.com/@adriaestevez" target="_blank" rel="noopener noreferrer" className="text-[#C9A880] hover:text-[#C9A880] inline-flex items-center gap-1 group transition-all duration-300">
            <span className="group-hover:text-[#A78355] transition-colors duration-300">Adrià Estévez</span>
            <ExternalLink className="h-3.5 w-3.5 group-hover:text-[#A78355] transition-colors duration-300" />
          </a></span>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
