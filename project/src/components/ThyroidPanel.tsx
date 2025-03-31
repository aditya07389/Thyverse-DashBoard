import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export default function ThyroidPanel() {
  const { patient, updateThyroidPanel } = useStore();
  const [values, setValues] = React.useState({
    tsh: patient.thyroidPanel.tsh,
    t3: patient.thyroidPanel.t3,
    t4: patient.thyroidPanel.t4,
  });

  const handleSave = () => {
    updateThyroidPanel({
      ...values,
      date: new Date().toISOString(),
    });
  };

  const getStatus = (type: 'tsh' | 't3' | 't4') => {
    const ranges = {
      tsh: { min: 0.4, max: 4.0 },
      t3: { min: 2.3, max: 4.2 },
      t4: { min: 0.8, max: 1.8 },
    };
    const value = values[type];
    const range = ranges[type];

    if (value < range.min) return 'Low';
    if (value > range.max) return 'High';
    return 'Normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low':
        return 'text-blue-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Update Thyroid Panel</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                TSH (mIU/L)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.tsh}
                onChange={(e) => setValues({ ...values, tsh: Number(e.target.value) })}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                T3 (pmol/L)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.t3}
                onChange={(e) => setValues({ ...values, t3: Number(e.target.value) })}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                T4 (ng/dL)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.t4}
                onChange={(e) => setValues({ ...values, t4: Number(e.target.value) })}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Current Results</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">TSH</span>
                <span className={`font-medium ${getStatusColor(getStatus('tsh'))}`}>
                  {getStatus('tsh')}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(values.tsh / 10) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {values.tsh} mIU/L (0.4 - 4.0)
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">T3</span>
                <span className={`font-medium ${getStatusColor(getStatus('t3'))}`}>
                  {getStatus('t3')}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(values.t3 / 6) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {values.t3} pmol/L (2.3 - 4.2)
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">T4</span>
                <span className={`font-medium ${getStatusColor(getStatus('t4'))}`}>
                  {getStatus('t4')}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(values.t4 / 3) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {values.t4} ng/dL (0.8 - 1.8)
              </div>
            </div>

            <div className="text-sm text-muted-foreground text-center mt-4">
              Last updated: {format(new Date(patient.thyroidPanel.date), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}