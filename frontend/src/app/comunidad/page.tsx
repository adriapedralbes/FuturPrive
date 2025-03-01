"use client";

import { useState } from 'react';
import { NavBarCommunity } from "@/components/Community/NavbarCommunity";
import { WritePostComponent } from "@/components/Community/Posts/WritePostComponent";
import { CategoryFilter } from "@/components/Community/CategoryFilter";
import { PinnedPostsSection } from "@/components/Community/Posts/PinnedPostsSection";
import { PostFeed } from "@/components/Community/Posts/PostFeed";
import { LeaderboardWidget } from "@/components/Community/LeaderboardWidget";
import { PostDetailModal } from "@/components/Community/Posts/PostDetailModal";
import { pinnedPosts, regularPosts } from "@/mockData";
import { topUsers } from "@/leaderboardData";
import { Post } from "@/types/Post";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handlePostClick = (postId: string) => {
    // Buscar primero en posts fijados
    let post = pinnedPosts.find(p => p.id === postId);

    // Si no está en los fijados, buscar en los regulares
    if (!post) {
      post = regularPosts.find(p => p.id === postId);
    }

    if (post) {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1e] text-white py-6">
      {/* Barra de navegación en la parte superior */}
      <div className="w-full h-16 sm:h-20">
        <NavBarCommunity />
      </div>

      {/* Separador horizontal debajo del navbar */}
      <div className="w-full border-b border-white/10"></div>

      {/* Contenido principal con dos columnas */}
      <div className="flex-1 container mx-auto px-4 max-w-6xl pt-2 sm:mt-8">
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
            <PinnedPostsSection pinnedPosts={pinnedPosts} onPostClick={handlePostClick} />

            {/* Feed de publicaciones */}
            <PostFeed posts={regularPosts} filter={activeCategory} onPostClick={handlePostClick} />
          </div>

          {/* Columna lateral (derecha) - oculta en móvil */}
          <div className="hidden md:block md:w-80 space-y-6">
            {/* Widget de Leaderboard */}
            <LeaderboardWidget users={topUsers} />

            {/* Aquí se pueden añadir más widgets laterales en el futuro */}
          </div>
        </div>
      </div>

      {/* Modal de detalle del post */}
      <PostDetailModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}