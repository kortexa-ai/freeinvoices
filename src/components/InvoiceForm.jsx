import { Plus, Trash2, Upload, Image } from 'lucide-react';

const templates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary' },
  { id: 'classic', name: 'Classic', description: 'Traditional and elegant' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and understated' },
];

const fonts = [
  { id: 'inter', name: 'Inter', family: 'var(--font-inter)' },
  { id: 'playfair', name: 'Playfair Display', family: 'var(--font-playfair)' },
  { id: 'mono', name: 'Monospace', family: 'var(--font-mono)' },
];

const currencies = [
  { id: 'USD', symbol: '$', name: 'US Dollar' },
  { id: 'EUR', symbol: '€', name: 'Euro' },
  { id: 'GBP', symbol: '£', name: 'British Pound' },
];

export function InvoiceForm({
  data,
  onUpdate,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ headerImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * (data.taxRate / 100);
  const discount = subtotal * (data.discount / 100);
  const total = subtotal + tax - discount;

  return (
    <div className="space-y-6">
      {/* Template & Design */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Design & Template
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template
            </label>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onUpdate({ template: template.id })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    data.template === template.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{template.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Font
            </label>
            <select
              value={data.font}
              onChange={(e) => onUpdate({ font: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Logo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 border border-slate-300 border-dashed rounded-lg hover:border-slate-400 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  {data.logo ? (
                    <>
                      <Image className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Logo added</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">Upload logo</span>
                    </>
                  )}
                </label>
              </div>
              {data.logo && (
                <button
                  onClick={() => onUpdate({ logo: null })}
                  className="text-xs text-red-600 hover:text-red-700 mt-1"
                >
                  Remove logo
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Header Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeaderUpload}
                  className="hidden"
                  id="header-upload"
                />
                <label
                  htmlFor="header-upload"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 border border-slate-300 border-dashed rounded-lg hover:border-slate-400 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  {data.headerImage ? (
                    <>
                      <Image className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Header added</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">Upload header</span>
                    </>
                  )}
                </label>
              </div>
              {data.headerImage && (
                <button
                  onClick={() => onUpdate({ headerImage: null })}
                  className="text-xs text-red-600 hover:text-red-700 mt-1"
                >
                  Remove header
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          From
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => onUpdate({ companyName: e.target.value })}
              placeholder="Your Company Name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <textarea
              value={data.companyAddress}
              onChange={(e) => onUpdate({ companyAddress: e.target.value })}
              placeholder="Street Address\nCity, State ZIP\nCountry"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={data.companyEmail}
                onChange={(e) => onUpdate({ companyEmail: e.target.value })}
                placeholder="company@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={data.companyPhone}
                onChange={(e) => onUpdate({ companyPhone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Details */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Bill To
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => onUpdate({ clientName: e.target.value })}
              placeholder="Client Name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <textarea
              value={data.clientAddress}
              onChange={(e) => onUpdate({ clientAddress: e.target.value })}
              placeholder="Client Address"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={data.clientEmail}
              onChange={(e) => onUpdate({ clientEmail: e.target.value })}
              placeholder="client@example.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Invoice Details */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Invoice Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Currency
            </label>
            <select
              value={data.currency}
              onChange={(e) => onUpdate({ currency: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {currencies.map((curr) => (
                <option key={curr.id} value={curr.id}>
                  {curr.symbol} - {curr.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={data.invoiceDate}
              onChange={(e) => onUpdate({ invoiceDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => onUpdate({ dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </section>

      {/* Line Items */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Line Items
        </h2>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 items-start p-3 bg-slate-50 rounded-lg"
            >
              <div className="col-span-5">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                  placeholder="Item description"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => onUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="col-span-1">
                <div className="py-2 text-sm font-medium text-slate-700 text-right">
                  {item.amount.toFixed(2)}
                </div>
              </div>
              <div className="col-span-1">
                {data.items.length > 1 && (
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </section>

      {/* Totals */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Totals
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tax Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.taxRate}
              onChange={(e) => onUpdate({ taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={data.discount}
              onChange={(e) => onUpdate({ discount: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">{subtotal.toFixed(2)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax ({data.taxRate}%)</span>
              <span className="font-medium">{tax.toFixed(2)}</span>
            </div>
          )}
          {data.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Discount ({data.discount}%)</span>
              <span className="font-medium text-red-600">-{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-slate-200">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
          Notes
        </h2>
        <textarea
          value={data.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Additional notes, payment instructions, or terms..."
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
        />
      </section>
    </div>
  );
}
