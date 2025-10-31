# Gemma 3 Browser AI

A privacy-first, browser-based AI chat application that runs Google's Gemma 3 model entirely on your device using WebGPU. No servers, no data sharing - just you and AI, running locally in your browser.

## ✨ Features

- **100% Client-Side AI** - The entire Gemma 3 model runs in your browser using WebGPU acceleration
- **Complete Privacy** - Your conversations never leave your device
- **Offline Capable** - Once loaded, works without an internet connection
- **Real-Time Streaming** - See AI responses appear word-by-word as they're generated
- **Clean Interface** - Minimalist design focused on the conversation
- **No Installation** - Just open in a modern browser and start chatting

## 🚀 Quick Start

1. Open the application in a WebGPU-compatible browser
2. Wait for the Gemma 3 model to download (first load only, ~1-2GB)
3. Start chatting with your local AI assistant

## 🔧 Technology Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **WebLLM** - Browser-based LLM inference engine
- **WebGPU** - GPU acceleration for model execution
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Vite** - Lightning-fast build tool

## 📋 Browser Requirements

This application requires a browser with WebGPU support:

- **Chrome/Edge** 113+ (recommended)
- **Firefox** 121+ (with WebGPU enabled)
- **Safari** 18+ (macOS only)

### How to Check WebGPU Support

1. Visit `chrome://gpu` (Chrome/Edge) or `about:support` (Firefox)
2. Look for "WebGPU" in the feature list
3. Ensure it's marked as "enabled" or "hardware accelerated"

## 💡 How It Works

1. **Model Loading**: On first launch, the app downloads the Gemma 3 model (~1-2GB) and caches it in your browser
2. **GPU Acceleration**: WebGPU leverages your graphics card for fast inference
3. **Streaming Responses**: Tokens are generated and displayed in real-time
4. **Context Management**: Conversation history is maintained for coherent multi-turn dialogues

## 🎯 Use Cases

- **Private Brainstorming** - Generate ideas without cloud services
- **Offline AI Assistant** - Get AI help anywhere, even without internet
- **Learning & Experimentation** - Understand how LLMs work locally
- **Secure Conversations** - Discuss sensitive topics with guaranteed privacy
- **Development Testing** - Test AI integrations without API costs

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ChatHeader.tsx      # Header with status and controls
│   ├── ChatInput.tsx        # Message input field
│   ├── ChatMessage.tsx      # Individual message display
│   ├── ChatMessages.tsx     # Message list container
│   ├── ModelLoading.tsx     # Loading progress display
│   ├── ErrorState.tsx       # Error handling UI
│   └── ui/                  # shadcn component library
├── hooks/
│   ├── use-llm.ts          # WebLLM engine management
│   └── use-mobile.ts       # Mobile breakpoint detection
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main application component
└── index.css              # Global styles and theme
```

## 🎨 Customization

### Changing the Model

Edit `src/hooks/use-llm.ts` and update the model name:

```typescript
const selectedModel = 'gemma-2-2b-it-q4f16_1-MLC';
```

View available models at [WebLLM Model Library](https://github.com/mlc-ai/web-llm#model-list).

### Adjusting Generation Settings

Modify parameters in the `generate` function:

```typescript
const completion = await engineRef.current.chat.completions.create({
  messages: chatMessages,
  temperature: 0.7,      // Creativity (0.0-1.0)
  max_tokens: 1024,      // Response length
  stream: true,
});
```

### Customizing the Theme

Update colors in `src/index.css`:

```css
:root {
  --primary: oklch(0.45 0.15 250);    /* Main brand color */
  --accent: oklch(0.70 0.15 200);     /* Highlight color */
  /* ... more color variables */
}
```

## 🐛 Troubleshooting

### Model Won't Load

- **Check WebGPU**: Ensure your browser supports WebGPU
- **Clear Cache**: Try clearing browser cache and reloading
- **Check Console**: Open DevTools to see detailed error messages
- **Update Browser**: Make sure you're on the latest browser version

### Slow Performance

- **GPU Drivers**: Update your graphics card drivers
- **Close Tabs**: Free up GPU memory by closing other tabs
- **Reduce max_tokens**: Lower the response length limit

### Out of Memory

- **Restart Browser**: Close and reopen to free GPU memory
- **Use Smaller Model**: Switch to a more compact model variant
- **Increase RAM**: Ensure you have at least 8GB system RAM

## 📊 Performance Notes

- **First Load**: 1-2GB download, takes 2-10 minutes depending on connection
- **Subsequent Loads**: Model cached, loads in 10-30 seconds
- **Generation Speed**: 5-30 tokens/second depending on hardware
- **Memory Usage**: ~2-4GB GPU RAM, ~1-2GB system RAM

## 🔒 Privacy & Security

- **No Telemetry**: Zero data collection or tracking
- **Local Storage Only**: All data stays in your browser
- **No API Calls**: No external services after model download
- **Open Source**: Fully transparent, auditable code

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## 📚 Resources

- [WebLLM Documentation](https://webllm.mlc.ai/)
- [Gemma Model Card](https://ai.google.dev/gemma)
- [WebGPU Specification](https://www.w3.org/TR/webgpu/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

This is a Spark template project. Feel free to fork and customize for your needs!

## ⚠️ Limitations

- **Hardware Dependent**: Performance varies significantly by GPU
- **Model Size**: Large initial download required
- **Browser Only**: Cannot run in Node.js or native apps
- **Context Limits**: Maximum conversation length depends on model

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🙏 Acknowledgments

- Built with [WebLLM](https://github.com/mlc-ai/web-llm) by MLC AI
- Powered by [Gemma](https://ai.google.dev/gemma) from Google
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ using GitHub Spark**
