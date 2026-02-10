#!/usr/bin/env node
/**
 * Script to generate social preview image from HTML
 * 
 * Usage:
 *   node generate-social-preview.js
 * 
 * This will create public/social-preview.png
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateSocialPreview() {
  const htmlPath = path.resolve(__dirname, 'social-preview.html');
  const outputPath = path.resolve(__dirname, 'public', 'social-preview.png');
  
  // Check if puppeteer is installed
  try {
    require.resolve('puppeteer');
  } catch (e) {
    console.log('📦 Puppeteer not found. Installing...');
    console.log('   Run: npm install --save-dev puppeteer');
    process.exit(1);
  }
  
  console.log('🎨 Generating social preview image...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to the exact dimensions we need
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1
  });
  
  // Load the HTML file
  await page.goto('file://' + htmlPath, {
    waitUntil: 'networkidle0'
  });
  
  // Wait for fonts to load
  await page.waitForTimeout(1000);
  
  // Take screenshot
  const element = await page.$('.preview-container');
  await element.screenshot({
    path: outputPath,
    type: 'png'
  });
  
  await browser.close();
  
  console.log(`✅ Social preview generated: ${outputPath}`);
  console.log('📐 Dimensions: 1200x630px');
  console.log('🌐 URL: https://freeinvoices.xyz/social-preview.png');
}

generateSocialPreview().catch(err => {
  console.error('❌ Error generating preview:', err.message);
  process.exit(1);
});
