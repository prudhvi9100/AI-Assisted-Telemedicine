const fetch = require('node-fetch'); // NOTE: If node-fetch isn't installed, we might default to native fetch in Node 18+

// @desc    Analyze symptoms using AI
// @route   POST /api/ai/analyze
// @access  Private
exports.analyzeSymptoms = async (req, res, next) => {
    const { symptoms, age, gender } = req.body;

    if (!symptoms) {
        return res.status(400).json({ success: false, message: 'Please provide symptoms' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;

        // 1. REAL AI MODE (If Key Exists)
        if (apiKey) {
            try {
                const prompt = `
                    Act as a medical AI assistant. Current User: Age ${age}, Gender ${gender}.
                    Symptoms: "${symptoms}".
                    
                    Analyze these symptoms and provide a JSON response (NO MARKDOWN) with the following specific structure:
                    {
                        "prediction": "Most likely condition Name",
                        "confidence": "Low | Medium | High",
                        "description": "Brief 2 line explanation of why this is the likely cause.",
                        "severity": "Low | Medium | High",
                        "recommendation": "What should the patient do? (e.g. Visit General Physician, Rest, Emergency)"
                    }
                    
                    Disclaimer: You are an AI, advise consulting a real doctor.
                `;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    })
                });

                const data = await response.json();

                if (data.error) {
                    console.warn("Gemini API Error (falling back to offline):", data.error.message);
                    // Do not throw, just let it fall through to offline mode
                } else {
                    // Parse the text response which should be JSON
                    const aiText = data.candidates[0].content.parts[0].text;
                    // Clean markdown code blocks if present
                    const cleanJson = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
                    const result = JSON.parse(cleanJson);

                    return res.status(200).json({
                        success: true,
                        data: result
                    });
                }
            } catch (aiError) {
                console.warn("AI Service Exception (falling back to offline):", aiError.message);
                // Fall through to offline mode
            }
        }

        // 2. FALLBACK/OFFLINE MODE (Keyword Matching)
        // This ensures the project works even without an expensive API key for the demo.
        let analysis = {
            prediction: "General Viral Infection",
            confidence: "Medium",
            description: "Based on common patterns, your symptoms suggest a viral infection, but other causes are possible.",
            severity: "Low",
            recommendation: "Rest, hydration, and consult a General Physician if symptoms persist."
        };

        const s = symptoms.toLowerCase();
        if (s.includes('chest') && (s.includes('pain') || s.includes('tight'))) {
            analysis = {
                prediction: "Potential Cardiac or Respiratory Issue",
                confidence: "High",
                description: "Chest pain is a serious symptom that requires immediate attention.",
                severity: "High",
                recommendation: "Seek immediate medical attention or visit the Emergency Room."
            };
        } else if (s.includes('headache') && s.includes('fever')) {
            analysis = {
                prediction: "Viral Fever / Flu",
                confidence: "Medium",
                description: "Combination of headache and fever is common in flu seasons.",
                severity: "Medium",
                recommendation: "Consult a General Physician for medication."
            };
        } else if (s.includes('stomach') || s.includes('abdominal')) {
            analysis.prediction = "Gastritis or Indigestion";
            analysis.recommendation = "Avoid spicy food, hydrate, and see a doctor if pain worsens.";
        }

        // Add a small delay to simulate thinking in offline mode
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.status(200).json({
            success: true,
            data: analysis,
            mode: "offline" // Flag to tell frontend this was a local check
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Analysis Failed' });
    }
};
