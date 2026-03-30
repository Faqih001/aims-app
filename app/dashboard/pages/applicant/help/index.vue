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

const authStore = useAuthStore();
const toast = useToast();

const faqItems = ref([
  {
    label: 'How do I submit an application?',
    content: 'Navigate to the "Applications" page and click "New Application".',
  },
  {
    label: 'Where can I see the status of my application?',
    content: 'The status is available on the "Status" page.',
  },
  {
    label: 'How do I upload required documents?',
    content: 'Go to the "Documents" page to upload and manage your files.',
  },
]);

const contactForm = reactive({
  subject: '',
  message: '',
});

async function submitSupportTicket() {
  try {
    await $fetch('/api/support-tickets', {
      method: 'POST',
      body: {
        ...contactForm,
        userId: authStore.user?.id,
      },
    });
    toast.add({ title: 'Support ticket submitted successfully!' });
    contactForm.subject = '';
    contactForm.message = '';
  } catch (error) {
    toast.add({ title: 'Error submitting support ticket.', color: 'red' });
  }
}
</script>
