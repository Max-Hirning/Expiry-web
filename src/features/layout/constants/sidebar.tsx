import {
  Bell,
  FileText,
  Home,
  MessageSquare,
  SlidersHorizontal,
  User,
  Users,
} from 'lucide-react';

export const mainNavItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Chats', href: '/chats', icon: MessageSquare },
  { label: 'Teammates', href: '/teammates', icon: Users },
];
export const bottomNavItems = [
  { label: 'Preferences', href: '/preferences', icon: SlidersHorizontal },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Notifications', href: '/notifications', icon: Bell },
];
