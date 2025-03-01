import { User, Paperclip, Link2, Video, BarChart2, Smile } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export const WritePostComponent: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);

    // Detectar si estamos en vista móvil
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Verificar al inicio
        checkIfMobile();

        // Verificar al cambiar el tamaño de la ventana
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCancel = () => {
        setIsExpanded(false);
    };

    // Cierra el componente al hacer clic fuera de él
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(e.target as Node)) {
            setIsExpanded(false);
        }
    };

    return (
        <>
            {/* Overlay que cubre todo menos el navbar */}
            {isExpanded && (
                <div
                    className={`fixed inset-0 bg-black/60 z-30 ${isMobile ? 'pt-16' : 'pt-20'}`}
                    onClick={handleOverlayClick}
                />
            )}

            {/* Componente de escritura que se expande naturalmente y desplaza el contenido inferior */}
            <div
                ref={componentRef}
                className={`relative z-40 mb-6 mx-4 sm:mx-2 md:mx-0 ${isExpanded ? 'bg-zinc-900 rounded-lg shadow-xl' : 'bg-zinc-800/50 rounded-lg p-3'}`}
            >
                {!isExpanded ? (
                    // Versión colapsada - solo muestra el avatar y el botón para escribir
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
                            <User className="text-zinc-400" size={18} />
                        </div>
                        <div className="flex-1">
                            <button
                                onClick={handleExpand}
                                className="w-full text-left text-zinc-400 px-4 py-2 bg-zinc-800/70 rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                Write something
                            </button>
                        </div>
                    </div>
                ) : (
                    // Versión expandida - formulario completo para crear post
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
                                <User className="text-zinc-400" size={18} />
                            </div>
                            <div className="text-sm text-zinc-400">
                                Ad EstMarq posting in <span className="text-zinc-200">DevAccelerator</span>
                            </div>
                        </div>

                        {/* Campo de título */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full bg-transparent text-xl font-medium text-zinc-200 border-none outline-none placeholder-zinc-500"
                                autoFocus
                            />
                        </div>

                        {/* Campo de contenido */}
                        <div className="mb-8">
                            <textarea
                                placeholder="Write something..."
                                className="w-full h-32 bg-transparent text-zinc-300 border-none outline-none resize-none placeholder-zinc-500"
                            />
                        </div>

                        {/* Barra de herramientas */}
                        <div className="flex flex-wrap items-center">
                            <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <Paperclip size={20} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <Link2 size={20} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <Video size={20} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <BarChart2 size={20} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <Smile size={20} />
                                </button>
                                <button className="p-2 text-zinc-400 hover:bg-zinc-700 rounded-full transition-colors">
                                    <span className="font-bold">GIF</span>
                                </button>
                            </div>

                            <div className="ml-auto flex flex-wrap items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
                                <div className="relative">
                                    <button className="px-3 py-1.5 text-zinc-400 bg-zinc-800 rounded-lg flex items-center gap-2 text-sm">
                                        Select a category <span className="ml-1">▼</span>
                                    </button>
                                </div>

                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-1.5 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
                                >
                                    CANCEL
                                </button>

                                <button
                                    className="px-4 py-1.5 bg-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-600 text-sm font-medium"
                                >
                                    POST
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};