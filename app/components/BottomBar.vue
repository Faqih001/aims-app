<template>
  <div class="border-t border-default/60 py-4">
    <UContainer class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm text-muted">
        <p>© {{ new Date().getFullYear() }} AIMS. All rights reserved.</p>

        <div class="flex items-center gap-4">
          <NuxtLink to="/legal/privacy" class="hover:text-[#003087]">Privacy Policy</NuxtLink>
          <NuxtLink to="/legal/terms" class="hover:text-[#003087]">Terms</NuxtLink>
          <NuxtLink to="/legal/cookies" class="hover:text-[#003087]">Cookies</NuxtLink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
