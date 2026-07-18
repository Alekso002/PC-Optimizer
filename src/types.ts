export type AIType = 'DLSS3' | 'FSR' | 'NONE';

export interface GPU {
  id: string;
  name: string;
  vram: number;
  bus: number;
  baseScore: number;
  aiType: AIType;
  defaultPrice: number;
  powerW: number;
}

export interface CPU {
  id: string;
  name: string;
  score: number;
  defaultPrice: number;
  powerW: number;
}

export interface Motherboard {
  id: string;
  name: string;
  defaultPrice: number;
}

export interface RAM {
  id: string;
  name: string;
  score: number;
  defaultPrice: number;
}

export interface CalculationResult {
  gpuBase: number;
  kVram: number;
  kAi: number;
  kBus: number;
  gpuTotal: number;
  cpuScore: number;
  ramScore: number;
  kBot: number;
  totalScore: number;
  totalPrice: number;
  oe: number; // Wskaźnik Opłacalności Ekonomicznej (PLN/pkt)
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'Legacy';
  powerW: number;
  recommendedPsuW: number;
  bottleneckStatus: 'CPU' | 'GPU' | 'Balanced';
  bottleneckPercent: number;
}

export interface RecommendedBuild {
  id: string;
  name: string;
  tier: CalculationResult['tier'];
  selectedGpu: string;
  selectedCpu: string;
  selectedMb: string;
  selectedRam: string;
}

export interface HistoryItem {
  id: string;
  name: string;
  date: number;
  totalPrice: number;
  totalScore: number;
  tier: CalculationResult['tier'];
  selectedGpu: string;
  selectedCpu: string;
  selectedMb: string;
  selectedRam: string;
}
