<script setup lang="ts">
const toc = [
  { id: 'acceptance', label: 'Acceptance' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'responsibilities', label: 'User Responsibilities' },
  { id: 'service', label: 'Service Availability' },
  { id: 'liability', label: 'Liability' },
  { id: 'changes', label: 'Changes to Terms' }
]

const sections = [
  { id: 'acceptance', heading: 'Acceptance', body: 'By using AIMS, users agree to comply with these Terms and applicable legal obligations.' },
  { id: 'eligibility', heading: 'Eligibility', body: 'Users must provide accurate organizational and personal information and maintain authorized access credentials.' },
  { id: 'responsibilities', heading: 'User Responsibilities', body: 'Users are responsible for data accuracy, timely responses, and lawful use of platform services.' },
  { id: 'service', heading: 'Service Availability', body: 'AIMS aims for high availability but may schedule maintenance and service updates as necessary.' },
  { id: 'liability', heading: 'Liability', body: 'Platform operators are not liable for losses resulting from misuse, unauthorized access due to user negligence, or force majeure events.' },
  { id: 'changes', heading: 'Changes to Terms', body: 'Terms may be updated periodically, with latest versions published on this page.' }
]
</script>

<template>
  <SectionsSectionLegalDoc title="Terms and Conditions" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
