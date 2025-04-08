
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParametersSummaryProps {
  pointsMax: number;
  seuilMinimalPoints: number;
  seuilMinimalPercent: number;
  noteMin: number;
  decimalPlaces: number;
  generateFormulaText: () => string;
}

export const ParametersSummary = ({
  pointsMax,
  seuilMinimalPoints,
  seuilMinimalPercent,
  noteMin,
  decimalPlaces,
  generateFormulaText
}: ParametersSummaryProps) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-base flex items-center gap-2">
        <Info size={18} className="text-muted-foreground" />
        Paramètres configurés
      </CardTitle>
    </CardHeader>
    <CardContent className="text-sm space-y-2">
      <p>
        <strong>Total des points :</strong> {pointsMax} 
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Le nombre maximum de points qu'un élève peut obtenir sur l'évaluation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      
      <p>
        <strong>Seuil de suffisance :</strong> {seuilMinimalPoints.toFixed(1)} points ({seuilMinimalPercent}% du total)
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Le nombre minimum de points nécessaires pour obtenir la note minimale de suffisance</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      
      <p>
        <strong>Note minimale :</strong> {noteMin}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">La note attribuée lorsqu'un élève atteint exactement le seuil de suffisance</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      
      <p>
        <strong>Arrondi :</strong> À {decimalPlaces === 1 ? "une décimale" : decimalPlaces === 0 ? "l'entier" : `${decimalPlaces} décimales`}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Le nombre de chiffres après la virgule pour l'arrondi de la note finale</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
      
      <p>
        <strong>Formule Excel :</strong>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <sup><Info size={12} className="inline ml-1 text-muted-foreground cursor-help" /></sup>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">La formule à copier dans Excel pour calculer les notes. Remplacez A1 par la référence de la cellule contenant les points.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
    </CardContent>
  </Card>
);
