"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";

import { Logo } from "@/components/Logo";

export default function ThankYouPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Función para cerrar el menú de ajustes al hacer clic fuera
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (showSettings) {
      setShowSettings(false);
    }
  }, [showSettings]);

  // Efecto para manejar clics fuera del menú de ajustes
  useEffect(() => {
    if (showSettings) {
      // Añadir un pequeño delay para evitar que el mismo clic que abre
      // el menú lo cierre inmediatamente
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { capture: true });
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside, { capture: true });
      };
    }
  }, [showSettings, handleClickOutside]);

  // Variable para prevenir múltiples clics rápidos
  const [isProcessingPlayback, setIsProcessingPlayback] = useState(false);

  // Manejar la reproducción del video
  const togglePlayPause = () => {
    if (!videoRef.current || isProcessingPlayback) return;

    setIsProcessingPlayback(true);

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setTimeout(() => setIsProcessingPlayback(false), 300);
    } else {
      // Asegurarse de que el video está listo para reproducirse
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setTimeout(() => setIsProcessingPlayback(false), 300);
          })
          .catch(error => {
            console.error("Error al reproducir el video:", error);
            setIsProcessingPlayback(false);
          });
      } else {
        // Para navegadores que no devuelven una promesa
        setIsPlaying(true);
        setTimeout(() => setIsProcessingPlayback(false), 300);
      }
    }
  };

  // Formatear el tiempo en formato m:ss
  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Manejar clic en la barra de progreso
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;

    // Asegurarse de que el percentage esté entre 0 y 1
    const clampedPercentage = Math.max(0, Math.min(1, percentage));

    // Actualizar tiempo del video
    videoRef.current.currentTime = clampedPercentage * videoRef.current.duration;
    setCurrentTime(videoRef.current.currentTime);
  };

  // Manejar silencio/sonido
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se propague al documento
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Manejar cambio de volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);

    // Si el volumen es 0, silenciar; de lo contrario, activar sonido
    if (newVolume === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  // Manejar el clic en el icono de volumen
  const handleVolumeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se propague al documento
    setShowVolumeControl(!showVolumeControl);
    // Cerrar otros menús abiertos
    if (showSettings) setShowSettings(false);
  };

  // Efecto para manejar clics fuera del control de volumen
  useEffect(() => {
    if (showVolumeControl) {
      const handleClickOutside = (e: MouseEvent) => {
        setShowVolumeControl(false);
      };

      // Añadir un pequeño delay para evitar que el mismo clic lo cierre
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, { capture: true });
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside, { capture: true });
      };
    }
  }, [showVolumeControl]);

  // Manejar subtítulos
  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);

    // Si el video tiene pistas de texto (subtítulos)
    if (videoRef.current && videoRef.current.textTracks.length > 0) {
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        videoRef.current.textTracks[i].mode = showCaptions ? 'hidden' : 'showing';
      }
    }
  };

  // Manejar pantalla completa
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      // Entrar en pantalla completa
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch(err => {
            console.error(`Error al intentar mostrar pantalla completa: ${err.message}`);
          });
      }
    } else {
      // Salir de pantalla completa
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(err => {
          console.error(`Error al intentar salir de pantalla completa: ${err.message}`);
        });
    }
  };

  // Manejar configuración
  const toggleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };

  // Actualizar la barra de progreso y el tiempo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Establecer tiempo inicial y duración cuando se carga el video
    const handleLoaded = () => {
      console.log("Video loaded, duration:", video.duration);
      setDuration(video.duration || 0);
      setCurrentTime(0);
    };

    // Actualizar tiempo actual mientras se reproduce
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0);
    };

    // Cuando el video termina
    const handleEnded = () => {
      console.log("Video ended");
      setIsPlaying(false);
      setIsProcessingPlayback(false);
      video.currentTime = 0;
      setCurrentTime(0);
    };

    // Manejar pausa y reproducción
    const handlePause = () => {
      console.log("Video paused");
      setIsPlaying(false);
    };

    const handlePlay = () => {
      console.log("Video playing");
      setIsPlaying(true);
    };

    // Manejar errores de reproducción
    const handleError = (e: Event) => {
      console.error("Error de reproducción:", e);
      setIsPlaying(false);
      setIsProcessingPlayback(false);
    };

    // Asegurarnos de cargar metadata al principio
    const handleMetadataLoaded = () => {
      console.log("Metadata loaded, duration:", video.duration);
      setDuration(video.duration || 0);
    };

    // Cargar duración si el video ya está cargado
    if (video.readyState >= 2) {
      console.log("Video ya está cargado, readyState:", video.readyState);
      setDuration(video.duration || 0);
    }

    // Agregar eventos
    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('loadedmetadata', handleMetadataLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', () => console.log("Video esperando..."));
    video.addEventListener('canplay', () => console.log("Video puede reproducirse"));

    // Limpiar eventos
    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', () => console.log("Video esperando..."));
      video.removeEventListener('canplay', () => console.log("Video puede reproducirse"));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      {/* Barra de navegación superior */}
      <header className="w-full bg-[#070707] backdrop-blur-md border-b border-white/10 py-5 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-start">
          <a href="/comunidad" className="flex items-center space-x-3 group transition-all">
            <Logo width={40} height={40} className="h-10 w-auto group-hover:scale-105 transition-transform" />
            <span className="text-white text-xl md:text-2xl font-semibold group-hover:text-white/90 transition-colors">
              FuturPrive <span className="text-[#C9A880] group-hover:text-[#D9B890] transition-colors">Community</span>
            </span>
          </a>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-16 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ¡Lo has conseguido! 🚀
        </motion.h1>

        <motion.div
          className="text-lg sm:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="mb-4">Has dado un paso que muy poca gente da. En un mundo lleno de ruido y distracciones, has tomado una decisión que te diferencia del resto.</p>

          <p className="mb-4">La mayoría se queda en la superfície, pero tú has decidido ir un paso más allá.</p>

          <p className="mb-4">Te he reservado tu plaza en la Comunidad FuturPrive y <span className="text-[#C9A880] font-semibold">me pondré en contacto contigo en cuanto abramos las puertas.</span></p>

          <p className="mb-6">Mientras tanto, te he preparado este vídeo que deberías ver AHORA MISMO si quieres entender por qué lo que estamos construyendo es tan diferente a todo lo demás.</p>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            ref={videoContainerRef}
            className="rounded-xl overflow-hidden shadow-xl bg-black/30 border border-white/10 relative w-full h-0 pb-[56.25%]"
          >
            {/* Video Background */}
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover cursor-pointer"
              muted
              playsInline
              preload="metadata"
              onClick={togglePlayPause}
              onLoadedData={() => {
                console.log("Video cargado completamente");
              }}
              onCanPlay={() => {
                console.log("Video puede reproducirse");
              }}
              onError={(e) => {
                console.error("Error en la carga del video:", e);
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Video Controls - Central play button */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {!isPlaying && (
                <button
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C9A880] flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
                  aria-label="Play video"
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar propagación para que no se active dos veces
                    togglePlayPause();
                  }}
                  disabled={isProcessingPlayback}
                >
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Video Controls - Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 to-transparent pt-10">
              <div className="flex items-center px-3 py-2 w-full">
                {/* Play button */}
                <button
                  className="mr-2 flex items-center justify-center h-8 w-8 text-white"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Current time */}
                <span className="text-white text-xs mr-2 font-medium">
                  {formatTime(currentTime)}
                </span>

                {/* Progress bar */}
                <div
                  className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={handleProgressBarClick}
                  role="progressbar"
                  tabIndex={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={(currentTime / (duration || 1)) * 100}
                >
                  <div
                    className="h-full bg-[#C9A880]"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>

                {/* Duration */}
                <span className="text-white text-xs ml-2 mr-2 font-medium">
                  {formatTime(duration)}
                </span>

                {/* Control buttons on the right */}
                <div className="flex items-center ml-2">
                  {/* Subtítulos */}
                  <button
                    className={`text-white mx-1 transition-opacity ${showCaptions ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    onClick={toggleCaptions}
                    aria-label={showCaptions ? "Desactivar subtítulos" : "Activar subtítulos"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
                      <path d="M7 12h2"></path>
                      <path d="M11 12h6"></path>
                      <path d="M7 16h10"></path>
                    </svg>
                  </button>

                  {/* Volumen con control deslizante */}
                  <div className="relative flex items-center justify-center mx-1">
                    <button
                      className={`flex items-center justify-center text-white h-8 w-8 transition-opacity ${!isMuted ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      onClick={handleVolumeClick}
                      aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <line x1="23" y1="9" x2="17" y2="15"></line>
                          <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                      ) : volume > 0.5 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      )}
                    </button>

                    {/* Control deslizante de volumen */}
                    {showVolumeControl && (
                      <div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative h-16 flex items-center justify-center">
                          <div className="w-[2px] h-16 bg-[#C9A880]/20 rounded-full overflow-hidden">
                            <div
                              className="absolute bottom-0 left-0 right-0 w-[2px] bg-[#C9A880]"
                              style={{ height: `${volume * 100}%` }}
                            ></div>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-8 -left-4"
                            style={{
                              WebkitAppearance: 'slider-vertical',
                              writingMode: 'vertical-rl',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ajustes */}
                  <button
                    className={`text-white mx-1 transition-opacity ${showSettings ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    onClick={toggleSettings}
                    aria-label="Ajustes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Pantalla completa */}
                  <button
                    className={`text-white mx-1 transition-opacity ${isFullscreen ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                  >
                    {isFullscreen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Menú de ajustes */}
              {showSettings && (
                <div className="absolute bottom-12 right-3 bg-black/90 border border-[#C9A880]/20 rounded-lg p-3 shadow-lg w-48">
                  <div className="text-white text-xs font-medium mb-2">Ajustes</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">Velocidad</span>
                      <select
                        className="bg-[#333] text-white text-xs rounded px-2 py-1"
                        onChange={(e) => {
                          if (videoRef.current) {
                            videoRef.current.playbackRate = parseFloat(e.target.value);
                          }
                        }}
                        defaultValue="1"
                      >
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1">Normal</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">Calidad</span>
                      <select
                        className="bg-[#333] text-white text-xs rounded px-2 py-1"
                        defaultValue="auto"
                      >
                        <option value="auto">Auto</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                        <option value="360p">360p</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">Subtítulos</span>
                      <button
                        className={`text-xs px-2 py-1 rounded ${showCaptions ? 'bg-[#C9A880] text-black' : 'bg-[#333] text-white'}`}
                        onClick={toggleCaptions}
                      >
                        {showCaptions ? "Activados" : "Desactivados"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mx-auto mt-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-black/30 border border-white/10 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Tres cosas que debes saber...
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#C9A880]">1. Esto NO es para todo el mundo</h3>
                <p className="text-white/80">
                  Lo digo en serio. FuturPrive Community no es otra comunidad más. No buscamos a cualquiera. Buscamos a personas que quieren resultados REALES en su patrimonio. Si esperas teorías bonitas que nunca se aplican, hay miles de sitios que te pueden servir. Pero si buscas estrategias COMPROBADAS por gente que maneja patrimonio de verdad... este es tu sitio.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#C9A880]">2. El acceso será limitado</h3>
                <p className="text-white/80">
                  Para mantener la calidad, solo aceptaremos un número limitado de miembros. No es marketing. Es una decisión estratégica. Las plazas se abrirán por orden de lista de espera. Así que estar donde estás ahora mismo, ya te da ventaja.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#C9A880]">3. Te avisaré personalmente</h3>
                <p className="text-white/80">
                  Cuando abramos las puertas, te avisaré personalmente. No habrá grandes campañas ni ruido. Solo un email directo para que puedas decidir si quieres entrar. Sin presiones, sin urgencias inventadas. Solo una oportunidad real para quien realmente la quiera aprovechar.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="italic text-white/70 text-lg">
                "Construir patrimonio requiere información privilegiada, estrategias diferentes a las de las masas y, sobre todo, un entorno donde compartir con gente que está en tu mismo camino. Eso es exactamente lo que estamos creando."
              </p>
              <p className="mt-3 text-[#C9A880] font-semibold">- Adrià</p>
            </div>

            <div className="mt-8 bg-[#1a1a1a] p-5 rounded-lg border border-[#C9A880]/30">
              <h4 className="font-semibold text-[#C9A880] mb-2">IMPORTANTE: Revisa tu email</h4>
              <p className="text-white/80 mb-3">
                Te he enviado un email de confirmación. <strong>Debes hacer clic en el enlace</strong> para asegurar que recibes todas las comunicaciones importantes.
              </p>
              <p className="text-white/80">
                Si no lo ves, revisa la carpeta de spam o promociones. Es un paso pequeño pero crucial para no perderte nada. ¿Vale la pena perder oportunidades por no revisar tu email? Yo creo que no.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
