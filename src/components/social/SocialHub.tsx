import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Users, 
  Wrench, 
  Building, 
  Utensils, 
  Truck, 
  Shirt,
  Monitor,
  Send,
  Hash
} from "lucide-react";

interface BusinessGroup {
  id: string;
  name: string;
  description: string;
  icon: typeof Wrench;
  memberCount: number;
  color: string;
  messages: Message[];
}

interface Message {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: 'message' | 'market_update' | 'opportunity';
}

export const SocialHub = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [groups, setGroups] = useState<BusinessGroup[]>([]);

  // Initialize groups data on mount
  useState(() => {
    setGroups([
      {
        id: "hardware",
        name: "Hardware & Tools",
        description: "Hardware stores, tool suppliers, construction materials",
        icon: Wrench,
        memberCount: 247,
        color: "text-orange-600",
        messages: [
          {
            id: "1",
            user: "Rajesh Tools",
            avatar: "RT",
            message: "Steel prices have increased by 8% this week. Anyone facing similar issues?",
            timestamp: "2 hours ago",
            type: "market_update"
          },
          {
            id: "2",
            user: "Mumbai Hardware",
            avatar: "MH",
            message: "Yes, we're seeing the same trend. Considering bulk purchasing to reduce costs.",
            timestamp: "1 hour ago",
            type: "message"
          },
          {
            id: "3",
            user: "Delhi Construction Supply",
            avatar: "DCS",
            message: "Anyone interested in joint procurement? We need 10 tons of cement.",
            timestamp: "45 minutes ago",
            type: "opportunity"
          }
        ]
      },
      {
        id: "steel",
        name: "Steel & Metals",
        description: "Steel traders, metal fabricators, raw material suppliers",
        icon: Building,
        memberCount: 189,
        color: "text-slate-600",
        messages: [
          {
            id: "1",
            user: "Steel King Industries",
            avatar: "SKI",
            message: "Raw material shortage affecting production schedules. Market is volatile.",
            timestamp: "3 hours ago",
            type: "market_update"
          },
          {
            id: "2",
            user: "Metro Steel Works",
            avatar: "MSW",
            message: "We have excess capacity this month. Open for contract manufacturing.",
            timestamp: "2 hours ago",
            type: "opportunity"
          }
        ]
      },
      {
        id: "food",
        name: "Food & Beverages",
        description: "Food processors, distributors, restaurant suppliers",
        icon: Utensils,
        memberCount: 324,
        color: "text-green-600",
        messages: [
          {
            id: "1",
            user: "Fresh Foods Delhi",
            avatar: "FFD",
            message: "Seasonal vegetables are in abundance. Great prices this week!",
            timestamp: "1 hour ago",
            type: "market_update"
          },
          {
            id: "2",
            user: "Spice Merchants Co",
            avatar: "SMC",
            message: "Looking for reliable cold chain partners for nationwide delivery.",
            timestamp: "30 minutes ago",
            type: "opportunity"
          }
        ]
      },
      {
        id: "logistics",
        name: "Logistics & Transport",
        description: "Fleet operators, freight forwarders, warehouse managers",
        icon: Truck,
        memberCount: 156,
        color: "text-blue-600",
        messages: [
          {
            id: "1",
            user: "Express Logistics",
            avatar: "EL",
            message: "Fuel costs impacting margins. Need to optimize routes better.",
            timestamp: "4 hours ago",
            type: "market_update"
          }
        ]
      },
      {
        id: "textile",
        name: "Textile & Garments",
        description: "Fabric suppliers, garment manufacturers, fashion retailers",
        icon: Shirt,
        memberCount: 203,
        color: "text-purple-600",
        messages: [
          {
            id: "1",
            user: "Fashion Forward",
            avatar: "FF",
            message: "Cotton prices stabilizing after last month's volatility.",
            timestamp: "2 hours ago",
            type: "market_update"
          }
        ]
      },
      {
        id: "electronics",
        name: "Electronics & Tech",
        description: "Electronics dealers, tech distributors, gadget retailers",
        icon: Monitor,
        memberCount: 198,
        color: "text-indigo-600",
        messages: [
          {
            id: "1",
            user: "Tech Solutions Hub",
            avatar: "TSH",
            message: "New smartphone models arriving next week. Pre-orders looking strong.",
            timestamp: "1 hour ago",
            type: "market_update"
          }
        ]
      }
    ]);
  });

  const selectedGroupData = groups.find(group => group.id === selectedGroup);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        user: "You",
        avatar: "YU",
        message: newMessage.trim(),
        timestamp: "now",
        type: "message"
      };

      setGroups(prevGroups => 
        prevGroups.map(group => 
          group.id === selectedGroup 
            ? { ...group, messages: [...group.messages, newMsg] }
            : group
        )
      );
      
      setNewMessage("");
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'market_update':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'opportunity':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'market_update':
        return '📈';
      case 'opportunity':
        return '🤝';
      default:
        return '💬';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Business Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow entrepreneurs, share market insights, and discover collaboration opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Business Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-secondary ${
                      selectedGroup === group.id ? 'bg-primary/10 border-primary' : 'bg-background'
                    }`}
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-secondary ${group.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{group.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {group.memberCount} members
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {group.messages.length} new
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedGroupData ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-secondary ${selectedGroupData.color}`}>
                    <selectedGroupData.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      {selectedGroupData.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedGroupData.memberCount} members • {selectedGroupData.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />
              
              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {selectedGroupData.messages.map((message) => (
                      <div key={message.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {message.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.user}</span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </span>
                              {message.type !== 'message' && (
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getMessageTypeColor(message.type)}`}
                                >
                                  {getMessageTypeIcon(message.type)} {message.type.replace('_', ' ')}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-foreground">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              
              <Separator />
              
              {/* Message Input */}
              <div className="p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Message #${selectedGroupData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center space-y-3">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Select a Business Group</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a group from the left to start chatting with fellow entrepreneurs
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};