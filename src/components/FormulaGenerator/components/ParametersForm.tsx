
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

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
}: ParametersFormProps) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-base">Paramètres du barème</CardTitle>
      <CardDescription>Modifiez ces valeurs pour ajuster votre échelle de notation</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Total des points :</label>
          <Input 
            type="number" 
            value={pointsMax} 
            onChange={(e) => setPointsMax(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Score maximum possible sur l'évaluation</p>
        </div>
        
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Seuil de suffisance :</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Input 
                type="number" 
                value={seuilMinimalPoints} 
                onChange={(e) => handleSeuilPointsChange(parseFloat(e.target.value) || 0)}
                min="0"
                max={pointsMax}
                step="0.1"
                className="w-20"
              />
              <span className="text-sm whitespace-nowrap">points</span>
            </div>
            <span className="text-sm whitespace-nowrap">ou</span>
            <div className="flex items-center gap-1">
              <Input 
                type="number" 
                value={seuilMinimalPercent} 
                onChange={(e) => handleSeuilPercentChange(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="1"
                className="w-20"
              />
              <span className="text-sm whitespace-nowrap">%</span>
            </div>
            <div className="flex-grow mt-2 sm:mt-0">
              <Slider
                min={0}
                max={100}
                step={1}
                value={[seuilMinimalPercent]}
                onValueChange={(value) => handleSeuilPercentChange(value[0])}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Points minimums pour obtenir la note {noteMin}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Note minimale :</label>
          <Input 
            type="number" 
            value={noteMin} 
            onChange={(e) => setNoteMin(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Note attribuée au seuil minimal</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Note maximale :</label>
          <Input 
            type="number" 
            value={noteMax} 
            onChange={(e) => setNoteMax(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Note attribuée au score maximum</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Constante de base :</label>
          <Input 
            type="number" 
            value={valeurBase} 
            onChange={(e) => setValeurBase(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Valeur initiale dans la formule</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Constante d'ajustement :</label>
          <Input 
            type="number" 
            value={ajustementNote} 
            onChange={(e) => setAjustementNote(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Valeur ajoutée en fin de calcul</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Nombre de décimales :</label>
          <Input 
            type="number" 
            value={decimalPlaces} 
            onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || 0)}
            min="0"
            max="10"
          />
          <p className="text-xs text-muted-foreground mt-1">Précision de l'arrondi final</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
