<template>
  <div class="fixed bottom-5 right-5">
    <UButton v-if="!isOpen" @click="isOpen = true" icon="i-heroicons-chat-bubble-oval-left-ellipsis-20-solid" size="xl" class="rounded-full" />
    <UCard v-else class="w-96 h-[70vh] flex flex-col">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">KENAS Chatbot</h2>
          <UButton @click="isOpen = false" icon="i-heroicons-x-mark-20-solid" color="primary" variant="ghost" />
        </div>
      </template>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="message in messages" :key="message.id" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
          <div class="flex items-end gap-2">
            <UAvatar v-if="!message.isUser" src="/kenas-avatar.png" alt="KENAS Avatar" />
            <div class="max-w-xs p-3 rounded-lg" :class="message.isUser ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'">
              <div class="prose dark:prose-invert" v-html="message.html"></div>
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
          <UButton @click="() => sendMessage()" icon="i-heroicons-paper-airplane-20-solid" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  html: string;
}


const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const messages = ref<Message[]>([
  { id: 1, text: 'Hello! How can I help you today?', isUser: false, html: marked('Hello! How can I help you today?') },
]);
const commonPrompts = ref([
  'What is KENAS?',
  'How to apply for accreditation?',
  'What are the fees?',
]);

async function sendMessage(prompt?: string) {
  const text = prompt || newMessage.value;
  if (!text.trim()) return;

  const userMessage: Message = {
    id: Date.now(),
    text,
    isUser: true,
    html: marked(text),
  };
  messages.value.push(userMessage);

  if (!prompt) {
    newMessage.value = '';
  }
  isLoading.value = true;

  try {
    const response = await $fetch('/api/chatbot', {
      method: 'POST',
      body: { message: text },
    });
    const botMessage: Message = {
      id: Date.now() + 1,
      text: response.reply as string,
      isUser: false,
      html: marked(response.reply as string),
    };
    messages.value.push(botMessage);
  } catch (error) {
    console.error('Chatbot error:', error);
    const errorMessage: Message = {
      id: Date.now() + 1,
      text: 'Sorry, I am having trouble connecting. Please try again later.',
      isUser: false,
      html: marked('Sorry, I am having trouble connecting. Please try again later.'),
    };
    messages.value.push(errorMessage);
  } finally {
    isLoading.value = false;
  }
}
</script>