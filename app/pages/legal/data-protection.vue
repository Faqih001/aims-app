<script setup lang="ts">
const toc = [
  { id: 'principles', label: 'Protection Principles' },
  { id: 'lawful-basis', label: 'Lawful Basis' },
  { id: 'cross-border', label: 'Cross-Border Handling' },
  { id: 'incident', label: 'Incident Response' },
  { id: 'governance', label: 'Governance' },
  { id: 'contact', label: 'Data Protection Contact' }
]

const sections = [
  { id: 'principles', heading: 'Protection Principles', body: 'AIMS applies principles of lawfulness, fairness, purpose limitation, accuracy, and integrity in handling personal data.' },
  { id: 'lawful-basis', heading: 'Lawful Basis', body: 'Data processing occurs under legal and regulatory mandates required to deliver accreditation services.' },
  { id: 'cross-border', heading: 'Cross-Border Handling', body: 'Cross-border data handling follows approved legal safeguards and strict access control requirements.' },
  { id: 'incident', heading: 'Incident Response', body: 'Security incidents are managed through defined escalation, containment, investigation, and reporting procedures.' },
  { id: 'governance', heading: 'Governance', body: 'Data protection oversight includes policy controls, role-based accountability, and compliance monitoring.' },
  { id: 'contact', heading: 'Data Protection Contact', body: 'For data protection inquiries, contact the designated compliance office through official communication channels.' }
]
</script>

<template>
  <SectionsSectionLegalDoc title="Data Protection Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
