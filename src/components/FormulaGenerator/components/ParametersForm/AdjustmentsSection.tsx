
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Settings } from 'lucide-react';

interface AdjustmentsSectionProps {
  valeurBase: number;
  setValeurBase: (value: number) => void;
  ajustementNote: number;
  setAjustementNote: (value: number) => void;
  decimalPlaces: number;
  setDecimalPlaces: (value: number) => void;
}

export const AdjustmentsSection = ({
  valeurBase,
  setValeurBase,
  ajustementNote,
  setAjustementNote,
  decimalPlaces,
  setDecimalPlaces,
}: AdjustmentsSectionProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Settings className="h-4 w-4 text-primary" />
        Ajustements de calcul
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Constante de base :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Rôle:</strong> Fixe le point de départ des notes dans le barème.
                  </p>
                  <p>
                    <strong>Exemple:</strong> Une valeur de 1 signifie que toutes les notes commencent à 1 avant d'être ajustées selon les points obtenus.
                  </p>
                  <p>
                    <strong>Utilité:</strong> Permet d'ajuster l'échelle de notation pour obtenir le comportement souhaité.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input 
            type="number" 
            value={valeurBase} 
            onChange={(e) => setValeurBase(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Constante d'ajustement :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Rôle:</strong> Valeur ajoutée à la fin du calcul comme un "bonus" ou "malus" uniforme.
                  </p>
                  <p>
                    <strong>Exemple:</strong> Une valeur de 3 augmente toutes les notes de 3 points après le calcul.
                  </p>
                  <p>
                    <strong>Utilité:</strong> Permet de compenser un barème trop strict ou trop généreux.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input 
            type="number" 
            value={ajustementNote} 
            onChange={(e) => setAjustementNote(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center">
            <span>Nombre de décimales :</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Précision de l'arrondi final</p>
              </TooltipContent>
            </Tooltip>
          </label>
          <Input 
            type="number" 
            value={decimalPlaces} 
            onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || 0)}
            min="0"
            max="10"
          />
        </div>
      </div>
    </div>
  );
};
