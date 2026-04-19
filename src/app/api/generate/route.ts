import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formulaType, projectInfo } = body;

    if (!formulaType || !projectInfo) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 临时硬编码测试，后续改用环境变量
    const ARK_API_KEY = '4a08d76d-61f1-45ab-ba29-c0a601f9147d';
    const ARK_MODEL = 'doubao-seed-2-0-pro-260215';

    if (!ARK_API_KEY) {
      return NextResponse.json(
        { error: '服务器配置错误：缺少 ARK_API_KEY' },
        { status: 500 }
      );
    }

    // 构建提示词
    const prompt = buildPrompt(formulaType, projectInfo);

    // 调用火山方舟 API
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ARK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ARK_MODEL,
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ARK API Error:', errorData);
      throw new Error(`火山方舟 API 错误: ${response.status}`);
    }

    const data = await response.json();
    
    // 解析火山方舟响应格式
    const result = data.output?.[0]?.content?.[0]?.text || 
                   data.choices?.[0]?.message?.content ||
                   '生成失败';
    
    return NextResponse.json({
      success: true,
      result: result,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    );
  }
}

function buildPrompt(formulaType: string, projectInfo: any) {
  const formulaNames: Record<string, string> = {
    'gameplay': '玩法演示型',
    'kol': 'KOL解说型',
    'simulation': '真实模拟型',
  };

  const formulaTemplates: Record<string, string> = {
    'gameplay': `【黄金3秒】核心冲突/爽点（如：从零开始建帝国/被背叛后复仇/极限操作反杀）
【15秒规则】每15秒一个情绪爆点
【CTA】行动召唤（"点击下载，开启你的..."）`,
    
    'kol': `【信任前置】KOL自我介绍+专业背书
【问题共鸣】"你们有没有遇到过..."
【解决方案】游戏核心玩法
【效果验证】数据/画面展示
【CTA】"评论区告诉我..."`,
    
    'simulation': `【真实场景】生活化情境
【痛点放大】"每次都要...太麻烦了"
【产品介入】游戏如何解决
【效果对比】使用前后
【CTA】"你也来试试"`,
  };

  return `你是一位资深的AI买量视频创意策划师，擅长制作爆款短视频脚本。

请使用【${formulaNames[formulaType]}】公式，为以下项目生成一个完整的短视频脚本：

**项目信息：**
- 游戏名称：${projectInfo.gameName}
- 游戏类型：${projectInfo.gameType}
- 核心玩法：${projectInfo.coreGameplay}
- 目标用户：${projectInfo.targetAudience}
- 视频时长：${projectInfo.duration}秒
- 投放平台：${projectInfo.platform}
${projectInfo.sellingPoint ? `- 核心卖点：${projectInfo.sellingPoint}` : ''}
${projectInfo.painPoint ? `- 用户痛点：${projectInfo.painPoint}` : ''}

**公式结构：**
${formulaTemplates[formulaType]}

**要求：**
1. 严格按照公式结构生成
2. 每个部分标注时间节点（如：0-3秒）
3. 画面描述要具体、可执行
4. 文案要口语化、有网感
5. 总时长控制在${projectInfo.duration}秒内

请生成完整的分镜脚本（含时间、画面、文案、音效），并在最后给出投放建议。`;
}
