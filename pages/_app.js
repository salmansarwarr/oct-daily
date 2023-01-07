//STYLES
import "../styles/globals.css";
//NEXTJS
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>crud app</title>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
