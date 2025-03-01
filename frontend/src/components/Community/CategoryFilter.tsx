// components/CategoryFilter.tsx
import { MessageSquare, Megaphone, HelpCircle, Trophy, MoreVertical } from 'lucide-react';
import React from 'react';

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    activeCategory,
    onCategoryChange
}) => {
    const categories = [
        { id: 'all', label: 'All', icon: null },
        { id: 'general', label: 'General', icon: <MessageSquare size={16} /> },
        { id: 'anuncios', label: 'Anuncios', icon: <Megaphone size={16} /> },
        { id: 'preguntas', label: 'Preguntas', icon: <HelpCircle size={16} /> },
        { id: 'logros', label: 'Logros', icon: <Trophy size={16} /> },
    ];

    return (
        <div className="flex items-center space-x-2 mb-4">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${activeCategory === category.id
                        ? 'bg-zinc-700 text-white'
                        : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                        }`}
                    onClick={() => onCategoryChange(category.id)}
                >
                    {category.icon && <span>{category.icon}</span>}
                    {category.label}
                </button>
            ))}
            <button className="ml-auto bg-zinc-800/60 text-zinc-400 p-1.5 rounded-full hover:bg-zinc-700 hover:text-zinc-300">
                <MoreVertical size={18} />
            </button>
        </div>
    );
};