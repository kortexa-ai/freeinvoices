export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
        >
          ← Back
        </a>
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Last updated: February 10, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">The Deal</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This is a free tool for creating invoices. You use it, you get PDFs. 
            No hidden fees, no subscriptions, no surprises.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">You agree to:</p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
            <li>Use the tool for legitimate business purposes</li>
            <li>Not hold us responsible for any tax or legal issues arising from your invoices</li>
            <li>Back up your own data (we store nothing on our servers)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">We agree to:</p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
            <li>Keep the tool working and free</li>
            <li>Not sell your data (we don't have it anyway)</li>
            <li>Not suddenly disappear (but hey, it's free, no guarantees)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The tool is provided "as is." We're not responsible for any financial losses, 
            tax problems, or angry clients. You generate the invoices, you take responsibility for them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Termination</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You can stop using the tool anytime. Just close the tab. 
            Your data stays in your browser until you clear it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Changes</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We might update these terms occasionally. If we do, we'll update this page. 
            Continuing to use the tool means you accept the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Questions?{' '}
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
