# AI Assistant Pro

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ and npm/yarn
* Basic knowledge of React and TypeScript

### Installation
1. Clone the repository:

```bash
git clone https://github.com/Vishu663/ai-assistant-pro.git
cd ai-assistant-pro
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your AI API keys:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Customization

### Connecting to AI APIs
To connect to Google's Gemini AI service, modify the `/app/api/chat/route.ts` file:

```typescript
// Gemini AI integration
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Convert history format to Gemini's expected format
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
    });
    
    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
```
