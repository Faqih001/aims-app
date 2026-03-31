<script setup lang="ts">
const sectors = [
  {
    id: 1,
    title: 'Testing Laboratories',
    description: 'Accreditation for laboratories conducting biological, chemical, physical, and mechanical testing across diverse materials and products.',
    icon: 'i-heroicons-beaker',
    standards: 'ISO/IEC 17025',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Medical Laboratories',
    description: 'Ensuring confidence and reliability in medical test results for patient care through rigorous quality management systems.',
    icon: 'i-heroicons-heart',
    standards: 'ISO 15189',
    color: 'bg-red-500'
  },
  {
    id: 3,
    title: 'Calibration Laboratories',
    description: 'Providing traceability to the international system of units (SI) and ensuring continuous and accurate calibration of measuring instruments.',
    icon: 'i-heroicons-scale',
    standards: 'ISO/IEC 17025',
    color: 'bg-amber-500'
  },
  {
    id: 4,
    title: 'Inspection Bodies',
    description: 'Accrediting bodies undertaking inspections on materials, products, installations, plants, processes, or work procedures.',
    icon: 'i-heroicons-clipboard-document-check',
    standards: 'ISO/IEC 17020',
    color: 'bg-green-500'
  },
  {
    id: 5,
    title: 'Certification Bodies',
    description: 'Competence assessment of bodies providing certification for management systems, individual persons, and various products.',
    icon: 'i-heroicons-academic-cap',
    standards: 'ISO/IEC 17021, 17024, 17065',
    color: 'bg-purple-500'
  },
  {
    id: 6,
    title: 'Proficiency Testing Providers',
    description: 'Recognizing competence of bodies that organize and manage proficiency testing schemes in different testing domains.',
    icon: 'i-heroicons-arrow-path-rounded-square',
    standards: 'ISO/IEC 17043',
    color: 'bg-indigo-500'
  },
  {
    id: 7,
    title: 'Veterinary Laboratories',
    description: 'Quality assurance for animal health testing, pathology, and disease surveillance to support the agricultural sectors.',
    icon: 'i-heroicons-sparkles',
    standards: 'ISO/IEC 17025',
    color: 'bg-teal-500'
  },
  {
    id: 8,
    title: 'Greenhouse Gas Validation',
    description: 'Approving validators and verifiers involved in greenhouse gas emissions accounting and reduction initiatives.',
    icon: 'i-heroicons-globe-europe-africa',
    standards: 'ISO 14065',
    color: 'bg-emerald-500'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#111]">
    <!-- Hero Section -->
    <SectionsSectionHero
      eyebrow="Accreditation Sectors"
      title="Sectors We Accredite"
      description="We provide world-class accreditation services across a wide range of analytical, diagnostic, and industrial sectors to guarantee trust and confidence."
      image-url="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
      primary-label="Apply Now"
      primary-to="/auth/register"
      secondary-label="Learn More"
      secondary-to="/about"
    />

    <!-- Sectors Grid -->
    <section class="py-16 md:py-24">
      <UContainer class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UCard
            v-for="sector in sectors"
            :key="sector.id"
            class="group hover:-translate-y-2 transition-transform duration-300 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl dark:bg-[#1A1A1A] flex flex-col h-full overflow-hidden"
            :ui="{ body: 'p-0 sm:p-0' }"
          >
            <!-- Card Header Pattern/Color -->
            <div :class="['h-2 w-full', sector.color]" />
            
            <div class="p-6 sm:p-8 flex flex-col flex-1">
              <!-- Icon -->
              <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gray-50 dark:bg-gray-800 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform']">
                <UIcon :name="sector.icon" class="w-8 h-8" />
              </div>

              <!-- Title & Description -->
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {{ sector.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {{ sector.description }}
              </p>

              <!-- Standard info footer -->
              <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">Standard</span>
                <UBadge color="neutral" variant="soft" class="text-xs font-mono">{{ sector.standards }}</UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Support CTA -->
    <SectionsSectionCTA
      title="Not sure which sector applies?"
      description="Our expert team can help you determine the specific accreditation standard and scope that applies to your organization's operations."
      button-label="Contact Us Today"
      button-to="/contact"
    />
  </div>
</template>