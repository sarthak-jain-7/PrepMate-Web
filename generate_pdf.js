const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = 'file:///' + path.resolve(__dirname, 'PrepMate_Complete_Submission_Report.html').replace(/\\/g, '/');
const pdfOut = path.resolve(__dirname, 'PrepMate_Submission_Report.pdf');
const targetDir = path.resolve(__dirname, 'PrepMate_Academic_Submission');
const targetSubPdf = path.join(targetDir, 'PrepMate_Submission_Report.pdf');

console.log('Generating PDF report via Headless Chrome...');
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfOut}" "${htmlPath}"`;
execSync(cmd, { stdio: 'inherit' });

console.log('✅ Generated PDF at:', pdfOut, `(${fs.statSync(pdfOut).size} bytes)`);

// Ensure target dir exists and copy PDF
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
fs.copyFileSync(pdfOut, targetSubPdf);
console.log('✅ Copied PDF to package:', targetSubPdf);

// Re-generate ZIP archive
const zipPath = path.resolve(__dirname, 'PrepMate_Academic_Submission.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const zipCmd = `powershell -Command "Compress-Archive -Path '${targetDir}' -DestinationPath '${zipPath}' -Force"`;
execSync(zipCmd, { stdio: 'inherit' });
console.log('✅ Updated ZIP archive:', zipPath);
