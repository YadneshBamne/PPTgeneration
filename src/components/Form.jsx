import React, { useState } from "react";
import { generateSlideContent, fetchImage } from "../utils/aiUtils";

const Form = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const slideData = await generateSlideContent(topic);

      if (!slideData || typeof slideData !== "object" || !Array.isArray(slideData.slides)) {
        setError("⚠️ No valid slides generated. Try another topic.");
        setSlides([]); // Prevents crash
        return;
      }

      // Fetch images for each slide title
      const slidesWithImages = await Promise.all(
        slideData.slides.map(async (slide) => {
          const image = await fetchImage(slide.title);
          return {
            ...slide,
            image: image || "https://via.placeholder.com/150", // Default image if not found
          };
        })
      );

      setSlides(slidesWithImages);
    } catch (err) {
      console.error("❌ Error generating slides:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">AI PPT Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic..."
        className="border p-2 w-full mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !topic.trim()}
      >
        {loading ? "Generating..." : "Generate Slides"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h2 className="text-lg font-semibold">{slide.title}</h2>

              {/* Check if slide.content is an object with bullet points */}
              {typeof slide.content === "object" && slide.content.bullet_points ? (
                <ul className="list-disc ml-4">
                  {slide.content.bullet_points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>{slide.content}</p>
              )}

              {slide.image && <img src={slide.image} alt={slide.title} className="mt-2 w-full" />}
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No slides generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default Form;
