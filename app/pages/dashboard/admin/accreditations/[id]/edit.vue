<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const accreditationId = route.params.id

const { data: accreditation, pending } = await useFetch<any>(`/api/admin/accreditations/${accreditationId}`)

const schema = z.object({
  name: z.string().min(3),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  expiryDate: z.string(),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: accreditation.value?.name ?? '',
  status: accreditation.value?.status ?? undefined,
  expiryDate: accreditation.value?.expiryDate ? new Date(accreditation.value.expiryDate).toISOString().split('T')[0] : '',
})

const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
]

watch(accreditation, (newAccreditation) => {
  if (newAccreditation) {
    state.name = newAccreditation.name
    state.status = newAccreditation.status
    state.expiryDate = newAccreditation.expiryDate ? new Date(newAccreditation.expiryDate).toISOString().split('T')[0] : ''
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/admin/accreditations/${accreditationId}`, {
    method: 'PUT',
    body: event.data,
  })
  navigateTo('/dashboard/admin/accreditations')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Edit Accreditation</h1>
    <div v-if="pending">Loading...</div>
    <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Status" name="status">
        <USelectMenu v-model="state.status" :options="statusOptions" />
      </UFormGroup>
      <UFormGroup label="Expiry Date" name="expiryDate">
        <UInput v-model="state.expiryDate" type="date" />
      </UFormGroup>
      <UButton type="submit">Save Changes</UButton>
    </UForm>
  </div>
</template>