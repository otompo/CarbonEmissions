import { SendOutlined } from "@ant-design/icons";
import renderHTML from "react-render-html";

const FullWidthImage = ({
  title = "Track CO2 emissions in near realtime",
  subtitle = "EMISSIONS ",
  fullWidthImage = "/images/carbon_head.jpg",
  content,
}) => (
  <>
    <img src={fullWidthImage} alt="CO2" className="full-img" />

    <main className="content">
      <div className="flex flex-col-reverse align-center justify-center p-10 m-auto md:max-w-4xl md:flex-row">
        <div className="w-full">
          <h1 className="text-white text-3xl font-bold mb-5 md:text-4xl uppercase text-center">
            {title}
          </h1>
          <p className="mb-4 flex flex-wrap items-center justify-center md:justify-start text-center text-xl">
            {renderHTML(content)}
          </p>
        </div>
      </div>
    </main>
  </>
);

export default FullWidthImage;
