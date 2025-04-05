"use client";

import React, { ReactNode, useEffect, useCallback } from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ 
  href, 
  children,
  className = ""
}) => {
  // Función mejorada para hacer scroll
  const scrollToTarget = useCallback(() => {
    if (!href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Usar scrollIntoView que es más directo y confiable
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualizar URL
      window.history.pushState(null, '', href);
      console.log(`Scroll aplicado a ${targetId}`);
    } else {
      console.warn(`No se encontró el elemento #${targetId}`);
    }
  }, [href]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      console.log(`Click en SmoothScrollLink para #${href.substring(1)}`);
      scrollToTarget();
    }
  };

  // Usar useEffect para aplicar scroll si llegamos con el hash ya en la URL
  useEffect(() => {
    if (href.startsWith('#') && window.location.hash === href) {
      // Esperar un poco para que todo se renderice
      setTimeout(() => {
        scrollToTarget();
      }, 500);
    }
  }, [href, scrollToTarget]);
  
  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      data-smooth-scroll
    >
      {children}
    </a>
  );
};