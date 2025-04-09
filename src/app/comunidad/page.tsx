"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComunidadPage() {
  const router = useRouter();
  
  // Redirigir a la página principal
  useEffect(() => {
    // Redireccionar a la página principal
    router.push('/');
  }, [router]);
  
  // Renderizamos un estado de carga o página vacía mientras se redirecciona
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigiendo...</h1>
        <p>Por favor, espera un momento.</p>
      </div>
    </div>
  );
}