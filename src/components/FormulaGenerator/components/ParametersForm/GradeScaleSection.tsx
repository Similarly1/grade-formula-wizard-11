
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Info, Lock, Unlock } from 'lucide-react';

interface GradeScaleSectionProps {
  noteMin: number;
  setNoteMin: (value: number) => void;
  noteMax: number;
  setNoteMax: (value: number) => void;
}

export const GradeScaleSection = ({
  noteMin,
  setNoteMin,
  noteMax,
  setNoteMax,
}: GradeScaleSectionProps) => {
  const [noteMaxLocked, setNoteMaxLocked] = useState(true);

  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <ArrowUp className="h-4 w-4 text-primary" />
        Échelle de notation
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Note au seuil de suffisance :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Note attribuée lorsqu'un élève atteint exactement le seuil de suffisance</p>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input 
            type="number" 
            value={noteMin} 
            onChange={(e) => setNoteMin(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium flex items-center">
              <span>Note maximale :</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Note attribuée au score maximum</p>
                </TooltipContent>
              </Tooltip>
            </label>
            <button 
              type="button" 
              onClick={() => setNoteMaxLocked(!noteMaxLocked)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
              aria-label={noteMaxLocked ? "Déverrouiller la note maximale" : "Verrouiller la note maximale"}
            >
              {noteMaxLocked ? <Lock size={16} /> : <Unlock size={16} className="text-primary" />}
            </button>
          </div>
          <Input 
            type="number" 
            value={noteMax} 
            onChange={(e) => setNoteMax(parseFloat(e.target.value) || 0)}
            step="0.1"
            disabled={noteMaxLocked}
            className={noteMaxLocked ? "bg-slate-100" : ""}
          />
        </div>
      </div>
    </div>
  );
};
