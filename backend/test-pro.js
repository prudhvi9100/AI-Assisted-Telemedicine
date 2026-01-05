require('dotenv').config();
const fetch = require('node-fetch');

async function test() {
    console.log("Testing Gemini API (gemini-pro)...");
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Key:", apiKey);

    const prompt = "Test prompt";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        console.log("Status:", response.status);
        const data = await response.json();

        if (data.error) {
            console.log("API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Success!");
            console.log("Response:", JSON.stringify(data, null, 2));
        }

    } catch (e) {
        console.error("Fetch error:", e);
    }
}
test();
