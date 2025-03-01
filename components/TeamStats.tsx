// Компонент TeamStats.tsx
"use client"

interface TeamStatsProps {
    team: {
        points: number;
        place: number;
        total_kills: number;
    };
}

export const TeamStats = ({ team }: TeamStatsProps) => (
  <div className="bg-[#1c212a] flex items-center justify-around py-3 rounded-md">
    <StatItem label="Points: " value={`+${team.points}`} />
    <StatItem label="Место: " value={team.place} />
    <StatItem label="Убийств: " value={team.total_kills} />
  </div>
);

const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex ">
    <span className="text-gray-400">{label}</span>
    &nbsp;
    <span className="text-white">{value}</span>
  </div>
);