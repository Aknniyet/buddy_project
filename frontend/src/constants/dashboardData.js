import {
  CalendarDays,
  LayoutGrid,
  Search,
  MessageSquare,
  ClipboardCheck,
  Bell,
  User,
  UsersRound,
  Bot,
} from "lucide-react";

export const sidebarLinks = [
  {
    id: 1,
    label: "Overview",
    path: "/student/overview",
    icon: LayoutGrid,
  },
  {
    id: 2,
    label: "Find Buddies",
    path: "/student/find-buddies",
    icon: Search,
  },
  {
    id: 3,
    label: "Messages",
    path: "/student/messages",
    icon: MessageSquare,
  },
  {
    id: 4,
    label: "Adaptation Checklist",
    path: "/student/checklist",
    icon: ClipboardCheck,
  },
  {
    id: 5,
    label: "Community Board",
    path: "/student/community",
    icon: UsersRound,
  },
  {
    id: 6,
    label: "Events",
    path: "/student/events",
    icon: CalendarDays,
  },
  {
    id: 7,
    label: "AI Assistant",
    path: "/student/assistant",
    icon: Bot,
  },
  {
    id: 8,
    label: "Notifications",
    path: "/student/notifications",
    icon: Bell,
  },
  {
    id: 9,
    label: "Profile",
    path: "/student/profile",
    icon: User,
  },
];
