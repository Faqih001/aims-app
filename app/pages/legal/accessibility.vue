<script setup lang="ts">
const sections = [
  { id: 'commitment', heading: 'Accessibility Commitment', body: 'AIMS is committed to delivering inclusive digital services accessible to all users, including persons with disabilities.' },
  { id: 'scope', heading: 'Statement Scope', body: 'This statement applies to public-facing pages and authenticated workflows within the AIMS platform.' },
  { id: 'standards', heading: 'Accessibility Standards', body: 'AIMS design and implementation are guided by recognized accessibility standards and evolving best practices.' },
  { id: 'perceivable', heading: 'Perceivable Content', body: 'Text alternatives, semantic structure, and color contrast principles are applied to improve information clarity.' },
  { id: 'operable', heading: 'Keyboard Operability', body: 'Core interactions are designed for keyboard navigation with visible focus indicators and logical tab flow.' },
  { id: 'understandable', heading: 'Understandable Interfaces', body: 'Labels, instructions, and messaging are written to support clarity and reduce ambiguity in complex workflows.' },
  { id: 'robust', heading: 'Robust Technical Compatibility', body: 'AIMS aims to remain compatible with modern browsers and assistive technologies where reasonably practicable.' },
  { id: 'responsive', heading: 'Responsive Accessibility', body: 'Layouts are designed to adapt across mobile, tablet, and desktop while preserving usability and readability.' },
  { id: 'media', heading: 'Media and Visual Content', body: 'Where applicable, visual materials are supplemented with descriptive text and context cues.' },
  { id: 'known-limitations', heading: 'Known Limitations', body: 'Some legacy or third-party embedded resources may not fully satisfy all accessibility expectations.' },
  { id: 'audit-cycle', heading: 'Audit and Review Cycle', body: 'Accessibility checks are performed periodically with prioritized remediation based on impact and risk.' },
  { id: 'training', heading: 'Design and Content Training', body: 'Teams are encouraged to follow accessibility-oriented content and interface creation practices.' },
  { id: 'assistive-feedback', heading: 'Assistive Technology Feedback', body: 'Users are invited to report compatibility issues involving screen readers, magnifiers, and alternative input methods.' },
  { id: 'support', heading: 'Accessibility Support Channels', body: 'Accessibility requests and support inquiries can be submitted through official contact channels.' },
  { id: 'updates', heading: 'Statement Updates', body: 'This statement may be revised to reflect platform improvements and regulatory guidance changes.' }
]

const toc = sections.map(section => ({
  id: section.id,
  label: section.heading
}))
</script>

<template>
  <SectionsSectionLegalDoc title="Accessibility Statement" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
