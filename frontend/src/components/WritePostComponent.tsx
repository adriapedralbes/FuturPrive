"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

export function WritePostComponent() {
    return (
        <div className="w-full px-4 py-4">
            <div className="bg-[#141414] rounded-md border border-[#232323] flex items-center gap-3 px-3 py-2 shadow-sm">
                <Avatar className="h-10 w-10 border border-[#232323]">
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback className="bg-[#232323] text-gray-300">U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <input
                        className="w-full bg-transparent border-0 outline-none text-gray-300 placeholder:text-gray-500"
                        placeholder="Write something"
                    />
                </div>
                <button className="text-gray-400 p-1.5 rounded-md hover:bg-[#1e1e1e] hover:text-white transition-colors">
                    <Camera size={20} />
                </button>
            </div>
        </div>
    );
}