<script setup lang="ts">
const toc = [
  { id: 'what', label: 'What Are Cookies' },
  { id: 'types', label: 'Cookie Types' },
  { id: 'usage', label: 'How We Use Cookies' },
  { id: 'controls', label: 'User Controls' },
  { id: 'third-party', label: 'Third-Party Cookies' },
  { id: 'updates', label: 'Policy Updates' }
]

const sections = [
  { id: 'what', heading: 'What Are Cookies', body: 'Cookies are small files placed on your device to support session management and user experience preferences.' },
  { id: 'types', heading: 'Cookie Types', body: 'AIMS uses essential cookies for authentication and optional analytics cookies for service improvement.' },
  { id: 'usage', heading: 'How We Use Cookies', body: 'Cookies help maintain secure sessions, language settings, and interface preferences.' },
  { id: 'controls', heading: 'User Controls', body: 'Users can manage cookie settings in browser controls, though essential cookies are required for secure platform access.' },
  { id: 'third-party', heading: 'Third-Party Cookies', body: 'Authorized third-party service providers may process limited cookie data for functionality and analytics support.' },
  { id: 'updates', heading: 'Policy Updates', body: 'This policy may be revised as technology and legal requirements evolve.' }
]
</script>

<template>
  <SectionLegalDoc title="Cookie Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
