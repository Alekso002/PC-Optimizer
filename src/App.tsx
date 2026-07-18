import React from 'react';
import Calculator from './components/Calculator';
import { Settings, Cpu, Globe, Lightbulb } from 'lucide-react';
import { I18nProvider, useI18n } from './i18n';

function MainApp() {
  const { t, lang, setLang } = useI18n();

  return (
    <div className="min-h-screen bg-[#0F0F12] font-sans text-[#E0E0E6] selection:bg-indigo-500/30 flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#16161A] border-b border-[#2A2A30] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg text-[#E0E0E6]">{t.appTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#2A2A30] px-3 py-1.5 rounded-md border border-[#3A3A42] text-sm text-[#80808F]">
              <Settings className="w-4 h-4" />
              {t.headerTag}
            </div>
            <button 
              onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
              className="flex items-center gap-2 hover:text-white text-[#80808F] transition-colors bg-[#1A1A20] px-3 py-1.5 rounded-md border border-[#2A2A30]"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase">{lang}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mb-8 text-center sm:text-left flex flex-col gap-2">
          <h2 className="text-3xl font-light text-[#E0E0E6] tracking-tight">{t.title}</h2>
          <p className="text-[#80808F] text-sm leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <Calculator />
        
        {/* Suggestions Section */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12">
          <div className="bg-[#16161A] border border-[#2A2A30] rounded-2xl p-6 md:p-8">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-light text-[#E0E0E6]">{t.suggestionsTitle}</h3>
             </div>
             <ul className="grid sm:grid-cols-2 gap-4 text-sm text-[#80808F]">
                {t.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-[#1A1A20] border border-[#2A2A30] p-4 rounded-xl">
                    <span className="text-indigo-500 shrink-0 mt-0.5">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2A30] bg-[#121216] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-[#60606F] text-xs">
          <p className="mb-2 uppercase tracking-widest font-bold">{t.footerText}</p>
          <p>{t.footerCopyright}</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <MainApp />
    </I18nProvider>
  );
}

