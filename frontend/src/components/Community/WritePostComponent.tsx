// components/WritePostComponent.tsx
import { User } from 'lucide-react';
import React from 'react';

export const WritePostComponent: React.FC = () => {
    return (
        <div className="bg-zinc-800/50 rounded-lg p-3 flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
                <User className="text-zinc-400" size={18} />
            </div>
            <div className="flex-1">
                <button
                    className="w-full text-left text-zinc-400 px-4 py-2 bg-zinc-800/70 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                    Write something
                </button>
            </div>
        </div>
    );
};