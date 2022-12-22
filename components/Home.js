import FullWidthImage from "./FullWidthImage";

export default function Home({ hero }) {
  return (
    <section id="hero">
      <FullWidthImage
        fullWidthImage={hero.fullwithImage.url}
        title={hero.title}
        content={hero.content}
      />
    </section>
  );
}
