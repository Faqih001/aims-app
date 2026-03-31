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
    label: 'How do I add a new user?',
    content: 'You can add a new user by navigating to the Users page and clicking the "Add User" button.',
  },
  {
    label: 'How can I reset a user\'s password?',
    content: 'To reset a user\'s password, go to the user\'s profile page and click the "Reset Password" button.',
  },
  {
    label: 'Where can I see the audit logs?',
    content: 'The audit logs are available on the Audits page in the admin dashboard.',
  },
]);

const contactForm = reactive({
  subject: '',
  message: '',
});

const toast = useToast();

function submitSupportTicket() {
  console.log('Submitting support ticket:', contactForm);
  toast.add({ title: 'Support ticket submitted!', description: 'We will get back to you shortly.' });
  contactForm.subject = '';
  contactForm.message = '';
}
</script>
