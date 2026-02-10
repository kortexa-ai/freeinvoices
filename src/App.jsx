import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { Header } from './components/Header';
import { usePersistentInvoice } from './hooks/usePersistentInvoice';

function App() {
  const { invoiceData, handlers } = usePersistentInvoice();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="no-print">
            <InvoiceForm
              data={invoiceData}
              onUpdate={handlers.handleUpdateInvoice}
              onUpdateItem={handlers.handleUpdateItem}
              onAddItem={handlers.handleAddItem}
              onRemoveItem={handlers.handleRemoveItem}
              onNewInvoice={handlers.handleNewInvoice}
              onClearStoredData={handlers.handleClearStoredData}
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
