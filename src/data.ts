import { GPU, CPU, Motherboard, RAM, RecommendedBuild } from './types';

export const GPUS: GPU[] = [
  // Tier S / A
  { id: 'rtx_5090', name: 'NVIDIA RTX 5090', vram: 28, bus: 512, baseScore: 160, aiType: 'DLSS3', defaultPrice: 15100, powerW: 600 },
  { id: 'rtx_5080', name: 'NVIDIA RTX 5080', vram: 16, bus: 256, baseScore: 115, aiType: 'DLSS3', defaultPrice: 5225, powerW: 400 },
  { id: 'rtx_4090', name: 'NVIDIA RTX 4090', vram: 24, bus: 384, baseScore: 100, aiType: 'DLSS3', defaultPrice: 8200, powerW: 450 },
  { id: 'rtx_5070_ti', name: 'NVIDIA RTX 5070 Ti', vram: 16, bus: 256, baseScore: 85, aiType: 'DLSS3', defaultPrice: 3960, powerW: 300 },
  { id: 'rx_7900_xtx', name: 'AMD RX 7900 XTX', vram: 24, bus: 384, baseScore: 88, aiType: 'FSR', defaultPrice: 4150, powerW: 355 },
  { id: 'rtx_4080_super', name: 'NVIDIA RTX 4080 Super', vram: 16, bus: 256, baseScore: 82, aiType: 'DLSS3', defaultPrice: 5070, powerW: 320 },
  { id: 'rtx_4080', name: 'NVIDIA RTX 4080', vram: 16, bus: 256, baseScore: 78, aiType: 'DLSS3', defaultPrice: 4800, powerW: 320 },
  { id: 'rx_9070_xt', name: 'AMD RX 9070 XT', vram: 16, bus: 256, baseScore: 78, aiType: 'FSR', defaultPrice: 2980, powerW: 300 },
  { id: 'rx_7900_xt', name: 'AMD RX 7900 XT', vram: 20, bus: 320, baseScore: 75, aiType: 'FSR', defaultPrice: 3000, powerW: 315 },
  
  // Tier B
  { id: 'rtx_4070_ti_super', name: 'NVIDIA RTX 4070 Ti Super', vram: 16, bus: 256, baseScore: 70, aiType: 'DLSS3', defaultPrice: 4800, powerW: 285 },
  { id: 'rtx_3090_ti', name: 'NVIDIA RTX 3090 Ti', vram: 24, bus: 384, baseScore: 68, aiType: 'NONE', defaultPrice: 9400, powerW: 450 },
  { id: 'rtx_5070', name: 'NVIDIA RTX 5070', vram: 12, bus: 192, baseScore: 65, aiType: 'DLSS3', defaultPrice: 2600, powerW: 250 },
  { id: 'rtx_4070_ti', name: 'NVIDIA RTX 4070 Ti', vram: 12, bus: 192, baseScore: 62, aiType: 'DLSS3', defaultPrice: 5000, powerW: 285 },
  { id: 'rx_7800_xt', name: 'AMD RX 7800 XT', vram: 16, bus: 256, baseScore: 58, aiType: 'FSR', defaultPrice: 2080, powerW: 263 },
  { id: 'rtx_5060_ti', name: 'NVIDIA RTX 5060 Ti', vram: 16, bus: 128, baseScore: 60, aiType: 'DLSS3', defaultPrice: 1600, powerW: 160 },
  { id: 'rtx_4070_super', name: 'NVIDIA RTX 4070 Super', vram: 12, bus: 192, baseScore: 56, aiType: 'DLSS3', defaultPrice: 2800, powerW: 220 },
  { id: 'rtx_3080_ti', name: 'NVIDIA RTX 3080 Ti', vram: 12, bus: 384, baseScore: 55, aiType: 'NONE', defaultPrice: 4000, powerW: 350 },
  
  // Tier C
  { id: 'rx_6950_xt', name: 'AMD RX 6950 XT', vram: 16, bus: 256, baseScore: 52, aiType: 'FSR', defaultPrice: 2500, powerW: 335 },
  { id: 'rtx_4070', name: 'NVIDIA RTX 4070', vram: 12, bus: 192, baseScore: 48, aiType: 'DLSS3', defaultPrice: 3100, powerW: 200 },
  { id: 'rx_6800_xt', name: 'AMD RX 6800 XT', vram: 16, bus: 256, baseScore: 45, aiType: 'FSR', defaultPrice: 2300, powerW: 300 },
  { id: 'rtx_3080_12', name: 'NVIDIA RTX 3080 12GB', vram: 12, bus: 384, baseScore: 46, aiType: 'NONE', defaultPrice: 2800, powerW: 350 },
  { id: 'rtx_3080_10', name: 'NVIDIA RTX 3080 10GB', vram: 10, bus: 320, baseScore: 42, aiType: 'NONE', defaultPrice: 2500, powerW: 320 },
  { id: 'rx_7700_xt', name: 'AMD RX 7700 XT', vram: 12, bus: 192, baseScore: 40, aiType: 'FSR', defaultPrice: 1850, powerW: 245 },
  { id: 'rtx_4060_ti_16', name: 'NVIDIA RTX 4060 Ti 16GB', vram: 16, bus: 128, baseScore: 36, aiType: 'DLSS3', defaultPrice: 2900, powerW: 165 },
  { id: 'rx_6750_xt', name: 'AMD RX 6750 XT', vram: 12, bus: 192, baseScore: 34, aiType: 'FSR', defaultPrice: 1900, powerW: 250 },
  
  // Tier D & Legacy
  { id: 'rtx_5060', name: 'NVIDIA RTX 5060', vram: 8, bus: 128, baseScore: 35, aiType: 'DLSS3', defaultPrice: 1340, powerW: 115 },
  { id: 'rtx_4060_ti_8', name: 'NVIDIA RTX 4060 Ti 8GB', vram: 8, bus: 128, baseScore: 34, aiType: 'DLSS3', defaultPrice: 1800, powerW: 160 },
  { id: 'rx_7600_xt', name: 'AMD RX 7600 XT', vram: 16, bus: 128, baseScore: 28, aiType: 'FSR', defaultPrice: 2050, powerW: 190 },
  { id: 'rtx_3070_ti', name: 'NVIDIA RTX 3070 Ti', vram: 8, bus: 256, baseScore: 36, aiType: 'NONE', defaultPrice: 3200, powerW: 290 },
  { id: 'rtx_4060', name: 'NVIDIA RTX 4060', vram: 8, bus: 128, baseScore: 25, aiType: 'DLSS3', defaultPrice: 1800, powerW: 115 },
  { id: 'rtx_3060_ti', name: 'NVIDIA RTX 3060 Ti', vram: 8, bus: 256, baseScore: 26, aiType: 'NONE', defaultPrice: 1550, powerW: 200 },
  { id: 'rx_7600', name: 'AMD RX 7600', vram: 8, bus: 128, baseScore: 22, aiType: 'FSR', defaultPrice: 1000, powerW: 165 },
  { id: 'rtx_3060_12', name: 'NVIDIA RTX 3060 12GB', vram: 12, bus: 192, baseScore: 20, aiType: 'NONE', defaultPrice: 1500, powerW: 170 },
  { id: 'rx_6600', name: 'AMD RX 6600', vram: 8, bus: 128, baseScore: 16, aiType: 'FSR', defaultPrice: 1700, powerW: 132 },
  { id: 'rtx_3050', name: 'NVIDIA RTX 3050', vram: 8, bus: 128, baseScore: 15, aiType: 'NONE', defaultPrice: 825, powerW: 130 },
  { id: 'gtx_1660_ti', name: 'NVIDIA GTX 1660 Ti (Legacy)', vram: 6, bus: 192, baseScore: 10, aiType: 'NONE', defaultPrice: 500, powerW: 120 },
];

export const CPUS: CPU[] = [
  // High-End
  { id: 'ryzen_9_9950x3d', name: 'AMD Ryzen 9 9950X3D', score: 48, defaultPrice: 2700, powerW: 120 },
  { id: 'ryzen_7_9800x3d', name: 'AMD Ryzen 7 9800X3D', score: 46, defaultPrice: 1800, powerW: 120 },
  { id: 'core_ultra_9_285k', name: 'Intel Core Ultra 9 285K', score: 45, defaultPrice: 2120, powerW: 250 },
  { id: 'core_i9_14900k', name: 'Intel Core i9 14900K', score: 42, defaultPrice: 1800, powerW: 253 },
  { id: 'core_ultra_7_265k', name: 'Intel Core Ultra 7 265K', score: 38, defaultPrice: 1070, powerW: 250 },
  { id: 'core_i7_14700k', name: 'Intel Core i7 14700K', score: 36, defaultPrice: 1400, powerW: 253 },
  { id: 'ryzen_9_9900x', name: 'AMD Ryzen 9 9900X', score: 35, defaultPrice: 1600, powerW: 120 },
  { id: 'core_i7_13700k', name: 'Intel Core i7 13700K', score: 34, defaultPrice: 1300, powerW: 253 },
  
  // Mid-Range
  { id: 'ryzen_5_7600x3d', name: 'AMD Ryzen 5 7600X3D', score: 32, defaultPrice: 1300, powerW: 65 },
  { id: 'core_ultra_5_245k', name: 'Intel Core Ultra 5 245K', score: 30, defaultPrice: 660, powerW: 159 },
  { id: 'ryzen_7_9700x', name: 'AMD Ryzen 7 9700X', score: 30, defaultPrice: 1070, powerW: 65 },
  { id: 'core_i5_14600k', name: 'Intel Core i5 14600K', score: 28, defaultPrice: 1000, powerW: 181 },
  { id: 'ryzen_5_9600x', name: 'AMD Ryzen 5 9600X', score: 26, defaultPrice: 780, powerW: 65 },
  { id: 'ryzen_7_5800x3d', name: 'AMD Ryzen 7 5800X3D', score: 25, defaultPrice: 1000, powerW: 105 },
  { id: 'core_i5_14500', name: 'Intel Core i5 14500', score: 24, defaultPrice: 1000, powerW: 154 },
  { id: 'ryzen_5_7600', name: 'AMD Ryzen 5 7600', score: 24, defaultPrice: 670, powerW: 65 },
  { id: 'core_i5_12600k', name: 'Intel Core i5 12600K', score: 22, defaultPrice: 700, powerW: 150 },
  
  // Budget
  { id: 'core_i5_14400f', name: 'Intel Core i5 14400F', score: 20, defaultPrice: 670, powerW: 148 },
  { id: 'core_i5_12400f', name: 'Intel Core i5 12400F', score: 16, defaultPrice: 550, powerW: 117 },
  { id: 'ryzen_5_5600x', name: 'AMD Ryzen 5 5600X', score: 15, defaultPrice: 500, powerW: 65 },
  { id: 'core_i3_14100f', name: 'Intel Core i3 14100F', score: 12, defaultPrice: 400, powerW: 110 },
  { id: 'core_i3_12100f', name: 'Intel Core i3 12100F', score: 10, defaultPrice: 340, powerW: 89 },
];

export const MOTHERBOARDS: Motherboard[] = [
  { id: 'mb_high_end', name: 'High-End (Z890 / X870E)', defaultPrice: 1200 },
  { id: 'mb_mainstream', name: 'Mainstream (B760 / B650)', defaultPrice: 650 },
  { id: 'mb_budget', name: 'Budżetowa (H610 / B550)', defaultPrice: 350 },
];

export const RAMS: RAM[] = [
  { id: 'ram_ddr5_7200', name: '32GB DDR5 7200MHz', score: 8, defaultPrice: 600 },
  { id: 'ram_ddr5_6000', name: '32GB DDR5 6000MHz', score: 8, defaultPrice: 450 },
  { id: 'ram_ddr4_3600', name: '32GB DDR4 3600MHz', score: 3, defaultPrice: 300 },
  { id: 'ram_ddr4_3200', name: '16GB DDR4 3200MHz', score: 0, defaultPrice: 150 },
];

export const RECOMMENDED_BUILDS: RecommendedBuild[] = [
  {
    id: 'rec_s',
    name: 'S-Tier Ultimate 4K',
    tier: 'S',
    selectedGpu: 'rtx_5090',
    selectedCpu: 'ryzen_9_9950x3d',
    selectedMb: 'mb_high_end',
    selectedRam: 'ram_ddr5_7200'
  },
  {
    id: 'rec_a',
    name: 'A-Tier High-End 1440p',
    tier: 'A',
    selectedGpu: 'rtx_5080',
    selectedCpu: 'ryzen_7_9800x3d',
    selectedMb: 'mb_mainstream',
    selectedRam: 'ram_ddr5_6000'
  },
  {
    id: 'rec_b',
    name: 'B-Tier Sweet Spot 1440p',
    tier: 'B',
    selectedGpu: 'rtx_5070',
    selectedCpu: 'ryzen_5_7600x3d',
    selectedMb: 'mb_mainstream',
    selectedRam: 'ram_ddr5_6000'
  },
  {
    id: 'rec_c',
    name: 'C-Tier Budget 1080p',
    tier: 'C',
    selectedGpu: 'rtx_5060',
    selectedCpu: 'core_i5_14400f',
    selectedMb: 'mb_budget',
    selectedRam: 'ram_ddr4_3600'
  },
  {
    id: 'rec_d',
    name: 'D-Tier Entry Level',
    tier: 'D',
    selectedGpu: 'rx_7600',
    selectedCpu: 'core_i3_12100f',
    selectedMb: 'mb_budget',
    selectedRam: 'ram_ddr4_3200'
  }
];

