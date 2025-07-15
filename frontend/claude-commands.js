#!/usr/bin/env node

/**
 * Claude Code 自定義指令包裝器
 * 使用方式: node claude-commands.js /create-component TestCard 測試卡片組件
 */

const fs = require("fs").promises;
const path = require("path");

// 指令映射表
const COMMAND_MAP = {
  "/create-component": {
    promptFile: ".claude/prompts/CREATE/component.md",
    description: "React 組件完整開發工作流程",
  },
  "/discover": {
    promptFile: ".claude/prompts/CREATE/discovery.md",
    description: "智能需求發現與分析工作流程",
  },
  "/create-feature": {
    promptFile: ".claude/prompts/CREATE/feature.md",
    description: "智能前端開發工作流程",
  },
  "/impact-analyze": {
    promptFile: ".claude/prompts/IMPROVE/code-impact-analyzer.md",
    description: "MCP 增強程式碼影響分析與安全修改",
  },
  "/optimize": {
    promptFile: ".claude/prompts/IMPROVE/workflow-optimized.md",
    description: "智能程式碼優化工作流程",
  },
  "/quick-fix": {
    promptFile: ".claude/prompts/SOLVE/quick-fix.md",
    description: "MCP 增強快速修復工作流程",
  },
};

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🎯 Claude Code 自定義指令工具

可用指令：
${Object.entries(COMMAND_MAP)
  .map(([cmd, info]) => `  ${cmd} - ${info.description}`)
  .join("\n")}

使用範例：
  node claude-commands.js /create-component TestCard 測試卡片組件
  node claude-commands.js /discover 品質檢驗表單需求
  node claude-commands.js /optimize src/components/Dashboard.jsx
    `);
    return;
  }

  const command = args[0];
  const params = args.slice(1);

  if (!COMMAND_MAP[command]) {
    console.error(`❌ 未知指令: ${command}`);
    console.log("可用指令:", Object.keys(COMMAND_MAP).join(", "));
    return;
  }

  const config = COMMAND_MAP[command];

  try {
    // 讀取 prompt 檔案
    const promptPath = path.join(process.cwd(), config.promptFile);
    const promptContent = await fs.readFile(promptPath, "utf8");

    // 生成完整的 prompt
    const fullPrompt = generatePrompt(command, params, promptContent);

    console.log(`
🚀 執行指令: ${command}
📋 參數: ${params.join(" ")}
📄 使用 Prompt: ${config.promptFile}

請將以下內容複製到 Claude Code 中執行：

---

${fullPrompt}

---
    `);
  } catch (error) {
    console.error(`❌ 錯誤: ${error.message}`);
  }
}

function generatePrompt(command, params, promptContent) {
  switch (command) {
    case "/create-component":
      const [componentName, ...descParts] = params;
      const description = descParts.join(" ");
      return `請基於以下 prompt 執行 React 組件完整開發工作流程：

組件名稱: ${componentName}
功能描述: ${description}

${promptContent}

執行完整的6階段工作流程，創建具有以下特色的組件：
- ✅ 嚴格遵循 AHA 原則、Push Ifs Up、自我文檔等規範
- ✅ 自動載入 .claude/resources/standards/ 下的所有規範
- ✅ 生成完整的 JSDoc 註釋和型別定義
- ✅ 基於專案現有模式設計一致的架構`;

    case "/discover":
      const requirement = params.join(" ");
      return `請基於以下 prompt 執行智能需求發現與分析工作流程：

需求描述: ${requirement}

${promptContent}

重要：只做發現和分析，不執行任何開發工作！
執行 MCP 增強的發現分析，輸出完整的發現報告。`;

    case "/create-feature":
      const feature = params.join(" ");
      return `請基於以下 prompt 執行智能前端開發工作流程：

功能描述: ${feature}

${promptContent}

執行 5 個智能 Prompt 階段，適用於隆廷實業塑膠射出成型製造管理系統。`;

    case "/impact-analyze":
      const change = params.join(" ");
      return `請基於以下 prompt 執行 MCP 增強程式碼影響分析：

修改需求: ${change}

${promptContent}

執行六階段工作流程，進行完整的影響分析和安全修改建議。`;

    case "/optimize":
      const filepath = params.join(" ") || "整個專案";
      return `請基於以下 prompt 執行智能程式碼優化工作流程：

目標: ${filepath}

${promptContent}

使用 MCP 工具鏈進行 7 層深度分析，提供非侵入性優化建議。`;

    case "/quick-fix":
      const problem = params.join(" ");
      return `請基於以下 prompt 執行 MCP 增強快速修復工作流程：

問題描述: ${problem}

${promptContent}

使用智能模式判斷，執行自動化診斷和修復建議。`;

    default:
      return `${promptContent}

參數: ${params.join(" ")}`;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { COMMAND_MAP, generatePrompt };
