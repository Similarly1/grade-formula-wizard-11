
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings } from 'lucide-react';
import { PointsSection } from './PointsSection';
import { GradeScaleSection } from './GradeScaleSection';
import { AdjustmentsSection } from './AdjustmentsSection';

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

export const ParametersForm = (props: ParametersFormProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Paramètres du barème</CardTitle>
        </div>
        <CardDescription>Modifiez ces valeurs pour ajuster votre échelle de notation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PointsSection 
            pointsMax={props.pointsMax}
            setPointsMax={props.setPointsMax}
            seuilMinimalPoints={props.seuilMinimalPoints}
            handleSeuilPointsChange={props.handleSeuilPointsChange}
            seuilMinimalPercent={props.seuilMinimalPercent}
            handleSeuilPercentChange={props.handleSeuilPercentChange}
            noteMin={props.noteMin}
          />
          
          <Separator />
          
          <GradeScaleSection 
            noteMin={props.noteMin}
            setNoteMin={props.setNoteMin}
            noteMax={props.noteMax}
            setNoteMax={props.setNoteMax}
          />
          
          <Separator />
          
          <AdjustmentsSection 
            valeurBase={props.valeurBase}
            setValeurBase={props.setValeurBase}
            ajustementNote={props.ajustementNote}
            setAjustementNote={props.setAjustementNote}
            decimalPlaces={props.decimalPlaces}
            setDecimalPlaces={props.setDecimalPlaces}
          />
        </div>
      </CardContent>
    </Card>
  );
};
