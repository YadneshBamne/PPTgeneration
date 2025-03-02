import PptxGenJS from "pptxgenjs";

const createPPT = (slidesData) => {
  let pptx = new PptxGenJS();

  slidesData.forEach((slide) => {
    let slideObj = pptx.addSlide();
    slideObj.slideTransition = { type: "fade", speed: "medium" };
    slideObj.addText(slide.title, { x: 0.5, y: 0.5, fontSize: 24, bold: true });

    slide.points.forEach((point, i) => {
      slideObj.addText(`• ${point}`, { x: 0.5, y: 1 + i * 0.5, fontSize: 16 });
    });

    if (slide.image) {
      slideObj.addImage({ path: slide.image, x: 5, y: 1, w: 3, h: 3, animations: [{ type: "fade", delay: 1.0 }] });
    }
  });

  pptx.writeFile("Generated_Presentation.pptx");
};

export default createPPT;
