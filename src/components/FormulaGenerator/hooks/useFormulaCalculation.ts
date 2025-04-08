
import { useState, useEffect } from 'react';

export const useFormulaCalculation = (initialPointsMax = 8, initialSeuilPercent = 60) => {
  // Valeurs par défaut selon la formule expliquée
  const [points, setPoints] = useState(5.5);
  const [seuilMinimalPercent, setSeuilMinimalPercent] = useState(initialSeuilPercent); // Seuil en pourcentage
  const [seuilMinimalPoints, setSeuilMinimalPoints] = useState(4.8); // Seuil en points
  const [pointsMax, setPointsMax] = useState(initialPointsMax);
  const [noteMin, setNoteMin] = useState(4);
  const [noteMax, setNoteMax] = useState(6);
  const [valeurBase, setValeurBase] = useState(1);
  const [ajustementNote, setAjustementNote] = useState(3);
  const [decimalPlaces, setDecimalPlaces] = useState(1);
  const [isUpdatingPercent, setIsUpdatingPercent] = useState(false);
  const [isUpdatingPoints, setIsUpdatingPoints] = useState(false);
  
  // Synchronisation des valeurs de seuil (pourcentage et points)
  useEffect(() => {
    if (!isUpdatingPoints && !isUpdatingPercent) {
      // Initialisation
      const points = (seuilMinimalPercent / 100) * pointsMax;
      setSeuilMinimalPoints(points);
    }
  }, []);

  useEffect(() => {
    if (isUpdatingPercent) {
      // Si le pourcentage est mis à jour, calculer les points
      const points = (seuilMinimalPercent / 100) * pointsMax;
      setSeuilMinimalPoints(points);
      setIsUpdatingPercent(false);
    }
  }, [seuilMinimalPercent, pointsMax, isUpdatingPercent]);

  useEffect(() => {
    if (isUpdatingPoints) {
      // Si les points sont mis à jour, calculer le pourcentage
      const percent = (seuilMinimalPoints / pointsMax) * 100;
      setSeuilMinimalPercent(Math.round(percent));
      setIsUpdatingPoints(false);
    }
  }, [seuilMinimalPoints, pointsMax, isUpdatingPoints]);

  // Mise à jour des points max recalcule aussi le seuil en points
  useEffect(() => {
    if (!isUpdatingPoints) {
      const points = (seuilMinimalPercent / 100) * pointsMax;
      setSeuilMinimalPoints(points);
    }
  }, [pointsMax]);
  
  // Calcul de la formule
  const calculateFormula = () => {
    const result = valeurBase + ((points - seuilMinimalPoints) / (pointsMax - seuilMinimalPoints) * (noteMax - noteMin)) + ajustementNote;
    return result;
  };
  
  // Génération de la formule sous forme de texte
  const generateFormulaText = () => {
    return `=ARRONDI(${valeurBase} + ((A1 - ${seuilMinimalPoints.toString().replace('.', ',')}) / (${pointsMax.toString().replace('.', ',')} - ${seuilMinimalPoints.toString().replace('.', ',')}) * (${noteMax.toString().replace('.', ',')} - ${noteMin.toString().replace('.', ',')})) + ${ajustementNote}; ${decimalPlaces})`;
  };

  // Calcul de la note finale avec arrondi approprié
  const getFinalGrade = () => {
    const rawGrade = calculateFormula();
    return Number(rawGrade.toFixed(decimalPlaces));
  };

  // Déterminer si les points sont en dessous du seuil
  const isBelowThreshold = points < seuilMinimalPoints;

  // Mise à jour du seuil en pourcentage
  const handleSeuilPercentChange = (value: number) => {
    setSeuilMinimalPercent(value);
    setIsUpdatingPercent(true);
  };

  // Mise à jour du seuil en points
  const handleSeuilPointsChange = (value: number) => {
    setSeuilMinimalPoints(value);
    setIsUpdatingPoints(true);
  };

  return {
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
  };
};
