
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Calculator, Check, Info, Lock, Percent, Settings, Unlock } from 'lucide-react';
import { useState } from 'react';
import { Separator } from "@/components/ui/separator";

interface ParametersFormProps {
  pointsMax: number;
  setPointsMax: (value: number) => void;
  seuilMinimalPoints: number;
  handleSeuilPointsChange: (value: number) => void;
  seuilMinimalPercent: number;
  handleSeuilPercentChange: (value: number) => void;
  noteMin: number;
  setNoteMin: (value: number) => void;
  noteMax: number;
  setNoteMax: (value: number) => void;
  valeurBase: number;
  setValeurBase: (value: number) => void;
  ajustementNote: number;
  setAjustementNote: (value: number) => void;
  decimalPlaces: number;
  setDecimalPlaces: (value: number) => void;
}

export const ParametersForm = ({
  pointsMax,
  setPointsMax,
  seuilMinimalPoints,
  handleSeuilPointsChange,
  seuilMinimalPercent,
  handleSeuilPercentChange,
  noteMin,
  setNoteMin,
  noteMax,
  setNoteMax,
  valeurBase,
  setValeurBase,
  ajustementNote,
  setAjustementNote,
  decimalPlaces,
  setDecimalPlaces
}: ParametersFormProps) => {
  const [noteMaxLocked, setNoteMaxLocked] = useState(true);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Paramètres du barème</CardTitle>
        </div>
        <CardDescription>Modifiez ces valeurs pour ajuster votre échelle de notation</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Points et seuils */}
        <div className="space-y-6">
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
          
          <Separator />
          
          {/* Notes */}
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
          
          <Separator />
          
          {/* Ajustements */}
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
        </div>
      </CardContent>
    </Card>
  );
};

