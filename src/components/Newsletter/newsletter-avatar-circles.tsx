"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { ProgressIndicator } from "@/components/Newsletter/progress-indicator";
import { cn } from "@/lib/utils";
import { beehiivService } from "@/services/beehiiv";

// Avatares predefinidos - Mejor lista con más variedad
const avatars = [
    {
        imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/men/54.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/women/29.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/women/77.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        profileUrl: "#",
    },
    {
        imageUrl: "https://randomuser.me/api/portraits/men/28.jpg",
        profileUrl: "#",
    },
];

interface NewsletterAvatarCirclesProps {
  className?: string;
  totalPlazas?: number;
  avatarsToShow?: number;
}

const BASE_SUSCRIBERS = 133; // Número base de suscriptores

export function NewsletterAvatarCircles({
  className,
  totalPlazas = 200,
  avatarsToShow = 6,
}: NewsletterAvatarCirclesProps) {
    const [visibleAvatars] = useState(avatars.slice(0, avatarsToShow));
    const [plazasOcupadas, setPlazasOcupadas] = useState(BASE_SUSCRIBERS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriberCount = async () => {
            try {
                setIsLoading(true);
                // Obtener el conteo de nuevos suscriptores
                const newSubscribers = await beehiivService.getSubscriberCount();
                console.log("Nuevos suscriptores:", newSubscribers);
                
                // Sumar el conteo base (133) más los nuevos suscriptores
                const totalSubscribers = BASE_SUSCRIBERS + newSubscribers;
                console.log("Total suscriptores (133 + nuevos):", totalSubscribers);
                
                setPlazasOcupadas(totalSubscribers);
            } catch (error) {
                console.error("Error al obtener el conteo de suscriptores:", error);
                // En caso de error, mantenemos el valor base
                setPlazasOcupadas(BASE_SUSCRIBERS);
            } finally {
                setIsLoading(false);
            }
        };

        // Cargar inmediatamente al montar el componente
        fetchSubscriberCount();
        
        // También configuramos un intervalo para actualizar cada 2 minutos
        // para usuarios que mantengan la página abierta mucho tiempo
        const intervalId = setInterval(fetchSubscriberCount, 2 * 60 * 1000);
        
        // Limpieza al desmontar
        return () => clearInterval(intervalId);
    }, []);

    // Función para crear avatares con efecto de animación
    const avatarsWithAnimation = () => (
        <AvatarCircles 
            numPeople={plazasOcupadas - visibleAvatars.length} 
            avatarUrls={visibleAvatars} 
            className={cn("transform transition-all duration-300 hover:scale-105", className)}
        />
    );

    return (
        <div className={cn("flex flex-col items-center space-y-3", className)}>
            {/* Avatares con efecto de hover */}
            {avatarsWithAnimation()}
            
            {/* Barra de progreso mejorada */}
            <div className="w-full max-w-sm">
                <ProgressIndicator 
                    current={plazasOcupadas}
                    total={totalPlazas}
                    variant="waitlist"
                    size="md"
                    showAnimation={true}
                    labelPosition="sides"
                />
            </div>
        </div>
    );
}
