<template>
  <div>
    <PageHeader title="Assessor Schedule" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Schedule'}]" actionLabel="Block Date" @action="isModalOpen = true" />
    
    <UCard>
      <div class="text-center py-12">
        <UIcon name="i-heroicons-calendar-days" class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Calendar Integration Required</h3>
        <p class="text-gray-500 max-w-md mx-auto">Install <code class="text-sm bg-gray-100 dark:bg-gray-800 p-1 rounded">v-calendar</code> or <code class="text-sm bg-gray-100 dark:bg-gray-800 p-1 rounded">@formkit/calendar</code> to render the full interactive grid.</p>
        
        <div class="mt-8 border-t dark:border-gray-800 pt-8 max-w-2xl mx-auto text-left">
           <h4 class="font-bold mb-4">Upcoming Scheduled Assessments</h4>
           <div v-for="sched in schedules" :key="sched.id" class="flex justify-between items-center p-3 border dark:border-gray-700 rounded-lg mb-2">
             <div>
               <div class="font-medium">{{ sched.notes || `Application ${sched.applicationId}` }}</div>
               <div class="text-sm text-gray-500">{{ new Date(sched.scheduledAt).toLocaleDateString() }} at {{ new Date(sched.scheduledAt).toLocaleTimeString() }}</div>
             </div>
             <UBadge color="green" variant="subtle">Confirmed</UBadge>
           </div>
        </div>
      </div>
    </UCard>

    <EntityFormModal 
      v-model="isModalOpen" 
      title="Block Date" 
      :fields="[
        { name: 'date', label: 'Date', type: 'text' }, 
        { name: 'reason', label: 'Reason', type: 'text' }
      ]"
      @save="blockDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'
import EntityFormModal from '~/app/components/shared/EntityFormModal.vue'

const isModalOpen = ref(false)
const { data: schedules } = await useFetch('/api/assessor/schedule', { default: () => [] })

const blockDate = (data: any) => {
  alert(`Blocked date: ${data.date} for reason: ${data.reason}`)
  isModalOpen.value = false
}
</script>
