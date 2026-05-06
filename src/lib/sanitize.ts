import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHtml = (html: string) => DOMPurify.sanitize(html)
