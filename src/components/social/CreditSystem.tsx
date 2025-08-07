import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Users, 
  Package, 
  Handshake,
  Crown,
  Medal,
  Award
} from "lucide-react";

interface UserCredits {
  id: string;
  name: string;
  avatar: string;
  credits: number;
  league: 'bronze' | 'silver' | 'gold' | 'diamond';
  shipmentsCompleted: number;
  collaborations: number;
  rank: number;
}

interface LeagueInfo {
  name: string;
  icon: typeof Crown;
  color: string;
  minCredits: number;
  maxCredits: number;
}

const leagues: Record<string, LeagueInfo> = {
  bronze: {
    name: "Bronze",
    icon: Award,
    color: "text-orange-600",
    minCredits: 0,
    maxCredits: 499
  },
  silver: {
    name: "Silver",
    icon: Medal,
    color: "text-gray-500",
    minCredits: 500,
    maxCredits: 1499
  },
  gold: {
    name: "Gold",
    icon: Trophy,
    color: "text-yellow-600",
    minCredits: 1500,
    maxCredits: 4999
  },
  diamond: {
    name: "Diamond",
    icon: Crown,
    color: "text-blue-600",
    minCredits: 5000,
    maxCredits: Infinity
  }
};

export const CreditSystem = () => {
  const [currentUser] = useState<UserCredits>({
    id: "current",
    name: "You",
    avatar: "YU",
    credits: 1250,
    league: 'silver',
    shipmentsCompleted: 45,
    collaborations: 12,
    rank: 8
  });

  const [leaderboard] = useState<UserCredits[]>([
    {
      id: "1",
      name: "Logistics King",
      avatar: "LK",
      credits: 8750,
      league: 'diamond',
      shipmentsCompleted: 234,
      collaborations: 89,
      rank: 1
    },
    {
      id: "2",
      name: "Express Solutions",
      avatar: "ES",
      credits: 6420,
      league: 'diamond',
      shipmentsCompleted: 198,
      collaborations: 67,
      rank: 2
    },
    {
      id: "3",
      name: "Swift Transport",
      avatar: "ST",
      credits: 5890,
      league: 'diamond',
      shipmentsCompleted: 176,
      collaborations: 78,
      rank: 3
    },
    {
      id: "4",
      name: "Rapid Cargo",
      avatar: "RC",
      credits: 4320,
      league: 'gold',
      shipmentsCompleted: 143,
      collaborations: 45,
      rank: 4
    },
    {
      id: "5",
      name: "Metro Logistics",
      avatar: "ML",
      credits: 3890,
      league: 'gold',
      shipmentsCompleted: 128,
      collaborations: 52,
      rank: 5
    },
    {
      id: "6",
      name: "Speed Delivery",
      avatar: "SD",
      credits: 2750,
      league: 'gold',
      shipmentsCompleted: 97,
      collaborations: 34,
      rank: 6
    },
    {
      id: "7",
      name: "Quick Ship Co",
      avatar: "QS",
      credits: 1890,
      league: 'gold',
      shipmentsCompleted: 76,
      collaborations: 28,
      rank: 7
    },
    currentUser,
    {
      id: "9",
      name: "Fast Track",
      avatar: "FT",
      credits: 1120,
      league: 'silver',
      shipmentsCompleted: 42,
      collaborations: 15,
      rank: 9
    },
    {
      id: "10",
      name: "City Express",
      avatar: "CE",
      credits: 890,
      league: 'silver',
      shipmentsCompleted: 35,
      collaborations: 11,
      rank: 10
    }
  ]);

  const getNextLeague = (currentLeague: string) => {
    const leagueOrder = ['bronze', 'silver', 'gold', 'diamond'];
    const currentIndex = leagueOrder.indexOf(currentLeague);
    return currentIndex < leagueOrder.length - 1 ? leagueOrder[currentIndex + 1] : null;
  };

  const getProgressToNextLeague = (credits: number, currentLeague: string) => {
    const nextLeague = getNextLeague(currentLeague);
    if (!nextLeague) return 100;
    
    const current = leagues[currentLeague];
    const next = leagues[nextLeague];
    const progress = ((credits - current.minCredits) / (next.minCredits - current.minCredits)) * 100;
    return Math.min(progress, 100);
  };

  const currentLeagueInfo = leagues[currentUser.league];
  const CurrentLeagueIcon = currentLeagueInfo.icon;
  const nextLeague = getNextLeague(currentUser.league);
  const progressToNext = getProgressToNextLeague(currentUser.credits, currentUser.league);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Credit System & Leaderboard</h2>
        <p className="text-muted-foreground">
          Earn credits by creating shipments and collaborating with others
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CurrentLeagueIcon className={`w-8 h-8 ${currentLeagueInfo.color}`} />
                  <div>
                    <h3 className="text-2xl font-bold">{currentUser.credits}</h3>
                    <p className="text-sm text-muted-foreground">Credits</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${currentLeagueInfo.color} border-current`}>
                  {currentLeagueInfo.name} League
                </Badge>
              </div>

              {nextLeague && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {leagues[nextLeague].name}</span>
                    <span>{Math.round(progressToNext)}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {leagues[nextLeague].minCredits - currentUser.credits} credits needed
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{currentUser.shipmentsCompleted}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Shipments</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{currentUser.collaborations}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Collaborations</p>
                </div>
              </div>

              <div className="text-center pt-2 border-t">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">#{currentUser.rank}</span>
                </div>
                <p className="text-xs text-muted-foreground">Global Rank</p>
              </div>
            </CardContent>
          </Card>

          {/* League System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                League System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(leagues).map(([key, league]) => {
                const LeagueIcon = league.icon;
                const isCurrentLeague = key === currentUser.league;
                
                return (
                  <div 
                    key={key}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      isCurrentLeague ? 'bg-primary/10 border border-primary' : 'bg-secondary'
                    }`}
                  >
                    <LeagueIcon className={`w-5 h-5 ${league.color}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{league.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {league.minCredits === 0 ? '0' : league.minCredits.toLocaleString()}
                        {league.maxCredits === Infinity ? '+' : ` - ${league.maxCredits.toLocaleString()}`} credits
                      </p>
                    </div>
                    {isCurrentLeague && (
                      <Badge variant="secondary" className="text-xs">Current</Badge>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {leaderboard.map((user) => {
                    const userLeague = leagues[user.league];
                    const UserLeagueIcon = userLeague.icon;
                    const isCurrentUser = user.id === currentUser.id;
                    
                    return (
                      <div 
                        key={user.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          isCurrentUser ? 'bg-primary/10 border-primary' : 'bg-background'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-center min-w-[24px]">
                            {user.rank <= 3 ? (
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                user.rank === 1 ? 'bg-yellow-500 text-white' :
                                user.rank === 2 ? 'bg-gray-400 text-white' :
                                'bg-orange-500 text-white'
                              }`}>
                                {user.rank}
                              </div>
                            ) : (
                              <span className="text-sm font-medium text-muted-foreground">#{user.rank}</span>
                            )}
                          </div>
                          
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{user.name}</span>
                              {isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <UserLeagueIcon className={`w-4 h-4 ${userLeague.color}`} />
                              <span className="text-sm text-muted-foreground">{userLeague.name}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-lg">{user.credits.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">credits</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};