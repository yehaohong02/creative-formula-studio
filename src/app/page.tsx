'use client';

import { useState } from 'react';

const formulas = [
  {
    id: 'gameplay',
    name: '玩法演示型',
    icon: '🎮',
    desc: '展示核心玩法，突出爽点',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'kol',
    name: 'KOL解说型',
    icon: '🎤',
    desc: '信任背书+专业推荐',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'simulation',
    name: '真实模拟型',
    icon: '🎬',
    desc: '场景代入+痛点解决',
    color: 'from-orange-500 to-red-500',
  },
];

export default function Home() {
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
              🎨
            </div>
            <div>
              <h1 className="font-bold text-lg">创意公式工坊</h1>
              <p className="text-xs text-slate-400">AI买量视频脚本生成器</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            by 红叶李
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!result ? (
          <>
            {/* Formula Selection */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-center">
                选择<span className="text-blue-400">创意公式</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {formulas.map((formula) => (
                  <button
                    key={formula.id}
                    onClick={() => setSelectedFormula(formula.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedFormula === formula.id
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${formula.color} flex items-center justify-center text-3xl mb-4`}>
                      {formula.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{formula.name}</h3>
                    <p className="text-slate-400 text-sm">{formula.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Project Info Form */}
            {selectedFormula && (
              <section className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-6 text-center">
                  填写<span className="text-purple-400">项目信息</span>
                </h2>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">游戏名称 *</label>
                      <input
                        type="text"
                        value={formData.gameName}
                        onChange={(e) => setFormData({...formData, gameName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="如：Lands of Jail"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">游戏类型 *</label>
                      <input
                        type="text"
                        value={formData.gameType}
                        onChange={(e) => setFormData({...formData, gameType: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="如：策略/模拟"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">核心玩法 *</label>
                    <textarea
                      value={formData.coreGameplay}
                      onChange={(e) => setFormData({...formData, coreGameplay: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors h-20 resize-none"
                      placeholder="简要描述游戏的核心玩法，如：经营监狱、管理囚犯、扩建设施..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">目标用户 *</label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="如：25-40岁男性玩家"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">投放平台 *</label>
                      <select
                        value={formData.platform}
                        onChange={(e) => setFormData({...formData, platform: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
                    <label className="block text-sm text-slate-400 mb-2">视频时长: {formData.duration}秒</label>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>15秒</span>
                      <span>60秒</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">核心卖点</label>
                    <input
                      type="text"
                      value={formData.sellingPoint}
                      onChange={(e) => setFormData({...formData, sellingPoint: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="如：零氪也能玩、开局送SSR、真实物理引擎..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">用户痛点</label>
                    <input
                      type="text"
                      value={formData.painPoint}
                      onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="如：肝度太高、氪金严重、操作复杂..."
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading || !formData.gameName || !formData.gameType || !formData.coreGameplay || !formData.targetAudience}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        AI 生成中...
                      </>
                    ) : (
                      <>
                        ✨ 生成脚本
                      </>
                    )}
                  </button>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Result Display */
          <section className="max-w-3xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h2 className="font-bold text-lg">📋 生成的脚本</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                  >
                    复制
                  </button>
                  <button
                    onClick={() => {
                      setResult(null);
                      setSelectedFormula(null);
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition-colors"
                  >
                    重新生成
                  </button>
                </div>
              </div>
              <div className="p-6">
                <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans">
                  {result}
                </pre>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
