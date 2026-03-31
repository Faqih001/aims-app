<script setup lang="ts">
import { z } from 'zod'
import { useAuthStore } from '~/dashboard/stores/auth'

definePageMeta({
  layout: false
})

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const showPassword = ref(false)

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: '',
  rememberMe: false
})

const canSubmit = computed(() => schema.safeParse(state).success && !loading.value)

async function onSubmit() {
  loading.value = true

  try {
    await authStore.login({
      email: state.email,
      password: state.password
    })

    toast.add({
      title: 'Login successful',
      description: 'Welcome back to AIMS',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    // Route based on role
    if (authStore.isAdmin) await router.push('/dashboard/admin')
    else if (authStore.isAssessor) await router.push('/dashboard/assessor')
    else if (authStore.isReviewer) await router.push('/dashboard/reviewer')
    else await router.push('/dashboard/applicant')
  }
  catch (error: any) {
    toast.add({
      title: 'Login failed',
      description: error?.data?.statusMessage || 'Please verify your credentials and try again',
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
        title="Sign in"
        subtitle="Access your accreditation workspace"
      >
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
              placeholder="name@organization.or.ke"
              icon="i-heroicons-envelope"
              class="w-full"
              autocomplete="email"
              size="xl"
            />
          </UFormField>

          <UFormField name="password" label="Password" required>
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              icon="i-heroicons-lock-closed"
              class="w-full"
              autocomplete="current-password"
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

          <div class="flex items-center justify-between gap-3">
            <UCheckbox v-model="state.rememberMe" label="Remember me" name="rememberMe" />

            <NuxtLink
              to="/auth/forgot"
              class="text-sm font-medium text-[#003087] dark:text-primary-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003087]"
            >
              Forgot password?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            block
            color="primary"
            size="xl"
            :loading="loading"
            :disabled="!canSubmit"
            class="rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Sign in
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-sm text-muted text-center">
            No account yet?
            <NuxtLink
              to="/auth/register"
              class="font-semibold text-[#00A651] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A651]"
            >
              Create one
            </NuxtLink>
          </p>
        </template>
      </AuthFormCard>
    </template>
  </AuthLayout>
</template>