<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  email: '',
  password: '',
  role: undefined,
})

const roleOptions = [
  { label: 'System Admin', value: 'SYSTEM_ADMIN' },
  { label: 'Applicant', value: 'APPLICANT' },
  { label: 'Assessor', value: 'ASSESSOR' },
  { label: 'Technical Reviewer', value: 'TECHNICAL_REVIEWER' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: event.data,
  })
  navigateTo('/dashboard/admin/users')
}
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Create User</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UFormGroup label="Role" name="role">
        <USelectMenu v-model="state.role" :options="roleOptions" />
      </UFormGroup>
      <UButton type="submit">Create</UButton>
    </UForm>
  </div>
</template>
