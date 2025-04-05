"use client";

import { useEffect } from "react";

import { Footer } from "@/components/footer-component";
import { ActivityNotifications } from "@/components/Newsletter/activity-notifications";
import { NewsletterBenefits } from "@/components/Newsletter/benefits/newsletter-benefits";
import { NewsletterCommunity } from "@/components/Newsletter/community/newsletter-community";
import { NewsletterCourses } from "@/components/Newsletter/courses/newsletter-courses";
import { NewsletterGifts } from "@/components/Newsletter/gifts/newsletter-gifts";
import { NewsletterHero } from "@/components/Newsletter/hero/newsletter-hero";
import { NewsletterPricing } from "@/components/Newsletter/pricing/newsletter-pricing";
import { NewsletterSkills } from "@/components/Newsletter/skills/newsletter-skills";
import { MarqueeDemo } from "@/components/testimonials";

export default function ComunidadPage() {
  // Implementar scroll suave para los enlaces de anclaje y manejar hash en URL
  useEffect(() => {
    // Función para hacer scroll a un elemento
    const scrollToElement = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        window.scrollTo({
          top: absoluteTop - 100, // Offset para que no quede pegado al borde superior
          behavior: 'smooth'
        });
      }
    };

    // Manejar clics en enlaces de anclaje
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.replace('#', '');
        if (targetId) {
          scrollToElement(targetId);
          // Actualizar URL sin recargar
          history.pushState(null, '', `#${targetId}`);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Manejar hash en URL al cargar
    const handleInitialHash = () => {
      // Restaurar scroll normal primero
      document.body.style.overflow = '';
      
      const hash = window.location.hash;
      if (hash) {
        // Dar tiempo a que se renderice todo
        setTimeout(() => {
          const targetId = hash.replace('#', '');
          scrollToElement(targetId);
        }, 500);
      }
    };

    // Asegurar que al cargar la página, solo se vea la sección hero inicialmente
    document.body.style.overflow = 'hidden';
    
    // Después de un tiempo, restaurar el scroll y manejar hash si existe
    const timer = setTimeout(handleInitialHash, 800);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Nueva estructura con waitlist */}
      <NewsletterHero />

      {/* Pricing Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#080604] z-0"></div>
        <NewsletterPricing />
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="mt-0 bg-[#0a0a0a]">
        <NewsletterBenefits />
      </section>

      {/* Community Section */}
      <NewsletterCommunity />

      {/* Skills Section */}
      <NewsletterSkills />

      {/* Free Gifts Section */}
      <NewsletterGifts />
      


      {/* Testimonials Marquee */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a] pt-4 pb-16">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="h-full w-full bg-gradient-to-r from-[#C9A880]/20 to-[#C9A880]/10 blur-[120px]" />
        </div>
        <MarqueeDemo />
      </section>
      
      {/* Cursos IA Section */}
      <NewsletterCourses />

      {/* Spacer */}
      <div className="h-16 bg-[#0a0a0a]"></div>

      {/* Footer */}
      <Footer />
      
      {/* Notificaciones de actividad reciente */}
      <ActivityNotifications />
    </div>
  );
}