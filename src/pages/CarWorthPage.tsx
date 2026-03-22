import { PageIntro } from "../components/common/PageIntro";
import { PageContainer } from "../components/layout/PageContainer";

export function CarWorthPage() {
  return (
    <>
      <PageIntro eyebrow="What's My Car Worth" title="What's My Car Worth" summary="Reserved page. Left intentionally blank for now." />

      <section className="section">
        <PageContainer>
          <div className="blank-panel" />
        </PageContainer>
      </section>
    </>
  );
}
