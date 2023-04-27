import '../styles/globals.css'
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Component {...pageProps} />
    </Worker>
  )
}

export default MyApp
