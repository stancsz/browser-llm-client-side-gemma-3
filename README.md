# 🤖 Gemma 3 Browser AI

<div align="center">

**A privacy-first AI chat application that runs entirely in your browser**

[![WebGPU](https://img.shields.io/badge/WebGPU-Enabled-blue.svg)](https://www.w3.org/TR/webgpu/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🌟 Overview

Gemma 3 Browser AI brings the power of Google's Gemma 3 language model directly to your browser. No servers, no API keys, no data sharing - just pure, private AI running on your own device using WebGPU acceleration.

### Why This Matters

- 🔐 **Complete Privacy** - Your conversations never leave your device
- 🚀 **No Setup Required** - Just open and chat, no installation needed
- 💰 **Zero Cost** - No API fees or subscriptions
- 🌐 **Offline Capable** - Works without internet once the model is loaded
- ⚡ **GPU Accelerated** - Fast inference using your graphics card

---

## ✨ Features

### Core Capabilities

- **100% Client-Side AI** - Entire model runs in your browser using WebGPU
- **Real-Time Streaming** - See AI responses appear word-by-word as generated
- **Conversation Context** - Maintains chat history for coherent multi-turn dialogues
- **Clean Interface** - Minimalist design focused on the conversation experience
- **Error Handling** - Graceful degradation with clear error messages and retry options
- **Progress Tracking** - Visual feedback during model download and loading

### Technical Highlights

- React 19 with TypeScript for type safety
- WebLLM engine for browser-based inference
- WebGPU for hardware acceleration
- shadcn/ui component library for polished UI
- Responsive design that works on desktop and mobile
- Persistent model caching for faster subsequent loads

---

## 🚀 Quick Start

### 1. Check Browser Compatibility

This app requires WebGPU support. Compatible browsers:

- **Chrome/Edge** 113+ (recommended)
- **Firefox** 121+ (with WebGPU enabled in settings)
- **Safari** 18+ (macOS only)

#### Verify WebGPU Support

- **Chrome/Edge**: Visit `chrome://gpu` and look for "WebGPU: Hardware accelerated"
- **Firefox**: Visit `about:support` and check Graphics section for WebGPU
- **Safari**: Should work by default on macOS Sonoma+

### 2. Launch the Application

Simply open the application URL in your compatible browser. No installation needed!

### 3. First-Time Setup

On first launch:

1. The app will automatically download the Gemma 3 model (~1-2GB)
2. Progress will be displayed with percentage and status updates
3. This download only happens once - the model is cached in your browser
4. Expect 2-10 minutes depending on your internet speed

### 4. Start Chatting

Once loaded, type your message and press Enter or click Send. The AI will respond in real-time with streaming text.

---

## 🎯 Use Cases

### For Developers
- Test AI integrations without API costs
- Experiment with prompt engineering offline
- Build privacy-focused AI features
- Learn about LLM internals and behavior

### For Privacy-Conscious Users
- Brainstorm ideas without cloud services
- Discuss sensitive topics with guaranteed privacy
- Work in air-gapped or restricted environments
- Maintain control over your data

### For Everyone
- Get AI assistance anywhere, even offline
- No account creation or login required
- Free, unlimited usage
- Educational tool for understanding AI

---

## 🏗️ Project Structure

```
gemma-browser-ai/
├── src/
│   ├── components/
│   │   ├── ChatHeader.tsx       # App header with status and controls
│   │   ├── ChatInput.tsx        # Message input with send button
│   │   ├── ChatMessage.tsx      # Individual message component
│   │   ├── ChatMessages.tsx     # Scrollable message list
│   │   ├── ModelLoading.tsx     # Loading screen with progress
│   │   ├── ErrorState.tsx       # Error display with retry
│   │   └── ui/                  # shadcn component library (40+ components)
│   ├── hooks/
│   │   ├── use-llm.ts          # WebLLM engine management hook
│   │   └── use-mobile.ts       # Responsive breakpoint detection
│   ├── lib/
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── utils.ts            # Utility functions (cn helper)
│   ├── App.tsx                 # Main application logic
│   └── index.css               # Global styles and theme variables
├── index.html                   # Entry HTML with font imports
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── PRD.md                       # Product requirements document
```

---

## 🔧 Technology Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript 5.7** - Static typing for better DX
- **Vite 6** - Fast build tool and dev server

### AI & Performance
- **@mlc-ai/web-llm 0.2.79** - Browser-based LLM inference
- **WebGPU** - Hardware-accelerated GPU compute
- **Gemma 2 2B** - Efficient quantized model (Q4F16)

### UI & Styling
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui v4** - High-quality React components
- **Framer Motion** - Smooth animations
- **Phosphor Icons** - Clean, consistent iconography

### State & Data
- **React Hooks** - Modern state management
- **Sonner** - Toast notifications
- **Browser Cache** - Model persistence

---

## 🎨 Customization Guide

### Changing the AI Model

Edit `src/hooks/use-llm.ts` (line 29):

```typescript
const selectedModel = 'gemma-2-2b-it-q4f16_1-MLC';
```

Available models from [WebLLM](https://github.com/mlc-ai/web-llm):
- `Llama-3.2-3B-Instruct-q4f32_1-MLC` - More capable, larger
- `Phi-3.5-mini-instruct-q4f16_1-MLC` - Faster, smaller
- `Qwen2.5-3B-Instruct-q4f16_1-MLC` - Strong multilingual

### Adjusting AI Behavior

Modify generation parameters in `src/hooks/use-llm.ts` (lines 67-72):

```typescript
const completion = await engineRef.current.chat.completions.create({
  messages: chatMessages,
  temperature: 0.7,      // Creativity: 0.0 (focused) to 1.0 (creative)
  max_tokens: 1024,      // Max response length
  top_p: 0.9,           // Nucleus sampling threshold
  stream: true,
});
```

### Customizing Colors

Update theme in `src/index.css`:

```css
:root {
  --background: oklch(0.98 0 0);          /* Main background */
  --foreground: oklch(0.20 0 0);          /* Main text color */
  --primary: oklch(0.45 0.15 250);        /* Brand color (blue) */
  --accent: oklch(0.70 0.15 200);         /* Highlight color (cyan) */
  --border: oklch(0.88 0.01 250);         /* Border color */
  --radius: 0.5rem;                       /* Border radius */
}
```

### Changing Typography

Update font in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Then modify `src/index.css`:

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## 🐛 Troubleshooting

### Model Won't Load

**Symptom**: Error message or infinite loading

**Solutions**:
1. ✅ Verify WebGPU support in your browser (see Quick Start)
2. 🧹 Clear browser cache and reload (Ctrl+Shift+Delete)
3. 🔍 Open DevTools Console (F12) to see detailed error messages
4. 🔄 Update browser to latest version
5. 🖥️ Update GPU drivers from manufacturer website

### Slow Performance

**Symptom**: Slow text generation (< 2 tokens/second)

**Solutions**:
1. 🖥️ Update GPU drivers to latest version
2. 📑 Close other browser tabs to free GPU memory
3. ⚙️ Lower `max_tokens` in generation settings
4. 🔄 Restart browser to clear GPU memory leaks
5. 📉 Try a smaller model variant (Phi-3.5 mini)

### Out of Memory Errors

**Symptom**: "Out of memory" or browser crash

**Solutions**:
1. 🔄 Restart browser completely
2. 📉 Switch to a smaller model (see Customization)
3. 💾 Ensure 8GB+ system RAM available
4. 🖥️ Close other GPU-intensive applications
5. 🧹 Clear browser cache to free storage

### WebGPU Not Available

**Symptom**: "WebGPU not supported" message

**Solutions**:
1. 🌐 Use Chrome 113+ or Edge 113+ (recommended)
2. ⚙️ Enable WebGPU in Firefox: `about:config` → `dom.webgpu.enabled` → `true`
3. 🍎 Update macOS to Sonoma+ for Safari support
4. 🖥️ Ensure you have a compatible GPU (most 2016+ GPUs work)
5. 🔍 Check `chrome://gpu` for specific issues

### Conversation Not Clearing

**Symptom**: Old messages appear after clicking Clear

**Solutions**:
1. 🔄 Click Clear button again
2. 🔄 Refresh the page
3. 🧹 Check browser console for errors

---

## 📊 Performance Expectations

### First Load (Initial Model Download)
- **Download Size**: 1-2GB (varies by model)
- **Time**: 2-10 minutes (depends on internet speed)
- **Network**: Required for initial download
- **Storage**: Model cached in IndexedDB

### Subsequent Loads (Model in Cache)
- **Load Time**: 10-30 seconds
- **Network**: Not required
- **GPU Usage**: Moderate during loading

### Generation Performance
- **Speed**: 5-30 tokens/second
- **Factors**: GPU power, model size, system load
- **Memory**: 2-4GB GPU RAM, 1-2GB system RAM
- **Optimization**: Faster on dedicated GPUs vs integrated

### Hardware Recommendations

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| GPU | Integrated (Intel/AMD) | Dedicated (NVIDIA/AMD) |
| RAM | 8GB | 16GB+ |
| Browser | Chrome 113+ | Chrome/Edge latest |
| Storage | 5GB free | 10GB+ free |

---

## 🔒 Privacy & Security

### Data Privacy Guarantees

- ✅ **No Server Communication** - All processing happens locally
- ✅ **No Data Collection** - Zero telemetry or analytics
- ✅ **No API Calls** - No external services after model download
- ✅ **No User Tracking** - No cookies, fingerprinting, or tracking
- ✅ **Open Source** - Fully auditable code

### Data Storage

- **Model Files**: Stored in browser IndexedDB (can be cleared)
- **Conversation History**: Kept in memory only (lost on refresh)
- **No Persistence**: Messages are not saved between sessions
- **User Control**: Clear browser data to remove all traces

### Security Considerations

- ⚠️ Model runs with same permissions as browser
- ⚠️ No sandbox between model and JavaScript
- ⚠️ Trust model source (official WebLLM models)
- ✅ No remote code execution
- ✅ No network access during inference

---

## 🛠️ Development

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or pnpm/yarn)
- **Modern browser** with WebGPU support

### Installation

```bash
# Clone or download the project
cd gemma-browser-ai

# Install dependencies
npm install
```

### Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check without building
npm run type-check

# Lint code
npm run lint
```

### Project Configuration Files

- **vite.config.ts** - Build configuration (don't modify)
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.js** - Tailwind theme extensions
- **package.json** - Dependencies and scripts

### Adding Dependencies

```bash
# Install browser-compatible packages only
npm install <package-name>

# Do NOT install Node-only packages (fs, http, etc.)
```

---

## 📚 Additional Resources

### WebLLM & AI
- [WebLLM Documentation](https://webllm.mlc.ai/) - Official docs
- [WebLLM GitHub](https://github.com/mlc-ai/web-llm) - Source code
- [Gemma Model Card](https://ai.google.dev/gemma) - Model details
- [Gemma on Hugging Face](https://huggingface.co/google/gemma-2-2b-it) - Model info

### WebGPU
- [WebGPU Specification](https://www.w3.org/TR/webgpu/) - Official spec
- [WebGPU Samples](https://webgpu.github.io/webgpu-samples/) - Code examples
- [Can I Use WebGPU](https://caniuse.com/webgpu) - Browser support

### UI & Design
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Phosphor Icons](https://phosphoricons.com/) - Icon library

---

## ⚠️ Known Limitations

### Technical Constraints
- **Hardware Dependent** - Performance varies by GPU (2x-10x difference)
- **Large Download** - 1-2GB initial model download required
- **Browser Only** - Cannot run in Node.js, Electron, or native apps
- **Memory Intensive** - Requires significant GPU and system RAM
- **No Mobile GPU** - Most mobile devices lack WebGPU support

### Model Limitations
- **Context Window** - Limited conversation history (model dependent)
- **Response Quality** - Smaller than cloud models (GPT-4, Claude)
- **Knowledge Cutoff** - Training data only up to model's cutoff date
- **Quantization** - Lower precision than full models for speed

### Browser Limitations
- **Storage Quota** - Browser may limit cache size
- **Tab Switching** - May pause GPU operations
- **Incognito Mode** - Won't cache model between sessions
- **CORS Restrictions** - Must be served over HTTP/HTTPS

---

## 🤝 Contributing

This project was created using **GitHub Spark** and is designed to be easily forkable and customizable.

### Ways to Contribute
- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features or improvements
- 🔧 Submit pull requests
- 📖 Improve documentation
- 🎨 Share your customizations

### Development Guidelines
- Follow existing code style (TypeScript + React)
- Test in multiple browsers before submitting
- Update documentation for new features
- Keep dependencies minimal and browser-compatible

---

## 📄 License

The Spark Template files and resources from GitHub are licensed under the **MIT License**.

Copyright © GitHub, Inc.

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This project builds on amazing open-source work:

- **[WebLLM](https://github.com/mlc-ai/web-llm)** by MLC AI - Browser LLM inference engine
- **[Gemma](https://ai.google.dev/gemma)** by Google - Open-source language model
- **[shadcn/ui](https://ui.shadcn.com/)** by shadcn - Beautiful React components
- **[Tailwind CSS](https://tailwindcss.com/)** by Tailwind Labs - Utility-first CSS
- **[Vite](https://vitejs.dev/)** by Evan You - Next-gen build tool
- **GitHub Spark** - Rapid prototyping platform

---

## 🆘 Support

### Getting Help
- 📖 Check this README thoroughly
- 🐛 Review [Troubleshooting](#-troubleshooting) section
- 💬 Open a GitHub Issue for bugs
- 📚 Consult [WebLLM docs](https://webllm.mlc.ai/) for model questions

### Useful Links
- [WebGPU Browser Support](https://caniuse.com/webgpu)
- [WebLLM GitHub Issues](https://github.com/mlc-ai/web-llm/issues)
- [Gemma Community](https://huggingface.co/google/gemma-2-2b-it/discussions)

---

<div align="center">

**Made with ❤️ using [GitHub Spark](https://githubnext.com/projects/spark)**

⭐ Star this repo if you find it useful!

</div>
