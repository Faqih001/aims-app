<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <DashboardSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <DashboardTopbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div class="container mx-auto px-6 py-8">
          <DashboardBreadcrumb />
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
