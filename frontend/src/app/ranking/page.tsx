"use client";

import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import LeaderboardTable from "@/components/LeaderboardTable";
import LevelItem from "@/components/LevelItem";
import { userProfile, levelStats } from "@/data/userLevelData";
import { topUsers } from "@/data/leaderboardData";

export default function RankingPage() {
    // Preparar datos para diferentes marcos de tiempo
    const sevenDayUsers = [...topUsers].map(user => ({
        ...user,
        points: Math.max(1, Math.floor(user.points / 2))
    }));

    // Simulamos un orden diferente para el ranking de 7 días
    const reorderedSevenDayUsers = [
        { ...sevenDayUsers[1], position: 1 },
        { ...sevenDayUsers[2], position: 2 },
        { ...sevenDayUsers[0], position: 3 },
        { ...sevenDayUsers[3], position: 4 },
        { ...sevenDayUsers[4], position: 5 }
    ];

    // Para 30 días usamos los datos originales
    const thirtyDayUsers = [...topUsers];

    // Para all-time, usamos los datos originales pero sin el "+" en los puntos
    const allTimeUsers = [...topUsers];

    return (
        <MainLayout activeTab="ranking">
            <div className="container mx-auto px-4 py-6">
                {/* Perfil y niveles */}
                <div className="bg-[#2A2A29] rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Avatar y nombre */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4169E1] relative">
                                    <img
                                        src={userProfile.avatarUrl}
                                        alt="Perfil"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 right-0 bg-[#4169E1] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                                    {userProfile.currentLevel}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mt-4">{userProfile.username}</h2>
                            <div className="text-[#4169E1] font-medium">Level {userProfile.currentLevel}</div>
                            <div className="text-sm text-gray-400 mt-1">
                                <span className="font-medium text-gray-300">{userProfile.pointsToNextLevel}</span> points to level up <span className="inline-block ml-1 text-gray-400 cursor-help">ⓘ</span>
                            </div>
                        </div>

                        {/* Niveles */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 md:mt-0">
                            <div className="space-y-4">
                                {levelStats.slice(0, 3).map(level => (
                                    <LevelItem
                                        key={level.level}
                                        level={level.level}
                                        percentage={level.percentage}
                                        isLocked={level.isLocked}
                                        isCurrent={level.isCurrent}
                                    />
                                ))}
                            </div>
                            <div className="space-y-4">
                                {levelStats.slice(3, 6).map(level => (
                                    <LevelItem
                                        key={level.level}
                                        level={level.level}
                                        percentage={level.percentage}
                                        isLocked={level.isLocked}
                                        isCurrent={level.isCurrent}
                                    />
                                ))}
                            </div>
                            <div className="space-y-4">
                                {levelStats.slice(6, 9).map(level => (
                                    <LevelItem
                                        key={level.level}
                                        level={level.level}
                                        percentage={level.percentage}
                                        isLocked={level.isLocked}
                                        isCurrent={level.isCurrent}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Última actualización */}
                <div className="text-sm text-gray-400 mb-6">
                    Last updated: {userProfile.lastUpdated}
                </div>

                {/* Tablas de clasificación */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LeaderboardTable
                        title="Leaderboard (7-day)"
                        timeframe="7-day"
                        users={reorderedSevenDayUsers}
                    />
                    <LeaderboardTable
                        title="Leaderboard (30-day)"
                        timeframe="30-day"
                        users={thirtyDayUsers}
                    />
                    <LeaderboardTable
                        title="Leaderboard (all-time)"
                        timeframe="all-time"
                        users={allTimeUsers}
                    />
                </div>
            </div>
        </MainLayout>
    );
}