import { ThumbsUp, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { UserBadge } from './UserBadge';

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
}

export const PostCard: React.FC<PostCardProps> = ({
    author,
    timestamp,
    category,
    content,
    likes,
    comments,
    isPinned = false,
    imageUrl,
}) => {
    // Verificar si el contenido comienza con "Re:" para formato especial
    const isReply = content.startsWith('Re:');
    const contentLines = content.split('\n');
    const title = contentLines[0];
    const body = contentLines.slice(1).join('\n');

    return (
        <div className={`bg-zinc-800 rounded-lg p-4 my-3 ${isPinned ? 'border-l-4 border-amber-500' : ''}`}>
            <UserBadge
                username={author.username}
                level={author.level}
                avatarUrl={author.avatarUrl}
                timestamp={timestamp}
                category={category}
                categoryColor={
                    category === 'General' ? 'bg-zinc-700' :
                        category === 'Anuncios' ? 'bg-zinc-700' :
                            category === 'Preguntas' ? 'bg-zinc-700' :
                                'bg-zinc-700'
                }
            />

            {/* Título del post */}
            {isReply ? (
                <div className="mt-2 mb-1 font-medium flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <h3 className="text-zinc-100">{title}</h3>
                </div>
            ) : (
                <h3 className="mt-3 mb-2 font-medium text-zinc-100">{title}</h3>
            )}

            {/* Contenido del post */}
            <div className="mb-3">
                <p className="text-zinc-300 text-sm">{body}</p>
            </div>

            {/* Imagen adjunta */}
            {imageUrl && (
                <div className="mt-2 mb-3">
                    <Image
                        src={imageUrl}
                        alt={`Contenido de ${title}`}
                        width={500}
                        height={300}
                        className="rounded-lg max-h-28 object-cover"
                    />
                </div>
            )}

            {/* Interacciones */}
            <div className="flex items-center gap-4 mt-2 text-zinc-400">
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-zinc-700 rounded-full">
                        <ThumbsUp size={16} />
                    </button>
                    <span className="text-sm">{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-zinc-700 rounded-full">
                        <MessageCircle size={16} />
                    </button>
                    <span className="text-sm">{comments}</span>
                </div>
            </div>
        </div>
    );
};