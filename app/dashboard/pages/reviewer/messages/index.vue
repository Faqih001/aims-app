<script setup lang="ts">
// Scaffolding for messages
</script>
<template>
  <div>
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'Messages'}]" />
    <h1 class="text-3xl font-bold mb-4">Reviewer Messages</h1>
    <UCard>
      <p>This is the messages dashboard interface.</p>
    </UCard>
  </div>
</template>
