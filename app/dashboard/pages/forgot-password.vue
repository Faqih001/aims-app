<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const isLoading = ref(false)
const emailSent = ref(false)
const apiError = ref<string | null>(null)

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  email: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  apiError.value = null
  try {
    // NOTE: API endpoint not implemented yet. This is a placeholder.
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: event.data.email },
    })
    emailSent.value = true
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
      <h1 class="text-2xl font-bold">Forgot Password</h1>
      <p class="text-gray-500">Enter your email to reset your password.</p>
    </template>

    <div v-if="emailSent" class="text-center">
        <UIcon name="i-heroicons-check-circle" class="w-12 h-12 mx-auto text-green-500" />
        <h2 class="mt-4 text-xl font-bold">Check your inbox</h2>
        <p class="mt-2 text-gray-500">
            We've sent a password reset link to <strong>{{ state.email }}</strong>.
        </p>
         <UButton to="/dashboard/login" variant="link" class="mt-4">
            Back to Login
        </UButton>
    </div>

    <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UButton type="submit" block :loading="isLoading">
        Send Reset Link
      </UButton>

      <UAlert v-if="apiError" icon="i-heroicons-exclamation-triangle" color="error" variant="soft" :title="apiError" class="mt-4" />
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Remember your password?
        <ULink to="/dashboard/login" class="text-primary">Login</ULink>
      </p>
    </template>
  </UCard>
</template>
