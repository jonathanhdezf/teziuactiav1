import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import DemandsSection from './components/DemandsSection';
import LawSection from './components/LawSection';
import ManifestoSection from './components/ManifestoSection';
import PodcastSection from './components/PodcastSection';
import AboutSection from './components/AboutSection';
import SignatureSection from './components/SignatureSection';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

export default function HomePage() {
  return (
    <>
      <main id="main-content" className="pb-24 md:pb-0 overflow-x-clip relative">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        <div className="section-divider" />
        <ErrorBoundary>
          <ProblemSection />
        </ErrorBoundary>
        <div className="section-divider" />
        <ErrorBoundary>
          <DemandsSection />
        </ErrorBoundary>
        <div className="section-divider" />
        <ErrorBoundary>
          <LawSection />
        </ErrorBoundary>
        <div className="section-divider" />
        <ErrorBoundary>
          <ManifestoSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <PodcastSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <AboutSection />
        </ErrorBoundary>
        <div className="section-divider" />
        <ErrorBoundary>
          <SignatureSection />
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>

      {/* ── Sticky CTA (mobile only) ────────────────────────── */}
      <div className="sticky-cta md:hidden pb-safe text-center">
        <a
          href="#firma"
          id="sticky-cta-btn"
          className="btn-primary w-full py-4 rounded-xl text-[15px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
          Firma la Exigencia
        </a>
      </div>
    </>
  );
}
