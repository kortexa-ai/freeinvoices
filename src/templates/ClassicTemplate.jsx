export function ClassicTemplate({ data, subtotal, tax, discount, total, currencySymbol }) {
  return (
    <div className="p-8 md:p-12">
      {/* Header Image */}
      {data.headerImage && (
        <div className="mb-8 -mx-8 -mt-8 md:-mx-12 md:-mt-12">
          <img
            src={data.headerImage}
            alt="Header"
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        {data.logo && (
          <img
            src={data.logo}
            alt="Company Logo"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {data.companyName || 'Your Company'}
        </h1>
        <div className="text-sm text-slate-600 whitespace-pre-line">
          {data.companyAddress || 'Company Address'}
        </div>
        {(data.companyEmail || data.companyPhone) && (
          <div className="text-sm text-slate-600 mt-2">
            {data.companyEmail && <span>{data.companyEmail}</span>}
            {data.companyEmail && data.companyPhone && <span> | </span>}
            {data.companyPhone && <span>{data.companyPhone}</span>}
          </div>
        )}
      </div>

      {/* Invoice Title & Info */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b-2 border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 tracking-widest uppercase">
          Invoice
        </h2>
        <div className="text-sm text-slate-700 text-center md:text-right">
          <div><span className="font-semibold">Invoice #:</span> {data.invoiceNumber}</div>
          <div><span className="font-semibold">Date:</span> {data.invoiceDate}</div>
          <div><span className="font-semibold">Due Date:</span> {data.dueDate}</div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-12">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">
          Bill To
        </h3>
        <div className="text-slate-900">
          <div className="font-semibold text-lg">{data.clientName || 'Client Name'}</div>
          <div className="text-sm text-slate-700 whitespace-pre-line mt-1">
            {data.clientAddress || 'Client Address'}
          </div>
          {data.clientEmail && (
            <div className="text-sm text-slate-700 mt-2">{data.clientEmail}</div>
          )}
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300">
                Description
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300 w-24">
                Quantity
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300 w-32">
                Unit Price
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300 w-32">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="py-3 px-4 text-slate-900 border border-slate-300">
                  {item.description || '—'}
                </td>
                <td className="py-3 px-4 text-center text-slate-700 border border-slate-300">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-slate-700 border border-slate-300">
                  {currencySymbol}{item.rate.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right font-medium text-slate-900 border border-slate-300">
                  {currencySymbol}{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-full md:w-80">
          <div className="border-2 border-slate-800 p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">Subtotal:</span>
                <span className="font-medium text-slate-900">
                  {currencySymbol}{subtotal.toFixed(2)}
                </span>
              </div>
              {data.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">Tax ({data.taxRate}%):</span>
                  <span className="font-medium text-slate-900">
                    {currencySymbol}{tax.toFixed(2)}
                  </span>
                </div>
              )}
              {data.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">Discount ({data.discount}%):</span>
                  <span className="font-medium text-red-600">
                    -{currencySymbol}{discount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-3 border-t-2 border-slate-300">
                <span className="text-slate-900">Total Due:</span>
                <span className="text-slate-900">
                  {currencySymbol}{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t-2 border-slate-200 pt-8">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Notes & Terms
          </h3>
          <p className="text-sm text-slate-700 whitespace-pre-line">{data.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-300 text-center">
        <p className="text-sm text-slate-600 italic">
          We appreciate your business. Please remit payment by the due date.
        </p>
      </div>
    </div>
  );
}
