<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false
})

const toast = useToast()

const loading = ref(false)
const submitted = ref(false)

const schema = z.object({
  email: z.email('Enter a valid email address')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  email: ''
})

const canSubmit = computed(() => schema.safeParse(state).success && !loading.value)

async function onSubmit() {
  loading.value = true

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: state.email }
    })
    
    submitted.value = true

    toast.add({
      title: 'Reset link sent',
      description: 'Check your email for password reset instructions',
      color: 'success',
      icon: 'i-heroicons-envelope'
    })
  }
  catch {
    toast.add({
      title: 'Request failed',
      description: 'Unable to send reset link at this time',
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <template #image>
      <AuthImagePanel />
    </template>

    <template #form>
      <AuthFormCard
        title="Forgot password"
        subtitle="Enter your account email to receive a reset link"
      >
        <UAlert
          v-if="submitted"
          icon="i-heroicons-check-circle"
          color="success"
          variant="subtle"
          class="mb-4"
          title="Reset instructions sent"
          description="If an account exists with this email, you'll receive a password reset link shortly."
        />

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-5"
          @submit="onSubmit"
        >
          <UFormField name="email" label="Email address" required>
            <UInput
              v-model="state.email"
              type="email"
              icon="i-heroicons-envelope"
              placeholder="name@organization.or.ke"
              class="w-full"
              autocomplete="email"
              size="xl"
            />
          </UFormField>

          <UButton
            type="submit"
            block
            size="xl"
            color="primary"
            :loading="loading"
            :disabled="!canSubmit"
            class="rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Send reset link
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-sm text-muted text-center">
            Remembered your password?
            <NuxtLink
              to="/auth/login"
              class="font-semibold text-[#003087] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003087]"
            >
              Back to login
            </NuxtLink>
          </p>
        </template>
      </AuthFormCard>
    </template>
  </AuthLayout>
</template>