export function MinimalTemplate({ data, subtotal, tax, discount, total, currencySymbol }) {
  return (
    <div className="p-8 md:p-12">
      {/* Header Image */}
      {data.headerImage && (
        <div className="mb-12 -mx-8 -mt-8 md:-mx-12 md:-mt-12">
          <img
            src={data.headerImage}
            alt="Header"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div>
          {data.logo && (
            <img
              src={data.logo}
              alt="Company Logo"
              className="w-16 h-16 object-contain mb-4"
            />
          )}
          <h1 className="text-xl font-medium text-slate-900 mb-1">
            {data.companyName || 'Your Company'}
          </h1>
          <div className="text-sm text-slate-500 whitespace-pre-line leading-relaxed">
            {data.companyAddress || 'Company Address'}
          </div>
          {(data.companyEmail || data.companyPhone) && (
            <div className="text-sm text-slate-500 mt-2 leading-relaxed">
              {data.companyEmail && <div>{data.companyEmail}</div>}
              {data.companyPhone && <div>{data.companyPhone}</div>}
            </div>
          )}
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-slate-400 mb-1">Invoice</p>
          <p className="text-lg font-medium text-slate-900 mb-4">{data.invoiceNumber}</p>
          <div className="text-sm text-slate-500 space-y-1">
            <p>Issued: {data.invoiceDate}</p>
            <p>Due: {data.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-16">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Bill To</p>
        <div className="text-slate-900">
          <p className="text-base font-medium">{data.clientName || 'Client Name'}</p>
          <p className="text-sm text-slate-500 whitespace-pre-line mt-1 leading-relaxed">
            {data.clientAddress || 'Client Address'}
          </p>
          {data.clientEmail && (
            <p className="text-sm text-slate-500 mt-2">{data.clientEmail}</p>
          )}
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-16">
        <div className="space-y-0">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-start py-4 border-b border-slate-100"
            >
              <div className="flex-1">
                <p className="text-slate-900 font-medium">{item.description || '—'}</p>
                <p className="text-sm text-slate-400 mt-0.5">
                  {item.quantity} × {currencySymbol}{item.rate.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-900">{currencySymbol}{item.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-full md:w-64 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="text-slate-900">{currencySymbol}{subtotal.toFixed(2)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax ({data.taxRate}%)</span>
              <span className="text-slate-900">{currencySymbol}{tax.toFixed(2)}</span>
            </div>
          )}
          {data.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Discount ({data.discount}%)</span>
              <span className="text-red-500">-{currencySymbol}{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-medium pt-4 border-t border-slate-200">
            <span className="text-slate-900">Total</span>
            <span className="text-slate-900">{currencySymbol}{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Notes</p>
          <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
            {data.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-20 text-center">
        <p className="text-xs text-slate-300">
          Thank you
        </p>
      </div>
    </div>
  );
}
