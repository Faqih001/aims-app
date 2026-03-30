<script setup lang="ts">
const toc = [
  { id: 'commitment', label: 'Commitment' },
  { id: 'standards', label: 'Standards' },
  { id: 'features', label: 'Accessibility Features' },
  { id: 'limitations', label: 'Known Limitations' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'improvements', label: 'Continuous Improvement' }
]

const sections = [
  { id: 'commitment', heading: 'Commitment', body: 'AIMS is committed to inclusive digital access for all users, including persons with disabilities.' },
  { id: 'standards', heading: 'Standards', body: 'The platform aims to align with recognized accessibility best practices and evolving WCAG guidance.' },
  { id: 'features', heading: 'Accessibility Features', body: 'Current features include keyboard navigation support, sufficient contrast, structured headings, and responsive layouts.' },
  { id: 'limitations', heading: 'Known Limitations', body: 'Some legacy documents or embedded resources may not yet meet full accessibility expectations.' },
  { id: 'feedback', heading: 'Feedback', body: 'Users are encouraged to report accessibility barriers through the official support contact channels.' },
  { id: 'improvements', heading: 'Continuous Improvement', body: 'Accessibility audits and remediation updates are prioritized as part of platform maintenance cycles.' }
]
</script>

<template>
  <SectionsSectionLegalDoc title="Accessibility Statement" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
