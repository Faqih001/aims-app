<script setup lang="ts">
const sections = [
  { id: 'overview', heading: 'Overview', body: 'This Cookie Policy explains how AIMS uses cookies and related technologies to provide secure and effective platform experiences.' },
  { id: 'what-are-cookies', heading: 'What Are Cookies', body: 'Cookies are small text files stored on your device to retain session and preference information.' },
  { id: 'why-we-use', heading: 'Why We Use Cookies', body: 'Cookies support authentication continuity, interface preferences, and service performance diagnostics.' },
  { id: 'essential-cookies', heading: 'Essential Cookies', body: 'Essential cookies are required for login sessions, security controls, and protected page navigation.' },
  { id: 'functional-cookies', heading: 'Functional Cookies', body: 'Functional cookies remember language choices and display preferences for consistent user experience.' },
  { id: 'analytics-cookies', heading: 'Analytics Cookies', body: 'Where enabled, analytics cookies help assess usability patterns and improve service quality.' },
  { id: 'third-party-cookies', heading: 'Third-Party Cookies', body: 'Authorized providers may process limited cookie data to support approved service functionality.' },
  { id: 'cookie-duration', heading: 'Cookie Duration', body: 'Cookies may be session-based or persistent depending on purpose, security, and operational necessity.' },
  { id: 'consent-management', heading: 'Consent Management', body: 'Optional cookie categories are managed through user consent preferences when applicable.' },
  { id: 'browser-controls', heading: 'Browser Controls', body: 'Users can modify or clear cookies through browser settings; disabling some cookies may affect functionality.' },
  { id: 'security-impact', heading: 'Security Impact', body: 'Removing essential cookies can interrupt secure sessions and require re-authentication.' },
  { id: 'mobile-app-context', heading: 'Mobile and Device Context', body: 'Equivalent local storage mechanisms may be used on supported device experiences for session integrity.' },
  { id: 'updates', heading: 'Policy Updates', body: 'Cookie practices may evolve with technical and legal requirements; updates are published on this page.' },
  { id: 'contact', heading: 'Questions and Contact', body: 'Questions about cookie handling can be submitted through official AIMS support and legal channels.' },
  { id: 'effective-date', heading: 'Effective Date', body: 'This Cookie Policy is effective as of the stated update date and supersedes prior versions.' }
]

const toc = sections.map(section => ({
  id: section.id,
  label: section.heading
}))
</script>

<template>
  <SectionsSectionLegalDoc title="Cookie Policy" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
