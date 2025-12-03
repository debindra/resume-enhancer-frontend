import { memo } from "react";
import { parseResume, type ParsedResume, type ResumeTemplateKey } from "./exportUtils";

const SectionContent = ({ section }: { section: ParsedResume["sections"][number] }) => (
  <article className="space-y-3 sm:space-y-4">
    <div className="flex items-center gap-2 sm:gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-sm sm:tracking-[0.25em]">{section.title}</h2>
      <div className="h-px flex-1 bg-slate-200" />
    </div>

    {section.paragraphs.length > 0 ? (
      <div className="space-y-2 text-xs leading-6 text-slate-700 sm:space-y-3 sm:text-sm sm:leading-7">
        {section.paragraphs.map((paragraph, index) => (
          <p key={`${section.title}-p-${index}`} className="whitespace-pre-wrap break-words">
            {paragraph}
          </p>
        ))}
      </div>
    ) : null}

    {section.bullets.length > 0 ? (
      <ul className="space-y-2 text-xs leading-6 text-slate-700 sm:space-y-3 sm:text-sm sm:leading-7">
        {section.bullets.map((bullet, index) => (
          <li key={`${section.title}-b-${index}`} className="flex gap-2 sm:gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500 sm:mt-2 sm:h-2 sm:w-2" />
            <span className="flex-1 break-words">{bullet}</span>
          </li>
        ))}
      </ul>
    ) : null}
  </article>
);

const ModernTemplate = ({ parsed, raw }: { parsed: ParsedResume; raw: string }) => (
  <section className="flex justify-center bg-slate-200/60 p-2 sm:p-4 md:p-6">
    <div className="relative w-full max-w-[880px] rounded-xl bg-slate-200/60 p-3 shadow-inner sm:rounded-2xl sm:p-4 md:rounded-3xl md:p-6">
      <div className="mx-auto min-h-[600px] w-full max-w-[816px] rounded-lg border border-slate-200 bg-white shadow-2xl sm:min-h-[800px] md:min-h-[1056px] md:rounded-xl">
        <div className="relative flex h-full flex-col px-4 py-6 text-slate-800 sm:px-8 sm:py-8 md:px-12 md:py-12">
          <div className="absolute inset-x-4 top-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 sm:inset-x-8 md:inset-x-12" />
          <div className="mt-3 flex-1 sm:mt-4">
            {parsed.header ? (
              <header className="text-center">
                <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">{parsed.header.name}</h1>
                {parsed.header.contactLines.length > 0 ? (
                  <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-slate-600 sm:mt-4 sm:gap-x-4 sm:gap-y-2 sm:text-sm">
                    {parsed.header.contactLines.map((line) => (
                      <span key={line} className="flex items-center gap-1.5 sm:gap-2">
                        <span className="h-1 w-1 rounded-full bg-slate-400" />
                        <span className="break-all">{line}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>
            ) : null}

            <div className={`mt-6 space-y-6 sm:mt-8 sm:space-y-8 md:mt-10 md:space-y-10 ${parsed.header ? "" : "mt-0"}`}>
              {parsed.sections.length > 0 ? (
                parsed.sections.map((section) => (
                  <SectionContent
                    key={`${section.title}-${section.paragraphs.length}-${section.bullets.length}`}
                    section={section}
                  />
                ))
              ) : (
                <article className="text-xs leading-6 text-slate-700 sm:text-sm sm:leading-7">
                  <p className="whitespace-pre-wrap break-words">{raw}</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ClassicTemplate = ({ parsed, raw }: { parsed: ParsedResume; raw: string }) => (
  <section className="flex justify-center bg-slate-100 p-2 sm:p-4 md:p-6">
    <div className="relative w-full max-w-[960px] rounded-xl bg-white p-3 shadow-lg sm:rounded-2xl sm:p-4 md:rounded-3xl md:p-6">
      <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 shadow-2xl sm:min-h-[800px] sm:grid-cols-[200px,1fr] md:min-h-[1056px] md:grid-cols-[260px,1fr] md:rounded-3xl">
        <aside className="flex flex-col gap-4 bg-slate-900 px-6 py-8 text-slate-50 sm:gap-5 sm:px-8 sm:py-10 md:gap-6 md:px-10 md:py-12">
          {parsed.header ? (
            <>
              <h1 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">{parsed.header.name}</h1>
              {parsed.header.contactLines.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-slate-100/80 sm:space-y-2 sm:text-sm">
                  {parsed.header.contactLines.map((line) => (
                    <li key={line} className="break-words">{line}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}
        </aside>
        <main className="bg-white px-4 py-6 text-slate-800 sm:px-8 sm:py-8 md:px-12 md:py-12">
          {parsed.sections.length > 0 ? (
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {parsed.sections.map((section) => (
                <SectionContent
                  key={`${section.title}-${section.paragraphs.length}-${section.bullets.length}`}
                  section={section}
                />
              ))}
            </div>
          ) : (
            <article className="text-xs leading-6 text-slate-700 sm:text-sm sm:leading-7">
              <p className="whitespace-pre-wrap break-words">{raw}</p>
            </article>
          )}
        </main>
      </div>
    </div>
  </section>
);

const AccentTemplate = ({ parsed, raw }: { parsed: ParsedResume; raw: string }) => (
  <section className="flex justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-2 sm:p-4 md:p-6">
    <div className="relative w-full max-w-[900px] rounded-xl bg-white p-3 shadow-inner sm:rounded-2xl sm:p-3 md:rounded-3xl md:p-4">
      <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl sm:min-h-[800px] sm:grid-cols-[180px,1fr] md:min-h-[1056px] md:grid-cols-[240px,1fr] md:rounded-[28px]">
        <aside className="flex flex-col gap-4 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 px-5 py-8 text-white sm:gap-5 sm:px-6 sm:py-10 md:gap-6 md:px-8 md:py-12">
          {parsed.header ? (
            <>
              <h1 className="text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">{parsed.header.name}</h1>
              {parsed.header.contactLines.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-white/80 sm:space-y-2 sm:text-sm">
                  {parsed.header.contactLines.map((line) => (
                    <li key={line} className="break-words">{line}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : null}
        </aside>
        <main className="bg-white px-4 py-6 text-slate-800 sm:px-8 sm:py-10 md:px-10 md:py-12">
          {parsed.sections.length > 0 ? (
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {parsed.sections.map((section) => (
                <SectionContent
                  key={`${section.title}-${section.paragraphs.length}-${section.bullets.length}`}
                  section={section}
                />
              ))}
            </div>
          ) : (
            <article className="text-xs leading-6 text-slate-700 sm:text-sm sm:leading-7">
              <p className="whitespace-pre-wrap break-words">{raw}</p>
            </article>
          )}
        </main>
      </div>
    </div>
  </section>
);

const ResumePreviewComponent = ({ content, template }: { content: string | null | undefined; template: ResumeTemplateKey }) => {
  const safeContent = content ?? "";
  const parsed = parseResume(safeContent);

  switch (template) {
    case "classic":
      return <ClassicTemplate parsed={parsed} raw={safeContent} />;
    case "accent":
      return <AccentTemplate parsed={parsed} raw={safeContent} />;
    case "modern":
    default:
      return <ModernTemplate parsed={parsed} raw={safeContent} />;
  }
};

export const ResumePreview = memo(ResumePreviewComponent);

