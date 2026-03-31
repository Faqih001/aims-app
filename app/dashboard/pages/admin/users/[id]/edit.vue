<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const userId = route.params.id as string

const { data: user, pending } = await useFetch<any>(`/api/users/${userId}`)

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  role: z.enum(['SYSTEM_ADMIN', 'ASSESSOR', 'APPLICANT', 'TECHNICAL_REVIEWER']),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  email: '',
  role: undefined,
})

const roleOptions = [
  { label: 'System Admin', value: 'SYSTEM_ADMIN' },
  { label: 'Applicant', value: 'APPLICANT' },
  { label: 'Assessor', value: 'ASSESSOR' },
  { label: 'Technical Reviewer', value: 'TECHNICAL_REVIEWER' },
]

watch(user, (newUser) => {
  if (newUser) {
    state.name = newUser.name
    state.email = newUser.email
    state.role = newUser.role
  }
}, { immediate: true })


async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: event.data,
  })
  navigateTo('/dashboard/admin/users')
}
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Edit User {{ userId }}</h1>
    <div v-if="pending">Loading...</div>
    <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Role" name="role">
        <USelectMenu v-model="state.role" :options="roleOptions" />
      </UFormGroup>
      <UButton type="submit">Save</UButton>
    </UForm>
  </div>
</template>
