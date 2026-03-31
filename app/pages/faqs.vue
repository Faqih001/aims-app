<script setup lang="ts">
const search = ref('')
const activeCategory = ref('All')

const categories = ['All', 'General', 'Application', 'Payment', 'Technical', 'Account']

const faqItems = [
  // General
  { category: 'General', label: 'What is AIMS?', content: 'AIMS is a digital platform for accreditation applications, assessments, and decision workflows.' },
  { category: 'General', label: 'Who can apply for accreditation?', content: 'Any conformity assessment body (CAB) operating testing, calibration, medical laboratories, certification, or inspection services can apply.' },
  { category: 'General', label: 'How long does the accreditation process take?', content: 'Typically, the end-to-end process requires anywhere from 3 to 6 months depending on the readiness of the applicant and the complexity of the scope.' },
  { category: 'General', label: 'Is my data secure on the platform?', content: 'Yes. AIMS is built with enterprise-level security, role-based access control, and encrypted data storage.' },
  
  // Application
  { category: 'Application', label: 'How do I start a new application?', content: 'Register your organization, complete the profile details, submit scope information, and upload required evidence via the New Application wizard.' },
  { category: 'Application', label: 'Can I save my application and return later?', content: 'Yes, all draft applications are automatically saved. You can securely log in and resume at any time before final submission.' },
  { category: 'Application', label: 'What documents are required for an application?', content: 'You generally need core legal documents, a quality manual, internal audit reports, management review meeting minutes, and evidence of technical competence.' },
  { category: 'Application', label: 'How do I track my application status?', content: 'You can view real-time status updates via the application timeline available on your applicant dashboard.' },

  // Payment
  { category: 'Payment', label: 'How are fees calculated?', content: 'Fees depend on the type of accreditation, the scope of the assessment, and the number of required assessor days.' },
  { category: 'Payment', label: 'What payment methods do you accept?', content: 'We accept bank transfers, credit cards, and mobile payments. All instructions will be provided on the generated invoice in your billing section.' },
  { category: 'Payment', label: 'Can I download an invoice for my records?', content: 'Yes, downloadable PDF invoices and receipts are available inside the billing and payment module.' },

  // Technical
  { category: 'Technical', label: 'Which web browsers are supported?', content: 'We support the latest versions of Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.' },
  { category: 'Technical', label: 'Is there a limit to document upload sizes?', content: 'Yes, individual file sizes cannot exceed 20MB. For larger documents, we recommend compressing the files before upload.' },
  { category: 'Technical', label: 'What formats are allowed for document uploads?', content: 'Accepted formats include PDF, DOCX, XLSX, and standard image formats like PNG and JPG.' },

  // Account
  { category: 'Account', label: 'How do I reset my password?', content: 'Navigate to the login screen and click "Forgot Password". You will receive a reset link via email to update your credentials securely.' },
  { category: 'Account', label: 'Can my organization have multiple users?', content: 'Yes. Organization administrators can invite additional staff members and assign them customized roles (e.g. Viewer, Contributor, Admin).' },
  { category: 'Account', label: 'How do I change the organization administrator?', content: 'Please submit a formal request via the contact or support portal, along with an official letter of authorization from your management.' }
]

const filteredFaqs = computed(() => {
  const query = search.value.toLowerCase()
  let items = faqItems
  
  // Filter by category if not "General" or another default logic? 
  // Wait, let's filter by the selected category tab:
  if (activeCategory.value !== 'All') {
    items = items.filter(item => item.category === activeCategory.value)
  }
  
  // Filter by search query
  if (query) {
    items = items.filter(item => item.label.toLowerCase().includes(query) || item.content.toLowerCase().includes(query))
  }
  
  return items
})
</script>

<template>
  <div class="bg-gray-50 dark:bg-[#111] min-h-screen">
    <SectionsSectionHero
      eyebrow="Help Center"
      title="How can we help you?"
      description="Find clear answers to common accreditation questions, process details, and platform guidance."
      image-url="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      primary-label="Contact Support"
      primary-to="/contact"
      secondary-label="Start Application"
      secondary-to="/auth/register"
    />

    <!-- Search Section -->
    <section class="py-12 -mt-16 relative z-10">
      <UContainer class="max-w-4xl mx-auto">
        <UCard class="shadow-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800 rounded-2xl p-2 bg-white/90 dark:bg-black/80 backdrop-blur-xl">
          <UInput
            v-model="search"
            placeholder="Type your question here..."
            icon="i-heroicons-magnifying-glass"
            size="xl"
            color="neutral"
            variant="none"
            class="text-lg w-full"
          />
        </UCard>
      </UContainer>
    </section>

    <!-- FAQ Categories & Accordion -->
    <section class="py-12 md:py-20">
      <UContainer class="max-w-4xl mx-auto flex flex-col items-center">
        <!-- Categories -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <UButton
            v-for="category in categories"
            :key="category"
            :variant="activeCategory === category ? 'solid' : 'soft'"
            color="primary"
            size="lg"
            class="rounded-full px-6 transition-all shadow-sm font-semibold"
            @click="activeCategory = category"
          >
            {{ category }}
          </UButton>
        </div>

        <!-- FAQ Items -->
        <div class="w-full">
          <transition-group name="fade" tag="div" class="space-y-4">
            <UAccordion
              v-if="filteredFaqs.length > 0"
              :items="filteredFaqs"
              color="primary"
              variant="soft"
              size="lg"
              class="w-full shadow-sm rounded-xl overflow-hidden text-left bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-gray-800"
            />
            <div v-else class="text-center py-16">
              <UIcon name="i-heroicons-question-mark-circle" class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p class="text-xl font-medium text-gray-600 dark:text-gray-400">No questions found matching your search.</p>
              <UButton class="mt-6" variant="ghost" color="primary" @click="search = ''">Clear Search</UButton>
            </div>
          </transition-group>
        </div>
      </UContainer>
    </section>

    <!-- Helpful Guides (Instead of multiple blocks) -->
    <section class="py-16 md:py-24 bg-white dark:bg-black/50 border-t border-gray-100 dark:border-gray-800">
      <UContainer class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-[#003087] dark:text-primary-400 mb-12">More Resources</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <UCard class="rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
            <UIcon name="i-heroicons-document-text" class="w-10 h-10 mb-4 text-primary-500" />
            <h3 class="text-xl font-semibold mb-2">Help Guides</h3>
            <p class="text-muted text-sm mb-4">Complete onboarding guide and document preparation checklist for new applicants.</p>
            <UButton variant="link" color="primary" class="p-0">View Guides &rarr;</UButton>
          </UCard>

          <UCard class="rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
            <UIcon name="i-heroicons-video-camera" class="w-10 h-10 mb-4 text-primary-500" />
            <h3 class="text-xl font-semibold mb-2">Video Tutorials</h3>
            <p class="text-muted text-sm mb-4">Step-by-step video lessons outlining registration, evidence submission, and assessments.</p>
            <UButton variant="link" color="primary" class="p-0">Watch Tutorials &rarr;</UButton>
          </UCard>

          <UCard class="rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-10 h-10 mb-4 text-primary-500" />
            <h3 class="text-xl font-semibold mb-2">Process Overview</h3>
            <p class="text-muted text-sm mb-4">A complete breakdown of application timelines, decision workflows, and SLA metrics.</p>
            <UButton variant="link" color="primary" class="p-0">See Process &rarr;</UButton>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Support CTA -->
    <SectionsSectionCTA
      title="Still need help?"
      description="Can't find the answer you're looking for? Our dedicated support team is ready to assist you personally."
      button-label="Contact Us Today"
      button-to="/contact"
    />
  </div>
</template>