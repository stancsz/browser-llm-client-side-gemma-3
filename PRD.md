# Planning Guide

GemmaChat - A free, privacy-first browser-based AI chat application that runs Google's Gemma 3 model entirely client-side using WebGPU, enabling completely private, offline AI conversations with zero data sharing.

**Experience Qualities**:
1. **Empowering** - Users control their AI experience locally without sending data to servers, ensuring complete privacy
2. **Approachable** - Clean, minimalist interface that demystifies AI technology and emphasizes trustworthiness
3. **Transparent** - Clear communication about privacy, data handling, and the client-side nature of the application

**Complexity Level**: Light Application (multiple features with basic state)
  - Handles model downloading, chat history, and streaming responses with WebGPU acceleration while maintaining a focused user experience

## Essential Features

### Model Loading
- **Functionality**: Downloads and initializes Gemma 3 model in the browser using WebLLM
- **Purpose**: Enable client-side AI inference without server costs or privacy concerns
- **Trigger**: Automatic on first app load, or manual via reload button
- **Progression**: App opens → WebGPU check → Model downloads with progress → Model ready → Chat enabled
- **Success criteria**: Model loads successfully, progress shown clearly, errors handled gracefully

### Chat Interface
- **Functionality**: Send messages and receive AI-generated responses
- **Purpose**: Core interaction with the local LLM
- **Trigger**: User types message and presses send or Enter
- **Progression**: User types → Sends message → Message appears in chat → AI processes → Response streams in → Complete
- **Success criteria**: Messages persist, responses stream smoothly, conversation feels natural

### Conversation History
- **Functionality**: Store and display previous messages in the session
- **Purpose**: Maintain context and allow users to review conversation
- **Trigger**: Automatic on every message exchange
- **Progression**: Message sent → Added to history → Displayed in scrollable view → Persists during session
- **Success criteria**: All messages visible, auto-scrolls to latest, preserves order

### Clear Conversation
- **Functionality**: Reset chat history and start fresh
- **Purpose**: Allow users to begin new conversations without context pollution
- **Trigger**: User clicks clear/reset button
- **Progression**: User clicks clear → Confirmation (optional) → History cleared → Fresh chat ready
- **Success criteria**: All messages removed, model context reset, UI returns to initial state

## Edge Case Handling
- **WebGPU unavailable**: Display clear error message with browser compatibility guidance
- **Model load failure**: Show retry option with error details
- **Network interruption during download**: Pause and resume capability with progress preservation
- **Empty message submission**: Disable send button, provide visual feedback
- **Very long responses**: Implement proper scrolling and token limit warnings

## Design Direction

The design should feel cutting-edge yet approachable - like a professional AI tool that respects user intelligence while remaining inviting. A minimal interface serves the core purpose: facilitating conversation with AI without distraction.

## Color Selection

Triadic color scheme with tech-forward blues, balanced with warm accents to humanize the AI interaction.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Communicates technology, trust, and intelligence
- **Secondary Colors**: Soft Slate (oklch(0.65 0.02 250)) for supporting UI elements, Pure White/Off-white backgrounds for clarity
- **Accent Color**: Vibrant Cyan (oklch(0.70 0.15 200)) - Highlights active states and AI responses
- **Foreground/Background Pairings**:
  - Background (White oklch(0.98 0 0)): Dark text (oklch(0.20 0 0)) - Ratio 16.5:1 ✓
  - Card (Light Gray oklch(0.96 0 0)): Dark text (oklch(0.20 0 0)) - Ratio 15.2:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 8.2:1 ✓
  - Accent (Vibrant Cyan oklch(0.70 0.15 200)): Dark text (oklch(0.20 0 0)) - Ratio 10.1:1 ✓
  - Muted (Light Slate oklch(0.92 0.01 250)): Medium text (oklch(0.50 0.02 250)) - Ratio 5.5:1 ✓

## Font Selection

Modern, technical precision balanced with warmth - using Inter for its excellent screen readability and contemporary feel that suits AI interfaces.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter SemiBold/24px/tight letter spacing
  - H2 (Section Headers): Inter Medium/18px/normal spacing
  - Body (Chat Messages): Inter Regular/15px/relaxed line height (1.6)
  - Small (Status Text): Inter Regular/13px/normal spacing
  - Code (Model Info): Inter Medium/14px/monospace feel

## Animations

Subtle, purposeful motion that communicates processing states and guides attention without feeling gimmicky - animations should feel like natural system feedback.

- **Purposeful Meaning**: Loading states pulse gently to show activity, message appearances fade-slide in to feel conversational, model status changes smoothly to avoid jarring transitions
- **Hierarchy of Movement**: Model loading progress (most prominent) → message streaming (medium) → UI state transitions (subtle)

## Component Selection

- **Components**:
  - Card: Main chat container with subtle elevation
  - ScrollArea: Chat message history with smooth scrolling
  - Input + Button: Message composition area
  - Progress: Model download indicator
  - Alert: Error states and system messages
  - Badge: Model status indicators
  - Separator: Visual division between messages
  - Skeleton: Loading states for messages
  
- **Customizations**:
  - Custom message bubbles (user vs AI) with distinct styling
  - Streaming text component for AI responses
  - Model loading overlay with progress visualization
  
- **States**:
  - Send button: Disabled during loading/processing, accent color when ready
  - Input field: Focused state with accent border, disabled during model load
  - Messages: Subtle hover states, loading skeleton for streaming
  
- **Icon Selection**:
  - PaperPlaneRight: Send message
  - Trash: Clear conversation
  - Warning: Error states
  - Download: Model loading
  - CircleNotch: Processing indicator
  
- **Spacing**: Consistent 4-unit system (16px, 24px, 32px for major sections)

- **Mobile**: 
  - Stack layout vertically
  - Full-width input area fixed to bottom
  - Collapsible header to maximize chat space
  - Touch-friendly button sizes (44px minimum)
  - Adjusted font sizes for readability (16px minimum for body)
