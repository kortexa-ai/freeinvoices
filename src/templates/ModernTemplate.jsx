export function ModernTemplate({ data, subtotal, tax, discount, total, currencySymbol }) {
  return (
    <div className="p-8 md:p-12">
      {/* Header Image */}
      {data.headerImage && (
        <div className="mb-8 -mx-8 -mt-8 md:-mx-12 md:-mt-12">
          <img
            src={data.headerImage}
            alt="Header"
            className="w-full h-32 object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="flex items-start gap-4">
          {data.logo && (
            <img
              src={data.logo}
              alt="Company Logo"
              className="w-20 h-20 object-contain"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              {data.companyName || 'Your Company'}
            </h1>
            <div className="text-sm text-slate-600 whitespace-pre-line">
              {data.companyAddress || 'Company Address'}
            </div>
            {(data.companyEmail || data.companyPhone) && (
              <div className="text-sm text-slate-600 mt-2">
                {data.companyEmail && <div>{data.companyEmail}</div>}
                {data.companyPhone && <div>{data.companyPhone}</div>}
              </div>
            )}
          </div>
        </div>
        <div className="text-left md:text-right">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">INVOICE</h2>
          <div className="text-sm text-slate-600">
            <div className="font-medium text-slate-900">{data.invoiceNumber}</div>
            <div className="mt-2">
              <span className="text-slate-500">Date: </span>
              {data.invoiceDate}
            </div>
            <div>
              <span className="text-slate-500">Due: </span>
              {data.dueDate}
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-12">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Bill To
        </h3>
        <div className="text-slate-900">
          <div className="font-semibold text-lg">{data.clientName || 'Client Name'}</div>
          <div className="text-sm text-slate-600 whitespace-pre-line mt-1">
            {data.clientAddress || 'Client Address'}
          </div>
          {data.clientEmail && (
            <div className="text-sm text-slate-600 mt-2">{data.clientEmail}</div>
          )}
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Description
              </th>
              <th className="text-center py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">
                Qty
              </th>
              <th className="text-right py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">
                Rate
              </th>
              <th className="text-right py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-4 text-slate-900">{item.description || '—'}</td>
                <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                <td className="py-4 text-right text-slate-600">
                  {currencySymbol}{item.rate.toFixed(2)}
                </td>
                <td className="py-4 text-right font-medium text-slate-900">
                  {currencySymbol}{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-full md:w-72">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium text-slate-900">
                {currencySymbol}{subtotal.toFixed(2)}
              </span>
            </div>
            {data.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax ({data.taxRate}%)</span>
                <span className="font-medium text-slate-900">
                  {currencySymbol}{tax.toFixed(2)}
                </span>
              </div>
            )}
            {data.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Discount ({data.discount}%)</span>
                <span className="font-medium text-red-600">
                  -{currencySymbol}{discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-3 border-t-2 border-slate-200">
              <span className="text-slate-900">Total</span>
              <span className="text-blue-600">
                {currencySymbol}{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Notes
          </h3>
          <p className="text-sm text-slate-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400">
          Thank you for your business!
        </p>
      </div>
    </div>
  );
}
