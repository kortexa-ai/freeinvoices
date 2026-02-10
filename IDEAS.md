# Invoice App Feature Ideas

## Customization & Branding
- Footer image/banner (complement to the header banner)
- Custom color themes (primary/accent colors beyond the template presets)
- Custom fonts (upload your own or more Google Fonts options)
- Signature field/image upload
- Watermark support ("PAID", "DRAFT", etc.)

## Invoice Content
- Multiple tax rates per line item (some jurisdictions need this)
- Line item categories/sections
- Discounts per line item (not just global)
- Shipping/freight charges as a separate line
- Deposit/payment tracking (show amount due vs total)
- Late fee calculation/notice

## Data & Management
- Invoice history/local storage of multiple invoices
- Invoice numbering with auto-increment
- Client address book (save frequent clients)
- Duplicate/clone invoice feature
- Export to different formats (Word, Excel, JSON)
- Import from CSV/Excel

## UX & Workflow
- Live PDF preview (render actual PDF in browser)
- Email invoice directly (with SMTP or email service)
- Send via link (temporary hosted invoice)
- Dark mode for the editor
- Keyboard shortcuts
- Undo/redo

## Business Features
- Multi-currency support with exchange rates
- Multi-language invoices
- Quote/estimate mode (converts to invoice)
- Recurring invoice templates
- Team/multi-user support
- Business registration/VAT number fields

## Technical
- PWA offline support
- Auto-save to localStorage
- Cloud sync (optional)
- QR code for payment links

---

## Easiest to Build (No Backend Required)

Ranked by simplicity:

1. **Auto-save to localStorage** - Already have `usePersistentInvoice` hook, just need to expand it to save full history
2. **Keyboard shortcuts** - Simple event listeners (Ctrl+P for print, Ctrl+S for save, etc.)
3. **Undo/redo** - Keep state history array, navigate through it
4. **Dark mode for the editor** - Tailwind dark mode toggle, mostly CSS changes
5. **Watermark support** - CSS overlay with text like "PAID" or "DRAFT"
6. **Signature field** - Canvas drawing element + save as image
7. **Custom color themes** - CSS variable overrides, stored in localStorage
8. **Invoice numbering auto-increment** - Store last used number in localStorage
9. **Client address book** - localStorage array of saved clients, dropdown to select
10. **Duplicate/clone invoice** - Copy current data to new invoice with new number
11. **Footer banner image** - Mirror of existing header banner feature
12. **VAT/Business registration fields** - Simple input fields added to form
13. **Line item discounts** - Add discount field per row, update calculations
14. **Shipping charges** - Additional input field, add to total calculation
15. **QR code for payment** - Generate QR with payment URL (static, no backend)

**Top 3 Easiest:**
1. Auto-save to localStorage (already partially done)
2. Keyboard shortcuts
3. Dark mode toggle
