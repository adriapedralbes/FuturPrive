import { MessageSquare, Megaphone, HelpCircle, Trophy, MoreVertical, Filter } from 'lucide-react';
import React, { useState } from 'react';

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    activeCategory,
    onCategoryChange
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const categories = [
        { id: 'all', label: 'All', icon: null },
        { id: 'general', label: 'General', icon: <MessageSquare size={16} /> },
        { id: 'anuncios', label: 'Anuncios', icon: <Megaphone size={16} /> },
        { id: 'preguntas', label: 'Preguntas', icon: <HelpCircle size={16} /> },
        { id: 'logros', label: 'Logros', icon: <Trophy size={16} /> },
    ];

    // Encontrar la categoría activa para mostrarla en el móvil
    const activeItem = categories.find(cat => cat.id === activeCategory) || categories[0];

    return (
        <div className="mb-4 mx-4 sm:mx-2 md:mx-0">
            {/* Vista móvil - Dropdown */}
            <div className="flex md:hidden flex-col relative">
                <button
                    className="flex items-center justify-between w-full px-4 py-2 bg-zinc-800 rounded-lg text-white"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <div className="flex items-center gap-2">
                        {activeItem.icon}
                        <span>{activeItem.label}</span>
                    </div>
                    <Filter size={16} />
                </button>

                {showDropdown && (
                    <div className="absolute top-12 left-0 right-0 bg-zinc-900 rounded-lg shadow-lg z-10 py-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`flex items-center gap-2 px-4 py-2 w-full text-left ${activeCategory === category.id
                                    ? 'bg-zinc-700 text-white'
                                    : 'text-zinc-400 hover:bg-zinc-800'
                                    }`}
                                onClick={() => {
                                    onCategoryChange(category.id);
                                    setShowDropdown(false);
                                }}
                            >
                                {category.icon && <span>{category.icon}</span>}
                                {category.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Vista desktop - Botones horizontales */}
            <div className="hidden md:flex items-center space-x-2">
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
        </div>
    );
};