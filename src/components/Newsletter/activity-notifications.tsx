"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { beehiivService } from "@/services/beehiiv";

// Constantes que coinciden con el componente NewsletterAvatarCircles
const BASE_SUBSCRIBERS = 133;
const TOTAL_PLAZAS = 200;

export function ActivityNotifications() {
  const [notification, setNotification] = useState<string | null>(null);
  const [plazasDisponibles, setPlazasDisponibles] = useState<number>(TOTAL_PLAZAS - BASE_SUBSCRIBERS);
  
  // Efecto para cargar el número de plazas disponibles
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        // Obtener el conteo de nuevos suscriptores
        const newSubscribers = await beehiivService.getSubscriberCount();
        
        // Calcular plazas ocupadas (base + nuevos)
        const plazasOcupadas = BASE_SUBSCRIBERS + newSubscribers;
        
        // Calcular plazas disponibles
        const disponibles = Math.max(0, TOTAL_PLAZAS - plazasOcupadas);
        setPlazasDisponibles(disponibles);
      } catch (error) {
        console.error("Error al obtener plazas disponibles:", error);
        // En caso de error, mantener el valor actual
      }
    };

    // Cargar datos al inicio
    fetchSubscriberCount();
    
    // También actualizamos periódicamente
    const intervalId = setInterval(fetchSubscriberCount, 2 * 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Efecto separado para mostrar la notificación
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;
    
    // Función para mostrar la notificación
    const showNotification = () => {
      setNotification(`Solo quedan ${plazasDisponibles} plazas disponibles`);
      
      // Ocultar después de 10 segundos
      hideTimeoutId = setTimeout(() => {
        setNotification(null);
      }, 10000);
    };
    
    // Mostrar notificación después de 3 segundos
    timeoutId = setTimeout(showNotification, 3000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, [plazasDisponibles]);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs">
      <AnimatePresence>
        {notification && (
          <motion.div 
            className="bg-gradient-to-r from-[#161310] to-[#0a0806] border border-[#C9A880]/30 shadow-lg rounded-xl p-4 flex items-center"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Indicador animado */}
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A880] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C9A880]"></span>
            </span>
            
            {/* Mensaje */}
            <p className="text-white/90 text-sm">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
