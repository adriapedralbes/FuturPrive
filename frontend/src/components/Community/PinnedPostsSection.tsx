import { Trophy } from 'lucide-react';

import React, { useState } from 'react';

import { Post } from '@/types/Post';

import { PostCard } from './PostCard';

interface PinnedPostsSectionProps {
    pinnedPosts: Post[];
}

export const PinnedPostsSection: React.FC<PinnedPostsSectionProps> = ({ pinnedPosts }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || pinnedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mb-4">
            <div className="bg-amber-800/20 rounded-t-lg px-4 py-2 flex items-center justify-between border-l-4 border-amber-500">
                <div className="flex items-center gap-2 text-amber-500">
                    <Trophy size={16} />
                    <span className="font-medium">Pinned</span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-sm font-medium text-amber-500/80 hover:text-amber-500"
                >
                    Hide
                </button>
            </div>
            <div className="bg-transparent">
                {pinnedPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        author={post.author}
                        timestamp={post.timestamp}
                        category={post.category}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                        isPinned={true}
                        imageUrl={post.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};