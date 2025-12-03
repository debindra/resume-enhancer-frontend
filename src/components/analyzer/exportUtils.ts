/**
 * Trigger print dialog with styled resume HTML
 * The user can then save as PDF from the print dialog
 */
export const printResumeToPdf = async (content: string, template: ResumeTemplateKey): Promise<void> => {
  const htmlContent = buildHtmlDocument(content, template);
  
  // Create a new window/iframe for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Unable to open print window. Please allow popups.');
  }
  
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Trigger print dialog
  printWindow.focus();
  printWindow.print();
  
  // Close after print (user can cancel)
  setTimeout(() => {
    printWindow.close();
  }, 100);
};

/**
 * Create a PDF-ready HTML blob that opens in a new tab for printing
 * This provides the best quality match to the web preview
 */
export const createPdfBlob = async (content: string, template: ResumeTemplateKey): Promise<Blob> => {
  const htmlContent = buildHtmlDocument(content, template);
  
  // Add print-specific styles
  const printOptimizedHtml = htmlContent.replace(
    '</head>',
    `<style>
      @media print {
        body { margin: 0; padding: 0; }
        @page { margin: 0; size: letter; }
      }
    </style>
    </head>`
  );
  
  return new Blob([printOptimizedHtml], { type: 'text/html' });
};

export interface ParsedSection {
  title: string;
  paragraphs: string[];
  bullets: string[];
}

export interface ParsedResume {
  header?: {
    name: string;
    contactLines: string[];
  };
  sections: ParsedSection[];
}

export type ResumeTemplateKey = "modern" | "classic" | "accent";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getTemplateStyles = (template: ResumeTemplateKey) => {
  if (template === "classic") {
    return `
      body { font-family: "Segoe UI", Arial, sans-serif; margin: 0; background: #f8fafc; }
      .page { width: 8.5in; min-height: 11in; margin: 0 auto; background: #fff; display: flex; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 60px rgba(15, 23, 42, 0.18); }
      .sidebar { width: 2.4in; background: #0f172a; color: #f8fafc; padding: 1.8in 0.7in; }
      .content { flex: 1; padding: 1.8in 1.4in; color: #1f2937; }
      h1 { font-size: 28px; margin: 0 0 18px 0; font-weight: 600; }
      h2 { font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 16px 0; color: #6b7280; }
      p { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; }
      li { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; display: flex; gap: 8px; }
      ul { padding: 0; margin: 0; list-style: none; }
      .dot { width: 6px; height: 6px; border-radius: 999px; background: #818cf8; margin-top: 6px; flex-shrink: 0; }
      .contact li { display: block; font-size: 12px; color: #cbd5f5; }
      .section { margin-bottom: 28px; }
    `;
  }

  if (template === "accent") {
    return `
      body { font-family: "Calibri", "Helvetica Neue", sans-serif; margin: 0; background: #edf2ff; }
      .page { width: 8.5in; min-height: 11in; margin: 0 auto; background: #fff; border-radius: 30px; overflow: hidden; display: grid; grid-template-columns: 220px 1fr; box-shadow: 0 25px 60px rgba(14, 116, 144, 0.22); }
      .sidebar { background: linear-gradient(180deg, #4338ca, #7c3aed, #db2777); color: #fff; padding: 2in 0.9in; }
      .content { padding: 2in 1.4in; color: #1f2937; }
      h1 { font-size: 30px; margin: 0 0 18px 0; font-weight: 600; }
      h2 { font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 16px 0; color: #334155; }
      p { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; }
      ul { list-style: none; padding: 0; margin: 0; }
      li { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; display: flex; gap: 10px; }
      .dot { width: 6px; height: 6px; border-radius: 999px; background: #4338ca; margin-top: 6px; flex-shrink: 0; }
      .contact li { color: rgba(255, 255, 255, 0.88); }
      .section { margin-bottom: 28px; }
      .section-heading { display: flex; align-items: center; gap: 12px; }
      .bar { width: 6px; height: 28px; border-radius: 999px; background: #4338ca; }
    `;
  }

  return `
    body { font-family: "Inter", "Helvetica Neue", sans-serif; margin: 0; background: #f1f5f9; }
    .page { width: 8.5in; min-height: 11in; margin: 0 auto; background: #fff; padding: 1.8in 1.4in; border-radius: 30px; box-shadow: 0 25px 60px rgba(71, 85, 105, 0.2); position: relative; overflow: hidden; }
    .accent { position: absolute; left: 0; top: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899); }
    h1 { font-size: 30px; margin: 0 0 18px 0; text-align: center; font-weight: 600; }
    h2 { font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; margin: 0 0 16px 0; color: #475569; }
    p { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; color: #334155; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { margin: 0 0 10px 0; line-height: 1.6; font-size: 12px; display: flex; gap: 8px; color: #334155; }
    .dot { width: 6px; height: 6px; border-radius: 999px; background: #6366f1; margin-top: 6px; flex-shrink: 0; }
    .contact { text-align: center; font-size: 12px; color: #64748b; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 36px; }
    .section { margin-bottom: 28px; }
  `;
};

const buildSectionHtml = (section: ParsedSection) => {
  const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const bullets =
    section.bullets.length > 0
      ? `<ul>${section.bullets.map((bullet) => `<li><span class="dot"></span><span>${escapeHtml(bullet)}</span></li>`).join("")}</ul>`
      : "";

  return `
    <div class="section">
      <h2>${escapeHtml(section.title)}</h2>
      ${paragraphs}
      ${bullets}
    </div>
  `;
};

export const parseResume = (content: string | null | undefined): ParsedResume => {
  if (!content) {
    return { sections: [] };
  }

  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return { sections: [] };

  const blocks = normalized
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) return { sections: [] };

  const [firstBlock, ...remainingBlocks] = blocks;
  const headerLines = firstBlock
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const hasContactInfo =
    headerLines.length >= 2 || (headerLines[0]?.includes("|") ?? false) || (headerLines[0]?.includes("@") ?? false);

  const header =
    hasContactInfo && headerLines.length > 0
      ? {
          name: headerLines[0],
          contactLines: headerLines.slice(1)
        }
      : undefined;

  const sectionBlocks = header ? remainingBlocks : blocks;

  const sections = sectionBlocks.map<ParsedSection>((block) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const [title, ...rest] = lines;

    const bullets: string[] = [];
    const paragraphs: string[] = [];

    rest.forEach((line) => {
      if (line.startsWith("-") || line.startsWith("•")) {
        bullets.push(line.replace(/^[-•]\s*/, "").trim());
      } else {
        paragraphs.push(line);
      }
    });

    return {
      title: title ?? "Section",
      paragraphs,
      bullets
    };
  });

  return { header, sections };
};

export const buildHtmlDocument = (content: string, template: ResumeTemplateKey) => {
  const parsed = parseResume(content);
  const styles = getTemplateStyles(template);

  const sections =
    parsed.sections.length > 0
      ? parsed.sections.map(buildSectionHtml).join("")
      : `<p>${escapeHtml(content)}</p>`;

  const header = parsed.header
    ? `
        <header class="header">
          <h1>${escapeHtml(parsed.header.name)}</h1>
          ${
            parsed.header.contactLines.length > 0
              ? `<ul class="contact">${parsed.header.contactLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
              : ""
          }
        </header>
      `
    : "";

  if (template === "classic") {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Optimized Resume</title>
          <style>${styles}</style>
        </head>
        <body>
          <div class="page">
            <aside class="sidebar">
              ${parsed.header ? `<h1>${escapeHtml(parsed.header.name)}</h1>` : ""}
              ${
                parsed.header && parsed.header.contactLines.length > 0
                  ? `<ul class="contact">${parsed.header.contactLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
                  : ""
              }
            </aside>
            <main class="content">
              ${sections
                .replace(/<h2>/g, `<div class="section-heading"><div class="bar"></div><h2>`)
                .replace(/<\/h2>/g, `</h2></div>`)}
            </main>
          </div>
        </body>
      </html>
    `;
  }

  if (template === "accent") {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Optimized Resume</title>
          <style>${styles}</style>
        </head>
        <body>
          <div class="page">
            <aside class="sidebar">
              ${parsed.header ? `<h1>${escapeHtml(parsed.header.name)}</h1>` : ""}
              ${
                parsed.header && parsed.header.contactLines.length > 0
                  ? `<ul class="contact">${parsed.header.contactLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`
                  : ""
              }
            </aside>
            <main class="content">
              ${sections}
            </main>
          </div>
        </body>
      </html>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Optimized Resume</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="page">
          <div class="accent"></div>
          ${header}
          ${sections}
        </div>
      </body>
    </html>
  `;
};

export const createDocBlob = (content: string, template: ResumeTemplateKey) => {
  const html = buildHtmlDocument(content, template);
  return new Blob([html], { type: "application/msword" });
};

