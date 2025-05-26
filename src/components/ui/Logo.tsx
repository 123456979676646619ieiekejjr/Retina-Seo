import { Eye } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`relative flex items-center justify-center bg-primary-600 rounded-md ${className}`}>
      <Eye className="w-3/5 h-3/5 text-white" />
      <div className="absolute inset-0 bg-primary-500 rounded-md opacity-30 animate-pulse-slow"></div>
    </div>
  );
};

export default Logo;