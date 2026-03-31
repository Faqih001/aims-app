<script setup lang="ts">
import { z } from 'zod'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccessModal = ref(false)

const roles = [
  { label: 'Applicant (Lab/Certification Body)', value: 'APPLICANT' },
  { label: 'Accreditation Assessor', value: 'ASSESSOR' },
  { label: 'Technical Reviewer', value: 'TECHNICAL_REVIEWER' }
]

const schema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(10, 'Password must be at least 10 characters').regex(/[A-Z]/, 'Password must include at least one uppercase letter').regex(/[a-z]/, 'Password must include at least one lowercase letter').regex(/[0-9]/, 'Password must include at least one number').regex(/[^A-Za-z0-9]/, 'Password must include at least one special character'),
  confirmPassword: z.string().min(1, 'Confirm your password'),
  role: z.enum(['APPLICANT', 'ASSESSOR', 'TECHNICAL_REVIEWER']),
  organizationName: z.string().min(2, 'Organization name is required')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'APPLICANT',
  organizationName: ''
})

const canSubmit = computed(() => schema.safeParse(state).success && !loading.value)

async function onSubmit() {
  loading.value = true

  try {
    await authStore.register({
      name: state.fullName,
      email: state.email,
      password: state.password,
      role: state.role,
      organizationName: state.organizationName
    })

    toast.add({
      title: 'Registration successful',
      description: 'Your account has been created',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    showSuccessModal.value = true
  }
  catch (error: any) {
    toast.add({
      title: 'Registration failed',
      description: error?.data?.statusMessage || 'Unable to complete registration, please try again',
      color: 'error',
      icon: 'i-heroicons-x-circle'
    })
  }
  finally {
    loading.value = false
  }
}

async function goToLogin() {
  showSuccessModal.value = false
  await router.push('/auth/login')
}
</script>

<template>
  <AuthLayout>
    <template #image>
      <AuthImagePanel />
    </template>

    <template #form>
      <AuthFormCard
        title="Create account"
        subtitle="Register to begin your accreditation journey"
      >
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField name="fullName" label="Full name" required>
            <UInput
              v-model="state.fullName"
              icon="i-heroicons-user"
              placeholder="Enter your full name"
              class="w-full"
              autocomplete="name"
              size="xl"
            />
          </UFormField>

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

          <UFormField name="organizationName" label="Organization name" required>
            <UInput
              v-model="state.organizationName"
              icon="i-heroicons-building-office-2"
              placeholder="Organization"
              class="w-full"
              autocomplete="organization"
              size="xl"
            />
          </UFormField>

          <UFormField name="role" label="Role" required>
            <USelect
              v-model="state.role"
              :items="roles"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField name="password" label="Password" required>
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              icon="i-heroicons-lock-closed"
              placeholder="Create a strong password"
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
              placeholder="Re-enter password"
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

          <p class="text-xs text-muted">
            Password must include uppercase, lowercase, number, and special character.
          </p>

          <UButton
            type="submit"
            block
            size="xl"
            color="primary"
            :loading="loading"
            :disabled="!canSubmit"
            class="rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
          >
            Register
          </UButton>
        </UForm>

        <template #footer>
          <p class="text-sm text-muted text-center">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="font-semibold text-[#003087] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003087]"
            >
              Sign in
            </NuxtLink>
          </p>
        </template>
      </AuthFormCard>

      <UModal v-model:open="showSuccessModal" title="Registration complete" :dismissible="false">
        <template #body>
          <p class="text-sm text-muted">
            Your account was created successfully. Continue to login and access AIMS.
          </p>
        </template>

        <template #footer>
          <div class="w-full flex justify-end">
            <UButton color="primary" @click="goToLogin">
              Continue to Login
            </UButton>
          </div>
        </template>
      </UModal>
    </template>
  </AuthLayout>
</template>