<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(3),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  expiryDate: z.string(),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  status: undefined,
  expiryDate: '',
})

const statusOptions = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('/api/admin/accreditations', {
    method: 'POST',
    body: event.data,
  })
  navigateTo('/dashboard/admin/accreditations')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Create Accreditation</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Status" name="status">
        <USelectMenu v-model="state.status" :options="statusOptions" />
      </UFormGroup>
      <UFormGroup label="Expiry Date" name="expiryDate">
        <UInput v-model="state.expiryDate" type="date" />
      </UFormGroup>
      <UButton type="submit">Create</UButton>
    </UForm>
  </div>
</template>