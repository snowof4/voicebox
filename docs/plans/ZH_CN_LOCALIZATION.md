# Voicebox 简体中文汉化方案

## 目标

在 `codex/zh-cn` 分支完成 Voicebox 面向用户界面的简体中文本地化，使主应用在选择 `简体中文` 后不再暴露明显英文 UI 文案，并保留品牌名、模型名、接口名等专有名词。

## 当前状态

- 主应用已接入 `i18next` 与 `react-i18next`。
- 已存在 `zh-CN` 语言包，且与英文语言包 key 数一致。
- 仍有部分组件绕过 i18n 直接写入英文文本、`aria-label`、`title` 与 `placeholder`。
- `landing/` 官网与 `docs/` 文档站目前主要为英文内容，工作量和发布形态独立于桌面主应用，建议作为后续阶段单独处理。

## 本阶段范围

本阶段聚焦桌面主应用 `app/`：

- 补齐 `app/src/components/**`、`app/src/hooks/**`、`app/src/App.tsx` 中仍可见的英文 UI 文案。
- 将硬编码英文迁移到 `app/src/i18n/locales/*/translation.json`。
- 同步维护 `en`、`zh-CN`、`zh-TW`、`ja` 四套语言包 key，避免运行时 fallback 或缺键。
- 审校现有 `zh-CN` 文案中的标点、术语和语气一致性。

## 暂不纳入本阶段

- `landing/` 官网全文汉化或多语言路由。
- `docs/content/docs/**/*.mdx` 文档全文翻译。
- 后端日志、开发者注释、API schema、模型名称、错误栈、调试输出。
- 品牌名与专有名词翻译，例如 `Voicebox`、`Whisper`、`Qwen`、`Kokoro`、`GPU`、`CPU`、`MCP`、`API`。

这些内容需要单独评估发布策略和信息架构，避免把应用 UI 汉化与官网/文档重构混在同一个变更中。

## 术语表

| English | 简体中文 | 说明 |
| --- | --- | --- |
| Generate | 生成 | 动作与导航保持一致 |
| Generation | 生成记录 | 指一次生成结果时使用 |
| Captures | 捕获 | 保持现有导航译法 |
| Dictation | 听写 | 语音输入场景 |
| Voice / Voices | 声音 | 指可用于播放或生成的声音 |
| Voice Profile | 声音档案 | 指用户创建的声音配置 |
| Stories | 故事 | 保持现有导航译法 |
| Effects | 效果 | 音频处理效果 |
| Refine | 精修 | 转录文本后处理 |
| Transcribe | 转录 | 音频转文本 |
| Server | 服务器 | 设置页和连接状态 |
| Update | 更新 | 应用更新 |
| Download | 下载 | 模型或应用更新下载 |
| Track | 轨道 | Stories 编辑器时间线 |
| Clip | 片段 | Stories 编辑器音频片段 |

## 实施步骤

1. 确认分支与基线
   - 确认当前分支为 `codex/zh-cn`。
   - 对比 `en` 与 `zh-CN` 语言包 key，确保没有缺失。
   - 扫描主应用硬编码英文。

2. 补齐语言包
   - 为硬编码英文新增清晰命名的 i18n key。
   - 四套语言包同步新增 key。
   - 简中译文遵循术语表与中文 UI 习惯。

3. 替换组件硬编码文案
   - 为相关组件接入 `useTranslation`。
   - 替换可见文本、`aria-label`、`title`、`placeholder`、toast 文案。
   - 保留专有名词、模型名、技术缩写。

4. 审校简中语言包
   - 修正明显不符合中文排版的英文标点。
   - 保留 `{{variable}}` 插值变量。
   - 不删除复数 key，保持与英文包一致。

5. 验证
   - 运行语言包 key 同构检查。
   - 运行主应用类型检查。
   - 运行主应用构建。
   - 再次扫描主应用硬编码英文，确认剩余项均为专有名词、模型名或可接受的技术文本。

## 验收标准

- `app/src/i18n/locales/en/translation.json` 与 `app/src/i18n/locales/zh-CN/translation.json` key 完全一致。
- 主应用切换到 `简体中文` 后，主要页面、对话框、按钮、空状态、toast 和可访问性标签不再出现明显英文 UI。
- `bunx tsc -p app/tsconfig.json --noEmit` 通过。
- `cd app && bun run build` 通过。
- 剩余英文均有明确理由，例如品牌名、模型名、API 名、代码路径、快捷键或调试信息。
