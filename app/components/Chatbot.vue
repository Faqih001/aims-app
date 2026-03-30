<template>
  <div class="fixed bottom-5 right-5">
    <UButton v-if="!isOpen" @click="isOpen = true" icon="i-heroicons-chat-bubble-oval-left-ellipsis-20-solid" size="xl" :ui="{ rounded: 'rounded-full' }" />
    <UCard v-else class="w-96 h-[70vh] flex flex-col">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">KENAS Chatbot</h2>
          <UButton @click="isOpen = false" icon="i-heroicons-x-mark-20-solid" color="gray" variant="ghost" />
        </div>
      </template>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="message in messages" :key="message.id" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
          <div class="flex items-end gap-2">
            <UAvatar v-if="!message.isUser" src="/kenas-avatar.png" alt="KENAS Avatar" />
            <div class="max-w-xs p-3 rounded-lg" :class="message.isUser ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'">
              <p>{{ message.text }}</p>
            </div>
            <UAvatar v-if="message.isUser" src="/user-avatar.png" alt="User Avatar" />
          </div>
        </div>
        <div v-if="isLoading" class="flex justify-start">
          <div class="flex items-end gap-2">
            <UAvatar src="/kenas-avatar.png" alt="KENAS Avatar" />
            <div class="max-w-xs p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
              <p>Thinking...</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex gap-2 mb-2">
          <UButton v-for="prompt in commonPrompts" :key="prompt" @click="sendMessage(prompt)" size="xs" variant="outline">{{ prompt }}</UButton>
        </div>
        <div class="flex items-center gap-2">
          <UInput v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." class="flex-1" />
          <UButton @click="sendMessage" icon="i-heroicons-paper-airplane-20-solid" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const messages = ref([
  { id: 1, text: 'Hello! How can I help you today?', isUser: false },
]);
const commonPrompts = ref([
  'What is KENAS?',
  'How to apply for accreditation?',
  'What are the fees?',
]);

async function sendMessage(prompt?: string) {
  const text = prompt || newMessage.value;
  if (!text.trim()) return;

  messages.value.push({ id: Date.now(), text, isUser: true });
  if (!prompt) {
    newMessage.value = '';
  }
  isLoading.value = true;

  try {
    const response = await $fetch('/api/chatbot', {
      method: 'POST',
      body: { message: text },
    });
    messages.value.push({ id: Date.now() + 1, text: response.reply, isUser: false });
  } catch (error) {
    console.error('Chatbot error:', error);
    messages.value.push({ id: Date.now() + 1, text: 'Sorry, I am having trouble connecting. Please try again later.', isUser: false });
  } finally {
    isLoading.value = false;
  }
}
</script>