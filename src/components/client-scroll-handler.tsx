"use client";

import { useEffect } from "react";

export function ClientScrollHandler() {
  // Helper mejorado para manejar el scroll cuando hay un hash en la URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Función para manejar el scroll de forma confiable
      const handleHashScroll = () => {
        if (window.location.hash) {
          const targetId = window.location.hash.replace('#', '');
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            console.log(`ScrollHandler: Elemento ${targetId} encontrado, aplicando scroll`);
            
            // Usamos scrollIntoView que es más directo
            setTimeout(() => {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' 
              });
              
              // También podemos ajustar manualmente la posición si es necesario
              setTimeout(() => {
                const yOffset = -100; // ajustar según necesidad
                const y = window.scrollY + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
              }, 100);
            }, 800);
          } else {
            console.warn(`ScrollHandler: Elemento ${targetId} no encontrado en el DOM`);
          }
        }
      };
      
      // Ejecutar después de que el DOM esté completamente cargado
      if (document.readyState === 'complete') {
        handleHashScroll();
      } else {
        window.addEventListener('load', handleHashScroll);
      }
      
      // Escuchar cambios en la URL (hash)
      window.addEventListener('hashchange', handleHashScroll);
      
      return () => {
        window.removeEventListener('load', handleHashScroll);
        window.removeEventListener('hashchange', handleHashScroll);
      };
    }
  }, []);
  
  return null;
}
