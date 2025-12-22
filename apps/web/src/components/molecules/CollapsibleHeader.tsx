import { Text } from "../atoms/Text";
import { IconButton } from "../atoms/IconButton";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleHeaderProps {
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export const CollapsibleHeader = ({ 
  title, 
  subtitle, 
  isExpanded, 
  onToggle 
}: CollapsibleHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <Text variant="h4" weight="medium">
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="secondary">
            {subtitle}
          </Text>
        )}
      </div>
      <IconButton onClick={onToggle} variant="ghost" size="sm">
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </IconButton>
    </div>
  );
};
