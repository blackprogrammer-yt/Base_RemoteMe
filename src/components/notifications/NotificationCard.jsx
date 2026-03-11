import { formatDistanceToNow } from "date-fns";
import { Flame, Mail, RefreshCcw, Star, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ICON_MAP = {
    flame: Flame,
    star: Star,
    mail: Mail,
    refresh: RefreshCcw,
};

const CARD_VARIANTS = {
    secondary: "bg-primary text-primary-foreground",
    default: "bg-card text-foreground border border-border/50",
};

const IconBubble = ({ icon }) => {
    const Icon = ICON_MAP[icon];

    if (!Icon) return null;

    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10">
            <Icon className="h-4 w-4 opacity-80" />
        </div>
    );
};

const AvatarBubble = ({ image, fallback }) => (
    <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={image} alt={fallback} />
        <AvatarFallback className="text-[10px] font-semibold">{fallback}</AvatarFallback>
    </Avatar>
);

const NotificationCard = ({ item, onClose }) => {
    const variantClass = CARD_VARIANTS[item.variant] || CARD_VARIANTS.default;
    const timeText = item.timeLabel || formatDistanceToNow(new Date(item.time), { addSuffix: true });

    return (
        <Card className={cn("relative mb-3 flex min-h-[84px] items-start gap-3 rounded-2xl p-4 shadow-sm", variantClass)}>
            {item.image ? <AvatarBubble image={item.image} fallback={item.avatarFallback} /> : null}
            {!item.image && item.icon ? <IconBubble icon={item.icon} /> : null}

            <div className="min-w-0 flex-1 pr-5">
                <p className="text-[14px] font-semibold leading-6">{item.title}</p>
                {item.description ? <p className="mt-1 text-[14px] leading-5 opacity-95">{item.description}</p> : null}
                <p className="mt-1 text-[12px] font-semibold leading-none opacity-70">{timeText}</p>
                {item.actionLabel ? (
                    <button
                        type="button"
                        className="mt-3 text-[12px] font-medium text-primary hover:text-primary/80"
                    >
                        {item.actionLabel}
                    </button>
                ) : null}
            </div>

            <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => onClose(item.id)}
                className="absolute right-3 top-3 rounded p-0.5 opacity-70 transition hover:opacity-100"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </Card>
    );
};

export default NotificationCard;
