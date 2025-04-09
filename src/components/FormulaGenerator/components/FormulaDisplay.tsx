
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clipboard, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface FormulaDisplayProps {
  generateFormulaText: () => string;
}

export const FormulaDisplay = ({ generateFormulaText }: FormulaDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const formula = generateFormulaText();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(formula).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <Clipboard className="h-4 w-4 mr-2 text-primary" />
            Formule Excel/Google Sheets
          </CardTitle>
          <button
            onClick={handleCopy}
            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Copier la formule"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Copié!
              </>
            ) : (
              <>
                <Clipboard className="h-4 w-4" /> Copier
              </>
            )}
          </button>
        </div>
        <CardDescription>Copiez cette formule dans votre tableur</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-3 rounded-md font-mono text-sm overflow-x-auto">
          {formula}
        </div>
      </CardContent>
    </Card>
  );
};
