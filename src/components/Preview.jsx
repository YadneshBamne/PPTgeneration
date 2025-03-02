const Preview = ({ slides }) => (
    <div className="mt-4">
      {slides.map((slide, index) => (
        <div key={index} className="p-4 border rounded-lg mb-2">
          <h2 className="text-xl font-bold">{slide.title}</h2>
          <ul>
            {slide.points.map((point, i) => (
              <li key={i}>• {point}</li>
            ))}
          </ul>
          {slide.image && <img src={slide.image} alt="Slide visual" className="mt-2 w-40 h-40" />}
        </div>
      ))}
    </div>
  );
  
  export default Preview;
  