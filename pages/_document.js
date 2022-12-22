import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Sahel Green Tech Initiative is a high standard home healthcare service that is located in Ghana, 
          west Africa providing home health services to Pastors and their wives and the general public at large"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
