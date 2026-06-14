<p align="center">
  <img src=".github/assets/icon-dark.webp" alt="Voicebox" width="120" height="120" />
</p>

<h1 align="center">Voicebox</h1>

<p align="center">
  <a href="README.md">English</a> | 简体中文
</p>

<p align="center">
  <strong>开源 AI 语音工作室。</strong><br/>
  克隆任意声音，生成语音，在任何应用中听写，并让智能体使用你拥有的声音说话。<br/>
  完整的语音输入/输出栈，本地运行在你的机器上。
</p>

<p align="center">
  <a href="https://github.com/jamiepine/voicebox/releases">
    <img src="https://img.shields.io/github/downloads/jamiepine/voicebox/total?style=flat&color=blue" alt="下载量" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/releases/latest">
    <img src="https://img.shields.io/github/v/release/jamiepine/voicebox?style=flat" alt="版本" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/stargazers">
    <img src="https://img.shields.io/github/stars/jamiepine/voicebox?style=flat" alt="Stars" />
  </a>
  <a href="https://github.com/jamiepine/voicebox/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/jamiepine/voicebox?style=flat" alt="许可证" />
  </a>
  <a href="https://deepwiki.com/jamiepine/voicebox">
    <img src="https://img.shields.io/static/v1?label=Ask&message=DeepWiki&color=5B6EF7" alt="Ask DeepWiki" />
  </a>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/21213" target="_blank"><img src="https://trendshift.io/api/badge/repositories/21213" alt="jamiepine%2Fvoicebox | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
</p>

<p align="center">
  <a href="https://voicebox.sh">voicebox.sh</a> •
  <a href="https://docs.voicebox.sh">文档</a> •
  <a href="#下载">下载</a> •
  <a href="#功能">功能</a> •
  <a href="#api">API</a> •
  <a href="docs/content/docs/overview/troubleshooting.mdx">故障排查</a>
</p>

<br/>

<p align="center">
  <a href="https://voicebox.sh">
    <img src="landing/public/assets/app-screenshot-1.webp" alt="Voicebox 应用截图" width="800" />
  </a>
</p>

<p align="center">
  <em>点击上方图片可在 <a href="https://voicebox.sh">voicebox.sh</a> 查看演示视频</em>
</p>

<br/>

<p align="center">
  <img src="landing/public/assets/app-screenshot-2.webp" alt="Voicebox 截图 2" width="800" />
</p>

<p align="center">
  <img src="landing/public/assets/app-screenshot-3.webp" alt="Voicebox 截图 3" width="800" />
</p>

<br/>

## Voicebox 是什么？

Voicebox 是一个**本地优先的 AI 语音工作室**，也是一个免费、开源的 **ElevenLabs** 与 **WisprFlow** 替代方案。你可以用几秒音频克隆声音，使用 7 个 TTS 引擎生成 23 种语言的语音，通过全局快捷键向任意文本框听写，并让任何支持 MCP 的 AI 智能体使用你指定的声音说话。

现有云服务通常只覆盖语音 I/O 的一半：ElevenLabs 偏语音输出，WisprFlow 偏语音输入。Voicebox 同时覆盖输入与输出，并通过内置本地 LLM 支持文本精修和按声音档案定制的人格设定，整套流程都在你的机器上运行。

- **完整隐私**：模型、声音数据和捕获内容不会离开你的机器
- **7 个 TTS 引擎**：Qwen3-TTS、Qwen CustomVoice、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA 和 Kokoro
- **声音克隆与预设声音**：通过参考样本零样本克隆，或使用 Kokoro 与 Qwen CustomVoice 提供的 50+ 精选预设声音
- **23 种语言**：从英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **后处理效果**：音高变换、混响、延迟、合唱、压缩和滤波器
- **富表现力语音**：Chatterbox Turbo 支持 `[laugh]`、`[sigh]`、`[gasp]` 等副语言标签；Qwen CustomVoice 支持自然语言风格控制
- **不限长度**：面向脚本、文章和章节的自动分块与交叉淡化
- **故事编辑器**：用于对话、播客和叙事内容的多轨时间线
- **语音输入**：全局听写快捷键，支持按住说话与切换模式；macOS 上经过辅助功能校验的自动粘贴；每个文本输入框都有应用内麦克风；基于 Whisper 的 STT
- **智能体语音输出**：一次工具调用 `voicebox.speak`，任何支持 MCP 的智能体（Claude Code、Cursor、Cline）都能使用你克隆的声音说话
- **声音人格**：为任意声音档案添加自由文本人格，然后通过内置本地 LLM 进行 Compose、Rewrite 或 Respond；智能体也能通过 MCP 调用相同模式
- **API 优先**：REST API 加内置 MCP server，方便把语音 I/O 集成到你的应用和智能体中
- **原生性能**：基于 Tauri（Rust）构建，而不是 Electron
- **跨平台运行**：macOS（MLX/Metal）、Windows（CUDA）、Linux、AMD ROCm、Intel Arc、Docker

---

## 下载

| 平台 | 下载 |
| --- | --- |
| macOS（Apple Silicon） | [下载 DMG](https://voicebox.sh/download/mac-arm) |
| macOS（Intel） | [下载 DMG](https://voicebox.sh/download/mac-intel) |
| Windows | [下载 MSI](https://voicebox.sh/download/windows) |
| Docker | `docker compose up` |

> **[查看全部二进制文件 →](https://github.com/jamiepine/voicebox/releases/latest)**

> **Linux**：暂未提供预构建二进制文件。请查看 [voicebox.sh/linux-install](https://voicebox.sh/linux-install) 了解从源码构建的说明。

> **遇到问题？** 请查看 [故障排查指南](docs/content/docs/overview/troubleshooting.mdx)，其中包含安装、生成、模型下载和 GPU 常见问题。

---

## 功能

### 多引擎声音克隆

7 个 TTS 引擎各有所长，可在每次生成时切换：

| 引擎 | 语言 | 优势 |
| --- | --- | --- |
| **Qwen3-TTS**（0.6B / 1.7B） | 10 | 高质量多语言克隆，支持“慢速说话”“耳语”等表达指令 |
| **Qwen CustomVoice** | 10 | 9 个精选预设声音，支持自然语言表达控制，无需参考音频 |
| **LuxTTS** | 英语 | 轻量（约 1GB VRAM）、48kHz 输出、CPU 上可达 150 倍实时速度 |
| **Chatterbox Multilingual** | 23 | 语言覆盖最广，包括阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| **Chatterbox Turbo** | 英语 | 快速 350M 模型，支持副语言情绪/声音标签 |
| **TADA**（1B / 3B） | 10 | HumeAI speech-language model，700 秒以上连贯音频，文本-声学双对齐 |
| **Kokoro** | 8 | 50 个精选预设声音，82M 小模型，CPU 推理速度快 |

### 情绪与副语言标签

只有 **Chatterbox Turbo** 会解释 `[laugh]`、`[sigh]` 等副语言标签。Qwen3-TTS、LuxTTS、Chatterbox Multilingual 和 HumeAI TADA 会把这些标签按普通文本朗读。

选择 **Chatterbox Turbo** 后，在文本输入框中输入 `/` 可以打开标签插入器，把富表现力标签内联到语音中：

`[laugh]` `[chuckle]` `[gasp]` `[cough]` `[sigh]` `[groan]` `[sniff]` `[shush]` `[clear throat]`

### 后处理效果

由 Spotify 的 `pedalboard` 库驱动的 8 种音频效果。可在生成后应用、实时预览，并构建可复用预设。

| 效果 | 描述 |
| --- | --- |
| Pitch Shift | 最高上下 12 个半音的音高变换 |
| Reverb | 可配置房间大小、阻尼、干湿比的混响 |
| Delay | 可调时间、反馈和混合比例的回声 |
| Chorus / Flanger | 用于金属质感或丰满纹理的调制延迟 |
| Compressor | 动态范围压缩 |
| Gain | 音量调节（-40 到 +40 dB） |
| High-Pass Filter | 移除低频 |
| Low-Pass Filter | 移除高频 |

内置 4 个预设（Robotic、Radio、Echo Chamber、Deep Voice），也支持自定义预设。效果可作为每个声音档案的默认设置。

### 不限长度生成

文本会自动按句子边界拆分，每一段独立生成，再通过交叉淡化合并。适用于所有引擎。

- 可配置自动分块上限（100 到 5,000 字符）
- 交叉淡化滑块（0 到 200ms），用于平滑过渡
- 最大文本长度：50,000 字符
- 智能拆分会尊重缩写、CJK 标点和 `[tags]`

### 生成版本

每条生成记录都支持多个版本，并保留来源追踪：

- **Original**：干净的 TTS 输出，始终保留
- **Effects versions**：从任意来源版本应用不同效果链
- **Takes**：使用新 seed 重新生成，以获得变化
- **来源追踪**：每个版本都会记录其 lineage
- **收藏**：为生成记录加星，方便快速访问

### 异步生成队列

生成是非阻塞的。提交一条生成后可以立即继续输入下一条。

- 串行执行队列避免 GPU 资源争用
- 实时 SSE 状态流
- 失败的生成可重试
- 启动时自动恢复崩溃遗留的过期生成任务

### 声音档案管理

- 从音频文件创建声音档案，或直接在应用内录制
- 导入/导出声音档案，方便分享或备份
- 支持多样本，以提升克隆质量
- 支持按声音档案设置默认效果链
- 用描述和语言标签组织声音档案

### 故事编辑器

面向对话、播客和叙事内容的多声音时间线编辑器。

- 多轨编排，支持拖放
- 内联音频裁剪和分割
- 带同步播放头的自动播放
- 每个轨道片段可固定版本

### 全局听写与语音输入

语音 I/O 的另一半。在系统任意位置按住快捷键，说完松开；macOS 上转录文本会直接粘贴到当前聚焦的文本框。也可以点击任意 Voicebox 文本输入框上的麦克风，直接在应用内听写。

- **可配置组合键**：按住说话与点击切换两种组合键，都可在应用内组合键选择器中重新绑定。按住 push-to-talk 时中途轻按 `Space` 可无缝切换为持续会话
- **目标感知粘贴（macOS）**：经过辅助功能校验后注入到当前聚焦文本框，并通过原子化剪贴板保存/恢复避免覆盖你的剪贴板
- **首次运行权限体验**：应用内引导你授予 macOS 辅助功能和输入监控权限，并提供到系统设置的深链
- **每个 Voicebox 文本框都有应用内麦克风按钮**：生成表单、档案描述、故事标题，任何需要输入的地方都能听写
- **LLM 精修**：粘贴前可选清理语气词、卡顿和误启动
- **屏幕悬浮提示**：显示 `recording`、`transcribing`、`refining` 和 `speaking` 状态。智能体说话时也使用同一提示，因此输入与输出共享同一个心智模型

### 语音转文本

Voicebox 使用 OpenAI Whisper 进行转录。听写、Captures 标签页和 `/transcribe` API 都使用同一模型。根据平台不同，可运行在 MLX（Apple Silicon）或 PyTorch（CUDA / ROCm / DirectML / CPU）上。

| 尺寸 | 说明 |
| --- | --- |
| Base / Small / Medium / Large | 标准 Whisper 质量阶梯 |
| Turbo | 比 Whisper Large 快约 8 倍，质量损失很小 |

更多引擎（Parakeet v3、Qwen3-ASR）已在规划中，请查看 [路线图](#路线图)。

### Captures

每次听写、应用内录音和上传的音频都会进入 Captures 标签页：原始音频与转录文本配对保存。

- **回放、重新转录、精修**：用任意 Whisper 尺寸重新运行 STT，或使用不同标志让本地 LLM 重新处理原始转录文本（清理语气词、移除自我修正、保留技术术语）
- **内联编辑**：修改转录文本并在失焦时保存
- **作为声音档案播放**：一键将任意捕获内容用克隆声音朗读
- **提升为声音样本**：把捕获内容的音频和转录作为任意声音档案的参考样本
- **本地捕获存储**：原始音频和转录保存在你的 Voicebox 数据目录中，设置页提供文件夹快捷入口

### 智能体语音输出

每个智能体都可以拥有声音。一次工具调用，任何支持 MCP 的智能体都能用你克隆的声音向你说话，例如任务完成、提问、通知。听写时显示的同一个悬浮提示也会在智能体说话时显示，让你始终知道机器正在输出什么。

```ts
// 在任何支持 MCP 的智能体中：
await voicebox.speak({
  text: "Deploy complete.",
  profile: "Morgan",
});
```

对于不支持 MCP 的系统（ACP、A2A、shell 脚本、自定义 harness），也可以通过 `POST /speak` 调用。

- **双向悬浮提示**：`recording`、`transcribing`、`refining` 和 `speaking` 都是同一个系统级浮层的状态，因此听写和智能体语音共享同一界面
- **按智能体绑定声音**：在 **Settings → MCP** 中把 Claude Code 固定到 Morgan，把 Cursor 固定到 Scarlett，这样无需看屏幕就能知道哪个智能体在说话。每个客户端的 `last_seen_at` 时间戳会确认安装确实生效
- **始终可见**：不会静默后台 TTS；每次智能体发起的说话都会在完整持续时间内显示带声音档案名称的提示
- **HTTP + stdio 传输**：可作为 URL 安装到 Claude Code / Cursor / Windsurf / VS Code MCP，也可让仅支持 stdio 的客户端指向内置 `voicebox-mcp` 二进制文件

### 声音人格

为任意声音档案附加自由文本人格：这个声音是谁、如何说话、关心什么。设置人格后，生成框会出现两个由内置 Qwen3 LLM 驱动的动作，且完全本地运行。

- **Compose**：点击随机按钮，将一句全新的角色内台词放入文本框；你可以编辑后朗读，或再次点击换一个版本
- **Speak in character**：开启后，你输入的文本会先通过人格 LLM 改写成该角色的声音，再送入 TTS

智能体可通过 MCP 向 `voicebox.speak` 传入 `personality: true` 使用同一路径，把工具变成“文本输入 → 人格 LLM → TTS”的流水线。听写精修也使用同一个 LLM：应用内一个 LLM、一份模型缓存、一份 GPU 显存占用。

**本地 LLM 选项：** Qwen3 0.6B / 1.7B / 4B，与 TTS 运行时共享（Apple Silicon 上使用 MLX，其他平台使用 PyTorch）。

适用场景：智能体开发循环（听写问题，用克隆声音听回答）、游戏和叙事工具中的互动角色、帮助无法使用原声说话的人进行语音辅助。

### 模型管理

- 单独卸载模型以释放 GPU 显存，同时不删除下载文件
- 通过 `VOICEBOX_MODELS_DIR` 自定义模型目录
- 带进度追踪的模型目录迁移
- 下载取消/清理界面

### GPU 支持

| 平台 | 后端 | 说明 |
| --- | --- | --- |
| macOS（Apple Silicon） | MLX（Metal） | 通过 Neural Engine 提速 4 到 5 倍 |
| Windows / Linux（NVIDIA） | PyTorch（CUDA） | 在应用内自动下载 CUDA 二进制文件 |
| Linux（AMD） | PyTorch（ROCm） | 自动配置 HSA_OVERRIDE_GFX_VERSION |
| Windows（任意 GPU） | DirectML | 通用 Windows GPU 支持 |
| Intel Arc | IPEX/XPU | Intel 独立显卡加速 |
| 任意平台 | CPU | 到处可用，只是更慢 |

---

## API

Voicebox 暴露 REST API，便于把语音 I/O 集成到你的应用和智能体中。

```bash
# 生成语音
curl -X POST http://127.0.0.1:17493/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "profile_id": "abc123", "language": "en"}'

# 智能体语音输出：任何应用或脚本都能用克隆声音说话
curl -X POST http://127.0.0.1:17493/speak \
  -H "Content-Type: application/json" \
  -H "X-Voicebox-Client-Id: my-script" \
  -d '{"text": "Deploy complete.", "profile": "Morgan"}'

# 转录音频文件
curl -X POST http://127.0.0.1:17493/transcribe \
  -F "audio=@recording.wav" \
  -F "model=whisper-turbo"

# 列出声音档案
curl http://127.0.0.1:17493/profiles
```

`POST /speak` 接受作为名称（不区分大小写）或 id 的 `profile`，并按 MCP 工具相同的优先级解析：显式参数 → 按客户端绑定 → `capture_settings.default_playback_voice_id`。

### MCP server

Voicebox 内置 **Model Context Protocol** server，因此任何支持 MCP 的智能体（Claude Code、Cursor、Windsurf、Cline、VS Code MCP 扩展）都能说话、转录，并浏览捕获内容和声音档案。

**Claude Code 一行命令：**

```bash
claude mcp add voicebox \
  --transport http \
  --url http://127.0.0.1:17493/mcp \
  --header "X-Voicebox-Client-Id: claude-code"
```

**任意 HTTP MCP 客户端**（Cursor、Windsurf、VS Code 等）：

```json
{
  "mcpServers": {
    "voicebox": {
      "url": "http://127.0.0.1:17493/mcp",
      "headers": { "X-Voicebox-Client-Id": "cursor" }
    }
  }
}
```

**Stdio fallback**：对于不支持 HTTP MCP 的客户端，可指向应用内置的 `voicebox-mcp` 二进制文件：

```json
{
  "mcpServers": {
    "voicebox": {
      "command": "/Applications/Voicebox.app/Contents/MacOS/voicebox-mcp",
      "env": { "VOICEBOX_CLIENT_ID": "claude-desktop" }
    }
  }
}
```

内置 4 个工具：`voicebox.speak`、`voicebox.transcribe`、`voicebox.list_captures`、`voicebox.list_profiles`。按客户端的声音绑定可在 **Voicebox → Settings → MCP** 管理。完整工具签名、解析优先级、speaking pill 约定和安全说明，请查看 [完整 MCP 指南](docs/content/docs/overview/mcp-server.mdx)。

```ts
// 在任何支持 MCP 的智能体中：
await voicebox.speak({
  text: "Tests passing. Ready to merge.",
  profile: "Morgan",      // 可选：未指定时使用按客户端绑定
  personality: true,      // 可选：先通过该声音档案的人格 LLM 改写文本
});
```

**适用场景：** 智能体开发循环（语音输入、语音输出）、游戏对白、播客制作、无障碍工具、语音助手、内容自动化。

完整 API 文档可在 `http://127.0.0.1:17493/docs` 查看。

---

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 桌面应用 | Tauri（Rust） |
| 前端 | React、TypeScript、Tailwind CSS |
| 状态 | Zustand、React Query |
| 后端 | FastAPI（Python） |
| TTS 引擎 | Qwen3-TTS、Qwen CustomVoice、LuxTTS、Chatterbox、Chatterbox Turbo、TADA、Kokoro |
| STT | Whisper / Whisper Turbo（PyTorch 或 MLX） |
| 本地 LLM | Qwen3（0.6B / 1.7B / 4B），与 TTS / STT 共享运行时 |
| MCP Server | FastMCP 挂载在 `/mcp`（Streamable HTTP）+ 内置 stdio shim 二进制 |
| 原生桥接 | Tauri 内的 Rust，用于全局快捷键、粘贴注入、焦点探测 |
| 效果 | Pedalboard（Spotify） |
| 推理 | MLX（Apple Silicon）/ PyTorch（CUDA/ROCm/XPU/CPU） |
| 数据库 | SQLite |
| 音频 | WaveSurfer.js、librosa |

---

## 路线图

| 功能 | 描述 |
| --- | --- |
| **Windows / Linux 自动粘贴** | 听写粘贴能力补齐：Windows 使用 `SendInput`，Linux 使用 `uinput` / AT-SPI |
| **STT 引擎扩展** | Parakeet v3 和 Qwen3-ASR 加入 Whisper，覆盖 50+ 语言，提升非英语质量 |
| **Pipeline routing** | 可配置 source → transform → sink 链路，支持 webhook + MCP sinks 和预设编辑器 |
| **流式转录** | WebSocket `/transcribe/stream`，在说话时输出 partial transcripts |
| **端到端语音 LLM** | Moshi、GLM-4-Voice、Qwen2.5 Omni，实现真正 voice-to-voice，中间不经文本 |
| **Voice Design** | 从文本描述创建新声音 |
| **长内容捕获** | 双流录音（麦克风 + 系统音频）并使用 summary LLM transform |
| **平台 sinks** | Apple Notes、Obsidian 和其他可选集成 |
| **插件架构** | 用自定义模型、transform 和 sinks 扩展 |
| **移动伴侣应用** | 从手机控制 Voicebox |

关于**完整工程状态、开放问题分流和优先级工作队列**，请查看 [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)。这是一个持续更新的文档，记录已发布内容、进行中事项、候选 TTS 引擎评估，以及为何接受或暂缓特定集成。

---

## 开发

详细设置和贡献指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)。

### 快速开始

```bash
git clone https://github.com/jamiepine/voicebox.git
cd voicebox

just setup   # 创建 Python venv，并安装全部依赖
just dev     # 启动后端和桌面应用
```

安装 [just](https://github.com/casey/just)：`brew install just` 或 `cargo install just`。运行 `just --list` 可查看全部命令。

**前置要求：** [Bun](https://bun.sh)、[Rust](https://rustup.rs)、[Python 3.11+](https://python.org)、[Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)，以及 macOS 上的 [Xcode](https://developer.apple.com/xcode/)。

仓库根目录包含预配置的 `.mcp.json`。在此 checkout 中运行 Claude Code 时，只要开发应用正在运行，就会自动识别 Voicebox MCP 工具。

### 本地构建

```bash
just build          # 构建 CPU server 二进制和 Tauri 应用
just build-local    # (Windows) 构建 CPU + CUDA server 二进制和 Tauri 应用
```

### 添加新的声音模型

多引擎架构让添加新的 TTS 引擎变得直接。[分步指南](docs/content/docs/developer/tts-engines.mdx) 覆盖完整流程：依赖调研、后端协议实现、前端接线和 PyInstaller 打包。

该指南针对 AI coding agents 优化。[agent skill](.agents/skills/add-tts-engine/SKILL.md) 可以接收一个模型名称，并自主完成整套集成；你只需要在本地测试构建。

### 项目结构

```text
voicebox/
├── app/              # 共享 React 前端
├── tauri/            # 桌面应用（Tauri + Rust）
├── web/              # Web 部署
├── backend/          # Python FastAPI server
├── landing/          # 营销网站
└── scripts/          # 构建和发布脚本
```

---

## 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南。

1. Fork 仓库
2. 创建功能分支
3. 进行修改
4. 提交 PR

## 安全

发现安全漏洞？请负责任地报告。详情请查看 [SECURITY.md](SECURITY.md)。

---

## 许可证

MIT License，详情请查看 [LICENSE](LICENSE)。

---

<p align="center">
  <a href="https://voicebox.sh">voicebox.sh</a>
</p>
