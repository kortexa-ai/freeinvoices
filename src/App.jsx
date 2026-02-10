import { useState, useCallback } from 'react';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { Header } from './components/Header';

const defaultInvoiceData = {
  companyName: '',
  companyAddress: '',
  companyEmail: '',
  companyPhone: '',
  clientName: '',
  clientAddress: '',
  clientEmail: '',
  invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  items: [
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 }
  ],
  notes: '',
  taxRate: 0,
  discount: 0,
  currency: 'USD',
  template: 'modern',
  font: 'inter',
  logo: null,
  headerImage: null,
};

function App() {
  const [invoiceData, setInvoiceData] = useState(defaultInvoiceData);

  const handleUpdateInvoice = useCallback((updates) => {
    setInvoiceData(prev => ({ ...prev, ...updates }));
  }, []);

  const handleUpdateItem = useCallback((id, field, value) => {
    setInvoiceData(prev => {
      const items = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      });
      return { ...prev, items };
    });
  }, []);

  const handleAddItem = useCallback(() => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), description: '', quantity: 1, rate: 0, amount: 0 }
      ]
    }));
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="no-print">
            <InvoiceForm
              data={invoiceData}
              onUpdate={handleUpdateInvoice}
              onUpdateItem={handleUpdateItem}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div>
            <InvoicePreview data={invoiceData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
