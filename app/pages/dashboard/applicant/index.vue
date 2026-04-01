<template>
  <div class="space-y-6">
    <PageHeader title="Overview" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard/applicant'}, {label: 'Overview'}]" />
    
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
      <div class="relative z-10">
        <h2 class="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {{ authStore.user?.name || 'Applicant' }}!</h2>
        <p class="text-primary-100 max-w-2xl mb-6">Track your accreditation status, manage your documents, and stay on top of pending actions in one place.</p>
        <div class="flex flex-wrap gap-3">
          <UButton to="/dashboard/applicant/applications" color="white" variant="solid" icon="i-heroicons-plus" label="New Application" />
          <UButton to="/dashboard/applicant/status" color="primary" variant="soft" class="bg-white/20 hover:bg-white/30 text-white" icon="i-heroicons-chart-bar" label="Live Tracker" />
        </div>
      </div>
      <UIcon name="i-heroicons-academic-cap" class="absolute -bottom-4 -right-4 w-48 h-48 text-white opacity-10 rotate-12 pointer-events-none" />
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard :ui="{ body: { padding: 'p-4 sm:p-5' } }">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <UIcon name="i-heroicons-document-text" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          </div>
        </div>
      </UCard>
      
      <UCard :ui="{ body: { padding: 'p-4 sm:p-5' } }">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
            <UIcon name="i-heroicons-clock" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">In Review</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">1</p>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ body: { padding: 'p-4 sm:p-5' } }">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
            <UIcon name="i-heroicons-check-badge" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">2</p>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ body: { padding: 'p-4 sm:p-5' } }">
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            <UIcon name="i-heroicons-exclamation-circle" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Action Required</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">1</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left Column: Actions & Activity (Spans 2 columns on lg) -->
      <div class="space-y-6 lg:col-span-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-lg">Next Steps Required</h3>
              <UBadge color="red" variant="subtle" size="sm">1 Pending</UBadge>
            </div>
          </template>
          <div class="flex gap-4 items-start p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800">
            <UIcon name="i-heroicons-credit-card" class="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
            <div class="flex-1">
              <h4 class="font-semibold text-orange-800 dark:text-orange-400">Payment Required</h4>
              <p class="text-sm text-orange-700 dark:text-orange-300 mt-1">Please pay your initial registration invoice for Application #AIMS-2026-04 to proceed with the technical review.</p>
              <div class="mt-3">
                <UButton color="orange" label="Pay Now" to="/dashboard/applicant/billing" size="sm" icon="i-heroicons-arrow-right" class="font-medium" />
              </div>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-lg">Recent Applications</h3>
              <UButton to="/dashboard/applicant/applications" color="primary" variant="ghost" size="sm" label="View All" />
            </div>
          </template>
          <div class="divide-y divide-gray-100 dark:divide-gray-800">
            <div v-for="i in 3" :key="i" class="py-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-document" class="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p class="font-medium text-sm text-gray-900 dark:text-white">ISO/IEC 17025 Accreditation</p>
                  <p class="text-xs text-gray-500">Submitted on Mar {{ 20 - i }}, 2026</p>
                </div>
              </div>
              <UBadge :color="i === 1 ? 'yellow' : 'green'" variant="soft">
                {{ i === 1 ? 'In Review' : 'Approved' }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Column: Quick Links & Help -->
      <div class="space-y-6">
        <UCard>
          <template #header><h3 class="font-bold text-lg">Quick Links</h3></template>
          <div class="flex flex-col gap-2">
             <UButton to="/dashboard/applicant/applications" color="gray" variant="solid" icon="i-heroicons-document-text" label="My Applications" class="justify-start shadow-sm" />
             <UButton to="/dashboard/applicant/documents" color="gray" variant="solid" icon="i-heroicons-folder-open" label="Document Manager" class="justify-start shadow-sm" />
             <UButton to="/dashboard/applicant/billing" color="gray" variant="solid" icon="i-heroicons-banknotes" label="Invoices & Billing" class="justify-start shadow-sm" />
             <UButton to="/dashboard/applicant/support" color="gray" variant="solid" icon="i-heroicons-lifebuoy" label="Help & Support" class="justify-start shadow-sm" />
          </div>
        </UCard>

        <UCard class="bg-gray-50 dark:bg-gray-800/50 border-none">
          <div class="text-center p-2">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6" />
            </div>
            <h4 class="font-bold mb-1">Need Assistance?</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Our support team is ready to help you with your accreditation journey.</p>
            <UButton to="/dashboard/applicant/support" color="primary" variant="outline" label="Contact Support" block />
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
