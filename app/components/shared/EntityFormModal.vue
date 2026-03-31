<template>
  <USlideover v-model="isOpen">
    <UCard>
      <template #header><h3 class="text-xl font-bold">{{ title }}</h3></template>
      <form @submit.prevent="submit" class="space-y-4">
        <UFormGroup v-for="field in fields" :key="field.name" :label="field.label">
          <UInput v-if="field.type === 'text'" v-model="formData[field.name]" />
          <USelectMenu v-else-if="field.type === 'select'" v-model="formData[field.name]" :options="field.options" />
        </UFormGroup>
        <div class="flex justify-end gap-2 mt-4">
          <UButton label="Cancel" color="neutral" @click="isOpen = false" />
          <UButton type="submit" label="Save" color="primary" />
        </div>
      </form>
    </UCard>
  </USlideover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({ title: String, fields: Array, modelValue: Boolean, initialData: Object });
const emit = defineEmits(['update:modelValue', 'save']);
const isOpen = computed({ get: () => props.modelValue, set: (val) => emit('update:modelValue', val) });
const formData = ref({ ...props.initialData });
const submit = () => { emit('save', formData.value); isOpen.value = false; };
</script>
