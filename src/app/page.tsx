"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AnimatedButton } from "@/components/animatedButton";
import { AvatarCirclesDemo } from "@/components/avatarCircles";
import { Footer } from "@/components/footer-component";
import { Logo } from "@/components/Logo";
import { MagicCardDemo } from "@/components/magicCard";
import { BentoDemo } from "@/components/our-services";
import { RainbowButtonDemo } from "@/components/rainbowButton";
import { MarqueeDemo } from "@/components/testimonials";
import { Button } from "@/components/ui/button";



export default function Home() {


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
          <div className="flex justify-center mb-5">
            {/* <DialogNewsletter /> */}
            <div className="flex flex-col items-center space-y-2">
              <AvatarCirclesDemo />
              <p className="text-[#C9A880] font-semibold text-sm">+100 empresas transformadas</p>
            </div>
          </div>
          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-5xl">
            La IA que <span className="bg-gradient-to-r from-[#C9A880] to-[#A78355] bg-clip-text text-transparent">MULTIPLICA</span> beneficios. <br /> No solo promesas.
          </h1>

          {/* Subtitle - Con estilo conversacional */}
          <p className="mb-8 text-lg text-gray-400">
            Mira, hay dos tipos de empresas: las que ya aprovechan la IA para facturar más...<br />
            y las que siguen perdiendo tiempo y dinero haciéndolo todo a mano.<br />
            <span className="font-bold text-white">¿En cuál quieres estar tú?</span>
          </p>

          {/* CTA Button */}
          <Button
            variant="white"
            size="lg"
            className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 btn-blink"
            asChild
          >
            <Link href="https://cal.com/futurprive/consultoria-gratis">
              QUIERO MI CONSULTORÍA GRATUITA
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Testimonials section con transición suave desde el main, ocupando todo el ancho */}
      <section className="relative w-full overflow-hidden -mt-12 md:-mt-16 bg-[#0a0a0a]">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="h-full w-full bg-gradient-to-r from-[#C9A880]/20 to-[#C9A880]/10 blur-[120px]" />
        </div>

        <div className="mt-4">
          <MarqueeDemo />
        </div>
        <p className="text-lg text-white max-w-2xl mx-auto text-center mt-12 mb-10 py-4 px-6 rounded-xl relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-[#C9A880]/20 to-[#A78355]/20 backdrop-blur-sm -z-10"></span>
          <span className="absolute inset-0 border border-[#C9A880]/30 rounded-xl -z-5"></span>
          No te vendo humo. Después de transformar <span className="font-bold text-white">+100 empresas</span> con IA,
          puedo decirte una cosa: los resultados hablan por sí solos.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] text-center pt-12">
        <AnimatedButton>Tendencias</AnimatedButton>
        <div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Lo que te vas a perder si NO implementas IA AHORA
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Te lo digo clarito: cada día que pasa sin automatización, es un día que tu competencia te saca ventaja.
            <br />
            <span className="font-medium text-white">No es cuestión de "si deberías", sino de "cuánto antes".</span>
          </p>
        </div>
        <BentoDemo />
      </section>

      <section className="mx-auto max-w-[1400px] text-center py-20 px-4">
        <AnimatedButton>Proceso</AnimatedButton>
        <div className="mb-16">
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            3 pasos. Sin complicaciones. <br />
            <span className="bg-gradient-to-r from-[#C9A880] to-[#A78355] bg-clip-text text-transparent">Resultados garantizados.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Después de años implementando IA en todo tipo de negocios, he descubierto algo:
            <br />
            La diferencia entre el éxito y el fracaso está en tener un método probado.
            <br />
            <span className="font-medium text-white">Este es el nuestro. Y funciona.</span>
          </p>
        </div>
        <MagicCardDemo />
        <div className="mt-14">
          <Link href="https://cal.com/futurprive/consultoria-gratis" className="block">
            <div className="btn-blink inline-block rounded-xl overflow-hidden">
              <RainbowButtonDemo>
                Agenda TU LLAMADA GRATUITA
              </RainbowButtonDemo>
            </div>
          </Link>
        </div>
      </section>


      <section>
        <Footer />
      </section>
    </div>
  );
}