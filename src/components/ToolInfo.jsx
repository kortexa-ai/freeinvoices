import { useEffect } from 'react';

const faqs = [
  {
    question: 'Is my invoice data private?',
    answer:
      'Yes. Everything runs in your browser — your invoice details, client information, and logo never leave your device. Nothing is uploaded or stored on a server, and there is no tracking or analytics.',
  },
  {
    question: 'Are my invoices saved?',
    answer:
      'Your work-in-progress is saved automatically as a draft, and you can save finished invoices to a history panel (up to 50). Both live in your browser’s localStorage on this device only — clearing your browser data removes them.',
  },
  {
    question: 'Can I add my company logo to the invoice?',
    answer:
      'Yes. Upload a logo image (up to 1MB) and it appears on the invoice and in the downloaded PDF. You can also add a header image, and remove either at any time.',
  },
  {
    question: 'Can I customize how the invoice looks?',
    answer:
      'Choose between three templates (Modern, Classic, and Minimal), three fonts (Inter, Playfair Display, and Monospace), and USD, EUR, or GBP currency. Tax rate and discount are also supported.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes, completely free. No account, no sign-up, no watermarks, and no limits on how many invoices you create or download.',
  },
];

const steps = [
  {
    title: 'Fill in the details',
    description: 'Add your business info, client details, line items, tax, and an optional logo.',
  },
  {
    title: 'Pick a style',
    description: 'Choose a template, font, and currency — the preview updates as you type.',
  },
  {
    title: 'Download your PDF',
    description: 'Click Download to save a professional PDF invoice, generated entirely in your browser.',
  },
];

export default function ToolInfo() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-6 pb-12 no-print text-slate-600 dark:text-slate-400">
      <div className="border-t border-slate-200 dark:border-slate-700 pt-10 space-y-10">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Free Invoice Generator
          </h2>
          <p className="text-sm leading-relaxed">
            Create professional PDF invoices online for free — no sign-up, no watermarks, no
            catch. This free invoice generator lets you pick from Modern, Classic, and Minimal
            templates, choose your font and currency, add your logo, and download a polished
            invoice in seconds. Everything happens in your browser, so your business and client
            data stay private.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-4">
            How it works
          </h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {step.title}
                  </h3>
                  <p className="text-sm">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-4">
            Frequently asked questions
          </h2>
          <dl className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {faq.question}
                </dt>
                <dd className="text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
