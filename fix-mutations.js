import fs from 'fs';
import path from 'path';

function fixFile(file, role) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf-8');
  
  // Replace $fetch('/api/XYZ'
  content = content.replace(/\$fetch\('\/api\/(?!admin|applicant|assessor|reviewer)([^']+)'/g, `$fetch('/api/${role}/$1'`);
  // Replace $fetch(`/api/XYZ`
  content = content.replace(/\$fetch\(`\/api\/(?!admin|applicant|assessor|reviewer)([^/]+)/g, `$fetch(\`/api/${role}/$1`);

  fs.writeFileSync(p, content, 'utf-8');
}

const adminFiles = ['applications.vue', 'audits.vue', 'invoices.vue', 'payments.vue', 'support.vue', 'users.vue'];
adminFiles.forEach(f => fixFile(`dashboard/pages/admin/${f}`, 'admin'));

