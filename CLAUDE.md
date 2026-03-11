# Shared Files Warning

This repo contains files that are **shared across all 12 freetools sites**. These files are duplicated (not linked). The canonical source is `~/src/freetools/shared/`.

**If you modify any of these files, you MUST update the canonical copy and sync to all other repos.**

Shared files in this repo:
- `src/utils/crossSiteTransfer.js` - postMessage-based cross-site file transfer
- `src/components/SendToMenu.jsx` - "Send to..." dropdown menu
- `src/components/ReceiveBanner.jsx` - incoming file notification banner
- `src/hooks/useReceiveFile.js` - hook for receiving cross-site files
- `src/utils/pdfGenerator.js` - HTML-to-PDF generation (html2canvas + pdf-lib)


`src/siteConfig.js` is unique per site and should NOT be synced.

See `~/src/freetools/CLAUDE.md` for full sync protocol and project overview.
