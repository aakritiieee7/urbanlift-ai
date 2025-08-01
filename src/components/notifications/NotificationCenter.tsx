import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, Clock, Users, Package, TrendingUp, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  type: "collaboration" | "shipment" | "savings" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionable?: boolean;
  priority: "high" | "medium" | "low";
}

export const NotificationCenter = () => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "collaboration",
      title: "New Collaboration Opportunity",
      message: "TechMart Electronics wants to share a route from Chandni Chowk to Gurgaon. Potential savings: ₹180",
      timestamp: "2 minutes ago",
      isRead: false,
      actionable: true,
      priority: "high"
    },
    {
      id: "2",
      type: "shipment",
      title: "Shipment Status Update",
      message: "Your shipment SHIP_1734567890 has arrived at the Central Delhi Micro-Hub",
      timestamp: "15 minutes ago",
      isRead: false,
      actionable: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "savings",
      title: "Monthly Savings Report",
      message: "You've saved ₹2,400 this month through shared logistics. That's 25% more than last month!",
      timestamp: "1 hour ago",
      isRead: true,
      actionable: false,
      priority: "low"
    },
    {
      id: "4",
      type: "collaboration",
      title: "Collaboration Request Approved",
      message: "Fashion Hub has approved your request to join the Delhi-Noida cluster shipment",
      timestamp: "3 hours ago",
      isRead: true,
      actionable: false,
      priority: "medium"
    },
    {
      id: "5",
      type: "system",
      title: "Route Optimization Complete",
      message: "AI has optimized your pending shipment. New ETA: 2 hours earlier with 15% cost reduction",
      timestamp: "1 day ago",
      isRead: true,
      actionable: false,
      priority: "medium"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "collaboration":
        return <Users className="w-4 h-4" />;
      case "shipment":
        return <Package className="w-4 h-4" />;
      case "savings":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "collaboration":
        return "text-info";
      case "shipment":
        return "text-primary";
      case "savings":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-warning";
      case "medium":
        return "border-l-info";
      default:
        return "border-l-muted";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been updated."
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed."
    });
  };

  const handleAction = (notification: Notification) => {
    if (notification.type === "collaboration") {
      toast({
        title: "Viewing Collaboration",
        description: "Opening collaboration details..."
      });
    }
    markAsRead(notification.id);
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="collaboration">
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="shipments">
            Shipments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`shadow-sm border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.isRead ? "bg-muted/20" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          {notification.actionable && !notification.isRead && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAction(notification)}
                            >
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                      className="ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">
                  You have no unread notifications.
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`shadow-sm border-l-4 ${getPriorityColor(notification.priority)} bg-muted/20`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-1 ${getTypeColor(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {notification.title}
                          </h4>
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {notification.actionable && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAction(notification)}
                              >
                                View
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                      className="ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          {notifications.filter(n => n.type === "collaboration").map((notification) => (
            <Card 
              key={notification.id} 
              className={`shadow-sm border-l-4 border-l-info ${
                !notification.isRead ? "bg-muted/20" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-info mt-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      {notification.actionable && !notification.isRead && (
                        <Button size="sm" onClick={() => handleAction(notification)}>
                          View Opportunity
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          {notifications.filter(n => n.type === "shipment").map((notification) => (
            <Card 
              key={notification.id} 
              className={`shadow-sm border-l-4 border-l-primary ${
                !notification.isRead ? "bg-muted/20" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};