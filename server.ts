import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to lazily initialize or retrieve GoogleGenAI client safely
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY process env is missing. Check your Secret Settings.");
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint for Rex AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userName, userRole, userDept } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Safe, smart simulated fallback responses if the user's API key is missing
        const lower = message.toLowerCase();
        let reply = "Hello! I am Rex AI, your digital intranet guide for Rex Insurance.\n\n" + 
                    "*(Note: GEMINI_API_KEY is not configured in your Settings secrets yet, so I am running in local fallback mode)*.\n\n";
        
        if (lower.includes("onboard") || lower.includes("new staff") || lower.includes("tasks")) {
          reply += "Welcome on board! You can see your onboarding milestones on the checklist on your Home Dashboard. " +
                   "Make sure to complete the Acculturation Centre course, read the policy documents, and reach out to your buddy Sarah Jenkins!";
        } else if (lower.includes("document") || lower.includes("policy")) {
          reply += "You can access all standard policy guides, claim templates, and our compliance code in the 'Documents & Policies' catalog in the sidebar. " +
                   "For claims, check out the Actuarial guidelines.";
        } else if (lower.includes("lms") || lower.includes("course") || lower.includes("learning")) {
          reply += "As an existing staff member, you have full access to our Learning Management System (LMS) Learning Hub in the sidebar. " +
                   "We have modules spanning Advanced Corporate Leadership, Emotional Intelligence, Actuarial modeling, Underwriting, and Cyber Defense.";
        } else if (lower.includes("help") || lower.includes("support")) {
          reply += "For technical support, you can raise an issue in 'Help & Support', or check the IT Service guidelines. David Kojo is the IT support lead!";
        } else {
          reply += `I appreciate your input: "${message}". Connect your GEMINI_API_KEY via 'Settings > Secrets' on the AI Studio toolbar to unlock my fully generative LLM capabilities. How can I assist you otherwise?`;
        }
        return res.json({ text: reply });
      }

      // Prepare context instruction
      const systemInstruction = 
        `You are Rex AI, the professional executive chatbot & workspace coordinator for Rex Insurance. ` +
        `The company was previously known as Metropulse Insurance, but is now Rex Insurance. ` +
        `The current logged-in employee is named "${userName || 'Employee'}", has the role "${userRole || 'Staff'}", and is in the department "${userDept || 'General'}". ` +
        `Provide helpful, warm, concise alignment to their requests. Direct them to tabs like "Acculturation Catalog/LMS Hub", "Request Centre", "Help & Support", "HR Services", or "Documents & Policies" where appropriate. ` +
        `Never mention server-side details, port numbers, or API configuration parameters. Be clean and direct. Use markdown for lists and bolding.`;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: history || []
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response?.text || "I was unable to formulate a response at this moment." });

    } catch (error: any) {
      console.error("Gemini API Error in Server Side Chat endpoint:", error);
      res.status(500).json({ error: error.message || "An administrative issue occurred with the Rex AI processing system." });
    }
  });

  // Serve Vite assets in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Rex Server] Running securely on port ${PORT}`);
  });
}

startServer();
