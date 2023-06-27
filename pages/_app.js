import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <>
            {/* Head component from Next.js to manage the document head */}
            <Head>
                <title>crud app</title>
                {/* Specify the favicon for the application */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            {/* Render the main component */}
            <Component {...pageProps} />
        </>
    );
}
