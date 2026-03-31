<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const route = useRoute()
const reviewerId = route.params.id

const { data: reviewer, pending } = await useFetch<any>(`/api/admin/reviewers/${reviewerId}`)

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: reviewer.value?.name ?? '',
  email: reviewer.value?.email ?? '',
})

watch(reviewer, (newReviewer) => {
  if (newReviewer) {
    state.name = newReviewer.name
    state.email = newReviewer.email
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/admin/reviewers/${reviewerId}`, {
    method: 'PUT',
    body: event.data,
  })
  navigateTo('/dashboard/admin/reviewers')
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Edit Reviewer</h1>
    <div v-if="pending">Loading...</div>
    <UForm v-else :schema="schema" :state="state" class="space-y-4 max-w-lg" @submit="onSubmit">
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