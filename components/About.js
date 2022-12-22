import Fade from "react-reveal/Fade";
import renderHTML from "react-render-html";

export default function About({ about }) {
  return (
    <>
      <div className="bg-white lg:py-32 relative">
        <section
        // className="max-width"
        >
          <div className="md:grid grid-cols-2 gap-10 md:place-items-center">
            <div className="md:grid grid-cols-1 gap-10 md:place-items-center">
              <Fade left>
                <article className="px-10">
                  <h2 className="text-red-800 font-bold text-3xl md:text-3xl mb-2 text-uppercase">
                    {about?.title}
                  </h2>
                  <p className="mb-10 text-slate-700">
                    {renderHTML(about?.mainContent)}
                  </p>
                </article>
              </Fade>
            </div>

            <div className="md:grid grid-cols-2 gap-14 md:place-items-center px-10">
              <Fade right>
                <article>
                  <h6 className="text-red-800  text-3xl md:text-xl text-uppercase">
                    {about?.missionTitle}
                  </h6>
                  <p className="mb-10 text-slate-700">
                    {renderHTML(about?.missionContent)}
                  </p>
                </article>

                <article>
                  <h6 className="text-red-800 text-3xl md:text-xl  text-uppercase">
                    {about?.visionTitle}
                  </h6>
                  <p className="mb-10 text-slate-700">
                    {renderHTML(about?.visionContent)}
                  </p>
                </article>
              </Fade>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
