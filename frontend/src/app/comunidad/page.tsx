"use client";

import { useState } from 'react';
import { NavBarCommunity } from "@/components/Community/NavbarCommunity";
import { WritePostComponent } from "@/components/Community/WritePostComponent";
import { CategoryFilter } from "@/components/Community/CategoryFilter";
import { PinnedPostsSection } from "@/components/Community/PinnedPostsSection";
import { PostFeed } from "@/components/Community/PostFeed";
import { pinnedPosts, regularPosts } from "@/mockData";

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
      {/* Contenido principal debajo de la navbar con espacio adecuado */}
      <div className="flex-1 container mx-auto px-4 max-w-3xl sm:mt-12">
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
    </div>
  );
}