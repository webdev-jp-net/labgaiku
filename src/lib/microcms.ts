import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is not set");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is not set");
}

const window = new JSDOM("<div></div>").window as unknown as Window;
const DOMPurify = createDOMPurify(window);

export const microcmsClientConfig = {
  serviceDomain,
  apiKey,
  sanitizeHtml: (html: string) => DOMPurify.sanitize(html),
};

