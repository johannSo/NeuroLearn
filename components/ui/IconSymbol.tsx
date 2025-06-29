// Fallback for using MaterialIcons on Android and web.

import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as icons from 'lucide-react-native';

// Dynamically select the icon component from the library based on the name prop
const Icon = ({ name, ...props }: { name: keyof typeof icons } & SvgProps) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    // Fallback for invalid icon names
    return <icons.HelpCircle {...props} />;
  }
  return <LucideIcon {...props} />;
};

export { Icon as IconSymbol };
