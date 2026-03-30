<script setup lang="ts">
const loadingStats = ref(true)

onMounted(() => {
  setTimeout(() => {
    loadingStats.value = false
  }, 900)
})

const statItems = [
  { label: 'Active Applications', value: '1,248' },
  { label: 'Accredited Bodies', value: '386' },
  { label: 'Average Processing Time', value: '21 Days' },
  { label: 'National Coverage', value: '47 Counties' }
]

const serviceItems = [
  { title: 'Laboratory Accreditation', description: 'End-to-end workflows for testing and calibration laboratories.', icon: 'i-heroicons-beaker' },
  { title: 'Certification Bodies', description: 'Digital management of certification body assessments and decisions.', icon: 'i-heroicons-check-badge' },
  { title: 'Inspection Bodies', description: 'Structured inspections, findings management, and review trails.', icon: 'i-heroicons-clipboard-document-check' },
  { title: 'Technical Reviews', description: 'Evidence-driven reviewer workspace and decision controls.', icon: 'i-heroicons-magnifying-glass-circle' }
]

const steps = [
  { title: 'Create Profile', text: 'Applicant creates account and organization profile.' },
  { title: 'Submit Application', text: 'Complete digital forms and upload required documents.' },
  { title: 'Assessment', text: 'Assessor performs review, site scheduling, and evidence capture.' },
  { title: 'Decision', text: 'Technical reviewers and administrators finalize accreditation.' }
]

const timelineItems = [
  { title: 'Application Intake', description: 'Initial completeness review and assignment.' },
  { title: 'Desk Assessment', description: 'Detailed technical and compliance analysis.' },
  { title: 'On-site Assessment', description: 'Site visit scheduling, evidence capture, and findings.' },
  { title: 'Corrective Actions', description: 'Applicant resolves non-conformities.' },
  { title: 'Final Decision', description: 'Approval, rejection, or conditional accreditation outcome.' }
]

const faqItems = [
  { label: 'How long does accreditation take?', content: 'The average processing timeline is 21 working days depending on scope and document completeness.' },
  { label: 'Can I track my application status?', content: 'Yes, AIMS provides real-time tracking for each workflow stage, including notifications.' },
  { label: 'What documents are required?', content: 'Core legal and technical documents, quality manuals, and evidence of implementation are required.' }
]
</script>

<template>
  <div>
    <SectionsSectionHero
      eyebrow="National Accreditation Platform"
      title="Accreditation Information Management System"
      description="A secure and transparent digital platform for accreditation applications, assessments, and decisions across Kenya."
      image-url="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"
      primary-label="Start Application"
      primary-to="/auth/register"
      secondary-label="View Services"
      secondary-to="/services"
    />

    <section class="py-16 md:py-20">
      <UContainer class="max-w-7xl mx-auto">
        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <template v-if="loadingStats">
            <UCard v-for="index in 4" :key="index" class="rounded-xl shadow-lg">
              <USkeleton class="h-5 w-2/3" />
              <USkeleton class="h-10 w-1/2 mt-3" />
            </UCard>
          </template>

          <UCard v-else v-for="item in statItems" :key="item.label" class="rounded-xl shadow-lg hover:-translate-y-1 transition-transform">
            <p class="text-sm text-muted">{{ item.label }}</p>
            <p class="mt-2 text-3xl font-bold text-[#003087] dark:text-primary-300">{{ item.value }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <SectionsSectionSplit
      title="About AIMS"
      description="AIMS modernizes accreditation by connecting applicants, assessors, technical reviewers, and administrators in one secure digital workspace with complete auditability."
      image-url="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600"
    />

    <SectionsSectionCards title="Services Overview" subtitle="Accreditation services tailored to national and international quality standards." :items="serviceItems" :columns="4" />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-8">How It Works</h2>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <UCard v-for="(step, idx) in steps" :key="step.title" class="rounded-xl shadow-lg">
            <UBadge color="primary" variant="soft" class="mb-3">Step {{ idx + 1 }}</UBadge>
            <h3 class="font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-sm text-muted">{{ step.text }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <SectionsSectionTimeline title="Accreditation Process Timeline" :items="timelineItems" />

    <SectionsSectionCards
      title="Benefits"
      :items="[
        { title: 'Faster Processing', description: 'Automated workflows reduce turnaround time.', icon: 'i-heroicons-bolt' },
        { title: 'Traceable Decisions', description: 'Audit logs and timelines improve accountability.', icon: 'i-heroicons-document-magnifying-glass' },
        { title: 'Lower Administrative Burden', description: 'Centralized documentation and role-based tasks.', icon: 'i-heroicons-archive-box' },
        { title: 'Secure Collaboration', description: 'Controlled access between all stakeholders.', icon: 'i-heroicons-shield-check' }
      ]"
      :columns="4"
    />

    <SectionsSectionCards
      title="Feature Grid"
      :items="[
        { title: 'Document Repository', description: 'Versioned evidence and report storage.', icon: 'i-heroicons-folder-open' },
        { title: 'Assessment Scheduling', description: 'Integrated visit planning and calendars.', icon: 'i-heroicons-calendar-days' },
        { title: 'Automated Notifications', description: 'Stay informed with lifecycle alerts.', icon: 'i-heroicons-bell-alert' },
        { title: 'Analytics Dashboards', description: 'KPIs and trends for strategic oversight.', icon: 'i-heroicons-chart-bar-square' }
      ]"
      :columns="4"
    />

    <SectionsSectionCards
      title="User Roles"
      subtitle="Dedicated experiences and responsibilities for each participant in the accreditation lifecycle."
      :items="[
        { title: 'System Admin', description: 'Manages users, permissions, and platform governance.' },
        { title: 'Accreditation Assessor', description: 'Conducts assessments and evidence validation.' },
        { title: 'Applicant', description: 'Submits applications, documents, and corrective actions.' },
        { title: 'Technical Reviewer', description: 'Evaluates findings and supports final decisions.' }
      ]"
      :columns="4"
    />

    <SectionsSectionCards
      title="Testimonials"
      :items="[
        { title: 'National Lab Network', description: 'AIMS reduced our submission cycle by over 35% and improved clarity across all stages.' },
        { title: 'Regional Certification Body', description: 'The role-specific workflow and updates made coordination exceptionally efficient.' },
        { title: 'Inspection Partner', description: 'The dashboard insights and audit trail improved our quality governance significantly.' }
      ]"
      :columns="3"
    />

    <SectionsSectionCards
      title="Case Studies"
      :items="[
        { title: 'Food Safety Program', description: 'Scaled accreditation for 60+ laboratories in under one year.', badge: 'Impact' },
        { title: 'Health Diagnostics Initiative', description: 'Accelerated technical reviews for critical regional facilities.', badge: 'Efficiency' },
        { title: 'Industrial Calibration Rollout', description: 'Improved compliance outcomes through standardized workflows.', badge: 'Compliance' }
      ]"
      :columns="3"
    />

    <SectionsSectionCTA
      title="Ready to modernize accreditation management?"
      description="Adopt a secure national platform that supports transparent and efficient accreditation operations."
      button-label="Create Account"
      button-to="/auth/register"
    />

    <SectionsSectionCards
      title="News & Updates"
      :items="[
        { title: 'Portal Upgrade', description: 'Enhanced assessor workspace and analytics module released this quarter.' },
        { title: 'Standards Bulletin', description: 'Updated compliance guidance for ISO/IEC frameworks now available.' },
        { title: 'Capacity Building', description: 'Upcoming training sessions for applicants and assessors published.' }
      ]"
      :columns="3"
    />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-8">Partners</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <UCard v-for="item in ['KEBS', 'NEMA', 'MOH', 'KRA', 'KIRDI', 'NCA']" :key="item" class="rounded-xl grid place-items-center py-6 text-sm font-semibold text-muted">
            {{ item }}
          </UCard>
        </div>
      </UContainer>
    </section>

    <SectionsSectionFAQ title="Frequently Asked Questions" :items="faqItems" />

    <section class="py-14 bg-[#003087] text-white">
      <UContainer class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold">Need help choosing the right accreditation pathway?</h2>
          <p class="text-white/90 mt-1">Our support team can guide your application end-to-end.</p>
        </div>
        <UButton to="/contact" color="neutral" size="lg" class="text-[#003087]">Contact Support</UButton>
      </UContainer>
    </section>
  </div>
</template>
