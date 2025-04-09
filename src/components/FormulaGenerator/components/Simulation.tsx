
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface SimulationProps {
  points: number;
  setPoints: (value: number) => void;
  pointsMax: number;
  getFinalGrade: () => number;
  calculateFormula: () => number;
  seuilMinimalPoints: number;
  valeurBase: number;
  noteMax: number;
  noteMin: number;
  ajustementNote: number;
  isBelowThreshold: boolean;
  decimalPlaces: number;
}

export const Simulation = ({
  points,
  setPoints,
  pointsMax,
  getFinalGrade,
  calculateFormula,
  seuilMinimalPoints,
  valeurBase,
  noteMax,
  noteMin,
  ajustementNote,
  isBelowThreshold,
  decimalPlaces
}: SimulationProps) => (
  <Card className="mb-6 bg-white/95 backdrop-blur-sm border-white/20 shadow-lg">
    <CardHeader>
      <CardTitle className="text-base">Simulation</CardTitle>
      <CardDescription>Testez différentes valeurs de points pour voir la note correspondante</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <label className="block text-sm font-medium mb-2">Points obtenus :</label>
        <div className="flex items-center gap-4">
          <Input 
            type="number" 
            value={points} 
            onChange={(e) => setPoints(parseFloat(e.target.value) || 0)}
            step="0.1"
            className="w-24"
          />
          <div className="flex-grow">
            <Slider
              min={0}
              max={pointsMax}
              step={0.1}
              value={[points]}
              onValueChange={(value) => setPoints(value[0])}
            />
          </div>
        </div>
        <div className="mt-3 text-sm">
          <strong>Note calculée :</strong> <span className={`text-lg font-medium ${isBelowThreshold ? 'text-destructive' : 'text-primary'}`}>{getFinalGrade()}</span>
          {isBelowThreshold && <span className="ml-2 text-destructive text-xs">(En dessous du seuil minimal)</span>}
        </div>
      </div>
      
      <div className="bg-muted/20 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground mb-1">Calcul détaillé :</p>
        <p className="text-sm font-mono text-muted-foreground mb-1">
          {valeurBase} + (({points} - {seuilMinimalPoints.toFixed(2)}) / ({pointsMax} - {seuilMinimalPoints.toFixed(2)}) * ({noteMax} - {noteMin})) + {ajustementNote}
        </p>
        <p className="text-sm font-mono">
          = {calculateFormula().toFixed(6)} → {getFinalGrade()} (arrondi à {decimalPlaces} décimale{decimalPlaces > 1 ? 's' : ''})
        </p>
      </div>
    </CardContent>
  </Card>
);
