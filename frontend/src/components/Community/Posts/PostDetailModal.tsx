import React, { useRef, useEffect, useState } from 'react';
import { ThumbsUp, MessageCircle, Bell, MoreHorizontal, Smile } from 'lucide-react';
import Image from 'next/image';

import { Post } from '@/types/Post';
import { UserBadge } from '@/components/Community/UserBadge';
import { Button } from '@/components/ui/button';

interface PostDetailModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
    post,
    isOpen,
    onClose
}) => {
    const [comment, setComment] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.likes || 0);

    // Función para confirmar salida si hay comentario pendiente
    const confirmDiscardComment = (): boolean => {
        if (comment.trim() !== '') {
            return window.confirm("Aún no has terminado tu comentario. ¿Quieres irte sin terminar?");
        }
        return true;
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if (confirmDiscardComment()) {
                    setComment('');
                    onClose();
                }
            }
        };

        // Only add listener if modal is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, comment]);

    // Close on escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (confirmDiscardComment()) {
                    setComment('');
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose, comment]);

    // Handle like action
    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
    };

    // Format content with title and body
    const formatContent = () => {
        if (!post) return { title: '', body: '' };

        const contentLines = post.content.split('\n');
        const title = contentLines[0];
        const body = contentLines.slice(1).join('\n');

        return { title, body };
    };

    if (!isOpen || !post) return null;

    const { title, body } = formatContent();
    const isReply = post.content.startsWith('Re:');

    return (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-start justify-center pt-8 sm:pt-16 overflow-y-auto">
            <div
                ref={modalRef}
                className="bg-[#1f1f1e] w-full max-w-3xl mx-4 rounded-lg border border-white/10 shadow-xl"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Bell size={14} className="text-zinc-400" />
                        <span className="text-zinc-300 text-xs">
                            {post.isPinned ? 'Post fijado' : 'Post de la comunidad'}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white text-xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Post Content */}
                <div className="px-5 py-3">
                    <UserBadge
                        username={post.author.username}
                        level={post.author.level}
                        avatarUrl={post.author.avatarUrl}
                        timestamp={post.timestamp}
                        category={post.category}
                        categoryColor={
                            post.category === 'General' ? 'bg-[#444442] border border-white/5' :
                                post.category === 'Anuncios' ? 'bg-[#444442] border border-white/5' :
                                    post.category === 'Preguntas' ? 'bg-[#444442] border border-white/5' :
                                        'bg-[#444442] border border-white/5'
                        }
                    />

                    {/* Title */}
                    {isReply ? (
                        <div className="mt-2 mb-1 font-medium flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <h2 className="text-white text-lg">{title}</h2>
                        </div>
                    ) : (
                        <h2 className="mt-2 mb-1 font-medium text-white text-lg">{title}</h2>
                    )}

                    {/* Body */}
                    <div className="mb-3">
                        <p className="text-zinc-200">{body}</p>
                    </div>

                    {/* Image if available */}
                    {post.imageUrl && (
                        <div className="mt-2 mb-3">
                            <Image
                                src={post.imageUrl}
                                alt={`Contenido de ${title}`}
                                width={600}
                                height={400}
                                className="rounded-lg max-h-72 object-cover border border-white/10"
                            />
                        </div>
                    )}

                    {/* Interactions */}
                    <div className="flex items-center gap-4 mt-3 pb-3 border-b border-white/10 text-zinc-300">
                        <div className="flex items-center gap-1">
                            <button
                                className={`p-1 rounded-full ${liked ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-[#444442]'}`}
                                onClick={handleLike}
                            >
                                <ThumbsUp size={16} />
                            </button>
                            <span className="text-sm">{likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-[#444442] rounded-full">
                                <MessageCircle size={16} />
                            </button>
                            <span className="text-sm">{post.comments}</span>
                        </div>
                        {/* Quitando el botón de tres puntos */}
                    </div>

                    {/* Comments Section */}
                    <div className="mt-3">
                        <h3 className="text-white font-medium mb-3 text-sm">Comentarios ({post.comments})</h3>

                        {/* Add Comment */}
                        <div className="flex gap-2 mt-2">
                            <div className="w-7 h-7 bg-[#444442] rounded-full flex items-center justify-center overflow-hidden border border-white/10 flex-shrink-0">
                                <Image
                                    src="https://github.com/shadcn.png"
                                    alt="Tu avatar"
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="bg-[#252524] rounded-full flex items-center border border-white/5 mb-4">
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Your comment"
                                        className="flex-1 bg-transparent text-zinc-200 outline-none px-3 py-1.5 text-sm rounded-full"
                                    />
                                    <div className="flex items-center mr-3 space-x-1">
                                        <button className="p-1 text-zinc-500 hover:text-zinc-300">
                                            <MessageCircle size={16} />
                                        </button>
                                        <button className="p-1 text-zinc-500 hover:text-zinc-300">
                                            <span className="text-xs font-bold">GIF</span>
                                        </button>
                                        <button className="p-1 text-zinc-500 hover:text-zinc-300">
                                            <Smile size={16} />
                                        </button>
                                    </div>
                                </div>
                                {comment.trim() !== '' && (
                                    <div className="flex justify-end mt-1.5 space-x-2">
                                        <button
                                            onClick={() => {
                                                if (confirmDiscardComment()) {
                                                    setComment('');
                                                }
                                            }}
                                            className="text-zinc-400 hover:text-zinc-300 text-xs font-medium px-3 py-2"
                                        >
                                            CANCEL
                                        </button>
                                        <Button
                                            variant="default"
                                            size="lg"
                                            className="rounded-full font-medium text-base bg-amber-400 hover:bg-amber-500 text-black"
                                        >
                                            Comentar
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};