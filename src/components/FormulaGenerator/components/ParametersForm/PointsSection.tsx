
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, Check, Info, Percent } from 'lucide-react';

interface PointsSectionProps {
  pointsMax: number;
  setPointsMax: (value: number) => void;
  seuilMinimalPoints: number;
  handleSeuilPointsChange: (value: number) => void;
  seuilMinimalPercent: number;
  handleSeuilPercentChange: (value: number) => void;
  noteMin: number;
}

export const PointsSection = ({
  pointsMax,
  setPointsMax,
  seuilMinimalPoints,
  handleSeuilPointsChange,
  seuilMinimalPercent,
  handleSeuilPercentChange,
  noteMin,
}: PointsSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Calculator className="h-4 w-4 text-primary" />
        Points et seuil de suffisance
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Total des points :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Score maximum possible sur l'évaluation</p>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input 
            type="number" 
            value={pointsMax} 
            onChange={(e) => setPointsMax(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Seuil de suffisance :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Nombre minimum de points nécessaires pour obtenir la note minimale de suffisance</p>
              </TooltipContent>
            </Tooltip>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Input 
                type="number" 
                value={seuilMinimalPoints} 
                onChange={(e) => handleSeuilPointsChange(parseFloat(e.target.value) || 0)}
                min="0"
                max={pointsMax}
                step="0.1"
                className="w-full"
              />
              <span className="text-sm whitespace-nowrap">points</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-sm whitespace-nowrap">ou</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="relative flex-grow">
                <Input 
                  type="number" 
                  value={seuilMinimalPercent} 
                  onChange={(e) => handleSeuilPercentChange(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="1"
                  className="w-full pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  <Percent size={14} />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[seuilMinimalPercent]}
              onValueChange={(value) => handleSeuilPercentChange(value[0])}
              className="py-2"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Check size={12} className="text-primary" />
            Points minimums pour obtenir la note {noteMin}
          </p>
        </div>
      </div>
    </div>
  );
};
