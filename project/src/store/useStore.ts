import { create } from 'zustand';

interface ThyverseState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  patient: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    weight: number;
    height: number;
    medications: Array<{
      id: string;
      name: string;
      dose: string;
      duration: string;
    }>;
    vitals: Array<{
      date: string;
      systolic: number;
      diastolic: number;
      pulse: number;
    }>;
    thyroidPanel: {
      tsh: number;
      t3: number;
      t4: number;
      date: string;
    };
  };
  updatePatient: (data: Partial<ThyverseState['patient']>) => void;
  addMedication: (medication: ThyverseState['patient']['medications'][0]) => void;
  removeMedication: (id: string) => void;
  addVitals: (vitals: ThyverseState['patient']['vitals'][0]) => void;
  updateThyroidPanel: (panel: ThyverseState['patient']['thyroidPanel']) => void;
}

export const useStore = create<ThyverseState>((set) => ({
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  patient: {
    name: 'John Doe',
    age: 35,
    gender: 'male',
    weight: 75,
    height: 175,
    medications: [
      {
        id: '1',
        name: 'Levothyroxine',
        dose: '50mcg',
        duration: '1 month',
      },
    ],
    vitals: [
      {
        date: new Date().toISOString(),
        systolic: 120,
        diastolic: 80,
        pulse: 72,
      },
    ],
    thyroidPanel: {
      tsh: 2.5,
      t3: 3.1,
      t4: 1.2,
      date: new Date().toISOString(),
    },
  },
  updatePatient: (data) =>
    set((state) => ({
      patient: { ...state.patient, ...data },
    })),
  addMedication: (medication) =>
    set((state) => ({
      patient: {
        ...state.patient,
        medications: [...state.patient.medications, medication],
      },
    })),
  removeMedication: (id) =>
    set((state) => ({
      patient: {
        ...state.patient,
        medications: state.patient.medications.filter((m) => m.id !== id),
      },
    })),
  addVitals: (vitals) =>
    set((state) => ({
      patient: {
        ...state.patient,
        vitals: [...state.patient.vitals, vitals],
      },
    })),
  updateThyroidPanel: (panel) =>
    set((state) => ({
      patient: {
        ...state.patient,
        thyroidPanel: panel,
      },
    })),
}));