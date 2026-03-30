<script setup lang="ts">
const sections = [
  { id: 'acceptance', heading: 'Acceptance of Terms', body: 'By accessing AIMS, users agree to comply with these Terms and all applicable legal and regulatory obligations.' },
  { id: 'definitions', heading: 'Definitions', body: 'Terms such as applicant, assessor, reviewer, and administrator are interpreted according to platform governance guidelines.' },
  { id: 'eligibility', heading: 'Eligibility', body: 'Users must provide valid identity and organizational information and must be authorized to act on behalf of their entities.' },
  { id: 'account-security', heading: 'Account Security', body: 'Users are responsible for safeguarding credentials and notifying support immediately in cases of suspected unauthorized access.' },
  { id: 'permitted-use', heading: 'Permitted Use', body: 'AIMS may only be used for lawful accreditation-related activities and official communication purposes.' },
  { id: 'prohibited-use', heading: 'Prohibited Use', body: 'Users must not upload malicious content, attempt unauthorized access, or misuse platform workflows.' },
  { id: 'submission-obligations', heading: 'Submission Obligations', body: 'All submitted data and documents must be accurate, current, and verifiable upon request.' },
  { id: 'service-availability', heading: 'Service Availability', body: 'AIMS targets high availability but may undergo planned maintenance, upgrades, or emergency interventions.' },
  { id: 'intellectual-property', heading: 'Intellectual Property', body: 'Platform branding, system assets, and proprietary content remain protected under relevant intellectual property laws.' },
  { id: 'fees-payments', heading: 'Fees and Payments', body: 'Applicable service fees, invoicing timelines, and settlement rules are defined by service policy and published schedules.' },
  { id: 'suspension-termination', heading: 'Suspension and Termination', body: 'Accounts may be suspended or terminated for violations, misrepresentation, or threats to platform integrity.' },
  { id: 'disclaimers', heading: 'Disclaimers', body: 'Service outcomes depend on compliance evidence quality and procedural requirements; no accreditation outcome is guaranteed.' },
  { id: 'liability', heading: 'Limitation of Liability', body: 'Operators are not liable for indirect damages, third-party outages, or losses resulting from user-side negligence.' },
  { id: 'governing-law', heading: 'Governing Law and Jurisdiction', body: 'These Terms are governed by applicable national law and disputes are handled under competent legal jurisdiction.' },
  { id: 'changes', heading: 'Changes to Terms', body: 'Terms may be revised periodically; continued use after publication constitutes acceptance of updated terms.' }
]

const toc = sections.map(section => ({
  id: section.id,
  label: section.heading
}))
</script>

<template>
  <SectionsSectionLegalDoc title="Terms and Conditions" updated-at="30 March 2026" :toc="toc" :sections="sections" />
</template>
