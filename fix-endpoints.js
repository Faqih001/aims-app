import fs from 'fs';
import path from 'path';

// Files and their simple replace patterns
const replacements = [
  // Admin Endpoints & Mocks
  {
    file: 'dashboard/pages/admin/applications.vue',
    replaces: [
      [/useFetch\('\/api\/applications'/g, "useFetch('/api/admin/applications'"]
    ]
  },
  {
    file: 'dashboard/pages/admin/audits.vue',
    replaces: [
      [/useFetch\('\/api\/audit-logs',\s*\{\s*default:\s*\(\)\s*=>\s*\[[^\]]+\]\s*\}\)/g, "useFetch('/api/admin/audits', { default: () => [] })"]
    ]
  },
  {
    file: 'dashboard/pages/admin/invoices.vue',
    replaces: [
      [/useFetch\('\/api\/invoices'/g, "useFetch('/api/admin/invoices'"]
    ]
  },
  {
    file: 'dashboard/pages/admin/payments.vue',
    replaces: [
      [/useFetch\('\/api\/payments'/g, "useFetch('/api/admin/payments'"]
    ]
  },
  {
    file: 'dashboard/pages/admin/support.vue',
    replaces: [
      [/useFetch\('\/api\/support-tickets'/g, "useFetch('/api/admin/support'"]
    ]
  },
  {
    file: 'dashboard/pages/admin/users.vue',
    replaces: [
      [/useFetch\('\/api\/users'/g, "useFetch('/api/admin/users'"]
    ]
  },

  // Applicant Endpoints
  {
    file: 'dashboard/pages/applicant/documents.vue',
    replaces: [
      [/useFetch\('\/api\/documents'/g, "useFetch('/api/applicant/documents'"]
    ]
  },
  {
    file: 'dashboard/pages/applicant/billing.vue',
    replaces: [
      [/useFetch\('\/api\/invoices'/g, "useFetch('/api/applicant/invoices'"]
    ]
  },

  // Assessor Schedule
  {
    file: 'dashboard/pages/assessor/schedule.vue',
    replaces: [
      [
        /const schedules = ref\(\[[\s\S]*?\]\)/g,
        "const { data: schedules } = await useFetch('/api/assessor/schedule', { default: () => [] })"
      ],
      [
        /sched\.id/g,
        "sched.id"
      ],
      [
        /sched\.title/g,
        "sched.notes || `Application ${sched.applicationId}`"
      ],
      [
        /sched\.date/g,
        "new Date(sched.scheduledAt).toLocaleDateString()"
      ],
      [
        /sched\.time/g,
        "new Date(sched.scheduledAt).toLocaleTimeString()"
      ]
    ]
  }
];

function processFile(item) {
  const filePath = path.resolve(item.file);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping missing file:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  item.replaces.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated:', item.file);
}

replacements.forEach(processFile);
