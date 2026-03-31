<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const assessorId = route.params.id

const { data: assessor, pending } = await useFetch<any>(`/api/admin/assessors/${assessorId}`)

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: assessor.value?.name ?? '',
  email: assessor.value?.email ?? '',
})

watch(assessor, (newAssessor) => {
  if (newAssessor) {
    state.name = newAssessor.name
    state.email = newAssessor.email
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/admin/assessors/${assessorId}`, {
    method: 'PUT',
    body: event.data,
  })
  navigateTo('/dashboard/admin/assessors')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Edit Assessor</h1>
    <div v-if="pending">Loading...</div>
    <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UButton type="submit">Save Changes</UButton>
    </UForm>
  </div>
</template>