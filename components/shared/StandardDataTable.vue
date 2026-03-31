<template>
  <div>
    <div class="flex justify-between pb-4">
      <UInput v-model="q" placeholder="Search..." icon="i-heroicons-search" />
      <UButton label="Add New" @click="$emit('add')" />
    </div>
    <UTable :columns="columns" :rows="filteredRows">
      <template #actions-data="{ row }">
        <UDropdown :items="actions(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
        </UDropdown>
      </template>
    </UTable>
    <div class="flex justify-between pt-4">
      <UPagination v-model="page" :page-count="pageCount" :total="rows.length" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps({ columns: Array, rows: Array });
const emit = defineEmits(['add', 'edit', 'delete']);
const q = ref('');
const page = ref(1);
const pageCount = ref(10);
const filteredRows = computed(() => props.rows?.slice((page.value - 1) * pageCount.value, page.value * pageCount.value));
const actions = (row) => [[
  { label: 'Edit', icon: 'i-heroicons-pencil', click: () => emit('edit', row) },
  { label: 'Delete', icon: 'i-heroicons-trash', click: () => emit('delete', row) }
]];
</script>
