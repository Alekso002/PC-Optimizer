import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pl' | 'en';

export const translations = {
  pl: {
    appTitle: 'CalcPro | PC Optimizer',
    headerTag: 'Oparty na "Systemie Punktowym"',
    title: 'Kalkulator Wydajności',
    subtitle: 'Narzędzie analityczne pozwalające wyliczyć Wskaźnik Opłacalności Ekonomicznej (OE) dla komputerów gamingowych w oparciu o aktualne realia rynkowe.',
    gpu: 'Karta Graficzna (GPU)',
    cpu: 'Procesor (CPU)',
    motherboard: 'Płyta Główna',
    ram: 'Pamięć RAM',
    chooseModel: 'Wybierz model',
    price: 'Cena (PLN)',
    score: 'Wynik Punktowy (Wz)',
    pts: 'pkt',
    rawGpuPower: 'Surowa moc GPU',
    vramCapacity: 'Pojemność VRAM',
    aiTech: 'Technologie AI (Gen klatek)',
    busWidth: 'Szyna danych',
    gpuTotal: 'GPU Razem',
    cpuPower: 'Moc procesora (CPU)',
    ramStandard: 'Standard Pamięci RAM',
    bottleneckPenalty: 'Kara: Wąskie Gardło',
    economicAnalysis: 'Analiza Ekonomiczna',
    totalCost: 'Całkowity koszt',
    profitabilityIndex: 'Wskaźnik Opłacalności',
    costPerPoint: 'Koszt pozyskania 1 punktu wydajności',
    tierS: 'Tier S (Absolutny Top)',
    tierA: 'Tier A (High-End)',
    tierB: 'Tier B (Sweet Spot)',
    tierC: 'Tier C (Mainstream)',
    tierD: 'Tier D (Entry-Level)',
    tierLegacy: 'Przestarzały',
    verdictOutstanding: 'Wybitna opłacalność!',
    verdictOutstandingDesc: 'Wybrany zestaw oferuje fenomenalny stosunek wydajności do ceny, co pozycjonuje go jako "Sweet Spot" na rynku polskim.',
    verdictGood: 'Dobra opłacalność.',
    verdictGoodDesc: 'Zestaw jest racjonalnie wyceniony w stosunku do oferowanej wydajności. Rozsądny wybór inwestycyjny.',
    verdictLow: 'Niska opłacalność.',
    verdictLowDesc: 'Płacisz wyraźny podatek od nowości (Premium) lub wchodzisz w terytorium najdroższego segmentu High-End.',
    verdictBad: 'Ryzyko pułapki budżetowej!',
    verdictBadDesc: 'Skrajnie nieopłacalna inwestycja. Generowanie pojedynczego punktu wydajności jest bardzo drogie.',
    footerText: 'Aplikacja badawcza zrealizowana na potrzeby weryfikacji sprzętu komputerowego.',
    footerCopyright: '© 2026 Oleksii Sysoiev. Praca dyplomowa magisterska.',
    suggestionsTitle: 'Co jeszcze możemy wdrożyć w przyszłości?',
    suggestions: [
      'Zapisywanie i porównywanie kilku zestawów (historia kalkulacji w Sidebarze).',
      'Eksport wyników kalkulacji do pliku PDF jednym kliknięciem.',
      'Wykresy FPS w konkretnych grach testowych (np. Cyberpunk 2077, CS2).',
      'Kalkulator poboru prądu dla całego PC (PSU wattage calculator).',
      'Integracja ze sklepami online po API (np. Ceneo, x-kom) dla cen w czasie rzeczywistym.'
    ],
    historyTitle: 'Historia Kalkulacji',
    historyEmpty: 'Brak zapisanych zestawów.',
    saveBuildBtn: 'Zapisz Zestaw',
    exportPdfBtn: 'Eksport do PDF',
    loadBtn: 'Wczytaj',
    deleteBtn: 'Usuń',
    powerCalcTitle: 'Pobór Prądu i Zasilacz',
    estPower: 'Szacowany pobór (TDP)',
    recPsu: 'Zalecany zasilacz (PSU)',
    fpsChartsTitle: 'Wydajność w grach (Szacowane FPS)',
    gameCS2: 'Counter-Strike 2',
    gameCP2077: 'Cyberpunk 2077',
    watt: 'W',
    bottleneckTitle: 'Wąskie Gardło (Bottleneck)',
    bottleneckCpu: 'Procesor ogranicza kartę graficzną.',
    bottleneckGpu: 'Karta graficzna ogranicza procesor.',
    bottleneckBalanced: 'Zestaw jest dobrze zbalansowany.',
    bottleneckPercent: 'Ograniczenie układu:',
    tabHistory: 'Historia',
    tabRecommended: 'Polecane'
  },
  en: {
    appTitle: 'CalcPro | PC Optimizer',
    headerTag: 'Based on "Point System"',
    title: 'Performance Calculator',
    subtitle: 'An analytical tool to calculate the Economic Profitability Index (OE) for gaming PCs based on current market realities.',
    gpu: 'Graphics Card (GPU)',
    cpu: 'Processor (CPU)',
    motherboard: 'Motherboard',
    ram: 'RAM Memory',
    chooseModel: 'Select model',
    price: 'Price (PLN)',
    score: 'Score (Wz)',
    pts: 'pts',
    rawGpuPower: 'Raw GPU power',
    vramCapacity: 'VRAM capacity',
    aiTech: 'AI Tech (Frame Gen)',
    busWidth: 'Memory Bus',
    gpuTotal: 'GPU Total',
    cpuPower: 'CPU Power',
    ramStandard: 'RAM Standard',
    bottleneckPenalty: 'Penalty: Bottleneck',
    economicAnalysis: 'Economic Analysis',
    totalCost: 'Total cost',
    profitabilityIndex: 'Profitability Index',
    costPerPoint: 'Cost per 1 performance point',
    tierS: 'Tier S (Absolute Top)',
    tierA: 'Tier A (High-End)',
    tierB: 'Tier B (Sweet Spot)',
    tierC: 'Tier C (Mainstream)',
    tierD: 'Tier D (Entry-Level)',
    tierLegacy: 'Legacy / Outdated',
    verdictOutstanding: 'Outstanding profitability!',
    verdictOutstandingDesc: 'The selected build offers phenomenal price-to-performance ratio, positioning it as the "Sweet Spot".',
    verdictGood: 'Good profitability.',
    verdictGoodDesc: 'The build is rationally priced for its performance. A reasonable investment.',
    verdictLow: 'Low profitability.',
    verdictLowDesc: 'You are paying a noticeable early-adopter tax (Premium) or entering the most expensive High-End territory.',
    verdictBad: 'Budget trap risk!',
    verdictBadDesc: 'Extremely unprofitable investment. Generating a single performance point is very expensive.',
    footerText: 'Research application developed for computer hardware verification.',
    footerCopyright: "© 2026 Oleksii Sysoiev. Master's thesis.",
    suggestionsTitle: 'What else can we implement in the future?',
    suggestions: [
      'Saving and comparing multiple builds (calculation history in Sidebar).',
      'Export calculation results to a PDF file with one click.',
      'FPS performance charts for specific test games (e.g., Cyberpunk 2077, CS2).',
      'Total PC power consumption calculator (PSU wattage calculator).',
      'Live API integration with online stores (e.g., Ceneo) for real-time prices.'
    ],
    historyTitle: 'Calculation History',
    historyEmpty: 'No saved builds yet.',
    saveBuildBtn: 'Save Build',
    exportPdfBtn: 'Export PDF',
    loadBtn: 'Load',
    deleteBtn: 'Delete',
    powerCalcTitle: 'Power & PSU Estimates',
    estPower: 'Estimated Power Draw',
    recPsu: 'Recommended PSU',
    fpsChartsTitle: 'Gaming Performance (Estimated FPS)',
    gameCS2: 'Counter-Strike 2',
    gameCP2077: 'Cyberpunk 2077',
    watt: 'W',
    bottleneckTitle: 'Bottleneck Calculator',
    bottleneckCpu: 'CPU is bottlenecking the GPU.',
    bottleneckGpu: 'GPU is bottlenecking the CPU.',
    bottleneckBalanced: 'The build is well balanced.',
    bottleneckPercent: 'Estimated bottleneck:',
    tabHistory: 'History',
    tabRecommended: 'Recommended'
  }
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.pl;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('pl');
  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
