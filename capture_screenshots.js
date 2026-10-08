const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve(__dirname, 'screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pages = [
  { name: '01_home_page.png', file: 'index.html', width: 1280, height: 900 },
  { name: '02_aptitude_quiz.png', file: 'aptitude.html', width: 1280, height: 950 },
  { name: '03_dsa_practice.png', file: 'dsa.html', width: 1280, height: 950 },
  { name: '04_companies_guide.png', file: 'companies.html', width: 1280, height: 950 },
  { name: '05_resources_hub.png', file: 'resources.html', width: 1280, height: 950 },
  { name: '06_dashboard_progress.png', file: 'dashboard.html', width: 1280, height: 950 },
  { name: '07_chrome_extension_popup.png', file: 'PrepMate-Extension/popup.html', width: 380, height: 600 }
];

console.log('Capturing screenshots for all PrepMate pages...');

pages.forEach((page) => {
  const targetPath = path.resolve(__dirname, page.file);
  const targetUrl = 'file:///' + targetPath.replace(/\\/g, '/');
  const outFile = path.join(outputDir, page.name);

  console.log(`📸 Capturing ${page.name} from ${page.file}...`);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --hide-scrollbars --window-size=${page.width},${page.height} --screenshot="${outFile}" "${targetUrl}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`✅ Saved: ${page.name} (${fs.statSync(outFile).size} bytes)`);
  } catch (err) {
    console.error(`❌ Error capturing ${page.name}:`, err.message);
  }
});

console.log('\nAll screenshots captured in:', outputDir);
