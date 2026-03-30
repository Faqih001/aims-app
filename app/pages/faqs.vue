<script setup lang="ts">
const search = ref('')
const activeCategory = ref('General')

const categories = ['General', 'Application', 'Payment', 'Technical', 'Account']

const faqItems = [
  { label: 'What is AIMS?', content: 'AIMS is a digital platform for accreditation applications, assessments, and decision workflows.' },
  { label: 'How do I apply?', content: 'Register, complete organization details, submit scope information, and upload evidence.' },
  { label: 'How do I pay?', content: 'Payment channels are available in the applicant dashboard billing section.' },
  { label: 'Can I reset my password?', content: 'Use the forgot password workflow from login to reset credentials securely.' },
  { label: 'How can I get support?', content: 'Use contact channels or technical support escalation for urgent issues.' }
]

const filteredFaqs = computed(() => {
  const query = search.value.toLowerCase()
  return faqItems.filter(item => item.label.toLowerCase().includes(query) || item.content.toLowerCase().includes(query))
})
</script>

<template>
  <div>
    <SectionHero
      eyebrow="Help Center"
      title="Frequently Asked Questions"
      description="Find clear answers to common accreditation questions and platform guidance."
      image-url="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      primary-label="Contact Support"
      primary-to="/contact"
      secondary-label="Start Application"
      secondary-to="/auth/register"
    />

    <section class="py-12 md:py-16">
      <UContainer class="max-w-5xl mx-auto">
        <UInput v-model="search" placeholder="Search questions..." icon="i-heroicons-magnifying-glass" size="xl" />
      </UContainer>
    </section>

    <section class="py-6">
      <UContainer class="max-w-5xl mx-auto flex flex-wrap gap-2">
        <UButton
          v-for="category in categories"
          :key="category"
          :variant="activeCategory === category ? 'solid' : 'soft'"
          color="primary"
          @click="activeCategory = category"
        >
          {{ category }}
        </UButton>
      </UContainer>
    </section>

    <SectionCards title="General FAQs" :items="[{ title: 'What is accreditation?', description: 'A formal recognition of technical competence and quality systems.' }, { title: 'Why use AIMS?', description: 'To centralize applications, communication, and decisions.' }]" :columns="2" />
    <SectionCards title="Application FAQs" :items="[{ title: 'What documents are required?', description: 'Core legal and technical evidence documents are required.' }, { title: 'Can I update submissions?', description: 'Yes, document updates are supported during review phases.' }]" :columns="2" />
    <SectionCards title="Payment FAQs" :items="[{ title: 'How do I pay?', description: 'Payment instructions are provided in your dashboard.' }, { title: 'Can I receive invoice copies?', description: 'Yes, downloadable invoice records are available.' }]" :columns="2" />
    <SectionCards title="Technical FAQs" :items="[{ title: 'Browser support?', description: 'Latest major browser versions are supported.' }, { title: 'Document formats?', description: 'PDF, DOCX, XLSX, and selected image formats are accepted.' }]" :columns="2" />
    <SectionCards title="Account FAQs" :items="[{ title: 'Password reset?', description: 'Use the forgot password page to reset access.' }, { title: 'Role changes?', description: 'Role changes are handled by authorized administrators.' }]" :columns="2" />

    <SectionFAQ title="Accordion FAQ" :items="filteredFaqs" />

    <SectionCards
      title="Popular Questions"
      :items="[
        { title: 'Average review time', description: 'Typically 21 business days depending on scope.' },
        { title: 'How to track status', description: 'Use application timeline in your dashboard.' },
        { title: 'How to contact assessor', description: 'Use the in-platform communication panel.' }
      ]"
      :columns="3"
    />

    <SectionCards
      title="Help Guides"
      :items="[
        { title: 'Getting Started Guide', description: 'Complete onboarding guide for new applicants.' },
        { title: 'Document Preparation Guide', description: 'Checklist and templates for submissions.' },
        { title: 'Assessment Readiness Guide', description: 'Prepare for desk and on-site assessments.' }
      ]"
      :columns="3"
    />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-8">Video / Tutorials</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <UCard v-for="title in ['How to Register', 'How to Submit Evidence', 'How to Respond to Findings']" :key="title" class="rounded-xl">
            <div class="h-36 rounded-lg bg-default grid place-items-center text-muted">Video Placeholder</div>
            <p class="text-sm font-medium mt-3">{{ title }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <SectionCTA
      title="Still need help?"
      description="Our support teams are ready to assist with technical, process, and policy questions."
      button-label="Contact Support"
      button-to="/contact"
    />

    <section class="py-16 md:py-24">
      <UContainer class="max-w-5xl mx-auto">
        <UCard class="rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold text-[#003087] dark:text-primary-300">Feedback on Answers</h2>
          <p class="text-muted mt-2">Tell us whether this FAQ page answered your question.</p>
          <div class="mt-4 flex gap-3">
            <UButton color="success" variant="soft">Helpful</UButton>
            <UButton color="neutral" variant="soft">Needs Improvement</UButton>
          </div>
        </UCard>
      </UContainer>
    </section>

    <SectionCards
      title="Related Resources"
      :items="[
        { title: 'Policy Documents', description: 'Official policy references and legal notices.' },
        { title: 'Service Standards', description: 'Service charters and SLA expectations.' },
        { title: 'Contact Directory', description: 'Department contacts and escalation routes.' }
      ]"
      :columns="3"
    />
  </div>
</template>