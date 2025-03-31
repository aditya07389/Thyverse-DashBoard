import React from 'react';
import { useStore } from '../store/useStore';
import { calculateBMI, calculateBMR, getBMICategory } from '../lib/utils';
import { HelpCircle, X } from 'lucide-react';

export default function Measurements() {
  const { patient, updatePatient } = useStore();
  const [weight, setWeight] = React.useState(patient.weight);
  const [height, setHeight] = React.useState(patient.height);
  const [gender, setGender] = React.useState<'male' | 'female'>(patient.gender);
  const [showBMIInfo, setShowBMIInfo] = React.useState(false);
  const [showBMRInfo, setShowBMRInfo] = React.useState(false);

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, patient.age, gender);
  const bmiCategory = getBMICategory(bmi);

  const handleSave = () => {
    updatePatient({ weight, height, gender });
  };

  const InfoModal = ({ show, onClose, title, children }: { show: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
        <div className="bg-card m-4 max-w-lg w-full rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Body Measurements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full p-2 rounded-md border bg-background hover:border-primary focus:border-primary focus:ring focus:ring-primary/20 transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full p-2 rounded-md border bg-background hover:border-primary focus:border-primary focus:ring focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-2 rounded-md border bg-background hover:border-primary focus:border-primary focus:ring focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Save Measurements
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">BMI Calculator</h2>
              <button
                onClick={() => setShowBMIInfo(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{bmi.toFixed(1)}</p>
              <p className="text-lg text-muted-foreground">{bmiCategory}</p>
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(bmi / 40) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">BMR Calculator</h2>
              <button
                onClick={() => setShowBMRInfo(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{Math.round(bmr)}</p>
              <p className="text-lg text-muted-foreground">calories/day</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Based on {gender === 'male' ? 'male' : 'female'} calculation formula
            </p>
          </div>
        </div>
      </div>

      <InfoModal
        show={showBMIInfo}
        onClose={() => setShowBMIInfo(false)}
        title="Body Mass Index (BMI)"
      >
        <div className="space-y-4">
          <p>
            BMI is a measure of body fat based on height and weight that applies to adult men and women.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">BMI Categories:</h4>
            <ul className="list-disc list-inside">
              <li>Underweight = &lt;18.5</li>
              <li>Normal weight = 18.5–24.9</li>
              <li>Overweight = 25–29.9</li>
              <li>Obesity = BMI of 30 or greater</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: BMI is a general indicator and may not be accurate for athletes, elderly, or pregnant women.
          </p>
        </div>
      </InfoModal>

      <InfoModal
        show={showBMRInfo}
        onClose={() => setShowBMRInfo(false)}
        title="Basal Metabolic Rate (BMR)"
      >
        <div className="space-y-4">
          <p>
            BMR is the number of calories your body burns while performing basic life-sustaining functions.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">Calculation Formula:</h4>
            <p>For Males:</p>
            <pre className="bg-muted p-2 rounded text-sm">
              BMR = 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)
            </pre>
            <p>For Females:</p>
            <pre className="bg-muted p-2 rounded text-sm">
              BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)
            </pre>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: This is your baseline calorie need. Total daily calorie needs depend on activity level.
          </p>
        </div>
      </InfoModal>
    </div>
  );
}