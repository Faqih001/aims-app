<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Submit Feedback</h1>
    <UCard>
      <UForm :state="feedbackForm" @submit="submitFeedback">
        <UFormGroup label="Application ID" name="applicationId">
          <UInput v-model="feedbackForm.applicationId" placeholder="e.g., 12345" />
        </UFormGroup>
        <UFormGroup label="Feedback / Comments" name="comment">
          <UTextarea v-model="feedbackForm.comment" />
        </UFormGroup>
        <UButton type="submit" label="Submit Feedback" class="mt-4" />
      </UForm>
    </UCard>

    <div class="mt-8">
      <h2 class="text-xl font-bold mb-4">Previously Submitted Feedback</h2>
      <UTable :rows="previousFeedback" :columns="columns" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const feedbackForm = reactive({
  applicationId: '',
  comment: '',
});

const columns = [
  { key: 'applicationId', label: 'Application ID' },
  { key: 'date', label: 'Date' },
];

const previousFeedback = ref([
  { applicationId: '12345', date: '2023-10-29' },
]);

function submitFeedback() {
  console.log('Submitting feedback:', feedbackForm);
  previousFeedback.value.unshift({
    applicationId: feedbackForm.applicationId,
    date: new Date().toISOString().split('T')[0],
  });
  feedbackForm.applicationId = '';
  feedbackForm.comment = '';
}
</script>
