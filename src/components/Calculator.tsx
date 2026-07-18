import React, { useState, useMemo, useEffect } from 'react';
import { GPUS, CPUS, MOTHERBOARDS, RAMS, RECOMMENDED_BUILDS } from '../data';
import { CalculationResult, HistoryItem, RecommendedBuild } from '../types';
import { Zap, AlertTriangle, Monitor, Cpu, MemoryStick, DollarSign, Database, History, FileDown, Trash2, Power, Gamepad2, Star, Activity } from 'lucide-react';
import { useI18n } from '../i18n';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

export default function Calculator() {
  const { t, lang } = useI18n();

  const [selectedGpu, setSelectedGpu] = useState(GPUS[0].id);
  const [selectedCpu, setSelectedCpu] = useState(CPUS[0].id);
  const [selectedMb, setSelectedMb] = useState(MOTHERBOARDS[0].id);
  const [selectedRam, setSelectedRam] = useState(RAMS[0].id);

  const [gpuPrice, setGpuPrice] = useState<number | string>(GPUS[0].defaultPrice);
  const [cpuPrice, setCpuPrice] = useState<number | string>(CPUS[0].defaultPrice);
  const [mbPrice, setMbPrice] = useState<number | string>(MOTHERBOARDS[0].defaultPrice);
  const [ramPrice, setRamPrice] = useState<number | string>(RAMS[0].defaultPrice);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'recommended'>('history');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('calcpro_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleGpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedGpu(val);
    const gpu = GPUS.find(g => g.id === val);
    if (gpu) setGpuPrice(gpu.defaultPrice);
  };

  const handleCpuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCpu(val);
    const cpu = CPUS.find(c => c.id === val);
    if (cpu) setCpuPrice(cpu.defaultPrice);
  };

  const handleMbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedMb(val);
    const mb = MOTHERBOARDS.find(m => m.id === val);
    if (mb) setMbPrice(mb.defaultPrice);
  };

  const handleRamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedRam(val);
    const ram = RAMS.find(r => r.id === val);
    if (ram) setRamPrice(ram.defaultPrice);
  };

  const result: CalculationResult = useMemo(() => {
    const gpu = GPUS.find(g => g.id === selectedGpu)!;
    const cpu = CPUS.find(c => c.id === selectedCpu)!;
    const ram = RAMS.find(r => r.id === selectedRam)!;

    const kVram = gpu.vram <= 8 ? -5 : (gpu.vram >= 16 ? 4 : 0);
    const kAi = gpu.aiType === 'DLSS3' ? 5 : (gpu.aiType === 'FSR' ? 2 : -5);
    const kBus = gpu.bus >= 256 ? 3 : (gpu.bus <= 128 ? -4 : 0);

    const gpuTotal = gpu.baseScore + kVram + kAi + kBus;
    const kBot = (gpu.baseScore >= 60 && cpu.score <= 15) ? 20 : 0;

    const totalScore = gpuTotal + cpu.score + ram.score - kBot;
    
    const pGpu = typeof gpuPrice === 'number' ? gpuPrice : parseFloat(gpuPrice as string) || 0;
    const pCpu = typeof cpuPrice === 'number' ? cpuPrice : parseFloat(cpuPrice as string) || 0;
    const pMb = typeof mbPrice === 'number' ? mbPrice : parseFloat(mbPrice as string) || 0;
    const pRam = typeof ramPrice === 'number' ? ramPrice : parseFloat(ramPrice as string) || 0;
    
    const totalPrice = pGpu + pCpu + pMb + pRam;
    
    const oe = totalScore > 0 ? (totalPrice / totalScore) : 0;

    let tier: CalculationResult['tier'] = 'D';
    if (totalScore > 160) tier = 'S';
    else if (totalScore >= 120) tier = 'A';
    else if (totalScore >= 90) tier = 'B';
    else if (totalScore >= 60) tier = 'C';
    else tier = 'D';

    const powerW = gpu.powerW + cpu.powerW + 40 + 10 + 30;
    const recommendedPsuW = Math.ceil((powerW * 1.3) / 50) * 50;

    const gpuPerf = gpu.baseScore / 160;
    const cpuPerf = cpu.score / 48;
    const diff = gpuPerf - cpuPerf;
    
    let bottleneckStatus: 'CPU' | 'GPU' | 'Balanced' = 'Balanced';
    let bottleneckPercent = 0;

    if (diff > 0.18) {
      bottleneckStatus = 'CPU';
      bottleneckPercent = Math.min(Math.round((diff - 0.18) * 150), 100); 
    } else if (diff < -0.18) {
      bottleneckStatus = 'GPU';
      bottleneckPercent = Math.min(Math.round((-diff - 0.18) * 150), 100);
    }

    return {
      gpuBase: gpu.baseScore,
      kVram,
      kAi,
      kBus,
      gpuTotal,
      cpuScore: cpu.score,
      ramScore: ram.score,
      kBot,
      totalScore,
      totalPrice,
      oe,
      tier,
      powerW,
      recommendedPsuW,
      bottleneckStatus,
      bottleneckPercent
    };
  }, [selectedGpu, selectedCpu, selectedMb, selectedRam, gpuPrice, cpuPrice, mbPrice, ramPrice]);

  const saveToHistory = () => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      name: `${GPUS.find(g=>g.id===selectedGpu)?.name.replace('NVIDIA ','').replace('AMD ','')} + ${CPUS.find(c=>c.id===selectedCpu)?.name.replace('Intel ','').replace('AMD ','')}`,
      date: Date.now(),
      totalPrice: result.totalPrice,
      totalScore: result.totalScore,
      tier: result.tier,
      selectedGpu, selectedCpu, selectedMb, selectedRam
    };
    const newHist = [newItem, ...history];
    setHistory(newHist);
    localStorage.setItem('calcpro_history', JSON.stringify(newHist));
  };

  const loadHistory = (item: HistoryItem | RecommendedBuild) => {
    setSelectedGpu(item.selectedGpu);
    setSelectedCpu(item.selectedCpu);
    setSelectedMb(item.selectedMb);
    setSelectedRam(item.selectedRam);
    const g = GPUS.find(g=>g.id===item.selectedGpu);
    if (g) setGpuPrice(g.defaultPrice);
    const c = CPUS.find(c=>c.id===item.selectedCpu);
    if (c) setCpuPrice(c.defaultPrice);
    const m = MOTHERBOARDS.find(m=>m.id===item.selectedMb);
    if (m) setMbPrice(m.defaultPrice);
    const r = RAMS.find(r=>r.id===item.selectedRam);
    if (r) setRamPrice(r.defaultPrice);
  };

  const deleteHistory = (id: string) => {
    const newHist = history.filter(h => h.id !== id);
    setHistory(newHist);
    localStorage.setItem('calcpro_history', JSON.stringify(newHist));
  };

  const exportPDF = async () => {
    const el = document.getElementById('calc-results');
    if (!el) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(el, { 
        backgroundColor: '#0F0F12', 
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CalcPro_Result_${result.totalScore}pts.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Nie udało się wyeksportować pliku PDF. / Failed to export PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const tierColors = {
    'S': 'text-fuchsia-400',
    'A': 'text-red-400',
    'B': 'text-indigo-400',
    'C': 'text-emerald-400',
    'D': 'text-slate-400',
    'Legacy': 'text-stone-400'
  };

  const tierBgColors = {
    'S': 'bg-fuchsia-900/20 border-fuchsia-500/30 text-fuchsia-300',
    'A': 'bg-red-900/20 border-red-500/30 text-red-300',
    'B': 'bg-indigo-900/20 border-indigo-500/30 text-indigo-300',
    'C': 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300',
    'D': 'bg-slate-800/50 border-slate-600/30 text-slate-300',
    'Legacy': 'bg-stone-900/50 border-stone-700/30 text-stone-400'
  };

  const getTierName = (tier: CalculationResult['tier']) => {
    const map = {
      'S': t.tierS,
      'A': t.tierA,
      'B': t.tierB,
      'C': t.tierC,
      'D': t.tierD,
      'Legacy': t.tierLegacy
    };
    return map[tier];
  };

  const chartData = [
    { name: 'CS2', fps: Math.round(result.totalScore * 4.5) },
    { name: 'CP2077', fps: Math.round(result.totalScore * 0.9) },
    { name: 'Witcher 3', fps: Math.round(result.totalScore * 1.2) },
  ];

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto px-4 md:px-8 gap-8 pb-10">
      
      {/* Left Sidebar: Tabs (History/Recommended) */}
      <div className="lg:w-64 flex-shrink-0 flex flex-col gap-4">
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-5 flex flex-col h-full min-h-[300px]">
          <div className="flex bg-[#1A1A20] rounded-lg p-1 mb-4">
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex justify-center items-center gap-2 py-2 text-xs font-medium rounded-md transition-colors ${activeTab === 'history' ? 'bg-[#2A2A30] text-[#E0E0E6]' : 'text-[#80808F] hover:text-[#E0E0E6]'}`}
            >
              <History className="w-3.5 h-3.5" />
              {t.tabHistory}
            </button>
            <button 
              onClick={() => setActiveTab('recommended')}
              className={`flex-1 flex justify-center items-center gap-2 py-2 text-xs font-medium rounded-md transition-colors ${activeTab === 'recommended' ? 'bg-[#2A2A30] text-[#E0E0E6]' : 'text-[#80808F] hover:text-[#E0E0E6]'}`}
            >
              <Star className="w-3.5 h-3.5" />
              {t.tabRecommended}
            </button>
          </div>
          
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1">
            {activeTab === 'history' ? (
              history.length === 0 ? (
                <p className="text-sm text-[#60606F] italic text-center mt-4">{t.historyEmpty}</p>
              ) : (
                history.map(item => (
                  <div key={item.id} className="bg-[#1A1A20] border border-[#2A2A30] rounded-xl p-3 flex flex-col gap-2 group relative">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-semibold text-[#E0E0E6] truncate pr-6" title={item.name}>{item.name}</p>
                      <button 
                        onClick={() => deleteHistory(item.id)}
                        className="absolute right-3 top-3 text-[#60606F] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-mono font-bold ${tierColors[item.tier]}`}>{item.totalScore} pts</span>
                      <span className="text-[#80808F]">{item.totalPrice} PLN</span>
                    </div>
                    <button 
                      onClick={() => loadHistory(item)}
                      className="mt-1 w-full py-1.5 bg-[#2A2A30] hover:bg-indigo-600 hover:text-white text-[#80808F] rounded-lg text-xs font-medium transition-colors"
                    >
                      {t.loadBtn}
                    </button>
                  </div>
                ))
              )
            ) : (
              RECOMMENDED_BUILDS.map(item => (
                <div key={item.id} className="bg-[#1A1A20] border border-[#2A2A30] rounded-xl p-3 flex flex-col gap-2 group relative">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold text-[#E0E0E6] pr-2 leading-tight" title={item.name}>{item.name}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-bold bg-[#2A2A30] ${tierColors[item.tier]}`}>Tier {item.tier}</span>
                  </div>
                  <button 
                    onClick={() => loadHistory(item)}
                    className="mt-1 w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {t.loadBtn}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Middle Column: Inputs */}
      <div className="lg:w-5/12 flex flex-col gap-6">
        
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.gpu}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.chooseModel}</label>
              <select value={selectedGpu} onChange={handleGpuChange} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base truncate">
                {GPUS.map(g => <option key={g.id} value={g.id}>{g.name} ({g.vram}GB)</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.price}</label>
              <input type="number" value={gpuPrice} onChange={e => setGpuPrice(e.target.value)} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base font-mono w-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.cpu}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.chooseModel}</label>
              <select value={selectedCpu} onChange={handleCpuChange} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base truncate">
                {CPUS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.price}</label>
              <input type="number" value={cpuPrice} onChange={e => setCpuPrice(e.target.value)} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base font-mono w-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.motherboard}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.chooseModel}</label>
              <select value={selectedMb} onChange={handleMbChange} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base truncate">
                {MOTHERBOARDS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.price}</label>
              <input type="number" value={mbPrice} onChange={e => setMbPrice(e.target.value)} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base font-mono w-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <MemoryStick className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.ram}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.chooseModel}</label>
              <select value={selectedRam} onChange={handleRamChange} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base truncate">
                {RAMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#80808F] uppercase tracking-wider">{t.price}</label>
              <input type="number" value={ramPrice} onChange={e => setRamPrice(e.target.value)} className="bg-[#1A1A20] border border-[#2A2A30] rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors text-[#E0E0E6] text-base font-mono w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="lg:w-5/12 flex flex-col gap-6" id="calc-results">
        
        {/* Actions bar */}
        <div className="flex gap-4 mb-2" data-html2canvas-ignore>
          <button 
            onClick={saveToHistory}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2"
          >
            <History className="w-4 h-4" />
            {t.saveBuildBtn}
          </button>
          <button 
            onClick={exportPDF}
            disabled={isExporting}
            className="flex-1 bg-[#2A2A30] hover:bg-[#3A3A42] disabled:opacity-50 disabled:cursor-not-allowed text-[#E0E0E6] font-medium py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2"
          >
            {isExporting ? <Activity className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
            {isExporting ? (lang === 'pl' ? 'Eksportowanie...' : 'Exporting...') : t.exportPdfBtn}
          </button>
        </div>

        {/* Score Card */}
        <div className="bg-gradient-to-br from-[#1A1A20] to-[#121216] border border-[#2A2A30] rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
          <div className="relative z-10 flex flex-col">
            <p className="text-xs text-[#80808F] font-bold uppercase tracking-widest mb-1">{t.score}</p>
            <div className="flex items-baseline gap-2 mb-4">
              <p className={`text-5xl font-mono font-medium tracking-tighter ${tierColors[result.tier]}`}>
                {result.totalScore}
              </p>
              <span className="text-[#60606F] text-xl font-mono">{t.pts}</span>
            </div>

            <div className={`inline-flex self-start items-center px-3 py-1.5 rounded border text-xs font-semibold mb-8 ${tierBgColors[result.tier]}`}>
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              {getTierName(result.tier)}
            </div>

            <div className="space-y-4 text-sm mt-auto">
              <div className="flex justify-between items-center text-[#80808F]">
                <span>{t.rawGpuPower}</span>
                <span className="font-mono text-[#E0E0E6]">{result.gpuBase} {t.pts}</span>
              </div>
              <div className="flex justify-between items-center text-[#80808F]">
                <span>{t.vramCapacity}</span>
                <span className={`font-mono ${result.kVram > 0 ? 'text-emerald-400' : result.kVram < 0 ? 'text-red-400' : 'text-[#E0E0E6]'}`}>
                  {result.kVram > 0 ? '+' : ''}{result.kVram} {t.pts}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#80808F]">
                <span>{t.aiTech}</span>
                <span className={`font-mono ${result.kAi > 0 ? 'text-emerald-400' : result.kAi < 0 ? 'text-red-400' : 'text-[#E0E0E6]'}`}>
                  {result.kAi > 0 ? '+' : ''}{result.kAi} {t.pts}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#80808F]">
                <span>{t.busWidth}</span>
                <span className={`font-mono ${result.kBus > 0 ? 'text-emerald-400' : result.kBus < 0 ? 'text-red-400' : 'text-[#E0E0E6]'}`}>
                  {result.kBus > 0 ? '+' : ''}{result.kBus} {t.pts}
                </span>
              </div>
              
              <div className="h-px bg-[#2A2A30] my-2"></div>
              
              <div className="flex justify-between items-center text-[#E0E0E6]">
                <span>{t.gpuTotal}</span>
                <span className="font-mono">{result.gpuTotal} {t.pts}</span>
              </div>

              <div className="flex justify-between items-center text-[#80808F] mt-2">
                <span>{t.cpuPower}</span>
                <span className="font-mono text-[#E0E0E6]">+{result.cpuScore} {t.pts}</span>
              </div>
              <div className="flex justify-between items-center text-[#80808F]">
                <span>{t.ramStandard}</span>
                <span className="font-mono text-[#E0E0E6]">+{result.ramScore} {t.pts}</span>
              </div>
              
              {result.kBot > 0 && (
                <div className="flex justify-between items-center mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t.bottleneckPenalty}
                  </span>
                  <span className="font-mono">-{result.kBot} {t.pts}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Economic View */}
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.economicAnalysis}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-baseline pb-4 border-b border-[#2A2A30]">
              <span className="text-sm font-semibold text-[#80808F] uppercase tracking-wider">{t.totalCost}</span>
              <span className="text-2xl font-mono text-[#E0E0E6]">{result.totalPrice.toLocaleString('pl-PL')} PLN</span>
            </div>
            
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-semibold text-[#80808F] uppercase tracking-wider break-words pr-4">{t.profitabilityIndex}</span>
                <span className="text-2xl font-mono text-indigo-400 whitespace-nowrap">{result.oe.toFixed(2)} PLN</span>
              </div>
              <p className="text-[11px] text-[#60606F] uppercase text-right mt-1">{t.costPerPoint}</p>
            </div>

            <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-xl">
              {result.oe < 45 ? (
                <p className="text-sm text-indigo-200 leading-relaxed"><strong>{t.verdictOutstanding}</strong> {t.verdictOutstandingDesc}</p>
              ) : result.oe < 55 ? (
                <p className="text-sm text-[#E0E0E6] leading-relaxed"><strong>{t.verdictGood}</strong> {t.verdictGoodDesc}</p>
              ) : result.oe < 65 ? (
                <p className="text-sm text-[#80808F] leading-relaxed"><strong>{t.verdictLow}</strong> {t.verdictLowDesc}</p>
              ) : (
                <p className="text-sm text-red-300 leading-relaxed"><strong>{t.verdictBad}</strong> {t.verdictBadDesc}</p>
              )}
            </div>
          </div>
        </div>

        {/* Power Calculator */}
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Power className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.powerCalcTitle}</h2>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-[#80808F]">{t.estPower}</span>
            <span className="font-mono text-amber-200">{result.powerW} {t.watt}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#80808F]">{t.recPsu}</span>
            <span className="font-mono font-bold text-amber-400 text-lg">{result.recommendedPsuW} {t.watt}</span>
          </div>
        </div>

        {/* Bottleneck Calculator */}
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.bottleneckTitle}</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className={`font-medium ${result.bottleneckStatus === 'Balanced' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.bottleneckStatus === 'CPU' ? t.bottleneckCpu : result.bottleneckStatus === 'GPU' ? t.bottleneckGpu : t.bottleneckBalanced}
              </span>
              {result.bottleneckPercent > 0 && (
                <span className="font-mono text-[#E0E0E6]">{result.bottleneckPercent}%</span>
              )}
            </div>
            {result.bottleneckPercent > 0 && (
              <div className="w-full bg-[#1A1A20] rounded-full h-2.5 mt-1 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full ${result.bottleneckStatus === 'CPU' ? 'bg-rose-500' : 'bg-orange-500'}`} 
                  style={{ width: `${result.bottleneckPercent}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* FPS Charts */}
        <div className="bg-[#121216] border border-[#2A2A30] rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-light text-[#E0E0E6]">{t.fpsChartsTitle}</h2>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#2A2A30" />
                <XAxis type="number" stroke="#60606F" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#80808F" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip 
                  cursor={{ fill: '#2A2A30' }} 
                  contentStyle={{ backgroundColor: '#16161A', border: '1px solid #2A2A30', borderRadius: '8px', color: '#E0E0E6' }}
                  itemStyle={{ color: '#A78BFA' }}
                  formatter={(val) => [`${val} FPS`, 'FPS']}
                />
                <Bar dataKey="fps" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#F59E0B' : index === 1 ? '#06B6D4' : '#8B5CF6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
