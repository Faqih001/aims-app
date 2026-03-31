<template>
  <div class="fixed bottom-6 right-6 z-50 flex items-end justify-end flex-col">
    <!-- Chat Widget Panel -->
    <transition name="chat-panel">
      <div v-if="isOpen" class="w-[400px] h-[650px] max-h-[85vh] mb-6 flex flex-col bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 transform origin-bottom-right">

        <!-- Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-500 p-5 flex items-center justify-between text-white shadow-sm relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
              <img src="/favicon.ico" alt="KENAS" class="w-7 h-7 object-contain" onerror="this.style.display='none'" />
            </div>
            <div>
              <h2 class="text-xl font-bold tracking-tight leading-tight">AIMS Assistant</h2>
              <div class="flex items-center gap-2 opacity-90 mt-1">
                <span class="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-200 animate-pulse"></span>
                <p class="text-xs font-medium uppercase tracking-wider">Online</p>
              </div>
            </div>
          </div>
          <button @click="isOpen = false" class="p-2 hover:bg-white/20 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white">
            <UIcon name="i-heroicons-x-mark-20-solid" class="w-7 h-7" />
          </button>
        </div>

        <!-- Chat Area -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50 dark:bg-gray-900/50 scroll-smooth">

          <div v-for="message in messages" :key="message.id" class="flex flex-col" :class="message.isUser ? 'items-end' : 'items-start'">

            <div class="flex items-end gap-3 max-w-[85%]">

              <!-- Bot Avatar -->
              <div v-if="!message.isUser" class="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 shadow-sm flex-shrink-0 flex items-center justify-center mb-1">
                 <UIcon name="i-heroicons-sparkles-solid" class="w-5 h-5 text-primary-600 dark:text-primary-300" />
              </div>

              <!-- Message Bubble -->
              <div
                class="px-5 py-3.5 text-[15px] leading-relaxed relative"
                :class="message.isUser
                  ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-2xl rounded-br-sm shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-sm shadow-md border border-gray-100 dark:border-gray-700/50'"
              >
                <div class="prose dark:prose-invert prose-sm max-w-none prose-p:my-1.5 prose-a:text-blue-500" v-html="message.html"></div>
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="flex flex-col items-start gap-2">
            <div class="flex items-center gap-2 text-xs font-medium text-primary-600/80 dark:text-primary-400 ml-12 animate-pulse">
               <UIcon name="i-heroicons-arrow-path-rounded-square" class="w-4 h-4 animate-spin" /> Deep thinking...
            </div>
            <div class="flex items-end gap-3 max-w-[85%]">
              <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 border border-primary-200 dark:border-primary-800 flex-shrink-0 flex items-center justify-center mb-1">
                 <UIcon name="i-heroicons-cpu-chip-solid" class="w-5 h-5 text-primary-600 dark:text-primary-400 animate-pulse" />
              </div>
              <div class="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-gray-100 dark:border-gray-700/50 flex gap-2">
                <div class="w-2.5 h-2.5 bg-primary-400 rounded-full animate-bounce" style="animation-duration: 0.8s"></div>
                <div class="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.2s; animation-duration: 0.8s"></div>
                <div class="w-2.5 h-2.5 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.4s; animation-duration: 0.8s"></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Input Area -->
        <div class="p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800 z-10 rounded-b-3xl">
          <!-- Suggestion Chips -->
          <transition name="fade">
            <div class="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar" v-if="messages.length === 1">
              <button
                v-for="prompt in commonPrompts"
                @click="sendMessage(prompt)"
                class="whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 font-medium text-[13px] rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:-translate-y-0.5"
              >
                {{ prompt }}
              </button>
            </div>
          </transition>

          <div class="flex items-center gap-3 bg-gray-100 dark:bg-gray-800/80 p-2 rounded-2xl border border-transparent focus-within:border-primary-400 focus-within:bg-white dark:focus-within:bg-gray-900 shadow-inner transition-all duration-300">
            <input
              v-model="newMessage"
              @keyup.enter="() => sendMessage()"
              type="text"
              placeholder="Ask a question..."
              class="flex-1 bg-transparent px-4 py-2.5 text-[15px] focus:outline-none dark:text-white placeholder-gray-400"
              :disabled="isLoading"
            />
            <button
              @click="() => sendMessage()"
              :disabled="isLoading || !newMessage.trim()"
              class="w-12 h-12 flex items-center justify-center bg-primary-600 hover:bg-primary-500 focus:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              <UIcon name="i-heroicons-paper-airplane-20-solid" class="w-6 h-6 ml-[-2px]" />
            </button>
          </div>
          <div class="text-center mt-3">
            <p class="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Large Floating Action Button -->
    <transition name="pop">
      <button
        v-if="!isOpen"
        @click="isOpen = true"
        class="group relative w-[85px] h-[85px] bg-green-500 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] bg-cover bg-center transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-primary-300 border-[3.5px] border-white dark:border-gray-800"
        style="background-image: url('/avatar.png')"
        aria-label="Open AI Assistant"
      >
        <!-- Notification Dot -->
        <span class="absolute top-1 right-1 flex h-5 w-5 z-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-full w-full bg-red-500 border-2 border-white dark:border-gray-900"></span>
        </span>
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { marked } from 'marked';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  html: string;
  thinkingHtml?: string;
}

const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);

const defaultGreeting = "Hello! I am the AIMS Intelligent Assistant with advanced reasoning capabilities. How can I help you today?";

const messages = ref<Message[]>([
  { id: 1, text: defaultGreeting, isUser: false, html: marked(defaultGreeting) as string },
]);

const commonPrompts = ref([
  'How do I apply for accreditation?',
  'What are the fees involved?',
  'Explain ISO 9001 compliance',
]);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight + 100;
  }
};

async function sendMessage(prompt?: string) {
  const text = prompt || newMessage.value;
  if (!text.trim() || isLoading.value) return;

  const userMessage: Message = {
    id: Date.now(),
    text,
    isUser: true,
    html: marked(text) as string,
  };
  messages.value.push(userMessage);

  if (!prompt) {
    newMessage.value = '';
  }

  isLoading.value = true;
  await scrollToBottom();

  const historyPayload = messages.value.slice(0, -1).map(m => ({
    text: m.text,
    isUser: m.isUser
  }));

  try {
    const response = await $fetch('/api/chatbot', {
      method: 'POST',
      body: {
        message: text,
        history: historyPayload
      },
    });

    const parsedResponse = response as { reply: string, thoughts: string };
    const replyText = parsedResponse.reply || "Done thinking.";
    const thoughtsText = parsedResponse.thoughts || "";

    let thinkingHtml = '';
    if (thoughtsText.trim()) {
      thinkingHtml = marked(thoughtsText.trim()) as string;
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: replyText,
      isUser: false,
      html: marked(replyText) as string,
      thinkingHtml: thinkingHtml ? thinkingHtml : undefined
    };

    messages.value.push(botMessage);
  } catch (error) {
    console.error('Chatbot error:', error);
    const errorMessage: Message = {
      id: Date.now() + 1,
      text: 'Sorry, I am having trouble connecting to the intelligence server.',
      isUser: false,
      html: '<p class="text-red-500">Error: Could not retrieve response.</p>',
    };
    messages.value.push(errorMessage);
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
}
</script>

<style scoped>
.chat-panel-enter-active,
.chat-panel-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
