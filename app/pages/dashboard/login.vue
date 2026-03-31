<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '../stores/auth'



const authStore = useAuthStore()
const isLoading = ref(false)
const apiError = ref<string | null>(null)

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  apiError.value = null
  try {
    await authStore.login(event.data)
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
      <h1 class="text-2xl font-bold">Login to AIMS</h1>
      <p class="text-gray-500">Enter your credentials to access your account.</p>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="********" icon="i-heroicons-lock-closed" />
      </UFormGroup>

      <div class="flex items-center justify-between">
        <UCheckbox label="Remember me" />
        <ULink to="/dashboard/forgot-password" class="text-sm text-primary">Forgot password?</ULink>
      </div>

      <UButton type="submit" block :loading="isLoading">
        Login
      </UButton>

       <UAlert v-if="apiError" icon="i-heroicons-exclamation-triangle" color="error" variant="soft" :title="apiError" class="mt-4" />
    </UForm>

    <template #footer>
      <p class="text-sm text-center text-gray-500">
        Don't have an account?
        <ULink to="/dashboard/register" class="text-primary">Register</ULink>
      </p>
    </template>
  </UCard>
</template>
