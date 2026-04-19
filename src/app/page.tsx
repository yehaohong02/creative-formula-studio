'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 7大公式数据
const formulas = [
  {
    id: 'formula1',
    name: '末世生存+建造经营',
    subtitle: '热门榜爆款公式',
    icon: '🔥',
    color: '#FF6B35',
    case: {
      game: 'Whiteout Survival',
      popularity: '18万/周',
      duration: '1分7秒',
      days: '19天'
    },
    structure: [
      { time: '0-3秒', content: '末世场景冲击（废墟/冰雪/火光）', type: '黄金3秒' },
      { time: '3-15秒', content: '基地建造过程（加速+音效）', type: '核心玩法' },
      { time: '15-30秒', content: '成长强化展示（成就）', type: '情绪爆点' },
      { time: '30秒+', content: '"建立你的避难所"', type: 'CTA' }
    ],
    tags: ['建造经营/模拟', '成就进步', '末世题材'],
    applyTo: '策略类、模拟经营类、生存类游戏',
    tip: '重点展示建造过程的爽快感，用加速剪辑提升节奏'
  },
  {
    id: 'formula2',
    name: '真人剧情+游戏混剪',
    subtitle: '热门榜爆款公式',
    icon: '🎬',
    color: '#00D9FF',
    case: {
      game: 'Dark War:Survival',
      popularity: '13万/周',
      duration: '34秒',
      days: '10天'
    },
    structure: [
      { time: '0-3秒', content: '真人困境（被嘲笑/失败/危机）', type: '黄金3秒' },
      { time: '3-15秒', content: '游戏高光时刻（反杀/胜利）', type: '核心玩法' },
      { time: '情绪爆点', content: '真人表情惊喜+游戏特效叠加', type: '情绪共鸣' },
      { time: '结尾', content: '"点击下载，开启你的传奇"', type: 'CTA' }
    ],
    tags: ['真人', '剧情叙事', '混合'],
    applyTo: '中重度游戏、动作类、策略类',
    tip: '真人与游戏的切换要流畅，情绪转折要自然'
  },
  {
    id: 'formula3',
    name: '解压治愈+放松逃离',
    subtitle: '热门榜爆款公式',
    icon: '🌿',
    color: '#7ED321',
    case: {
      game: 'Big Farm Homestead',
      popularity: '15万/周',
      duration: '59秒',
      days: '28天'
    },
    structure: [
      { time: '0-3秒', content: '生活压力场景（工作/噪音/焦虑）', type: '黄金3秒' },
      { time: '3-15秒', content: '游戏治愈画面（农场/动物/自然）', type: '核心玩法' },
      { time: '情绪爆点', content: '收获/装饰/萌宠互动', type: '情绪共鸣' },
      { time: '结尾', content: '"来放松一下吧，远离压力"', type: 'CTA' }
    ],
    tags: ['解压治愈', '放松逃离', '建造经营'],
    applyTo: '模拟经营类、休闲类、治愈系游戏',
    tip: '突出"逃离现实压力"的情绪价值，节奏要舒缓'
  },
  {
    id: 'formula4',
    name: '突发事件+快速响应',
    subtitle: '飙升榜增长公式',
    icon: '⚡',
    color: '#FFD700',
    case: {
      game: '待监控',
      popularity: '-',
      duration: '30-60秒',
      days: '7-14天'
    },
    structure: [
      { time: '0-3秒', content: '紧急事件（敌人入侵/灾难发生）', type: '黄金3秒' },
      { time: '15秒', content: '快速应对策略（调兵/建造/升级）', type: '核心玩法' },
      { time: '情绪爆点', content: '成功防御/反击胜利', type: '情绪共鸣' },
      { time: '结尾', content: '"你能应对这个挑战吗？"', type: 'CTA' }
    ],
    tags: ['技巧挑战', '逆境反击', '突发事件'],
    applyTo: '策略类、塔防类、SLG游戏',
    tip: '适合新活动上线、版本更新时快速起量',
    note: '本周暂无数据，建议监控竞品版本更新'
  },
  {
    id: 'formula5',
    name: '真人出镜+技巧展示',
    subtitle: '新创意榜霸榜公式',
    icon: '🎯',
    color: '#FF006E',
    case: {
      game: 'Mobile Legends',
      popularity: '8-13万/周',
      duration: '24秒',
      days: '4-7天'
    },
    structure: [
      { time: '0-3秒', content: '真人展示（主播/玩家出镜）', type: '黄金3秒' },
      { time: '15秒', content: '游戏技巧演示（连招/走位/意识）', type: '核心玩法' },
      { time: '情绪爆点', content: '精彩击杀/团战胜利', type: '情绪共鸣' },
      { time: '结尾', content: '"学了这个技巧，你也能上分"', type: 'CTA' }
    ],
    tags: ['真人', '技巧挑战', '真实专业'],
    applyTo: 'MOBA、FPS、动作类、竞技游戏',
    tip: '真人出镜增加信任感，技巧展示要有可操作性'
  },
  {
    id: 'formula6',
    name: '新角色/新玩法首发',
    subtitle: '新创意榜测试公式',
    icon: '🆕',
    color: '#9B59B6',
    case: {
      game: 'MONOPOLY GO!',
      popularity: '11万/周',
      duration: '1分24秒',
      days: '6-8天'
    },
    structure: [
      { time: '0-3秒', content: '新角色亮相/新玩法预告', type: '黄金3秒' },
      { time: '15秒', content: '技能展示/玩法教程', type: '核心玩法' },
      { time: '情绪爆点', content: '实战效果/玩家反应', type: '情绪共鸣' },
      { time: '结尾', content: '"全新内容，立即体验"', type: 'CTA' }
    ],
    tags: ['剧情叙事', '沉浸剧情', '探索好奇'],
    applyTo: '有IP联动、新角色、新玩法更新时',
    tip: '适合版本更新、节日活动、IP联动期间投放'
  },
  {
    id: 'formula7',
    name: '短平快+高频测试',
    subtitle: '新创意榜测试公式',
    icon: '⚡',
    color: '#FFBE0B',
    case: {
      game: 'Hexa Diamonds',
      popularity: '13万/周',
      duration: '30秒',
      days: '4-5天'
    },
    structure: [
      { time: '0-3秒', content: '核心玩法展示', type: '黄金3秒' },
      { time: '10秒', content: '快节奏剪辑（3-5个场景切换）', type: '核心玩法' },
      { time: '情绪爆点', content: '爽点集中爆发', type: '情绪共鸣' },
      { time: '结尾', content: '简单直接"点击下载"', type: 'CTA' }
    ],
    tags: ['玩法', '休闲治愈', '快节奏'],
    applyTo: '超休闲游戏、轻度游戏、休闲益智类',
    tip: '节奏要快，3-5秒内必须出现第一个爽点'
  }
];

// 榜单对比数据
const chartComparison = [
  { name: '每周热门榜', period: '30-100天', formula: '深度内容+长期优化', duration: '60秒+', tags: '成就进步、解压治愈' },
  { name: '每周飙升榜', period: '7-14天', formula: '热点事件+快速响应', duration: '30-60秒', tags: '技巧挑战、逆境反击' },
  { name: '新创意榜', period: '4-8天', formula: '创新测试+快速迭代', duration: '15-40秒', tags: '真人、技巧挑战、探索好奇' }
];

// 主题切换图标
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="5" />
    <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export default function Home() {
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<'formulas' | 'comparison' | 'cases'>('formulas');
  
  const [formData, setFormData] = useState({
    gameName: '',
    gameType: '',
    coreGameplay: '',
    targetAudience: '',
    duration: '30',
    platform: '抖音',
    sellingPoint: '',
    painPoint: '',
  });

  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const handleGenerate = async () => {
    if (!selectedFormula) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formulaType: selectedFormula,
          projectInfo: formData,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      } else {
        alert('生成失败：' + data.error);
      }
    } catch (error) {
      alert('请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const selectedFormulaData = formulas.find(f => f.id === selectedFormula);

  if (!mounted) return null;

  return (
    <main className="min-h-screen transition-colors duration-500">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none grid-bg opacity-50" />
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]' : 'bg-gradient-to-b from-transparent via-[#f8f9fa]/50 to-[#f8f9fa]'}`} />

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-b sticky top-0 z-50 backdrop-blur-md"
        style={{ 
          backgroundColor: isDark ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative w-12 h-12"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 rounded-lg rotate-3" style={{ background: isDark ? 'linear-gradient(to bottom right, #00F0FF, #A855F7)' : 'linear-gradient(to bottom right, #0066FF, #7C3AED)' }} />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center text-xl font-black" style={{ backgroundColor: isDark ? '#0a0a0f' : '#f8f9fa' }}>
                <span className="gradient-text">7F</span>
              </div>
            </motion.div>
            <div>
              <h1 className="font-black text-xl tracking-tight">
                <span className="gradient-text">创意公式工坊</span>
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                7大爆款公式 · 基于广大大数据
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-2 mr-4">
              {[
                { id: 'formulas', label: '7大公式' },
                { id: 'comparison', label: '榜单对比' },
                { id: 'cases', label: '实战案例' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'hover:bg-white/5'
                  }`}
                  style={{ color: activeTab === tab.id ? undefined : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)') }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl transition-all duration-300"
              style={{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Formulas Tab */}
          {activeTab === 'formulas' && (
            <motion.div
              key="formulas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <motion.section className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                  }}
                >
                  基于 2026-04-20 广大大榜单数据
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                  <span className="block" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>7大</span>
                  <span className="block gradient-text">爆款创意公式</span>
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
                  每周热门榜 · 每周飙升榜 · 新创意榜<br/>
                  覆盖策略/模拟类游戏完整投放周期
                </p>
              </motion.section>

              {/* Formula Cards Grid */}
              <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {formulas.map((formula, index) => (
                  <motion.div
                    key={formula.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                    onClick={() => setSelectedFormula(formula.id)}
                    className={`group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedFormula === formula.id
                        ? 'ring-2'
                        : 'hover:scale-[1.02]'
                    }`}
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                      borderColor: selectedFormula === formula.id ? formula.color : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                      boxShadow: selectedFormula === formula.id ? `0 0 30px ${formula.color}20` : 'none'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ 
                          backgroundColor: `${formula.color}20`,
                          border: `1px solid ${formula.color}40`
                        }}
                      >
                        {formula.icon}
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${formula.color}15`,
                          color: formula.color
                        }}
                      >
                        {formula.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black mb-2" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                      {formula.name}
                    </h3>

                    {/* Case Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>代表案例</span>
                        <span className="font-medium" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>{formula.case.game}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>人气值</span>
                        <span className="font-bold" style={{ color: formula.color }}>{formula.case.popularity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>素材时长</span>
                        <span style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>{formula.case.duration}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {formula.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Selection Indicator */}
                    {selectedFormula === formula.id && (
                      <motion.div
                        layoutId="selection"
                        className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: formula.color }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </section>

              {/* Selected Formula Detail */}
              <AnimatePresence>
                {selectedFormula && selectedFormulaData && (
                  <motion.section
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                  >
                    <div 
                      className="rounded-3xl border p-8"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)',
                        borderColor: selectedFormulaData.color + '40'
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ 
                            backgroundColor: `${selectedFormulaData.color}20`,
                            border: `2px solid ${selectedFormulaData.color}`
                          }}
                        >
                          {selectedFormulaData.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                            {selectedFormulaData.name}
                          </h3>
                          <p style={{ color: selectedFormulaData.color }}>{selectedFormulaData.subtitle}</p>
                        </div>
                      </div>

                      {/* Structure Timeline */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold mb-4" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                          公式结构拆解
                        </h4>
                        <div className="space-y-4">
                          {selectedFormulaData.structure.map((step, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <div 
                                className="w-20 text-sm font-bold text-right pt-1"
                                style={{ color: selectedFormulaData.color }}
                              >
                                {step.time}
                              </div>
                              <div className="flex-1">
                                <span 
                                  className="inline-block px-2 py-0.5 rounded text-xs mb-1"
                                  style={{ 
                                    backgroundColor: `${selectedFormulaData.color}20`,
                                    color: selectedFormulaData.color
                                  }}
                                >
                                  {step.type}
                                </span>
                                <p style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}>
                                  {step.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Apply To & Tip */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div 
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                        >
                          <h5 className="font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                            适用游戏类型
                          </h5>
                          <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                            {selectedFormulaData.applyTo}
                          </p>
                        </div>
                        <div 
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${selectedFormulaData.color}10` }}
                        >
                          <h5 className="font-bold mb-2" style={{ color: selectedFormulaData.color }}>
                            制作要点
                          </h5>
                          <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}>
                            {selectedFormulaData.tip}
                          </p>
                          {selectedFormulaData.note && (
                            <p className="text-xs mt-2" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                              {selectedFormulaData.note}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Generate Button */}
                      <motion.button
                        onClick={() => setActiveTab('cases')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-8 py-4 rounded-xl font-black text-lg transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${selectedFormulaData.color}40, ${selectedFormulaData.color}20)`,
                          border: `1px solid ${selectedFormulaData.color}60`,
                          color: isDark ? '#ffffff' : '#1a1a2e'
                        }}
                      >
                        使用此公式生成脚本 →
                      </motion.button>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-black text-center mb-8" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                三榜对比分析
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                      <th className="text-left py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>榜单类型</th>
                      <th className="text-left py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>投放周期</th>
                      <th className="text-left py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>核心公式</th>
                      <th className="text-left py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>素材时长</th>
                      <th className="text-left py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>关键标签</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartComparison.map((row, i) => (
                      <tr 
                        key={i} 
                        style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                      >
                        <td className="py-4 px-4 font-bold" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>{row.name}</td>
                        <td className="py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{row.period}</td>
                        <td className="py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{row.formula}</td>
                        <td className="py-4 px-4" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>{row.duration}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {row.tags.split('、').map((tag, j) => (
                              <span 
                                key={j}
                                className="text-xs px-2 py-0.5 rounded"
                                style={{ 
                                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                  color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Strategy Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  { title: '长期优化', desc: '每周热门榜素材投放30-100天，需要持续优化迭代', icon: '📈', color: '#7ED321' },
                  { title: '快速响应', desc: '飙升榜素材7-14天，抓住热点事件快速起量', icon: '⚡', color: '#FFD700' },
                  { title: '高频测试', desc: '新创意榜4-8天快速测试，验证创意方向', icon: '🧪', color: '#FF006E' }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}
                  >
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: card.color }}>{card.title}</h3>
                    <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Cases Tab - Script Generator */}
          {activeTab === 'cases' && (
            <motion.div
              key="cases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {!result ? (
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-black text-center mb-8" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                    使用公式生成脚本
                  </h2>
                  
                  {/* Selected Formula Display */}
                  {selectedFormulaData && (
                    <div 
                      className="p-4 rounded-xl mb-8 flex items-center justify-between"
                      style={{ 
                        backgroundColor: `${selectedFormulaData.color}15`,
                        border: `1px solid ${selectedFormulaData.color}40`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedFormulaData.icon}</span>
                        <div>
                          <p className="font-bold" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>{selectedFormulaData.name}</p>
                          <p className="text-xs" style={{ color: selectedFormulaData.color }}>{selectedFormulaData.subtitle}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('formulas')}
                        className="text-sm px-3 py-1 rounded-lg hover:opacity-80"
                        style={{ color: selectedFormulaData.color }}
                      >
                        更换公式 →
                      </button>
                    </div>
                  )}

                  {/* Form */}
                  <div 
                    className="p-8 rounded-3xl border"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput label="游戏名称 *" value={formData.gameName} onChange={v => setFormData({...formData, gameName: v})} placeholder="如：Lands of Jail" isDark={isDark} />
                        <FormInput label="游戏类型 *" value={formData.gameType} onChange={v => setFormData({...formData, gameType: v})} placeholder="如：策略/模拟" isDark={isDark} />
                      </div>
                      
                      <FormTextArea label="核心玩法 *" value={formData.coreGameplay} onChange={v => setFormData({...formData, coreGameplay: v})} placeholder="简要描述游戏的核心玩法，如：经营监狱、管理囚犯、扩建设施..." isDark={isDark} />
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput label="目标用户 *" value={formData.targetAudience} onChange={v => setFormData({...formData, targetAudience: v})} placeholder="如：25-40岁男性玩家" isDark={isDark} />
                        <div>
                          <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>投放平台 *</label>
                          <select
                            value={formData.platform}
                            onChange={(e) => setFormData({...formData, platform: e.target.value})}
                            className="w-full px-4 py-3.5 rounded-xl focus:outline-none"
                            style={{
                              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                              color: isDark ? '#ffffff' : '#1a1a2e'
                            }}
                          >
                            <option value="抖音">抖音</option>
                            <option value="快手">快手</option>
                            <option value="微信视频号">微信视频号</option>
                            <option value="TikTok">TikTok</option>
                            <option value="YouTube">YouTube</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>视频时长</label>
                          <span className="font-bold" style={{ color: selectedFormulaData?.color || '#00F0FF' }}>{formData.duration}秒</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="60"
                          step="5"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput label="核心卖点（可选）" value={formData.sellingPoint} onChange={v => setFormData({...formData, sellingPoint: v})} placeholder="如：零氪也能玩..." isDark={isDark} />
                        <FormInput label="用户痛点（可选）" value={formData.painPoint} onChange={v => setFormData({...formData, painPoint: v})} placeholder="如：肝度太高..." isDark={isDark} />
                      </div>

                      <motion.button
                        onClick={handleGenerate}
                        disabled={loading || !formData.gameName || !formData.gameType || !formData.coreGameplay || !formData.targetAudience || !selectedFormula}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-black text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        style={{
                          background: selectedFormulaData 
                            ? `linear-gradient(135deg, ${selectedFormulaData.color}40, ${selectedFormulaData.color}20)`
                            : 'linear-gradient(135deg, rgba(0,240,255,0.4), rgba(0,240,255,0.2))',
                          border: `1px solid ${selectedFormulaData ? selectedFormulaData.color + '60' : 'rgba(0,240,255,0.6)'}`,
                          color: isDark ? '#ffffff' : '#1a1a2e'
                        }}
                      >
                        {loading ? 'AI 生成中...' : '生成脚本'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-4xl mx-auto"
                >
                  <div 
                    className="rounded-3xl border overflow-hidden"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }}
                  >
                    <div 
                      className="p-6 border-b flex items-center justify-between"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {selectedFormulaData && (
                          <>
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                              style={{ backgroundColor: `${selectedFormulaData.color}20`, color: selectedFormulaData.color }}
                            >
                              {selectedFormulaData.icon}
                            </div>
                            <div>
                              <h2 className="font-bold" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>生成的脚本</h2>
                              <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>{selectedFormulaData.name}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigator.clipboard.writeText(result)}
                          className="px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                          style={{ 
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                          }}
                        >
                          复制
                        </button>
                        <button
                          onClick={() => {
                            setResult(null);
                            setActiveTab('formulas');
                          }}
                          className="px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                          style={{ 
                            backgroundColor: isDark ? 'rgba(0,240,255,0.1)' : 'rgba(0,100,255,0.1)',
                            border: `1px solid ${isDark ? 'rgba(0,240,255,0.3)' : 'rgba(0,100,255,0.3)'}`,
                            color: isDark ? '#00F0FF' : '#0066FF'
                          }}
                        >
                          重新生成
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <pre 
                        className="whitespace-pre-wrap leading-relaxed font-sans text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' }}
                      >
                        {result}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer 
        className="relative mt-20 border-t"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)' }}>
            创意公式工坊 · 基于广大大 2026-04-20 榜单数据 · Made by 红叶李
          </p>
        </div>
      </footer>
    </main>
  );
}

// Form Components
function FormInput({ label, value, onChange, placeholder, isDark }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; isDark: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          color: isDark ? '#ffffff' : '#1a1a2e'
        }}
        placeholder={placeholder}
      />
    </div>
  );
}

function FormTextArea({ label, value, onChange, placeholder, isDark }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; isDark: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all h-24 resize-none"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          color: isDark ? '#ffffff' : '#1a1a2e'
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
