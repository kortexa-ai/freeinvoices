import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'freeinvoices_company_data';
const LAST_INVOICE_KEY = 'freeinvoices_last_invoice';

// Default invoice data (ephemeral - not persisted)
const defaultInvoiceData = {
  clientName: '',
  clientAddress: '',
  clientEmail: '',
  invoiceNumber: '',
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
};

// Company data that should be persisted
const defaultCompanyData = {
  companyName: '',
  companyAddress: '',
  companyEmail: '',
  companyPhone: '',
  logo: null,
  headerImage: null,
};

/**
 * Parse invoice number pattern and increment
 * Supports patterns like: INV-0001, 2024-001, ABC123, INV/2024/0001
 * Looks for a numeric suffix to increment
 */
function incrementInvoiceNumber(invoiceNumber) {
  if (!invoiceNumber) return `INV-${Date.now().toString(36).toUpperCase()}`;
  
  // Match pattern: any prefix + digits at the end
  // Handles: ABC-1234, ABC123, 1234, INV/2024/0001, etc.
  const match = invoiceNumber.match(/^(.+?)(\d+)$/);
  
  if (!match) {
    // No numeric suffix found, append -001
    return `${invoiceNumber}-001`;
  }
  
  const [, prefix, digits] = match;
  const numLength = digits.length;
  const nextNum = parseInt(digits, 10) + 1;
  
  // Preserve leading zeros (e.g., 001 -> 002, 099 -> 100)
  const nextDigits = nextNum.toString().padStart(numLength, '0');
  
  return `${prefix}${nextDigits}`;
}

/**
 * Custom hook for managing invoice data with localStorage persistence
 * - Company info (name, address, logo, etc.) is persisted
 * - Invoice-specific data (client, items, etc.) resets each session
 * - Invoice number auto-increments based on last used
 */
export function usePersistentInvoice() {
  // Load persisted company data
  const [companyData, setCompanyData] = useState(() => {
    if (typeof window === 'undefined') return defaultCompanyData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultCompanyData, ...JSON.parse(saved) } : defaultCompanyData;
    } catch {
      return defaultCompanyData;
    }
  });

  // Load last invoice number for auto-increment
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(() => {
    if (typeof window === 'undefined') return '';
    try {
      return localStorage.getItem(LAST_INVOICE_KEY) || '';
    } catch {
      return '';
    }
  });

  // Initialize invoice data with persisted company info + auto-incremented number
  const [invoiceData, setInvoiceData] = useState(() => {
    const nextInvoiceNumber = incrementInvoiceNumber(lastInvoiceNumber);
    return {
      ...defaultInvoiceData,
      ...companyData,
      invoiceNumber: nextInvoiceNumber,
    };
  });

  // Read URL params on mount for deep link pre-fill
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const supportedParams = [
      'companyName', 'companyEmail', 'companyPhone', 'companyAddress',
      'clientName', 'clientEmail', 'clientAddress',
    ];

    const updates = {};
    for (const key of supportedParams) {
      const value = params.get(key);
      if (value) {
        updates[key] = value;
      }
    }

    if (Object.keys(updates).length > 0) {
      // Only merge into fields that are currently empty
      setInvoiceData(prev => {
        const merged = { ...prev };
        for (const [key, value] of Object.entries(updates)) {
          if (!prev[key]) {
            merged[key] = value;
          }
        }
        return merged;
      });

      // Clean URL without triggering a page reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist company data whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(companyData));
    } catch (e) {
      console.warn('Failed to save company data:', e);
    }
  }, [companyData]);

  // Track invoice number changes for auto-increment on next visit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (invoiceData.invoiceNumber) {
      localStorage.setItem(LAST_INVOICE_KEY, invoiceData.invoiceNumber);
    }
  }, [invoiceData.invoiceNumber]);

  // Update handler that syncs company data to both states
  const handleUpdateInvoice = useCallback((updates) => {
    setInvoiceData(prev => {
      const next = { ...prev, ...updates };
      
      // Sync company-related fields to companyData
      const companyFields = ['companyName', 'companyAddress', 'companyEmail', 'companyPhone', 'logo', 'headerImage'];
      const companyUpdates = {};
      let hasCompanyUpdate = false;
      
      for (const field of companyFields) {
        if (field in updates) {
          companyUpdates[field] = updates[field];
          hasCompanyUpdate = true;
        }
      }
      
      if (hasCompanyUpdate) {
        setCompanyData(prevCompany => ({ ...prevCompany, ...companyUpdates }));
      }
      
      return next;
    });
  }, []);

  // Reset to new invoice (keeps company data, resets client/items, increments invoice number)
  const handleNewInvoice = useCallback(() => {
    setInvoiceData(prev => {
      const nextInvoiceNumber = incrementInvoiceNumber(prev.invoiceNumber);
      return {
        ...defaultInvoiceData,
        companyName: companyData.companyName,
        companyAddress: companyData.companyAddress,
        companyEmail: companyData.companyEmail,
        companyPhone: companyData.companyPhone,
        logo: companyData.logo,
        headerImage: companyData.headerImage,
        invoiceNumber: nextInvoiceNumber,
      };
    });
  }, [companyData]);

  // Clear all persisted data (for testing/reset)
  const handleClearStoredData = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_INVOICE_KEY);
    setCompanyData(defaultCompanyData);
    setInvoiceData({
      ...defaultInvoiceData,
      invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
    });
  }, []);

  // Item management handlers
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

  return {
    invoiceData,
    companyData,
    setInvoiceData,
    handlers: {
      handleUpdateInvoice,
      handleUpdateItem,
      handleAddItem,
      handleRemoveItem,
      handleNewInvoice,
      handleClearStoredData,
    },
  };
}
