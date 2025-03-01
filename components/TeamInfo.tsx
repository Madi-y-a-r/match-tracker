
"use client"
import Image from 'next/image';

interface TeamInfoProps {
  team: {
    name: string;
  };
  avatar: any;
  isReverse?: boolean;
}

export const TeamInfo = ({ team, avatar, isReverse = false }: TeamInfoProps) => (
  <div className={`flex items-center ${isReverse ? 'flex-row-reverse' : ''}`}>
    <Image 
        src={avatar} 
        alt={team.name}
        width={50}
        height={50}
        className="mx-4"
    />
    <h2 className="text-xl font-semibold">{team.name}</h2>
  </div>
);