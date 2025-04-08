
import { useState, useRef } from 'react';
import { Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

export default function FormulaGenerator() {
  // Valeurs par défaut selon la formule expliquée
  const [points, setPoints] = useState(5.5);
  const [seuilMinimal, setSeuilMinimal] = useState(4.8);
  const [pointsMax, setPointsMax] = useState(20);
  const [noteMin, setNoteMin] = useState(4);
  const [noteMax, setNoteMax] = useState(6);
  const [valeurBase, setValeurBase] = useState(1);
  const [ajustementNote, setAjustementNote] = useState(3);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  
  const { toast } = useToast();
  
  // Calcul de la formule
  const calculateFormula = () => {
    const result = valeurBase + ((points - seuilMinimal) / (pointsMax - seuilMinimal) * (noteMax - noteMin)) + ajustementNote;
    return result;
  };
  
  // Génération de la formule sous forme de texte
  const generateFormulaText = () => {
    return `=ARRONDI(${valeurBase} + ((A1 - ${seuilMinimal.toString().replace('.', ',')}) / (${pointsMax.toString().replace('.', ',')} - ${seuilMinimal.toString().replace('.', ',')}) * (${noteMax.toString().replace('.', ',')} - ${noteMin.toString().replace('.', ',')})) + ${ajustementNote}; ${decimalPlaces})`;
  };
  
  // Copier la formule dans le presse-papier
  const copyFormula = () => {
    navigator.clipboard.writeText(generateFormulaText());
    toast({
      title: "Formule copiée",
      description: "La formule a été copiée dans le presse-papier",
      duration: 2000,
    });
  };

  // Calcul de la note finale (partie entière)
  const getFinalGrade = () => {
    return Math.floor(calculateFormula());
  };

  // Déterminer si les points sont en dessous du seuil
  const isBelowThreshold = points < seuilMinimal;
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Convertisseur Points en Notes</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Explication de la formule</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>Cette formule convertit des points en notes selon un barème personnalisable :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><code>A1</code> : Cellule contenant les points obtenus</li>
            <li><code>Seuil minimal</code> : Points minimaux pour obtenir la note minimale</li>
            <li><code>Points max - Seuil minimal</code> : Plage des points au-dessus du seuil</li>
            <li><code>Note max - Note min</code> : Plage des notes possibles</li>
            <li><code>Ajustement note</code> : Valeur pour ajuster la note finale</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Paramètres du barème</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <label className="block text-sm font-medium mb-2">Points obtenus (valeur A1):</label>
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
                  max={pointsMax + 1}
                  step={0.1}
                  value={[points]}
                  onValueChange={(value) => setPoints(value[0])}
                />
              </div>
            </div>
            <div className="mt-3 text-sm">
              Note calculée: <span className={`text-lg font-medium ${isBelowThreshold ? 'text-destructive' : 'text-primary'}`}>{getFinalGrade()}</span>
              {isBelowThreshold && <span className="ml-2 text-destructive text-xs">(En dessous du seuil minimal)</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Seuil minimal pour obtenir {noteMin}:</label>
              <Input 
                type="number" 
                value={seuilMinimal} 
                onChange={(e) => setSeuilMinimal(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Points minimums pour la note {noteMin}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Points maximaux:</label>
              <Input 
                type="number" 
                value={pointsMax} 
                onChange={(e) => setPointsMax(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Points maximaux possibles</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Note minimale:</label>
              <Input 
                type="number" 
                value={noteMin} 
                onChange={(e) => setNoteMin(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Note au seuil minimal</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Note maximale:</label>
              <Input 
                type="number" 
                value={noteMax} 
                onChange={(e) => setNoteMax(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Note maximale possible</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Valeur de base:</label>
              <Input 
                type="number" 
                value={valeurBase} 
                onChange={(e) => setValeurBase(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Valeur initiale dans la formule</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ajustement note:</label>
              <Input 
                type="number" 
                value={ajustementNote} 
                onChange={(e) => setAjustementNote(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Valeur ajoutée à la fin</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Nombre de décimales:</label>
              <Input 
                type="number" 
                value={decimalPlaces} 
                onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || 0)}
                min="0"
                max="10"
              />
              <p className="text-xs text-muted-foreground mt-1">Précision de l'arrondi</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Formule Excel générée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-3 rounded-lg flex items-center">
            <code className="flex-grow mr-2 break-all text-sm font-mono text-muted-foreground">
              {generateFormulaText()}
            </code>
            <Button 
              onClick={copyFormula}
              size="sm"
              variant="outline"
            >
              <Copy size={16} className="mr-1" />
              <span className="sr-only sm:not-sr-only sm:inline">Copier</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Simulation des résultats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-muted-foreground mb-1">Pour {points} points :</p>
              <p className="text-3xl font-mono font-semibold">
                {getFinalGrade()}
              </p>
            </div>
            <Separator className="mb-4 sm:hidden" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Calcul détaillé :</p>
              <p className="text-sm font-mono text-muted-foreground mb-1">
                {valeurBase} + (({points} - {seuilMinimal}) / ({pointsMax} - {seuilMinimal}) * ({noteMax} - {noteMin})) + {ajustementNote}
              </p>
              <p className="text-sm font-mono">
                = {calculateFormula().toFixed(6)} → {getFinalGrade()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
