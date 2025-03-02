import { useState } from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";
import createPPT from "./components/GeneratePPT";

const App = () => {
  const [slides, setSlides] = useState([]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">AI-Powered PPT Generator</h1>
      <Form setSlides={setSlides} />
      <Preview slides={slides} />
      {slides.length > 0 && (
        <button className="mt-4 bg-green-500 text-white p-2 rounded" onClick={() => createPPT(slides)}>
          Download PPT
        </button>
      )}
    </div>
  );
};

export default App;
