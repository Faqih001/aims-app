<script setup lang="ts">
const { data: userGrowth, pending: userPending } = useFetch<any>('/api/admin/reports/user-growth');
const { data: appSummary, pending: appPending } = useFetch<any>('/api/admin/reports/applications-summary');
const { data: revenue, pending: revenuePending } = useFetch<any>('/api/admin/reports/revenue');
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Reports</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">User Growth</h2>
        </template>
        <p class="text-3xl font-bold">{{ userGrowth?.totalUsers ?? 0 }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Total registered users</p>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Application Submissions</h2>
        </template>
        <p class="text-3xl font-bold">{{ appSummary?.totalApplications ?? 0 }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Total applications submitted</p>
        </template>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Revenue</h2>
        </template>
        <p class="text-3xl font-bold">{{ revenue?.totalInvoices ?? 0 }}</p>
        <template #footer>
          <p class="text-sm text-gray-500">Invoices generated</p>
        </template>
      </UCard>
    </div>
  </div>
</template>
