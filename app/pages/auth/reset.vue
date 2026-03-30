<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
  layout: false
})

const toast = useToast()
const router = useRouter()

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const schema = z.object({
  password: z.string().min(10, 'Password must be at least 10 characters').regex(/[A-Z]/, 'Password must include at least one uppercase letter').regex(/[a-z]/, 'Password must include at least one lowercase letter').regex(/[0-9]/, 'Password must include at least one number').regex(/[^A-Za-z0-9]/, 'Password must include at least one special character'),
  confirmPassword: z.string().min(1, 'Confirm your password')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  password: '',
  confirmPassword: ''
})

const canSubmit = computed(() => schema.safeParse(state).success && !loading.value)

async function onSubmit() {
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 900))

    toast.add({
      title: 'Password updated',
      description: 'Your password has been reset successfully',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    await router.push('/auth/login')
  }
  catch {
    toast.add({
      title: 'Reset failed',
      description: 'Unable to reset password, try again',
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
  <AuthLayout reverse>
    <template #image>
      <AuthImagePanel />
    </template>

    <template #form>
      <AuthFormCard
        title="Reset password"
        subtitle="Set a new secure password for your account"
      >
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-5"
          @submit="onSubmit"
        >
          <UFormField name="password" label="New password" required>
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              icon="i-heroicons-lock-closed"
              placeholder="Enter new password"
              class="w-full"
              autocomplete="new-password"
              size="xl"
            >
              <template #trailing>
                <UButton
                  :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField name="confirmPassword" label="Confirm password" required>
            <UInput
              v-model="state.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              icon="i-heroicons-lock-closed"
              placeholder="Confirm new password"
              class="w-full"
              autocomplete="new-password"
              size="xl"
            >
              <template #trailing>
                <UButton
                  :icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </UInput>
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
            Update password
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-sm text-muted text-center">
            Return to
            <NuxtLink
              to="/auth/login"
              class="font-semibold text-[#003087] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003087]"
            >
              Sign in
            </NuxtLink>
          </p>
        </template>
      </AuthFormCard>
    </template>
  </AuthLayout>
</template>