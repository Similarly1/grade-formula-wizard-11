
import { useState } from 'react';
import { Copy, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

export default function FormulaGenerator() {
  // Valeurs par défaut selon la formule expliquée
  const [points, setPoints] = useState(5.5);
  const [seuilMinimalPercent, setSeuilMinimalPercent] = useState(60); // Seuil en pourcentage
  const [pointsMax, setPointsMax] = useState(8);
  const [noteMin, setNoteMin] = useState(4);
  const [noteMax, setNoteMax] = useState(6);
  const [valeurBase, setValeurBase] = useState(1);
  const [ajustementNote, setAjustementNote] = useState(3);
  const [decimalPlaces, setDecimalPlaces] = useState(1);
  
  const { toast } = useToast();
  
  // Calcul du seuil minimal en points à partir du pourcentage
  const seuilMinimal = (seuilMinimalPercent / 100) * pointsMax;
  
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

  // Calcul de la note finale avec arrondi approprié
  const getFinalGrade = () => {
    const rawGrade = calculateFormula();
    return Number(rawGrade.toFixed(decimalPlaces));
  };

  // Déterminer si les points sont en dessous du seuil
  const isBelowThreshold = points < seuilMinimal;

  // Mise à jour du seuil en pourcentage
  const handleSeuilPercentChange = (value: number) => {
    setSeuilMinimalPercent(value);
  };
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Convertisseur de Points en Notes</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info size={18} className="text-muted-foreground" />
            Paramètres configurés
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p><strong>Total des points :</strong> {pointsMax} (score maximum possible)</p>
          <p><strong>Seuil de suffisance :</strong> {seuilMinimal.toFixed(1)} points ({seuilMinimalPercent}% du total) pour obtenir une note de {noteMin}</p>
          <p><strong>Arrondi :</strong> À {decimalPlaces === 1 ? "une décimale" : decimalPlaces === 0 ? "l'entier" : `${decimalPlaces} décimales`}</p>
          <p><strong>Formule Excel :</strong> {generateFormulaText()}</p>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
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
              {valeurBase} + (({points} - {seuilMinimal.toFixed(2)}) / ({pointsMax} - {seuilMinimal.toFixed(2)}) * ({noteMax} - {noteMin})) + {ajustementNote}
            </p>
            <p className="text-sm font-mono">
              = {calculateFormula().toFixed(6)} → {getFinalGrade()} (arrondi à {decimalPlaces} décimale{decimalPlaces > 1 ? 's' : ''})
            </p>
          </div>
        </CardContent>
      </Card>
      
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
            
            <div>
              <label className="block text-sm font-medium mb-1">Seuil de suffisance (%) :</label>
              <div className="flex items-center gap-2 mb-2">
                <Input 
                  type="number" 
                  value={seuilMinimalPercent} 
                  onChange={(e) => setSeuilMinimalPercent(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="1"
                  className="w-20"
                />
                <span className="text-sm">%</span>
                <div className="flex-grow">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[seuilMinimalPercent]}
                    onValueChange={(value) => handleSeuilPercentChange(value[0])}
                  />
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Équivaut à {seuilMinimal.toFixed(1)} points pour obtenir la note {noteMin}</span>
              </div>
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
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Formule Excel générée</CardTitle>
          <CardDescription>Copiez cette formule dans votre tableur</CardDescription>
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
          <p className="text-xs text-muted-foreground mt-2">
            * Remplacez A1 par la cellule contenant vos points
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
