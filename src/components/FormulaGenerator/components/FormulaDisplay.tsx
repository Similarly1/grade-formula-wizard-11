
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface FormulaDisplayProps {
  generateFormulaText: () => string;
}

export const FormulaDisplay = ({ generateFormulaText }: FormulaDisplayProps) => {
  const { toast } = useToast();

  const copyFormula = () => {
    navigator.clipboard.writeText(generateFormulaText());
    toast({
      title: "Formule copiée",
      description: "La formule a été copiée dans le presse-papier",
      duration: 2000,
    });
  };

  return (
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
  );
};
