import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { ShimmerButtonDemo } from "./animatedButton2";

function DialogNewsletter() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ShimmerButtonDemo />
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a]">
                <div className="mb-2 flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-800"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center text-white">TOP 10 Automatizaciones</DialogTitle>
                        <DialogDescription className="sm:text-center text-gray-400">
                            Descarga <b>gratis</b> las mejores automatizaciones.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                id="dialog-subscribe"
                                className="peer ps-9 bg-[#0a0a0a] text-[#5b5b5b] border-gray-800 focus:border-white"
                                placeholder="contacto@tuempresa.com"
                                type="email"
                                aria-label="Email"
                            />
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-gray-400 peer-disabled:opacity-50">
                                <Mail size={16} strokeWidth={2} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <Button type="button" className="w-full bg-white hover:bg-gray-200">
                        Subscribe
                    </Button>
                </form>

                <p className="text-center text-xs text-gray-400">
                    Al suscribirte aceptas nuestra{" "}
                    <a className="text-gray-400 underline hover:no-underline" href="#">
                        Política de Privacidad
                    </a>
                    .
                </p>
            </DialogContent>
        </Dialog>
    );
}

export { DialogNewsletter };