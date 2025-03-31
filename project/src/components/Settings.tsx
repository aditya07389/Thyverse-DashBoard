import React from 'react';
import { useStore } from '../store/useStore';

export default function Settings() {
  const { patient, updatePatient, isDarkMode, toggleTheme } = useStore();
  const [values, setValues] = React.useState({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
  });

  const handleSave = () => {
    updatePatient(values);
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="max-w-2xl">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Age
              </label>
              <input
                type="number"
                value={values.age}
                onChange={(e) => setValues({ ...values, age: Number(e.target.value) })}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Gender
              </label>
              <select
                value={values.gender}
                onChange={(e) => setValues({ ...values, gender: e.target.value as 'male' | 'female' })}
                className="w-full p-2 rounded-md border bg-background"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </div>

        <div className="mt-6 bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                  isDarkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}