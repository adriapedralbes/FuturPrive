"use client";

import { useState } from 'react';
import { NavBarCommunity } from "@/components/Community/NavbarCommunity";
import { WritePostComponent } from "@/components/Community/WritePostComponent";
import { CategoryFilter } from "@/components/Community/CategoryFilter";
import { PinnedPostsSection } from "@/components/Community/PinnedPostsSection";
import { PostFeed } from "@/components/Community/PostFeed";
import { LeaderboardWidget } from "@/components/Community/LeaderboardWidget";
import { pinnedPosts, regularPosts } from "@/mockData";
import { topUsers } from "@/leaderboardData";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      {/* Barra de navegación en la parte superior */}
      <div className="w-full h-16 sm:h-20">
        <NavBarCommunity />
      </div>

      {/* Separador horizontal debajo del navbar */}
      <div className="w-full border-b border-zinc-800 pt-4"></div>

      {/* Contenido principal con dos columnas */}
      <div className="flex-1 container mx-auto px-4 max-w-6xl pt-6 sm:pt-2 sm:mt-5">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Columna principal (izquierda) */}
          <div className="flex-1">
            {/* Componente para escribir nuevos posts */}
            <WritePostComponent />

            {/* Filtros de categoría */}
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Publicaciones fijadas */}
            <PinnedPostsSection pinnedPosts={pinnedPosts} />

            {/* Feed de publicaciones */}
            <PostFeed posts={regularPosts} filter={activeCategory} />
          </div>

          {/* Columna lateral (derecha) - oculta en móvil */}
          <div className="hidden md:block md:w-80 space-y-6">
            {/* Widget de Leaderboard */}
            <LeaderboardWidget users={topUsers} />

            {/* Aquí se pueden añadir más widgets laterales en el futuro */}
          </div>
        </div>
      </div>
    </div>
  );
}