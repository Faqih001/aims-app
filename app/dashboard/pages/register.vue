<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '../stores/auth'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const authStore = useAuthStore()
const isLoading = ref(false)
const apiError = ref<string | null>(null)

const schema = z.object({
  name: z.string().min(3, 'Must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  role: z.enum(['APPLICANT', 'ASSESSOR', 'TECHNICAL_REVIEWER']),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords don\'t match',
  path: ['confirmPassword'],
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: undefined,
})

const roleOptions = [
  { label: 'Applicant', value: 'APPLICANT' },
  { label: 'Assessor', value: 'ASSESSOR' },
  { label: 'Technical Reviewer', value: 'TECHNICAL_REVIEWER' },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  apiError.value = null
  try {
    await authStore.register(event.data)
  } catch (error: any) {
    apiError.value = error.data?.message || 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <h1 class="text-2xl font-bold">Create an Account</h1>
      <p class="text-gray-500">Join AIMS to manage accreditations.</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Full Name" name="name">
        <UInput v-model="state.name" placeholder="John Doe" icon="i-heroicons-user" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
      
      <UFormGroup label="Register As" name="role">
        <USelectMenu v-model="state.role" :options="roleOptions" placeholder="Select a role" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="********" icon="i-heroicons-lock-closed" />
      </UFormGroup>

      <UFormGroup label="Confirm Password" name="confirmPassword">
        <UInput v-model="state.confirmPassword" type="password" placeholder="********" icon="i-heroicons-lock-closed" />
      </UFormGroup>

      <UButton type="submit" block :loading="isLoading">
        Register
      </UButton>

      <UAlert v-if="apiError" icon="i-heroicons-exclamation-triangle" color="error" variant="soft" :title="apiError" class="mt-4" />
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Already have an account?
        <ULink to="/dashboard/login" class="text-primary">Login</ULink>
      </p>
    </template>
  </UCard>
</template>
