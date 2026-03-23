import { BookOpen, Heart, Languages, MapPin } from "lucide-react";

export const profileData = {
  fullName: "Yuki Tanaka",
  role: "International Student",
  email: "yuki.tanaka@student.edu",
  homeCountry: "Japan",
  currentCity: "Almaty",
  studyProgram: "Mechanical Engineering",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  languages: ["Japanese", "English"],
  interests: ["Anime", "Cycling", "Cooking"],
};

export const profileSummaryItems = [
  {
    id: 1,
    icon: MapPin,
    label: "From:",
    value: "Japan",
  },
  {
    id: 2,
    icon: MapPin,
    label: "Living in:",
    value: "Almaty",
  },
  {
    id: 3,
    icon: BookOpen,
    label: "Studying:",
    value: "Mechanical Engineering",
  },
];

export const profileSectionIcons = {
  languages: Languages,
  interests: Heart,
};