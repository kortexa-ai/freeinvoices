import { ModernTemplate } from '../templates/ModernTemplate';
import { ClassicTemplate } from '../templates/ClassicTemplate';
import { MinimalTemplate } from '../templates/MinimalTemplate';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

const fonts = {
  inter: 'font-inter',
  playfair: 'font-playfair',
  mono: 'font-mono',
};

export function InvoicePreview({ data }) {
  const Template = templates[data.template] || ModernTemplate;
  const fontClass = fonts[data.font] || fonts.inter;

  const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * (data.taxRate / 100);
  const discount = subtotal * (data.discount / 100);
  const total = subtotal + tax - discount;

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const currencySymbol = currencySymbols[data.currency] || '$';

  return (
    <div className="sticky top-24">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 no-print">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
          Preview your invoice below. Click "Download" to save.
        </p>
      </div>
      <div
        id="invoice-preview"
        className={`bg-white shadow-lg ${fontClass}`}
        style={{
          minHeight: '297mm',
          width: '100%',
          maxWidth: '210mm',
          margin: '0 auto',
        }}
      >
        <Template
          data={data}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
          currencySymbol={currencySymbol}
        />
      </div>
    </div>
  );
}
