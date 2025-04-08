
import { FormulaDisplay } from './components/FormulaDisplay';
import { Simulation } from './components/Simulation';
import { ParametersForm } from './components/ParametersForm';
import { useFormulaCalculation } from './hooks/useFormulaCalculation';

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
    </div>
  );
}
