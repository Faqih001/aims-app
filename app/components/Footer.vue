<template>
  <footer class="bg-white dark:bg-[#151515] border-t border-default/60 mt-16">
    <UContainer class="max-w-7xl mx-auto py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <div>
          <h3 class="font-semibold text-lg mb-4 text-[#003087] dark:text-primary-300">About AIMS</h3>
          <p class="text-sm text-muted leading-6">
            National digital platform for accreditation applications, assessment coordination, and transparent quality assurance oversight.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-4 text-[#003087] dark:text-primary-300">Services</h3>
          <ul class="space-y-2 text-sm text-muted">
            <li>Testing Laboratories</li>
            <li>Certification Bodies</li>
            <li>Inspection Bodies</li>
            <li>Calibration Services</li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-4 text-[#003087] dark:text-primary-300">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/about" class="text-muted hover:text-[#003087]">About</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-muted hover:text-[#003087]">Services</NuxtLink></li>
            <li><NuxtLink to="/faqs" class="text-muted hover:text-[#003087]">FAQs</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-muted hover:text-[#003087]">Contact</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-lg mb-4 text-[#003087] dark:text-primary-300">Contact</h3>
          <ul class="space-y-2 text-sm text-muted mb-4">
            <li>Upper Hill, Nairobi</li>
            <li>+254 700 000 000</li>
            <li>info@aims.go.ke</li>
          </ul>

          <div class="flex items-center gap-2 mb-4">
            <UButton icon="i-simple-icons-x" variant="ghost" color="neutral" aria-label="X" />
            <UButton icon="i-simple-icons-linkedin" variant="ghost" color="neutral" aria-label="LinkedIn" />
            <UButton icon="i-simple-icons-facebook" variant="ghost" color="neutral" aria-label="Facebook" />
          </div>

          <form class="flex gap-2">
            <UInput placeholder="Your email" type="email" class="flex-1" />
            <UButton color="primary">Subscribe</UButton>
          </form>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
