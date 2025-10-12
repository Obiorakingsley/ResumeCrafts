declare module "pdf-parse" {
  function pdfParse(dataBuffer: Buffer): Promise<{
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    text: string;
    version: string;
  }>;
  export = pdfParse;
}

declare module "pdfjs-dist/legacy/build/pdf.js";
declare module "pdfjs-dist/legacy/build/pdf.worker.js";
declare module "mammoth" {
  interface MammothOptions {
    includeDefaultStyleMap?: boolean;
    styleMap?: string[];
    convertImage?: (image: any) => Promise<{ src: string }>;
    ignoreEmptyParagraphs?: boolean;
  }
}

declare module "node-fetch";
