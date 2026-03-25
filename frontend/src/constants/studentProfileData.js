import { BookOpen, Heart, Languages, MapPin, UserRound } from "lucide-react";

export const studentProfileData = {
  fullName: "Yuki Tanaka",
  role: "International Student",
  email: "yuki.tanaka@student.edu",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",

  summaryItems: [
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
  ],

  fields: [
    {
      id: 1,
      label: "Full Name",
      value: "Yuki Tanaka",
    },
    {
      id: 2,
      label: "Home Country",
      value: "Japan",
    },
    {
      id: 3,
      label: "Current City",
      value: "Almaty",
    },
    {
      id: 4,
      label: "Study Program",
      value: "Mechanical Engineering",
    },
  ],

  sections: [
    {
      id: 1,
      title: "Languages Spoken",
      icon: Languages,
      type: "filled",
      items: ["Japanese", "English"],
    },
    {
      id: 2,
      title: "Hobbies & Interests",
      icon: Heart,
      type: "outline",
      items: ["Anime", "Cycling", "Cooking"],
    },
  ],
};