"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { beehiivService } from "@/services/beehiiv";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Opcional: Añadir campo de nombre
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (!email) {
      setErrorMessage("Por favor, introduce tu email");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Llamar al servicio de Beehiiv para registrar al suscriptor
      await beehiivService.createSubscription({
        email,
        name: name || undefined, // Enviar nombre solo si está definido
        utm_source: "website",
        utm_medium: "waitlist",
        utm_campaign: "futurprive_launch",
        referring_site: typeof window !== 'undefined' ? window.location.href : undefined,
        send_welcome_email: true,
        reactivate_existing: false, // No reactivar suscriptores existentes a menos que sea explícito
      });
      
      setSubmitted(true);
      setEmail("");
      setName("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      console.error("Error al registrar suscriptor:", error);
      setErrorMessage(errorMessage || "Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute w-12 h-12 bg-purple-600/20 rounded-full"></div>
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M8 7h6"></path>
              <path d="M8 11h8"></path>
              <path d="M8 15h6"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Heading */}
      <h2 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
        Agenda TU LLAMADA GRATUITA
      </h2>
      
      {/* Subtitle */}
      <p className="mb-6 text-lg text-gray-400">
        Mira, no te voy a enredar con promesas vacías. 
        <br />Te doy 30 minutos que pueden cambiar tu negocio <span className="text-yellow-400">⚡</span>
      </p>

      {/* Copywriting Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 text-left">
        <h3 className="text-xl font-bold mb-3 text-purple-400">Te voy a contar algo que casi nadie te dice sobre la IA</h3>
        
        <p className="mb-4 text-gray-300">
          Hace 10 años, cuando empecé a hablar de IA, la gente me miraba como si fuera un loco. Hoy, los que NO la usan son los que se están quedando atrás. Y RÁPIDO.
        </p>
        
        <p className="mb-4 text-gray-300">
          Me he encontrado con dos tipos de empresarios: los que <span className="italic">hablan</span> de implementar IA... y los que <span className="font-semibold">multiplican sus beneficios gracias a ella</span>. ¿La diferencia? Los segundos tomaron acción.
        </p>

        <div className="mb-4 border-l-4 border-purple-500 pl-4 py-1">
          <p className="text-gray-300">
            &ldquo;Si sigues haciendo lo mismo que hace 2 años, estás perdiendo dinero. La IA no es el futuro. Es el AHORA. Y quien no lo vea, se quedará fuera.&rdquo;
          </p>
        </div>

        <h4 className="font-semibold text-white mb-2">En tu consultoría GRATUITA descubrirás:</h4>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-300">
          <li>Exactamente DÓNDE está perdiendo dinero tu empresa (y cómo la IA puede solucionarlo)</li>
          <li>Las 3 herramientas que puedes implementar <span className="italic">esta misma semana</span> para reducir costes</li>
          <li>Un plan personalizado para automatizar las tareas que te están robando tiempo</li>
          <li>Cómo adelantar a tu competencia mientras ellos siguen en el siglo XX 🚀</li>
        </ul>

        <p className="text-gray-300">
          ¿Quieres seguir aplazando lo inevitable o prefieres ser parte de los que están transformando su negocio AHORA?
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 mb-4 bg-red-500/20 rounded-lg">
          <p className="text-red-400 font-medium">{errorMessage}</p>
        </div>
      )}

      {submitted ? (
        <div className="p-4 bg-green-500/20 rounded-lg">
          <p className="text-green-400 font-medium">¡GENIAL! Revisa tu email en los próximos 5 minutos para confirmar tu consultoría.</p>
          <p className="text-sm text-gray-300 mt-2">Si no ves nada, comprueba tu carpeta de spam (a veces pasa).</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-lg mx-auto">
          {/* Campo de nombre (opcional) */}
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          
          {/* Campo de email */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Tu mejor email (recibirás instrucciones aquí)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button 
              type="submit"
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-medium btn-blink"
              disabled={submitting}
            >
              {submitting ? "Enviando..." : "AGENDAR MI LLAMADA"}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">* Plazas limitadas. Solo trabajo con quien realmente quiere resultados.</p>
        </form>
      )}
    </div>
  );
}
