import { FiTrendingUp, FiCompass, FiSettings, FiUser } from 'react-icons/fi';
import { IconType } from 'react-icons';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'users', icon: FiUser, url: '/users' },
  { name: 'charts', icon: FiTrendingUp, url: '/charts' },
  { name: 'explore', icon: FiCompass, url: '/explore' },
  { name: 'settings', icon: FiSettings, url: '/settings' },
];
