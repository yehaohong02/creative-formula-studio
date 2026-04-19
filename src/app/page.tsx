'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formulas = [
  {
    id: 'gameplay',
    name: '玩法演示型',
    subtitle: 'GAMEPLAY DEMO',
    desc: '展示核心玩法，突出爽点',
    color: '#00F0FF',
    lightColor: '#0066FF',
  },
  {
    id: 'kol',
    name: 'KOL解说型',
    subtitle: 'KOL REVIEW',
    desc: '信任背书+专业推荐',
    color: '#FF006E',
    lightColor: '#E11D48',
  },
  {
    id: 'simulation',
    name: '真实模拟型',
    subtitle: 'REAL SIMULATION',
    desc: '场景代入+痛点解决',
    color: '#FFBE0B',
    lightColor: '#D97706',
  },
];

// Theme toggle icons
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
    // Check system preference
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
  const currentColor = isDark ? selectedFormulaData?.color : selectedFormulaData?.lightColor;

  if (!mounted) return null;

  return (
    <main className="min-h-screen transition-colors duration-500">
      {/* Animated background grid */}
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
                <span className="gradient-text">CF</span>
              </div>
            </motion.div>
            <div>
              <h1 className="font-black text-xl tracking-tight">
                <span className="gradient-text">创意公式工坊</span>
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                Creative Formula Studio
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
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
            
            <div className="hidden md:flex items-center gap-6 text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                AI 引擎就绪
              </span>
              <span>by 红叶李</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <motion.section 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'
                  }}
                >
                  AI 买量视频脚本生成器
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="block" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>选择你的</span>
                  <span className="block gradient-text">创意公式</span>
                </h2>
                <p className="text-lg max-w-xl mx-auto" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
                  基于火山方舟大模型，一键生成爆款短视频脚本
                </p>
              </motion.section>

              {/* Formula Cards */}
              <section className="mb-16">
                <div className="grid md:grid-cols-3 gap-6">
                  {formulas.map((formula, index) => (
                    <motion.button
                      key={formula.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      onClick={() => setSelectedFormula(formula.id)}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative p-8 rounded-2xl border text-left transition-all duration-500"
                      style={{
                        backgroundColor: selectedFormula === formula.id 
                          ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)')
                          : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)'),
                        borderColor: selectedFormula === formula.id 
                          ? (isDark ? `${formula.color}50` : `${formula.lightColor}50`)
                          : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                        boxShadow: selectedFormula === formula.id 
                          ? `0 20px 40px ${isDark ? formula.color + '15' : formula.lightColor + '15'}`
                          : 'none'
                      }}
                    >
                      {/* Glow effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                        style={{ background: isDark ? formula.color : formula.lightColor, opacity: 0.1 }}
                      />
                      
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                        style={{ 
                          backgroundColor: isDark ? `${formula.color}15` : `${formula.lightColor}15`,
                          color: isDark ? formula.color : formula.lightColor,
                          boxShadow: selectedFormula === formula.id 
                            ? `0 0 30px ${isDark ? formula.color + '30' : formula.lightColor + '30'}`
                            : 'none'
                        }}
                      >
                        <FormulaIcon type={formula.id} />
                      </div>

                      {/* Content */}
                      <div className="text-[10px] tracking-[0.2em] mb-2 uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                        {formula.subtitle}
                      </div>
                      <h3 className="text-2xl font-black mb-3 transition-colors" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>
                        {formula.name}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.6)' }}>
                        {formula.desc}
                      </p>

                      {/* Selection indicator */}
                      {selectedFormula === formula.id && (
                        <motion.div
                          layoutId="selection"
                          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: isDark ? formula.color : formula.lightColor }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </section>

              {/* Project Info Form */}
              <AnimatePresence>
                {selectedFormula && (
                  <motion.section
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative p-8 rounded-3xl border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      }}
                    >
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-16 h-px" style={{ background: isDark ? 'linear-gradient(to right, #00F0FF, transparent)' : 'linear-gradient(to right, #0066FF, transparent)' }} />
                      <div className="absolute top-0 left-0 w-px h-16" style={{ background: isDark ? 'linear-gradient(to bottom, #00F0FF, transparent)' : 'linear-gradient(to bottom, #0066FF, transparent)' }} />
                      <div className="absolute top-0 right-0 w-16 h-px" style={{ background: isDark ? 'linear-gradient(to left, #A855F7, transparent)' : 'linear-gradient(to left, #7C3AED, transparent)' }} />
                      <div className="absolute top-0 right-0 w-px h-16" style={{ background: isDark ? 'linear-gradient(to bottom, #A855F7, transparent)' : 'linear-gradient(to bottom, #7C3AED, transparent)' }} />
                      
                      <h3 className="text-2xl font-black mb-8 text-center">
                        <span style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>填写</span>
                        <span className="gradient-text"> 项目信息</span>
                      </h3>

                      <div className="space-y-6">
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput
                            label="游戏名称 *"
                            value={formData.gameName}
                            onChange={(v) => setFormData({...formData, gameName: v})}
                            placeholder="如：Lands of Jail"
                            isDark={isDark}
                          />
                          <FormInput
                            label="游戏类型 *"
                            value={formData.gameType}
                            onChange={(v) => setFormData({...formData, gameType: v})}
                            placeholder="如：策略/模拟"
                            isDark={isDark}
                          />
                        </div>

                        {/* Core gameplay */}
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>核心玩法 *</label>
                          <textarea
                            value={formData.coreGameplay}
                            onChange={(e) => setFormData({...formData, coreGameplay: e.target.value})}
                            className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-300 h-24 resize-none"
                            style={{
                              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                              color: isDark ? '#ffffff' : '#1a1a2e'
                            }}
                            placeholder="简要描述游戏的核心玩法，如：经营监狱、管理囚犯、扩建设施..."
                          />
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput
                            label="目标用户 *"
                            value={formData.targetAudience}
                            onChange={(v) => setFormData({...formData, targetAudience: v})}
                            placeholder="如：25-40岁男性玩家"
                            isDark={isDark}
                          />
                          <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>投放平台 *</label>
                            <select
                              value={formData.platform}
                              onChange={(e) => setFormData({...formData, platform: e.target.value})}
                              className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-300"
                              style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                color: isDark ? '#ffffff' : '#1a1a2e'
                              }}
                            >
                              <option value="抖音" style={{ backgroundColor: isDark ? '#0a0a0f' : '#ffffff' }}>抖音</option>
                              <option value="快手" style={{ backgroundColor: isDark ? '#0a0a0f' : '#ffffff' }}>快手</option>
                              <option value="微信视频号" style={{ backgroundColor: isDark ? '#0a0a0f' : '#ffffff' }}>微信视频号</option>
                              <option value="TikTok" style={{ backgroundColor: isDark ? '#0a0a0f' : '#ffffff' }}>TikTok</option>
                              <option value="YouTube" style={{ backgroundColor: isDark ? '#0a0a0f' : '#ffffff' }}>YouTube</option>
                            </select>
                          </div>
                        </div>

                        {/* Duration slider */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>视频时长</label>
                            <span className="font-black text-lg" style={{ color: isDark ? '#00F0FF' : '#0066FF' }}>{formData.duration}秒</span>
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
                          <div className="flex justify-between text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
                            <span>15s</span>
                            <span>30s</span>
                            <span>45s</span>
                            <span>60s</span>
                          </div>
                        </div>

                        {/* Optional fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput
                            label="核心卖点（可选）"
                            value={formData.sellingPoint}
                            onChange={(v) => setFormData({...formData, sellingPoint: v})}
                            placeholder="如：零氪也能玩..."
                            isDark={isDark}
                          />
                          <FormInput
                            label="用户痛点（可选）"
                            value={formData.painPoint}
                            onChange={(v) => setFormData({...formData, painPoint: v})}
                            placeholder="如：肝度太高..."
                            isDark={isDark}
                          />
                        </div>

                        {/* Generate Button */}
                        <motion.button
                          onClick={handleGenerate}
                          disabled={loading || !formData.gameName || !formData.gameType || !formData.coreGameplay || !formData.targetAudience}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-8 py-5 rounded-xl font-black text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                          style={{
                            background: currentColor 
                              ? `linear-gradient(135deg, ${currentColor}40, ${currentColor}20)`
                              : (isDark ? 'linear-gradient(135deg, rgba(0,240,255,0.4), rgba(0,240,255,0.2))' : 'linear-gradient(135deg, rgba(0,100,255,0.4), rgba(0,100,255,0.2))'),
                            border: `1px solid ${currentColor ? currentColor + '50' : (isDark ? '#00F0FF50' : '#0066FF50')}`,
                            color: isDark ? '#ffffff' : '#1a1a2e'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          {loading ? (
                            <span className="flex items-center justify-center gap-3">
                              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              AI 生成中...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              生成脚本
                            </span>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Result Display */
            <motion.section
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="relative rounded-3xl border overflow-hidden"
                style={{ 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
              >
                {/* Header */}
                <div 
                  className="p-6 border-b flex items-center justify-between"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: isDark ? `${currentColor}20` : `${currentColor}15`,
                        color: currentColor
                      }}
                    >
                      {selectedFormula && <FormulaIcon type={selectedFormula} />}
                    </div>
                    <div>
                      <h2 className="font-black text-xl" style={{ color: isDark ? '#ffffff' : '#1a1a2e' }}>生成的脚本</h2>
                      <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>{selectedFormulaData?.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
                      }}
                    >
                      复制
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setResult(null);
                        setSelectedFormula(null);
                      }}
                      className="px-5 py-2.5 rounded-lg transition-colors text-sm font-medium"
                      style={{ 
                        backgroundColor: isDark ? 'rgba(0,240,255,0.1)' : 'rgba(0,100,255,0.1)',
                        border: `1px solid ${isDark ? 'rgba(0,240,255,0.3)' : 'rgba(0,100,255,0.3)'}`,
                        color: isDark ? '#00F0FF' : '#0066FF'
                      }}
                    >
                      重新生成
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <pre 
                    className="whitespace-pre-wrap leading-relaxed font-sans text-sm"
                    style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}
                  >
                    {result}
                  </pre>
                </div>

                {/* Footer decoration */}
                <div 
                  className="h-1"
                  style={{ 
                    background: isDark 
                      ? 'linear-gradient(to right, #00F0FF, #A855F7, #EC4899)' 
                      : 'linear-gradient(to right, #0066FF, #7C3AED, #DB2777)' 
                  }} 
                />
              </div>
            </motion.section>
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
            Creative Formula Studio · Powered by 火山方舟 · Made by 红叶李
          </p>
        </div>
      </footer>
    </main>
  );
}

// Form Input Component
function FormInput({ label, value, onChange, placeholder, isDark }: { 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder: string;
  isDark: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)' }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl focus:outline-none transition-all duration-300"
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

// Formula Icon Component
function FormulaIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    gameplay: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.2"/>
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    kol: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10.5c0 2.5-2 4.5-4.5 4.5h-5C7 15 5 13 5 10.5"/>
        <path d="M8 15v4a4 4 0 0 0 8 0v-4"/>
      </svg>
    ),
    simulation: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.2"/>
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  };
  
  return icons[type] || null;
}
