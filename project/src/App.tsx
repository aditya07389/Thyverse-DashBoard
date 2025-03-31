import React from 'react';
import { useStore } from './store/useStore';
import { MoonIcon, SunIcon, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Medications from './components/Medications';
import Measurements from './components/Measurements';
import Vitals from './components/Vitals';
import ThyroidPanel from './components/ThyroidPanel';
import Settings from './components/Settings';

function App() {
  const { isDarkMode, toggleTheme } = useStore();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'medications', label: 'Medications' },
    { id: 'measurements', label: 'Measurements' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'thyroid', label: 'Thyroid Panel' },
    { id: 'settings', label: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'medications':
        return <Medications />;
      case 'measurements':
        return <Measurements />;
      case 'vitals':
        return <Vitals />;
      case 'thyroid':
        return <ThyroidPanel />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background theme-transition flex">
      {/* Mobile Nav Toggle */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 button-hover"
      >
        {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 bg-secondary/80 backdrop-blur-sm transform theme-transition z-40 
          ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary hover-lift">Thyverse</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary button-hover"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsNavOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left theme-transition hover:bg-primary/10 button-hover
                      ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground font-medium shadow-lg scale-[1.02]'
                          : 'text-foreground hover:text-primary'
                      }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-muted-foreground text-center pt-4 border-t border-border">
            © 2025 Thyverse
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 md:ml-0 theme-transition">
        <div className="max-w-6xl mx-auto">
          <div className="animate-in slide-in-right">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden fade-in"
          onClick={() => setIsNavOpen(false)}
        />
      )}
    </div>
  );
}

export default App;