<script setup lang="ts">
const sections = [
  { id: 'intro', heading: 'Introduction', body: 'This Privacy Policy describes how AIMS manages personal and institutional data processed through its accreditation workflows.' },
  { id: 'scope', heading: 'Policy Scope', body: 'The policy applies to all users, applicants, assessors, reviewers, and administrators using AIMS web and service interfaces.' },
  { id: 'lawful-basis', heading: 'Lawful Basis of Processing', body: 'Data processing is conducted under applicable legal mandates and operational requirements for accreditation services.' },
  { id: 'data-collected', heading: 'Categories of Data Collected', body: 'AIMS may process identity data, contact data, organization details, technical submissions, and interaction metadata.' },
  { id: 'collection-methods', heading: 'Methods of Collection', body: 'Information is collected through registration forms, application workflows, document uploads, and support communications.' },
  { id: 'processing-purposes', heading: 'Purpose of Processing', body: 'Data is used to assess compliance, manage lifecycle workflows, communicate status updates, and enforce security controls.' },
  { id: 'data-minimization', heading: 'Data Minimization', body: 'Only information necessary for accreditation and governance functions is requested and retained.' },
  { id: 'accuracy', heading: 'Data Accuracy', body: 'Users are expected to keep their records current; correction requests can be submitted through official support channels.' },
  { id: 'retention', heading: 'Retention and Archiving', body: 'Records are maintained according to legal and policy retention schedules, then archived or disposed using secure procedures.' },
  { id: 'sharing', heading: 'Data Sharing and Disclosure', body: 'Data is shared only with authorized reviewers, relevant regulators, or lawful authorities where required.' },
  { id: 'cross-border', heading: 'Cross-Border Transfers', body: 'Any cross-border handling follows approved safeguards and contractual protections aligned with governing law.' },
  { id: 'security', heading: 'Security Safeguards', body: 'AIMS applies role-based access, transport encryption, logging, and operational monitoring to protect information assets.' },
  { id: 'user-rights', heading: 'Data Subject Rights', body: 'Eligible users may request access, correction, and lawful processing clarifications in accordance with applicable regulations.' },
  { id: 'breach-response', heading: 'Incident and Breach Response', body: 'Security incidents are triaged, contained, investigated, and reported under defined response procedures.' },
  { id: 'policy-updates', heading: 'Policy Updates and Contact', body: 'This policy may be updated periodically; official updates are published on AIMS legal pages with revision dates.' }
]

const toc = sections.map(section => ({
  id: section.id,
  label: section.heading
}))
</script>

<template>
  <SectionsSectionLegalDoc title="Privacy Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
