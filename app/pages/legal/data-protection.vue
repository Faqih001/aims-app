<script setup lang="ts">
const sections = [
  { id: 'overview', heading: 'Policy Overview', body: 'This Data Protection Policy sets principles and controls for lawful and secure handling of personal and organizational data in AIMS.' },
  { id: 'principles', heading: 'Protection Principles', body: 'Data handling is guided by lawfulness, fairness, transparency, purpose limitation, minimization, and integrity principles.' },
  { id: 'governance', heading: 'Governance Framework', body: 'Data protection responsibilities are assigned through governance roles, operational controls, and oversight procedures.' },
  { id: 'lawful-basis', heading: 'Lawful Processing Basis', body: 'Processing occurs under legal mandates, public interest functions, and legitimate operational obligations.' },
  { id: 'roles-responsibilities', heading: 'Roles and Responsibilities', body: 'Administrators, assessors, and reviewers access only data necessary for their authorized duties.' },
  { id: 'classification', heading: 'Data Classification', body: 'Information is categorized by sensitivity to apply appropriate technical and administrative safeguards.' },
  { id: 'access-control', heading: 'Access Control', body: 'Role-based access and least-privilege principles govern user permissions across modules and records.' },
  { id: 'retention', heading: 'Retention and Disposal', body: 'Retention schedules align with legal requirements; data is archived or disposed through controlled procedures.' },
  { id: 'sharing', heading: 'Data Sharing Controls', body: 'Sharing is restricted to lawful recipients, authorized stakeholders, and regulated reporting obligations.' },
  { id: 'cross-border', heading: 'Cross-Border Data Handling', body: 'Cross-border transfers require approved safeguards, contractual protections, and governance review.' },
  { id: 'incident-response', heading: 'Incident Response', body: 'Potential data incidents follow defined detection, containment, investigation, remediation, and reporting workflows.' },
  { id: 'audit-logging', heading: 'Audit and Logging', body: 'Critical operations are logged to support accountability, forensic analysis, and compliance verification.' },
  { id: 'vendor-management', heading: 'Third-Party and Vendor Management', body: 'Service providers must meet contractual and security obligations before handling protected information.' },
  { id: 'data-rights', heading: 'Data Subject Requests', body: 'Requests for access, correction, and processing clarifications are handled through formal support channels.' },
  { id: 'policy-review', heading: 'Policy Review and Updates', body: 'This policy is reviewed periodically and updated to reflect legal, technical, and operational changes.' }
]

const toc = sections.map(section => ({
  id: section.id,
  label: section.heading
}))
</script>

<template>
  <SectionsSectionLegalDoc title="Data Protection Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
