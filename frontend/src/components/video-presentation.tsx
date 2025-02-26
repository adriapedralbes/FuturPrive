import { ShineBorder } from "./magicui/shine-border"
import { cn } from "@/lib/utils"

export function VideoPresentation() {
  return (
    <div className="relative mt-16">
      {/* Gradient background blur */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px]" />
      </div>

      <div className="flex justify-center">
        <ShineBorder
          borderRadius={32}
          borderWidth={3}
          duration={14}
          color={["rgba(255,255,255,0.15)", "#ffffffaa", "rgba(255,255,255,0.3)"]}
          className={cn(
            "min-h-0 min-w-0 bg-neutral-800/50 p-3 rounded-[32px] border-white/5"
          )}
        >
          {/* Borde gris exterior */}
          {/* Borde negro interior */}
          <div className="rounded-[24px] bg-black p-2">
            <video
              className="w-full h-auto rounded-2xl"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/loop-demo.mp4" type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </ShineBorder>
      </div>
    </div>
  );
}
