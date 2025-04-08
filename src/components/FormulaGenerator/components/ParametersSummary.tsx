
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <p><strong>Total des points :</strong> {pointsMax} (score maximum possible)</p>
      <p><strong>Seuil de suffisance :</strong> {seuilMinimalPoints.toFixed(1)} points ({seuilMinimalPercent}% du total) pour obtenir une note de {noteMin}</p>
      <p><strong>Arrondi :</strong> À {decimalPlaces === 1 ? "une décimale" : decimalPlaces === 0 ? "l'entier" : `${decimalPlaces} décimales`}</p>
      <p><strong>Formule Excel :</strong> {generateFormulaText()}</p>
    </CardContent>
  </Card>
);
