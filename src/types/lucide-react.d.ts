declare module 'lucide-react' {
  import { FC, SVGAttributes } from 'react';
  
  interface IconProps extends SVGAttributes<SVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }
  
  export type Icon = FC<IconProps>;
  
  // All icons used in the project
  export const Wallet: Icon;
  export const ArrowUpRight: Icon;
  export const ArrowDownLeft: Icon;
  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const Search: Icon;
  export const Copy: Icon;
  export const Check: Icon;
  export const Clock: Icon;
  export const Cube: Icon;
  export const Hash: Icon;
  export const Activity: Icon;
  export const Users: Icon;
  export const Coins: Icon;
  export const TrendingUp: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const ExternalLink: Icon;
  export const Box: Icon;
  export const FileText: Icon;
  export const Database: Icon;
  export const Layers: Icon;
  export const Github: Icon;
  export const Globe: Icon;
  export const Hexagon: Icon;
  export const Menu: Icon;
  export const X: Icon;
}
