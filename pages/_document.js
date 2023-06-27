import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            {/* Head component from Next.js to manage the document head */}
            <Head />
            <body className="bg-gray-800">
                {/* Render the main content */}
                <Main />
                {/* Render the Next.js script */}
                <NextScript />
            </body>
        </Html>
    );
}
