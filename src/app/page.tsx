import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPresentation } from "@/components/video-presentation"
import { AnimatedButton } from "@/components/animatedButton"
import { BentoDemo } from "@/components/our-services"
import { ShimmerButtonDemo } from "@/components/animatedButton2"
import { MagicCardDemo } from "@/components/magicCard"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold">
            FuturPrive
          </Link>
        </div>
      </nav>

      <main className="relative px-6 py-16 text-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="flex justify-center mb-3">
            <ShimmerButtonDemo />
          </div>
          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
            AI-Powered <br />
            Blogs With{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Media</span>.
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-lg text-gray-400">
            Create high-quality blog posts with videos,
            <br />
            customize content, and export in Markdown format effortlessly!
          </p>

          {/* CTA Button */}
          <Button
            variant="white"
            size="lg"
            className="gap-2 font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Start creating for free
            <ArrowRight className="h-4 w-4" />
          </Button>
          {/* Dashboard Preview */}
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[500px] w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[100px]" />
            </div>
            {/* Añadir aqui */}
            <VideoPresentation />
          </div>
        </div>
      </main >
      <section className="mx-auto max-w-[1400px] text-center">
        <AnimatedButton>Tendencias</AnimatedButton>
        <div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Create high-quality blog posts with videos,
            <br />
            customize content, and export in Markdown format effortlessly!
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
            Create high-quality blog posts with videos,
            <br />
            customize content, and export in Markdown format effortlessly!
          </p>
        </div>
        <MagicCardDemo />
      </section>


    </div >
  )
}
