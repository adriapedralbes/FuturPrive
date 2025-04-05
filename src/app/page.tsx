"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { AnimatedButton } from "@/components/animatedButton";
import { AvatarCirclesDemo } from "@/components/avatarCircles";
import { Footer } from "@/components/footer-component";
import { Logo } from "@/components/Logo";
import { MagicCardDemo } from "@/components/magicCard";
import { NewsletterForm } from "@/components/Newsletter/newsletter-form";
import { BentoDemo } from "@/components/our-services";
import { RainbowButtonDemo } from "@/components/rainbowButton";
import { SmoothScrollLink } from "@/components/SmoothScroll";
import { MarqueeDemo } from "@/components/testimonials";
import { Button } from "@/components/ui/button";



export default function Home() {
  // Referencia al elemento del formulario para poder hacer scroll directamente
  const newsletterFormRef = useRef<HTMLElement>(null);
  // Script mejorado para manejar el scroll usando la referencia directa
  useEffect(() => {
    // Función para hacer scroll al formulario de newsletter usando la referencia
    const scrollToNewsletterForm = () => {
      if (newsletterFormRef.current) {
        console.log('Aplicando scroll al formulario usando ref');
        newsletterFormRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // O alternativamente:
        // const yOffset = -100; // ajusta este valor según necesites
        // const y = newsletterFormRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        // window.scrollTo({top: y, behavior: 'smooth'});
        
        // Actualizar URL sin causar un salto adicional
        window.history.pushState(null, '', '#newsletter-form');
      } else {
        console.warn('⚠️ Referencia al formulario no encontrada');
      }
    };
    
    // Manejar clicks en enlaces que apuntan al formulario
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        if (href === '#newsletter-form') {
          e.preventDefault();
          console.log('Interceptado click al formulario de newsletter');
          scrollToNewsletterForm();
        }
      }
    };
    
    // Añadir event listener para capturar clicks
    document.addEventListener('click', handleAnchorClick);
    
    // Si hay un hash en la URL al cargar, manejar el scroll inicial
    if (window.location.hash === '#newsletter-form') {
      console.log('Hash #newsletter-form detectado en la URL');
      // Retrasar para asegurar que todo está cargado
      setTimeout(scrollToNewsletterForm, 500);
    }
    
    // Función adicional para manejar SmoothScrollLink
    const handleSmoothScrollClick = () => {
      const btns = document.querySelectorAll('a[href="#newsletter-form"]');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Click directo en SmoothScrollLink');
          scrollToNewsletterForm();
        });
      });
    };
    
    // Ejecutar después de un tiempo para asegurar que los elementos están en el DOM
    setTimeout(handleSmoothScrollClick, 500);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Logo 
              width={32} 
              height={32} 
              className="h-8 w-auto"
            />
            FuturPrive
          </Link>
        </div>
      </nav>

      <main className="relative px-6 py-16 text-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            {/* <DialogNewsletter /> */}
            <div className="flex flex-col items-center space-y-2">
              <AvatarCirclesDemo />
              <p className="text-[#C9A880] font-semibold text-sm">+100 empresas transformadas</p>
            </div>
          </div>
          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-5xl">
            Soluciones IA personalizadas. <br /> Reducen Costes y Maximizan{" "}
            <span className="bg-gradient-to-r from-[#C9A880] to-[#A78355] bg-clip-text text-transparent">
              Beneficio
            </span>
          </h1>

          {/* Subtitle - Simplificado */}
          <p className="mb-8 text-lg text-gray-400">
            Agenda tu consultoría gratuita y descubre cómo impulsar tu negocio
          </p>

          {/* CTA Button */}
          <Button
            variant="white"
            size="lg"
            className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 btn-blink"
            asChild
          >
            <SmoothScrollLink href="#newsletter-form">
              Ir al Formulario de Newsletter
              <ArrowRight className="h-4 w-4 ml-1" />
            </SmoothScrollLink>
          </Button>
        </div>
      </main>

      {/* Testimonials section con transición suave desde el main, ocupando todo el ancho */}
      <section className="relative w-full overflow-hidden -mt-12 md:-mt-16 bg-[#0a0a0a]">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="h-full w-full bg-gradient-to-r from-[#C9A880]/20 to-[#C9A880]/10 blur-[120px]" />
        </div>
        <div className="text-center pb-0 mb-0 mt-8">
          <AnimatedButton>Testimonios</AnimatedButton>
        </div>
        <div className="mt-[-20px]">
          <MarqueeDemo />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] text-center pt-16">
        <AnimatedButton>Tendencias</AnimatedButton>
        <div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Acompañamos a tu proyecto en la implementación, desarrollo de
            tecnologías IA y soluciones de automatización, <br />
            asegurando una transición fluida desde inicio hasta el despliegue y
            el logro de resultados tangibles.
          </p>
        </div>
        <BentoDemo />
      </section>

      <section className="mx-auto max-w-[1400px] text-center py-20 px-4">
        <AnimatedButton>Proceso</AnimatedButton>
        <div className="mb-16">
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Soluciones a medida <br />
            en 3 pasos
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Agenda tu llamada, obten recomendación y recibe tu solución.
            <br />
            Nuestro equipo de expertos te acompañará en cada paso.
          </p>
        </div>
        <MagicCardDemo />
        <div className="mt-14">
          <SmoothScrollLink href="#newsletter-form" className="block">
            <div className="btn-blink inline-block rounded-xl overflow-hidden">
              <RainbowButtonDemo>
                Inscríbete Ahora
              </RainbowButtonDemo>
            </div>
          </SmoothScrollLink>
        </div>
      </section>
      {/* Newsletter Form Section */}
      <section 
        ref={newsletterFormRef}
        id="newsletter-form" 
        className="bg-[#080604] relative py-20 px-4 border-t border-[#C9A880]/15 scroll-mt-[100px]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806] to-[#050302] z-0"></div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A880]/8 blur-[120px] z-0"></div>
        <div className="relative z-10">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Suscríbete a Nuestra Newsletter</h2>
            <NewsletterForm />
          </div>
        </div>
      </section>
      
      <section>
        <Footer />
      </section>
    </div>
  );
}