// Компонент PlayerCard.tsx
"use client"
import Image from 'next/image';
import avatar from "@/public/avatar_global.png";

interface PlayerCardProps {
  player: {
    username: string;
    kills: number;
  };
}


export const PlayerCard = ({ player }: PlayerCardProps) => (
  <div className="bg-[#1c212a] w-[32%] px-2 py-3 flex items-center justify-between rounded-md gap-2">
    <div className='flex items-center gap-2'>
    <Image 
      src={avatar} 
      alt={player.username}
      width={24}
      height={24}
      className="rounded-full"
    />
    <span className="text-sm">{player.username}</span>
    </div>
    <span className="text-[#ffffff] text-sm">Убийства: {player.kills}</span>
  </div>
);
