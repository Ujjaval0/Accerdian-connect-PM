const fs = require('fs');

const html = fs.readFileSync('index.original.html', 'utf-8');

function htmlToJSX(htmlStr) {
  return htmlStr
    .replace(/class="/g, 'className="')
    .replace(/<!--(.*?)-->/gs, '{/*$1*/}')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
    .replace(/<path([^>]*[^\/])>/g, '<path$1 />')
    .replace(/<rect([^>]*[^\/])>/g, '<rect$1 />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    .replace(/style="([^"]*)"/g, (match, p1) => {
      const styles = {};
      p1.split(';').forEach(s => {
        if (!s.trim()) return;
        const [k, v] = s.split(':');
        if (!k || !v) return;
        const camelK = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styles[camelK] = v.trim();
      });
      return `style={{${Object.entries(styles).map(([k, v]) => `${k}: "${v}"`).join(', ')}}}`;
    });
}

const jsxHtml = htmlToJSX(html);
const pages = ['dashboard', 'community', 'course', 'studyrooms', 'messages', 'profile', 'referrals', 'leaderboard', 'notifications'];

pages.forEach(p => {
  const startStr = `<section className="page${p === 'dashboard' ? ' active' : ''}" id="page-${p}"`;
  const start = jsxHtml.indexOf(startStr);
  if (start === -1) {
    console.log(`Could not find start for ${p}`);
    return;
  }
  
  let end = jsxHtml.indexOf('</section>', start);
  if (p === 'messages') {
    end = jsxHtml.indexOf('</section>', start);
  }
  
  const content = jsxHtml.substring(start, end + 10);
  const innerContent = content.replace(/<section[^>]*>/, '').replace(/<\/section>$/, '');

  const componentStr = `import React from 'react';\n\nexport default function ${p.charAt(0).toUpperCase() + p.slice(1)}() {\n  return (\n    <section className="page active" id="page-${p}">\n      ${innerContent}\n    </section>\n  );\n}\n`;
  
  fs.writeFileSync(`src/pages/${p.charAt(0).toUpperCase() + p.slice(1)}.jsx`, componentStr);
});

console.log("Pages regenerated!");
