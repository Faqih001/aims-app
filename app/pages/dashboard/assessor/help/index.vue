<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Help & Support</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <UAccordion :items="faqItems" />
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-4">Contact Support</h2>
        <UCard>
          <UForm :state="contactForm" @submit="submitSupportTicket">
            <UFormGroup label="Subject" name="subject">
              <UInput v-model="contactForm.subject" />
            </UFormGroup>
            <UFormGroup label="Message" name="message">
              <UTextarea v-model="contactForm.message" />
            </UFormGroup>
            <UButton type="submit" label="Submit" class="mt-4" />
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const faqItems = ref([
  {
    label: 'How do I view my assigned applications?',
    content: 'Navigate to the "Assignments" page to see all applications assigned to you.',
  },
  {
    label: 'How do I submit feedback?',
    content: 'Go to the "Feedback" page and fill out the form for the respective application.',
  },
  {
    label: 'Where can I see my schedule?',
    content: 'Your schedule, including planned audits and meetings, is on the "Schedule" page.',
  },
]);

const contactForm = reactive({
  subject: '',
  message: '',
});

function submitSupportTicket() {
  console.log('Submitting support ticket:', contactForm);
  alert('Support ticket submitted successfully!');
  contactForm.subject = '';
  contactForm.message = '';
}
</script>
