import "../styles/globals.css";
import "../styles/Layout1.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {Component.Layout ? (
        <Component.Layout>
          <Component {...pageProps} />
        </Component.Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
