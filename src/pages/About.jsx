export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          ← Back
        </a>
        <h1 className="text-3xl font-bold mb-8">About</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">What is this?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A simple, free invoicing tool. No signup, no subscription, no data collection. 
            Just create professional invoices and download them as PDFs. 
            Your data stays on your device.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Who made it?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Built by{' '}
            <a 
              href="https://kortexa.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              kortexa.ai
            </a>
            . We make simple tools that respect your privacy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Why is it free?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because invoicing shouldn't be complicated or expensive. 
            Small businesses and freelancers have enough to worry about.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Questions, feedback, or just want to say hi? Email us at{' '}
            <a 
              href="mailto:info@kortexa.ai" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              info@kortexa.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
