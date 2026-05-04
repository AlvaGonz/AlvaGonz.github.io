import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL_PRIMARY || 'llama-3.3-70b-versatile';

async function improveFile(filePath, context) {
    console.log(`\n🔍 Improving: ${filePath}`);
    console.log(`📝 Context: ${context}`);
    
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    const prompt = `
Act as a Senior Software Architect and Design System Expert. 
Improve the following file based on the provided context.

RULES:
1. Maintain strict adherence to the defined design system (tokens, colors, fonts).
2. Improve code structure, performance, and accessibility.
3. Ensure TypeScript types are correct and optimized.
4. DO NOT introduce changes outside the provided context.
5. If it's a CSS/Tailwind file, ensure semantic token consistency.

CONTEXT:
${context}

FILE CONTENT:
'''
${content}
'''

RESPONSE FORMAT: Only provide the code inside triple backticks. No explanations.
`;

    if (!GROQ_API_KEY) {
        console.error('❌ GROQ_API_KEY is missing. Please set it in your environment or .env file.');
        return;
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        let improvedCode = data.choices[0].message.content;
        
        // Extract content between backticks if present
        const match = improvedCode.match(/```(?:[a-z]*)\n?([\s\S]*?)\n?```/);
        if (match) improvedCode = match[1];

        fs.writeFileSync(filePath, improvedCode);
        console.log(`✅ Improved: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error in ${filePath}:`, error.message);
    }
}

// Simple argument parser
const args = process.argv.slice(2);
let target = '';
let context = '';

for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--target=')) {
        target = args[i].split('=')[1];
    } else if (args[i].startsWith('--context=')) {
        context = args[i].split('=')[1];
    }
}

if (!target || !context) {
    console.log("Usage: node groq-improve.js --target=<file> --context=\"<instructions>\"");
} else {
    await improveFile(target, context);
}
