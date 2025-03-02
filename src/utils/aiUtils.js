import axios from "axios";

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY; // Use Google Gemini API Key
const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;




export const generateSlideContent = async (topic) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate a structured PowerPoint outline for "${topic}" in JSON format. Make sure the response is **pure JSON**, without any markdown formatting.

                Example:
                {
                  "slides": [
                    {
                      "title": "Introduction",
                      "content": {
                        "bullet_points": ["Overview of the topic", "Why it's important", "Main themes"]
                      }
                    }
                  ]
                }`
              }
            ],
          },
        ],
      }
    );

    let textResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🚀 FIX: Remove markdown code block if present
    textResponse = textResponse.replace(/```json|```/g, "").trim();

    return JSON.parse(textResponse); // Convert response into JSON format
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    return { slides: [] }; // Return an empty array to prevent crashes
  }
};


export const fetchImage = async (query) => {
  try {
    const res = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        client_id: unsplashKey,
        per_page: 1,
        orientation: "landscape",
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (res.data.results.length > 0) {
      return res.data.results[0].urls.small;
    } else {
      console.warn(`⚠️ No image found for: ${query}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching image:", error.response?.data || error.message);
    return null;
  }
};
