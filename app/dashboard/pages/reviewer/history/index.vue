<script setup lang="ts">
// Scaffolding for history
</script>
<template>
  <div>
    <DashboardBreadcrumb :breadcrumbs="[{label: 'Reviewer', to: '/dashboard/reviewer'}, {label: 'History'}]" />
    <h1 class="text-3xl font-bold mb-4">Reviewer History</h1>
    <UCard>
      <p>This is the history dashboard interface.</p>
    </UCard>
  </div>
</template>
