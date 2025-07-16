export interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  focused?: boolean;
}

export interface ProfileViewProps {
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  websiteUrl?: string;
  isCurrentUser?: boolean;
  userId?: string;
}
