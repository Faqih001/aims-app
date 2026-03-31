<template>
  <div>
    <PageHeader title="Assessment Board" :breadcrumbs="[{label: 'Dashboard', to: '/dashboard'}, {label: 'Assignments'}]" />
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard v-for="col in columns" :key="col.status" class="bg-gray-50/50 dark:bg-gray-800/50">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-bold">{{ col.title }}</h3>
            <UBadge color="gray">{{ col.cards.length }}</UBadge>
          </div>
        </template>
        
        <div class="space-y-4 min-h-[500px]">
          <UCard v-for="card in col.cards" :key="card.id" class="cursor-pointer hover:border-primary-500 transition shadow-sm">
            <div class="flex justify-between mb-2">
              <span class="text-xs font-semibold text-primary-600">{{ card.id }}</span>
              <span class="text-xs text-gray-500">{{ card.date }}</span>
            </div>
            <p class="font-medium text-sm mb-4">{{ card.scope }}</p>
            <div class="flex justify-between items-center">
              <UAvatarGroup size="sm" :max="2">
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Reviewer" />
              </UAvatarGroup>
              <UButton size="xs" color="gray" variant="ghost" label="Review" @click="openDrawer(card)" />
            </div>
          </UCard>
        </div>
      </UCard>
    </div>

    <!-- Review Slideover -->
    <USlideover v-model="drawerOpen">
      <UCard class="flex flex-col flex-1 h-screen relative" :ui="{ body: { base: 'flex-1 overflow-y-auto' } }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Evaluate {{ activeCard?.id }}</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="drawerOpen = false" />
          </div>
        </template>
        <div class="space-y-4">
          <div>
            <h4 class="font-bold text-sm text-gray-500 mb-1">Scope</h4>
            <p>{{ activeCard?.scope }}</p>
          </div>
          <div>
            <h4 class="font-bold text-sm text-gray-500 mb-1">Documents</h4>
            <ul class="list-disc pl-4 text-primary-600 underline text-sm">
              <li>Registration_Certificate.pdf</li>
              <li>Quality_Manual_v2.pdf</li>
            </ul>
          </div>
          <UFormGroup label="Assessment Verdict">
            <USelectMenu v-model="verdict" :options="['Approve', 'Require Changes', 'Reject']" />
          </UFormGroup>
          <UFormGroup label="Assessment Notes">
            <UTextarea v-model="notes" rows="4" placeholder="Enter findings..." />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton label="Save Changes" color="primary" @click="saveAssessment" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '~/app/components/shared/PageHeader.vue'

const drawerOpen = ref(false)
const activeCard = ref<any>(null)
const verdict = ref('Approve')
const notes = ref('')


const { data: assignmentsList } = await useFetch('/api/reviewer/assignments', { default: () => [] })

const columns = computed(() => {
  const list = assignmentsList.value || []
  return [
    {
      status: 'TO_DO',
      title: 'To Do',
      cards: list.map(a => ({
        id: a.id,
        scope: `Application ${a.applicationId}`,
        date: new Date(a.createdAt).toLocaleDateString()
      }))
    },
    {
      status: 'IN_PROGRESS',
      title: 'In Progress',
      cards: [] // Additional logic based on assessment status can be added later
    },
    {
      status: 'DONE',
      title: 'Completed',
      cards: []
    }
  ]
})


const openDrawer = (card: any) => {
  activeCard.value = card
  drawerOpen.value = true
}

const saveAssessment = () => {
  alert(`Assessment submitted! Verdict: ${verdict.value}`)
  drawerOpen.value = false
}
</script>
