'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom fonts via Google Fonts loaded in layout
const formulas = [
  {
    id: 'gameplay',
    name: '玩法演示型',
    subtitle: 'GAMEPLAY DEMO',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" fillOpacity="0.2"/>
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    desc: '展示核心玩法，突出爽点',
    color: '#00F0FF',
    bgGradient: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    id: 'kol',
    name: 'KOL解说型',
    subtitle: 'KOL REVIEW',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" fill="currentColor" fillOpacity="0.2"/>
        <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10.5c0 2.5-2 4.5-4.5 4.5h-5C7 15 5 13 5 10.5"/>
        <path d="M8 15v4a4 4 0 0 0 8 0v-4"/>
      </svg>
    ),
    desc: '信任背书+专业推荐',
    color: '#FF006E',
    bgGradient: 'from-pink-500/20 to-rose-600/20',
  },
  {
    id: 'simulation',
    name: '真实模拟型',
    subtitle: 'REAL SIMULATION',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.2"/>
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    desc: '场景代入+痛点解决',
    color: '#FFBE0B',
    bgGradient: 'from-amber-500/20 to-orange-600/20',
  },
];

export default function Home() {
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
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
  }, []);

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
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative border-b border-white/10 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative w-12 h-12"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg rotate-3" />
              <div className="absolute inset-0 bg-[#0a0a0f] rounded-lg flex items-center justify-center text-xl font-black">
                <span className="bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent">CF</span>
              </div>
            </motion.div>
            <div>
              <h1 className="font-black text-xl tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  创意公式工坊
                </span>
              </h1>
              <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase">Creative Formula Studio</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              AI 引擎就绪
            </span>
            <span>by 红叶李</span>
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
                  className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.2em] text-white/60 uppercase"
                >
                  AI 买量视频脚本生成器
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  <span className="block text-white">选择你的</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    创意公式
                  </span>
                </h2>
                <p className="text-white/40 text-lg max-w-xl mx-auto">
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
                      className={`group relative p-8 rounded-2xl border text-left transition-all duration-500 ${
                        selectedFormula === formula.id
                          ? 'border-cyan-400/50 bg-gradient-to-br ' + formula.bgGradient + ' shadow-2xl shadow-cyan-500/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* Glow effect */}
                      <div 
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${formula.bgGradient} blur-xl -z-10`}
                      />
                      
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                        style={{ 
                          backgroundColor: `${formula.color}15`,
                          color: formula.color,
                          boxShadow: selectedFormula === formula.id ? `0 0 30px ${formula.color}30` : 'none'
                        }}
                      >
                        {formula.icon}
                      </div>

                      {/* Content */}
                      <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2 uppercase">
                        {formula.subtitle}
                      </div>
                      <h3 className="text-2xl font-black mb-3 text-white group-hover:text-white transition-colors">
                        {formula.name}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {formula.desc}
                      </p>

                      {/* Selection indicator */}
                      {selectedFormula === formula.id && (
                        <motion.div
                          layoutId="selection"
                          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: formula.color }}
                        >
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
                      className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                    >
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
                      <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent" />
                      <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-purple-400 to-transparent" />
                      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-purple-400 to-transparent" />
                      
                      <h3 className="text-2xl font-black mb-8 text-center">
                        <span className="text-white">填写</span>
                        <span className="text-cyan-400"> 项目信息</span>
                      </h3>

                      <div className="space-y-6">
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">游戏名称 *</label>
                            <input
                              type="text"
                              value={formData.gameName}
                              onChange={(e) => setFormData({...formData, gameName: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20"
                              placeholder="如：Lands of Jail"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">游戏类型 *</label>
                            <input
                              type="text"
                              value={formData.gameType}
                              onChange={(e) => setFormData({...formData, gameType: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20"
                              placeholder="如：策略/模拟"
                            />
                          </div>
                        </div>

                        {/* Core gameplay */}
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase tracking-wider">核心玩法 *</label>
                          <textarea
                            value={formData.coreGameplay}
                            onChange={(e) => setFormData({...formData, coreGameplay: e.target.value})}
                            className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20 h-24 resize-none"
                            placeholder="简要描述游戏的核心玩法，如：经营监狱、管理囚犯、扩建设施..."
                          />
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">目标用户 *</label>
                            <input
                              type="text"
                              value={formData.targetAudience}
                              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20"
                              placeholder="如：25-40岁男性玩家"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">投放平台 *</label>
                            <select
                              value={formData.platform}
                              onChange={(e) => setFormData({...formData, platform: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white"
                            >
                              <option value="抖音" className="bg-[#0a0a0f]">抖音</option>
                              <option value="快手" className="bg-[#0a0a0f]">快手</option>
                              <option value="微信视频号" className="bg-[#0a0a0f]">微信视频号</option>
                              <option value="TikTok" className="bg-[#0a0a0f]">TikTok</option>
                              <option value="YouTube" className="bg-[#0a0a0f]">YouTube</option>
                            </select>
                          </div>
                        </div>

                        {/* Duration slider */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-xs text-white/40 uppercase tracking-wider">视频时长</label>
                            <span className="text-cyan-400 font-black text-lg">{formData.duration}秒</span>
                          </div>
                          <div className="relative">
                            <input
                              type="range"
                              min="15"
                              max="60"
                              step="5"
                              value={formData.duration}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-400/50"
                            />
                            <div className="flex justify-between text-[10px] text-white/30 mt-2">
                              <span>15s</span>
                              <span>30s</span>
                              <span>45s</span>
                              <span>60s</span>
                            </div>
                          </div>
                        </div>

                        {/* Optional fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">核心卖点（可选）</label>
                            <input
                              type="text"
                              value={formData.sellingPoint}
                              onChange={(e) => setFormData({...formData, sellingPoint: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20"
                              placeholder="如：零氪也能玩..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-wider">用户痛点（可选）</label>
                            <input
                              type="text"
                              value={formData.painPoint}
                              onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400/50 focus:outline-none transition-all duration-300 text-white placeholder:text-white/20"
                              placeholder="如：肝度太高..."
                            />
                          </div>
                        </div>

                        {/* Generate Button */}
                        <motion.button
                          onClick={handleGenerate}
                          disabled={loading || !formData.gameName || !formData.gameType || !formData.coreGameplay || !formData.targetAudience}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-8 py-5 rounded-xl font-black text-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                          style={{
                            background: selectedFormulaData 
                              ? `linear-gradient(135deg, ${selectedFormulaData.color}40, ${selectedFormulaData.color}20)`
                              : 'linear-gradient(135deg, rgba(0,240,255,0.4), rgba(0,240,255,0.2))',
                            border: `1px solid ${selectedFormulaData?.color || '#00F0FF'}50`,
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
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${selectedFormulaData?.color}20`,
                        color: selectedFormulaData?.color 
                      }}
                    >
                      {selectedFormulaData?.icon}
                    </div>
                    <div>
                      <h2 className="font-black text-xl">生成的脚本</h2>
                      <p className="text-xs text-white/40">{selectedFormulaData?.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigator.clipboard.writeText(result)}
                      className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
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
                      className="px-5 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm font-medium"
                    >
                      重新生成
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-white/80 leading-relaxed font-sans text-sm">
                      {result}
                    </pre>
                  </div>
                </div>

                {/* Footer decoration */}
                <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-white/30 text-sm">
            Creative Formula Studio · Powered by 火山方舟 · Made by 红叶李
          </p>
        </div>
      </footer>
    </main>
  );
}
