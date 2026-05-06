import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/orange/g, 'emerald');
content = content.replace(/slate/g, 'zinc');
fs.writeFileSync('src/App.tsx', content);

let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/slate/g, 'zinc');
cssContent = cssContent.replace(/#0f172a/g, '#18181b'); // slate-900 to zinc-900
cssContent = cssContent.replace(/#f97316/g, '#10b981'); // orange-500 to emerald-500
fs.writeFileSync('src/index.css', cssContent);

console.log('Replacements complete');
