import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const window = new JSDOM("<div></div>").window as unknown as Window;
const DOMPurify = createDOMPurify(window);

export const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);

