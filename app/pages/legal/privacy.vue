<script setup lang="ts">
const toc = [
  { id: 'scope', label: 'Scope' },
  { id: 'data-collected', label: 'Data Collected' },
  { id: 'processing', label: 'Processing Purposes' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Data Subject Rights' },
  { id: 'security', label: 'Security Controls' }
]

const sections = [
  { id: 'scope', heading: 'Scope', body: 'This Privacy Policy explains how AIMS collects, uses, and safeguards personal and organizational data submitted through the platform.' },
  { id: 'data-collected', heading: 'Data Collected', body: 'AIMS may process identity details, contact information, organization records, technical documents, and audit trails required for accreditation workflows.' },
  { id: 'processing', heading: 'Processing Purposes', body: 'Data is processed to administer accreditation services, evaluate compliance, communicate workflow updates, and support legal obligations.' },
  { id: 'retention', heading: 'Retention', body: 'Records are retained based on statutory requirements and operational policy, then archived or disposed securely.' },
  { id: 'rights', heading: 'Data Subject Rights', body: 'Data subjects may request access, correction, and lawful processing clarifications through designated support channels.' },
  { id: 'security', heading: 'Security Controls', body: 'AIMS implements access controls, logging, encryption in transit, and operational safeguards to protect sensitive data.' }
]
</script>

<template>
  <SectionLegalDoc title="Privacy Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
