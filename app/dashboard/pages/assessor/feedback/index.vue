<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Submit Feedback</h1>
    <UCard>
      <UForm :state="feedbackForm" @submit="submitFeedback">
        <UFormGroup label="Application ID" name="applicationId">
          <UInput v-model="feedbackForm.applicationId" placeholder="e.g., 12345" />
        </UFormGroup>
        <UFormGroup label="Feedback / Comments" name="notes">
          <UTextarea v-model="feedbackForm.notes" />
        </UFormGroup>
        <UFormGroup label="Overall Recommendation" name="outcome">
          <USelect v-model="feedbackForm.outcome" :options="['approve', 'reject', 'request-information']" />
        </UFormGroup>
        <UButton type="submit" label="Submit Feedback" class="mt-4" />
      </UForm>
    </UCard>

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Previously Submitted Feedback</h2>
      <UTable :rows="previousFeedback" :columns="columns" :loading="pending" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const authStore = useAuthStore();
const toast = useToast();
const { data: previousFeedback, pending, error, refresh } = useFetch<any>(`/api/assessors/${authStore.user?.id}/feedback`);

const feedbackForm = reactive({
  applicationId: '',
  notes: '',
  outcome: 'approve',
});

const columns = [
  { key: 'application.organization.name', label: 'Organization' },
  { key: 'createdAt', label: 'Date' },
  { key: 'outcome', label: 'Recommendation' },
];

async function submitFeedback() {
  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: {
        ...feedbackForm,
        userId: authStore.user?.id,
      },
    });
    toast.add({ title: 'Feedback submitted successfully!' });
    feedbackForm.applicationId = '';
    feedbackForm.notes = '';
    feedbackForm.outcome = 'approve';
    refresh();
  } catch (error) {
    toast.add({ title: 'Error submitting feedback.', color: 'red' });
  }
}
</script>
