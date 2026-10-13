import { useEffect } from "react";

type LegalPagesProps = { page: "privacy" | "terms" };
const SUPPORT_EMAIL = "VANT.CLIENSUPPORT@GMAIL.COM";
const UPDATED = "October 13, 2026";

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  useEffect(() => {
    document.title = title + " | VANT";
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main className="min-h-screen bg-[#07090f] text-white px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-12">← Back to VANT</a>
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-10 shadow-[0_0_80px_rgba(124,58,237,0.08)]">
          <p className="text-violet-300 text-xs font-mono tracking-[0.2em] mb-3">VANT · LEGAL</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-3">{title}</h1>
          <p className="text-white/35 text-xs font-mono mb-10">Last updated: {UPDATED}</p>
          <div className="space-y-8 text-white/65 text-sm md:text-base leading-7">{children}</div>
          <div className="mt-12 pt-6 border-t border-white/10 text-sm text-white/45">Questions? Contact <a className="text-violet-300 hover:text-violet-200 underline underline-offset-4" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM</a>.</div>
        </div>
        <footer className="flex gap-6 justify-center text-xs text-white/30 mt-8"><a className="hover:text-white/70" href="/privacy">Privacy</a><a className="hover:text-white/70" href="/terms">Terms</a><a className="hover:text-white/70" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">Contact</a></footer>
      </div>
    </main>
  );
}

export default function LegalPages({ page }: LegalPagesProps) {
  if (page === "privacy") {
    return (
      <LegalLayout title="Privacy Policy">
        <p>This Privacy Policy explains how VANT handles information when you visit the VANT website, request early access, or send us a message. The website currently serves primarily as a product information and early-access site. We may update this policy as the website and services change.</p>
        <section><h2 className="text-white text-xl font-medium mb-2">1. Information you provide</h2><p>If you request early access, the website asks for your email address and may include the context of your request and the time of submission. If you use the contact-sales form, it asks for your name, work email, company, and any message you choose to provide. Please do not submit sensitive personal information through these forms.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">2. How submissions are handled</h2><p>Early-access form submissions are sent to Formspree, a third-party form-processing service, through the website's configured endpoint. The website also attempts to save form entries in local storage in the browser you used. Contact-sales submissions currently have no configured remote submission endpoint and are stored only in that browser's local storage by the website code. Local browser storage is not a shared database and may be removed through your browser settings or by clearing site data. Submission delivery can fail, and you should not assume that a contact-sales request has reached VANT unless we confirm receipt.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">3. Why we use information</h2><p>We use submitted information to manage early-access requests, respond to messages, understand the context of a request, and operate and improve the website. We do not sell personal information. We may rely on service providers that help host or deliver the website or process form submissions; those providers may process information as needed to provide their services under their own terms and privacy practices.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">4. Cookies, local storage, and third-party resources</h2><p>The current website code uses browser local storage for form entries. It also loads fonts from Google Fonts, which means your browser may connect to Google's servers to retrieve those resources. This policy does not claim that no third-party requests occur. Your browser controls can help you manage local storage and restrict third-party requests.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">5. Retention and security</h2><p>Information may remain in the services that process it or in your browser until it is deleted, subject to the applicable provider's systems and policies. We take reasonable steps appropriate to a developing website, but no website, transmission, or storage method can be guaranteed completely secure. Avoid sending confidential or highly sensitive information through the site.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">6. Your choices and requests</h2><p>You can clear this website's local storage through your browser settings. To ask us to access, correct, or delete information you have submitted, contact us at the email below and describe your request. We may need enough information to locate the submission and may be unable to remove copies controlled by an independent service provider; where relevant, we can direct you to that provider's own process.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">7. Children and changes</h2><p>The website is intended for a general audience interested in VANT's products and is not designed to solicit information from children. We may revise this policy as the site develops. We will post the revised version here and update the date above.</p></section>
        <section><h2 className="text-white text-xl font-medium mb-2">8. Contact</h2><p>For privacy questions or requests, email <a className="text-violet-300 underline underline-offset-4" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM</a>.</p></section>
      </LegalLayout>
    );
  }
  return (
    <LegalLayout title="Terms of Service">
      <p>These Terms of Service apply to your use of the VANT website. By accessing or using the website, you agree to these terms. If you do not agree, please do not use the website.</p>
      <section><h2 className="text-white text-xl font-medium mb-2">1. Website and product status</h2><p>The website provides information about VANT and may let visitors request early access or contact the team. Features, integrations, prices, availability, and product descriptions may be planned, illustrative, under development, or subject to change. Website previews and descriptions are not a guarantee that a feature is currently available or will be delivered by a particular date. Any future product or paid service may be subject to additional terms.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">2. Acceptable use</h2><p>You agree not to misuse the website, attempt unauthorized access, interfere with its operation or security, submit unlawful or harmful content, impersonate another person, or use the site in violation of applicable law. You must provide accurate information when submitting a request and should submit only information you are entitled to share.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">3. Early access and communications</h2><p>Submitting an early-access request does not guarantee admission, availability, a particular launch date, or a continuing service. We may contact you about the request you submitted. You can ask us to stop contacting you or to remove your submission by emailing the support address below, subject to applicable records and service-provider limitations.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">4. Intellectual property</h2><p>Unless otherwise indicated, the VANT website, branding, design, text, and other materials are owned by or used with permission by VANT and are protected by applicable intellectual-property laws. You may view and share links to the website for personal or informational purposes, but you may not copy, modify, distribute, or commercially exploit site materials without permission, except where the law allows.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">5. Third-party services and links</h2><p>The website may rely on or link to third-party services. VANT does not control independent third-party websites or services and is not responsible for their content, availability, or policies. Your use of them may be governed by their own terms.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">6. Disclaimers</h2><p>The website and its content are provided on an “as is” and “as available” basis, to the extent permitted by law. We do not guarantee that the website will always be available, error-free, secure, or current, or that descriptions of future functionality will be realized. Nothing in these terms excludes a right or protection that cannot legally be excluded.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">7. Limitation of liability</h2><p>To the extent permitted by applicable law, VANT will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or business arising from use of or inability to use this website. These terms do not limit liability where such limitation is prohibited by law.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">8. Changes and termination</h2><p>We may update, suspend, or discontinue any part of the website at any time. We may revise these terms by posting an updated version here and changing the date above. Continued use after an update means you accept the revised terms, to the extent permitted by law.</p></section>
      <section><h2 className="text-white text-xl font-medium mb-2">9. Contact</h2><p>Questions about these terms can be sent to <a className="text-violet-300 underline underline-offset-4" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM</a>.</p></section>
    </LegalLayout>
  );
}
