"use client"
import { useEffect, useState } from 'react';
import { ApiResponse, Match, MatchStatus } from '../types/match';
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import teamAvatar from '@/public/icon.png'
import localFont from 'next/font/local';
import { TeamInfo } from '@/components/TeamInfo';
import { TeamStats } from '@/components/TeamStats';
import { PlayerCard } from '@/components/PlayerCard';


const tacticSans = localFont({
  src: [
    {
      path: '../public/fonts/TacticSans-BldIt.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
export default function MatchTracker() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://app.ftoyd.com/fronttemp-service/fronttemp');
      
      if (!response.ok) throw new Error('API Error');
      
      const data: ApiResponse = await response.json();
      if (data.ok) {
        setMatches(data.data.matches);
      }
    } catch (err) {
      setError('Ошибка: не удалось загрузить информацию');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);


  const sortMatches = (matches: Match[]): Match[] => {
    const statusOrder: Record<MatchStatus, number> = {
      Ongoing: 1,    
      Scheduled: 2,  
      Finished: 3,   
    };

    return matches.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  };
  const getStatusColor = (status: MatchStatus) => {
    switch (status) {
      case 'Scheduled': return 'bg-orange-500';
      case 'Ongoing': return 'bg-[#43AD28]';
      case 'Finished': return 'bg-red-600';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#06080C]  p-8">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold text-white ${tacticSans.className}`} >Match Tracker</h1>
          <Button
            onClick={fetchMatches}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Обновить'}
            <RefreshCw />
          </Button>
        </div>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-white">Загрузка матчей... </div>
        ) : (
          <div className="space-y-4">
            {sortMatches(matches).map((match) => (
              <Accordion 
                key={match.title + match.time} 
                type="single" 
                collapsible 
                className="w-full  bg-white"
              >
                <AccordionItem value="item-1" className='bg-[#0B0E12] text-white'>
                  <AccordionTrigger className='flex justify-between items-center h-[90px] mx-6'>
                    <div className='flex items-center '>
                      <TeamInfo team={match.homeTeam} avatar={teamAvatar} />
                    </div>
                    <div className='flex flex-col items-center'>
                      <span className='text-2xl font-bold mb-2'>{match.homeScore} : {match.awayScore}</span>
                      <span className={`px-4 py-2 rounded-sm text-sm ${getStatusColor(match.status)}`}>
                        {match.status === 'Ongoing' && 'Live'}
                        {match.status === 'Scheduled' && 'Match preparing'}
                        {match.status === 'Finished' && 'Finished'}
                      </span>
                    </div>
                    <div className='flex items-center '>
                      <TeamInfo team={match.awayTeam} avatar={teamAvatar} isReverse />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Home Team Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-around">
                          {match.homeTeam.players.map((player) => (
                            <PlayerCard key={player.username} player={player} />
                          ))}
                        </div>
                        <TeamStats team={match.homeTeam} />
                      </div>
                      
                      {/* Away Team Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-around">
                          {match.awayTeam.players.map((player) => (
                            <PlayerCard key={player.username} player={player} />
                          ))}
                        </div>
                        <TeamStats team={match.awayTeam} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}