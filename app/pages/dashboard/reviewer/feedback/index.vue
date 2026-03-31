<script setup lang="ts">
const authStore = useAuthStore();
const toast = useToast();

const feedbackForm = reactive({
  applicationId: '',
  feedback: '',
  recommendation: 'approve',
});

const { data: previousFeedback, pending, error, refresh } = useFetch(
  `/api/reviewers/${authStore.user?.id}/reviews`
);

const columns = [
  { key: 'applicationId', label: 'Application ID' },
  { key: 'createdAt', label: 'Date' },
  { key: 'recommendation', label: 'Recommendation' },
];

async function submitFeedback() {
  try {
    await $fetch('/api/reviews', {
      method: 'POST',
      body: {
        applicationId: feedbackForm.applicationId,
        reviewerId: authStore.user?.id,
        feedback: feedbackForm.feedback,
        recommendation: feedbackForm.recommendation,
      },
    });
    toast.add({ title: 'Review submitted successfully.' });
    feedbackForm.applicationId = '';
    feedbackForm.feedback = '';
    feedbackForm.recommendation = 'approve';
    refresh();
  } catch (submitError) {
    toast.add({ title: 'Failed to submit review.', color: 'red' });
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Submit Feedback</h1>
    <UCard>
      <UForm :state="feedbackForm" @submit="submitFeedback">
        <UFormGroup label="Application ID" name="applicationId">
          <UInput v-model="feedbackForm.applicationId" placeholder="e.g., 12345" />
        </UFormGroup>
        <UFormGroup label="Feedback / Comments" name="feedback">
          <UTextarea v-model="feedbackForm.feedback" />
        </UFormGroup>
        <UFormGroup label="Recommendation" name="recommendation">
          <USelect v-model="feedbackForm.recommendation" :options="['approve', 'reject', 'request-information']" />
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
