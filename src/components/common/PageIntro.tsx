import type { PropsWithChildren } from "react";
import { PageContainer } from "../layout/PageContainer";

type PageIntroProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  summary?: string;
}>;

export function PageIntro({ eyebrow, title, summary, children }: PageIntroProps) {
  return (
    <section className="page-intro">
      <PageContainer>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {summary ? <p className="page-intro-summary">{summary}</p> : null}
        {children}
      </PageContainer>
    </section>
  );
}
