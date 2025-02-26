"use client";

import { Users, GraduationCap, Calendar, User, Trophy } from "lucide-react";

import { NavBar } from "@/components/ui/Community/tubelight-navbar";

export function NavBarCommunity() {
  const navItems = [
    { name: "Comunidad", url: "/", icon: Users },
    { name: "Classroom", url: "#", icon: GraduationCap },
    { name: "Calendario", url: "#", icon: Calendar },
    { name: "Miembros", url: "#", icon: User },
    { name: "Ranking", url: "#", icon: Trophy },
  ];

  return <NavBar items={navItems} />;
}