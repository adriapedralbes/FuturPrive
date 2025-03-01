import { ThumbsUp, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { UserBadge } from '@/components/Community/UserBadge';

interface PostCardProps {
    id: string;
    author: {
        username: string;
        level?: number;
        avatarUrl?: string;
    };
    timestamp: string;
    category?: string;
    content: string;
    likes: number;
    comments: number;
    isPinned?: boolean;
    imageUrl?: string;
    onPostClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
    id,
    author,
    timestamp,
    category,
    content,
    likes,
    comments,
    isPinned = false,
    imageUrl,
    onPostClick
}) => {
    // Verificar si el contenido comienza con "Re:" para formato especial
    const isReply = content.startsWith('Re:');
    const contentLines = content.split('\n');
    const title = contentLines[0];
    const body = contentLines.slice(1).join('\n');

    const handleClick = () => {
        onPostClick(id);
    };

    return (
        <div
            className={`bg-[#323230] rounded-lg p-4 my-3 mx-4 sm:mx-2 md:mx-0 ${isPinned ? 'border-l-4 border-amber-500' : 'border border-white/10'} cursor-pointer hover:bg-[#3a3a38] transition-colors`}
            onClick={handleClick}
        >
            <UserBadge
                username={author.username}
                level={author.level}
                avatarUrl={author.avatarUrl}
                timestamp={timestamp}
                category={category}
                categoryColor={
                    category === 'General' ? 'bg-[#444442] border border-white/5' :
                        category === 'Anuncios' ? 'bg-[#444442] border border-white/5' :
                            category === 'Preguntas' ? 'bg-[#444442] border border-white/5' :
                                'bg-[#444442] border border-white/5'
                }
            />

            {/* Título del post */}
            {isReply ? (
                <div className="mt-2 mb-1 font-medium flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <h3 className="text-white">{title}</h3>
                </div>
            ) : (
                <h3 className="mt-3 mb-2 font-medium text-white">{title}</h3>
            )}

            {/* Contenido del post */}
            <div className="mb-3">
                <p className="text-zinc-200 text-sm">{body}</p>
            </div>

            {/* Imagen adjunta */}
            {imageUrl && (
                <div className="mt-2 mb-3">
                    <Image
                        src={imageUrl}
                        alt={`Contenido de ${title}`}
                        width={500}
                        height={300}
                        className="rounded-lg max-h-28 object-cover border border-white/10"
                    />
                </div>
            )}

            {/* Interacciones */}
            <div className="flex items-center gap-4 mt-2 text-zinc-300">
                <div className="flex items-center gap-1">
                    <button
                        className="p-1 hover:bg-[#444442] rounded-full"
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que se abra el modal al dar like
                            // Aquí iría la lógica para dar like
                        }}
                    >
                        <ThumbsUp size={16} />
                    </button>
                    <span className="text-sm">{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        className="p-1 hover:bg-[#444442] rounded-full"
                        onClick={(e) => {
                            e.stopPropagation(); // Evitar que se abra el modal al comentar
                            // Aquí iría la lógica para ir directamente a comentar
                        }}
                    >
                        <MessageCircle size={16} />
                    </button>
                    <span className="text-sm">{comments}</span>
                </div>
            </div>
        </div>
    );
};