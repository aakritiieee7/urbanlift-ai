import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Truck, 
  Users, 
  MapPin, 
  Clock, 
  DollarSign,
  Plus,
  Send,
  Phone,
  AlertTriangle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CommunityPost {
  id: string;
  type: 'driver_ad' | 'pooling_offer' | 'traffic_report';
  user: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
  location?: string;
  destination?: string;
  price?: string;
  capacity?: string;
  urgency?: 'low' | 'medium' | 'high';
  whatsapp?: string;
  likes: number;
  comments: number;
}

export const CommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      type: "driver_ad",
      user: "Ravi Transport",
      avatar: "RT",
      title: "Truck Available: Delhi to Mumbai Route",
      content: "25-ton capacity truck available for immediate booking. Experienced driver with 10+ years. Competitive rates and reliable service.",
      timestamp: "2 hours ago",
      location: "Delhi",
      destination: "Mumbai",
      price: "₹45,000",
      capacity: "25 tons",
      urgency: "medium",
      whatsapp: "+91-9876543210",
      likes: 8,
      comments: 3
    },
    {
      id: "2",
      type: "pooling_offer",
      user: "Steel Industries Co",
      avatar: "SIC",
      title: "Steel Shipment Pooling - Bangalore to Chennai",
      content: "We have 15 tons of steel to ship. Looking for other businesses going to Chennai to share costs. Can accommodate 10 more tons.",
      timestamp: "4 hours ago",
      location: "Bangalore",
      destination: "Chennai",
      price: "₹18,000",
      capacity: "10 tons available",
      urgency: "high",
      whatsapp: "+91-9876543211",
      likes: 12,
      comments: 7
    },
    {
      id: "3",
      type: "traffic_report",
      user: "Highway Monitor",
      avatar: "HM",
      title: "Road Block Alert: NH-44 near Guntur",
      content: "Major road repair work causing 2-3 hour delays. Alternative route via NH-65 recommended. Will update as situation changes.",
      timestamp: "1 hour ago",
      location: "NH-44, Guntur",
      urgency: "high",
      likes: 25,
      comments: 8
    },
    {
      id: "4",
      type: "driver_ad",
      user: "Express Logistics",
      avatar: "EL",
      title: "Same Day Delivery Service - Pune Area",
      content: "Fast and reliable same-day delivery within Pune city limits. Perfect for urgent shipments. GPS tracking included.",
      timestamp: "6 hours ago",
      location: "Pune",
      destination: "Pune (City Wide)",
      price: "₹500/delivery",
      capacity: "500 kg max",
      urgency: "low",
      whatsapp: "+91-9876543212",
      likes: 6,
      comments: 2
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'driver_ad' as const,
    title: '',
    content: '',
    location: '',
    destination: '',
    price: '',
    capacity: '',
    urgency: 'medium' as const,
    whatsapp: ''
  });

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: CommunityPost = {
        id: `post-${Date.now()}`,
        type: newPost.type,
        user: "You",
        avatar: "YU",
        title: newPost.title,
        content: newPost.content,
        timestamp: "now",
        location: newPost.location || undefined,
        destination: newPost.destination || undefined,
        price: newPost.price || undefined,
        capacity: newPost.capacity || undefined,
        urgency: newPost.urgency,
        whatsapp: newPost.whatsapp || undefined,
        likes: 0,
        comments: 0
      };

      setPosts(prev => [post, ...prev]);
      setNewPost({
        type: 'driver_ad',
        title: '',
        content: '',
        location: '',
        destination: '',
        price: '',
        capacity: '',
        urgency: 'medium',
        whatsapp: ''
      });
      setShowCreatePost(false);
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'driver_ad':
        return <Truck className="w-4 h-4" />;
      case 'pooling_offer':
        return <Users className="w-4 h-4" />;
      case 'traffic_report':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'driver_ad':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pooling_offer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'traffic_report':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Community Posts</h2>
          <p className="text-muted-foreground">
            Driver ads, pooling offers, and traffic updates from the community
          </p>
        </div>
        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Community Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={newPost.type} onValueChange={(value: any) => setNewPost(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver_ad">Driver Advertisement</SelectItem>
                  <SelectItem value="pooling_offer">Pooling Offer</SelectItem>
                  <SelectItem value="traffic_report">Traffic Report</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              />
              
              <Textarea
                placeholder="Post content"
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={3}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="From location"
                  value={newPost.location}
                  onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  placeholder="To location"
                  value={newPost.destination}
                  onChange={(e) => setNewPost(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Price (optional)"
                  value={newPost.price}
                  onChange={(e) => setNewPost(prev => ({ ...prev, price: e.target.value }))}
                />
                <Input
                  placeholder="Capacity (optional)"
                  value={newPost.capacity}
                  onChange={(e) => setNewPost(prev => ({ ...prev, capacity: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Select value={newPost.urgency} onValueChange={(value: any) => setNewPost(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="WhatsApp (optional)"
                  value={newPost.whatsapp}
                  onChange={(e) => setNewPost(prev => ({ ...prev, whatsapp: e.target.value }))}
                />
              </div>
              
              <Button onClick={handleCreatePost} className="w-full">
                Create Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.user}</span>
                        <Badge variant="outline" className={`text-xs ${getPostTypeColor(post.type)}`}>
                          {getPostTypeIcon(post.type)}
                          {post.type.replace('_', ' ')}
                        </Badge>
                        {post.urgency && (
                          <Badge variant="outline" className={`text-xs ${getUrgencyColor(post.urgency)}`}>
                            {post.urgency} priority
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-medium mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                </div>
                
                {(post.location || post.destination || post.price || post.capacity) && (
                  <div className="flex flex-wrap gap-2">
                    {post.location && (
                      <Badge variant="secondary" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        From: {post.location}
                      </Badge>
                    )}
                    {post.destination && (
                      <Badge variant="secondary" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        To: {post.destination}
                      </Badge>
                    )}
                    {post.price && (
                      <Badge variant="secondary" className="text-xs">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {post.price}
                      </Badge>
                    )}
                    {post.capacity && (
                      <Badge variant="secondary" className="text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        {post.capacity}
                      </Badge>
                    )}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      ❤️ {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    {post.whatsapp && (
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`https://wa.me/${post.whatsapp.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          WhatsApp
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};