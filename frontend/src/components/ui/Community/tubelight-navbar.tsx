"use client";

import { motion } from "framer-motion";
import { LucideIcon, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-10 sm:pt-6 w-[calc(100%-32px)] sm:w-[calc(100%-16px)] md:w-auto",
        className,
      )}
    >
      <div className="relative flex items-center justify-around sm:justify-start sm:gap-3 bg-gray-900/30 border border-gray-800 backdrop-blur-lg py-1 px-1 sm:px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-gray-800/50 text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-gray-800/50 rounded-full -z-10"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                  }}
                >
                  {/* Glow effect on active tab */}
                  <motion.div
                    className="absolute -top-2 left-0 right-0 mx-auto w-8 h-1 bg-white rounded-t-full"
                    layoutId="glow"
                    animate={{
                      boxShadow: [
                        "0 0 5px 2px rgba(255, 255, 255, 0.3)",
                        "0 0 15px 5px rgba(255, 255, 255, 0.5)",
                        "0 0 5px 2px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      layout: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                  >
                    <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 left-1/2 -translate-x-1/2" />
                    <div className="absolute w-8 h-6 bg-white/40 rounded-full blur-md -top-1 left-1/2 -translate-x-1/2" />
                    <div className="absolute w-4 h-4 bg-white/50 rounded-full blur-sm top-0 left-1/2 -translate-x-1/2" />
                  </motion.div>
                </motion.div>
              )}
            </Link>
          );
        })}

        {/* Avatar con dropdown menu */}
        <div className="ml-0 sm:ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all">
                <AvatarImage src="https://github.com/shadcn.png" alt="Foto de perfil" />
                <AvatarFallback>Adri</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900/90 backdrop-blur-lg border-gray-800 text-white">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800 transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-900/40 focus:bg-red-900/40 transition-colors">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}