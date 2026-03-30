<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  email: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('/api/admin/assessors', {
    method: 'POST',
    body: event.data,
  })
  navigateTo('/dashboard/admin/assessors')
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Create Assessor</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UButton type="submit">Create</UButton>
    </UForm>
  </div>
</template>