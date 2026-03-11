import { useMemo, useState } from "react";
import { Bell } from "lucide-react";

import NotificationCard from "@/components/notifications/NotificationCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const INITIAL_NOTIFICATIONS = [
    {
        id: "n1",
        title: "Employee Owais Rao has accepted the invitation.",
        description: "",
        timeLabel: "3/3/2026, 2:46:54 PM",
        actionLabel: "Mark as read",
        time: new Date().toISOString(),
    },
    {
        id: "n2",
        title: "Employee Hamza Shahab has accepted the invitation.",
        description: "",
        timeLabel: "3/3/2026, 2:45:45 PM",
        actionLabel: "Mark as read",
        time: "2026-03-03T14:45:45.000Z",
    },
    {
        id: "n3",
        title: "Organization Logo&Design has completed the payment for Invoice #UW-00000029 for the Feb 2021 cycle.",
        description: "",
        timeLabel: "3/2/2026, 12:20:24 AM",
        actionLabel: "Mark as read",
        time: "2026-03-02T00:20:24.000Z",
    },
    {
        id: "n4",
        title: "Employee Elizabeth Wise has accepted the invitation.",
        description: "",
        timeLabel: "2/28/2026, 2:00:45 AM",
        actionLabel: "Mark as read",
        time: "2026-02-28T02:00:45.000Z",
    },
    {
        id: "n5",
        title: "Organization Logo&Design has completed the payment for Invoice #UW-00000028 for Jan 2021 cycle.",
        description: "",
        timeLabel: "2/28/2026, 1:48:49 AM",
        actionLabel: "Mark as read",
        time: "2026-02-28T01:48:49.000Z",
    },
    {
        id: "n6",
        title: "Employee John Mathew has uploaded the signed contract document.",
        description: "",
        timeLabel: "2/27/2026, 9:18:11 PM",
        actionLabel: "Mark as read",
        time: "2026-02-27T21:18:11.000Z",
    },
    {
        id: "n7",
        title: "Organization DesignHub has completed the payment for Invoice #UW-00000027 for Dec 2020 cycle.",
        description: "",
        timeLabel: "2/27/2026, 7:04:30 PM",
        actionLabel: "Mark as read",
        time: "2026-02-27T19:04:30.000Z",
    },
    {
        id: "n8",
        title: "Employee Sara Ali has accepted the invitation.",
        description: "",
        timeLabel: "2/26/2026, 11:22:03 AM",
        actionLabel: "Mark as read",
        time: "2026-02-26T11:22:03.000Z",
    },
];

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [isOpen, setIsOpen] = useState(false);

    const hasNotifications = notifications.length > 0;
    const shouldAnimate = useMemo(() => hasNotifications && !isOpen, [hasNotifications, isOpen]);

    const dismissOne = (id) => {
        setNotifications((current) => current.filter((item) => item.id !== id));
    };

    const dismissAll = () => {
        setNotifications([]);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open notifications"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Bell className={shouldAnimate ? "notification-bell-shake h-[18px] w-[18px]" : "h-[18px] w-[18px]"} />
                    {hasNotifications ? <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#e11d48]" /> : null}
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] border-l-0 bg-muted/50 p-0 sm:max-w-[320px]">
                <ScrollArea className="h-full px-4 pb-4">
                    {hasNotifications ? (
                        <div className="pt-16">
                            <div className="mb-4 flex items-end justify-between">
                                <h2 className="text-2xl font-bold leading-none text-foreground">Notifications</h2>
                                <button
                                    type="button"
                                    onClick={dismissAll}
                                    className="text-[12px] text-primary underline hover:text-primary/80"
                                >
                                    dismiss all
                                </button>
                            </div>

                            {notifications.map((item) => (
                                <NotificationCard key={item.id} item={item} onClose={dismissOne} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center pt-24">
                            <p className="text-sm text-muted-foreground">There are no notifications for now.</p>
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default NotificationPanel;
