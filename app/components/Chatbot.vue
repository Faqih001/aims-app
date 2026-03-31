<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Button -->
    <transition name="fade">
      <button 
        v-if="!isOpen" 
        @click="isOpen = true" 
        class="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform transform hover:scale-110 focus:outline-none"
        aria-label="Open Chat"
      >
        <UIcon name="i-heroicons-chat-bubble-left-right-solid" class="w-8 h-8" />
      </button>
    </transition>

    <!-- Chat Widget -->
    <transition name="slide-up">
      <div v-if="isOpen" class="w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        
        <!-- Header -->
        <div class="bg-primary-600 p-4 flex items-center justify-between text-white shadow-md relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <img src="/favicon.ico" alt="KENAS" class="w-6 h-6 object-contain" onerror="this.style.display='none'" />
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6 absolute" v-if="false" />
            </div>
            <div>
              <h2 class="text-lg font-semibold tracking-wide leading-tight">KENAS Assistant</h2>
              <div class="flex items-center gap-1.5 opacity-90 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <p class="text-xs font-medium">Online</p>
              </div>
            </div>
          </div>
          <button @click="isOpen = false" class="p-1 hover:bg-white/20 rounded-lg transition-colors focus:outline-none">
            <UIcon name="i-heroicons-x-mark-20-solid" class="w-6 h-6" />
          </button>
        </div>

        <!-- Chat Area -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-gray-800/50 scroll-smooth">
          
          <div v-for="message in messages" :key="message.id" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
            <div class="flex items-end gap-2 max-w-[85%]">
              
              <!-- Bot Avatar -->
              <div v-if="!message.isUser" class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex-shrink-0 flex items-center justify-center mb-1">
                 <UIcon name="i-heroicons-cpu-chip-solid" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
              
              <!-- Message Bubble -->
              <div 
                class="px-4 py-3 rounded-2xl text-sm leading-relaxed" 
                :class="message.isUser 
                  ? 'bg-primary-600 text-white rounded-br-sm shadow-sm' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700'"
              >
                <div class="prose dark:prose-invert prose-sm max-w-none prose-p:my-1 prose-a:text-blue-400" v-html="message.html"></div>
              </div>
              
            </div>
          </div>

          <!-- Thinking Indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="flex items-end gap-2 max-w-[85%]">
              <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex-shrink-0 flex items-center justify-center mb-1">
                 <UIcon name="i-heroicons-cpu-chip-solid" class="w-4 h-4 text-primary-600 dark:text-primary-400 animate-pulse" />
              </div>
              <div class="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1.5 items-center">
                <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-duration: 1s"></div>
                <div class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0.2s; animation-duration: 1s"></div>
                <div class="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.4s; animation-duration: 1s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-10">
          <!-- Suggestion Chips -->
           <div class="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar" v-if="messages.length === 1">
            <button 
              v-for="prompt in commonPrompts" 
              :key="prompt" 
              @click="sendMessage(prompt)" 
              class="whitespace-nowrap px-3 py-1.5 bg-primary-50 hover:bg-primary-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-primary-700 dark:text-primary-300 text-xs rounded-full border border-primary-100 dark:border-gray-700 transition"
            >
              {{ prompt }}
            </button>
          </div>
          
          <div class="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-full border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
            <input 
              v-model="newMessage" 
              @keyup.enter="() => sendMessage()" 
              type="text"
              placeholder="Ask me anything..." 
              class="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none dark:text-white"
              :disabled="isLoading"
            />
            <button 
              @click="() => sendMessage()" 
              :disabled="isLoading || !newMessage.trim()"
              class="w-10 h-10 flex items-center justify-center bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex-shrink-0"
            >
              <UIcon name="i-heroicons-paper-airplane-20-solid" class="w-5 h-5 ml-[-2px]" />
            </button>
          </div>
          <div class="text-center mt-2">
            <p class="text-[10px] text-gray-400">Powered by Gemini AI (v1.5)</p>
          </div>
        </div>
      </div>
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
}

const isOpen = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);

const defaultGreeting = 'Hello! I am your KENAS AI Assistant. How can I help you with accreditation, services, or standards today?';

const messages = ref<Message[]>([
  { id: 1, text: defaultGreeting, isUser: false, html: marked(defaultGreeting) as string },
]);

const commonPrompts = ref([
  'How do I apply for accreditation?',
  'What are the fees involved?',
  'Track my application',
]);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
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

  // Extract previous history (excluding the very first greeting to save tokens, or include it)
  // Let's include everything except the current message just added
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
    
    const replyText = (response as any).reply || 'Sorry, I got an empty response.';
    
    const botMessage: Message = {
      id: Date.now() + 1,
      text: replyText,
      isUser: false,
      html: marked(replyText) as string,
    };
    messages.value.push(botMessage);
  } catch (error) {
    console.error('Chatbot error:', error);
    const errorMessage: Message = {
      id: Date.now() + 1,
      text: 'Sorry, I am having trouble connecting to AI services right now. Please try again later.',
      isUser: false,
      html: marked('**Error:** Sorry, I am having trouble connecting to AI services right now. Please try again later.') as string,
    };
    messages.value.push(errorMessage);
  } finally {
    isLoading.value = false;
    await scrollToBottom();
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
