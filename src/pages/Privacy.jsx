export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          ← Back
        </a>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Last updated: February 10, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">The Short Version</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We don't collect your data. Your invoices stay on your device. 
            We can't see them, we don't want to see them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">What We Collect</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Nothing. Zero. Your invoice data is stored locally in your browser using localStorage. 
            It never leaves your device. If you clear your browser data, your invoices are gone. 
            That's the trade-off for privacy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Local Storage</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The app stores your invoice data locally on your device. This includes your company info, 
            client details, and invoice history. This data never leaves your device unless you 
            explicitly download or print your invoices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We don't use any analytics, tracking, or third-party services that collect your data. 
            The app is completely self-contained.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We don't knowingly collect information from children under 13. 
            We don't knowingly collect information from anyone. See above.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Changes</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            If we ever change this policy, we'll update this page. 
            But honestly, there's not much to change when you collect nothing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Questions? Concerns? Email us at{' '}
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
