
import { FormulaDisplay } from './components/FormulaDisplay';
import { Simulation } from './components/Simulation';
import { ParametersForm } from './components/ParametersForm';
import { useFormulaCalculation } from './hooks/useFormulaCalculation';
import { Github } from 'lucide-react';

export default function FormulaGenerator() {
  const {
    points,
    setPoints,
    seuilMinimalPercent,
    seuilMinimalPoints,
    pointsMax,
    setPointsMax,
    noteMin,
    setNoteMin,
    noteMax,
    setNoteMax,
    valeurBase,
    setValeurBase,
    ajustementNote,
    setAjustementNote,
    decimalPlaces,
    setDecimalPlaces,
    calculateFormula,
    generateFormulaText,
    getFinalGrade,
    isBelowThreshold,
    handleSeuilPercentChange,
    handleSeuilPointsChange
  } = useFormulaCalculation();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Convertisseur de Points en Notes</h1>
      
      <Simulation 
        points={points}
        setPoints={setPoints}
        pointsMax={pointsMax}
        getFinalGrade={getFinalGrade}
        calculateFormula={calculateFormula}
        seuilMinimalPoints={seuilMinimalPoints}
        valeurBase={valeurBase}
        noteMax={noteMax}
        noteMin={noteMin}
        ajustementNote={ajustementNote}
        isBelowThreshold={isBelowThreshold}
        decimalPlaces={decimalPlaces}
      />
      
      <ParametersForm 
        pointsMax={pointsMax}
        setPointsMax={setPointsMax}
        seuilMinimalPoints={seuilMinimalPoints}
        handleSeuilPointsChange={handleSeuilPointsChange}
        seuilMinimalPercent={seuilMinimalPercent}
        handleSeuilPercentChange={handleSeuilPercentChange}
        noteMin={noteMin}
        setNoteMin={setNoteMin}
        noteMax={noteMax}
        setNoteMax={setNoteMax}
        valeurBase={valeurBase}
        setValeurBase={setValeurBase}
        ajustementNote={ajustementNote}
        setAjustementNote={setAjustementNote}
        decimalPlaces={decimalPlaces}
        setDecimalPlaces={setDecimalPlaces}
      />
      
      <FormulaDisplay 
        generateFormulaText={generateFormulaText}
      />
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <a 
          href="https://github.com/Similarly1/grade-formula-wizard-11" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
        >
          <Github className="h-5 w-5" />
          Open Source sur GitHub
        </a>
      </footer>
    </div>
  );
}

