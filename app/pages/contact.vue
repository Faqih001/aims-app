<script setup lang="ts">
import { z } from 'zod'

const toast = useToast()
const loading = ref(false)

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Enter a valid email address'),
  message: z.string().min(10, 'Message should be at least 10 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  message: ''
})

async function onSubmit() {
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 700))
    toast.add({ title: 'Message sent', description: 'Our team will contact you shortly.', color: 'success' })
    state.name = ''
    state.email = ''
    state.message = ''
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <SectionHero
      eyebrow="Contact AIMS"
      title="We are here to support your accreditation journey"
      description="Reach out to our service desk, technical support teams, and departmental contacts."
      image-url="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2000"
      primary-label="Submit Inquiry"
      primary-to="#contact-form"
      secondary-label="Call Service Desk"
      secondary-to="/contact"
    />

    <section id="contact-form" class="py-16 md:py-24">
      <UContainer class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <UCard class="rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold mb-6 text-[#003087] dark:text-primary-300">Contact Form</h2>
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField name="name" label="Name" required><UInput v-model="state.name" /></UFormField>
            <UFormField name="email" label="Email" required><UInput v-model="state.email" type="email" /></UFormField>
            <UFormField name="message" label="Message" required><UTextarea v-model="state.message" :rows="6" /></UFormField>
            <UButton type="submit" color="primary" :loading="loading">Send Message</UButton>
          </UForm>
        </UCard>

        <UCard class="rounded-xl overflow-hidden shadow-lg">
          <h2 class="text-2xl font-bold mb-4 text-[#003087] dark:text-primary-300">Map</h2>
          <div class="h-80 md:h-[420px] rounded-lg bg-default grid place-items-center text-muted">
            Google Maps Embed Placeholder
          </div>
        </UCard>
      </UContainer>
    </section>

    <SectionCards title="Office Location" :items="[{ title: 'Head Office', description: 'Upper Hill, Nairobi, Kenya' }]" :columns="2" />
    <SectionCards title="Phone Contacts" :items="[{ title: 'Main Line', description: '+254 700 000 000' }, { title: 'Support Desk', description: '+254 711 000 000' }]" :columns="2" />
    <SectionCards title="Email Contacts" :items="[{ title: 'General', description: 'info@aims.go.ke' }, { title: 'Support', description: 'support@aims.go.ke' }]" :columns="2" />
    <SectionCards title="Working Hours" :items="[{ title: 'Weekdays', description: '08:00 - 17:00 EAT' }, { title: 'Saturday', description: '09:00 - 13:00 EAT' }]" :columns="2" />

    <SectionCards
      title="Department Contacts"
      :items="[
        { title: 'Applications Unit', description: 'applications@aims.go.ke' },
        { title: 'Assessments Unit', description: 'assessments@aims.go.ke' },
        { title: 'Technical Review', description: 'review@aims.go.ke' },
        { title: 'ICT Support', description: 'helpdesk@aims.go.ke' }
      ]"
      :columns="4"
    />

    <SectionCards title="Support Channels" :items="[{ title: 'Knowledge Base', description: 'Self-service help guides and tutorials.' }, { title: 'Live Assistance', description: 'Priority support for active applications.' }, { title: 'Escalation', description: 'Structured issue escalation workflow.' }]" :columns="3" />

    <SectionCards title="Inquiry Categories" :items="[{ title: 'Application Status', description: 'Track and clarify pending activities.' }, { title: 'Technical Questions', description: 'Standards and evidence requirements.' }, { title: 'Billing Support', description: 'Payment and invoicing guidance.' }]" :columns="3" />

    <SectionCards title="Social Media" :items="[{ title: 'LinkedIn', description: 'Professional updates and announcements.' }, { title: 'X / Twitter', description: 'Service alerts and public communication.' }, { title: 'Facebook', description: 'Community and stakeholder engagement.' }]" :columns="3" />

    <SectionFAQ title="FAQ Preview" :items="[{ label: 'How quickly do you respond?', content: 'Most inquiries receive responses within one business day.' }, { label: 'Where can I raise technical issues?', content: 'Use the support category in contact form for direct technical routing.' }, { label: 'Can I request a call back?', content: 'Yes, include your preferred contact time in the message.' }]" />

    <SectionCards title="Regional Service Coverage" :items="[{ title: 'Nairobi Hub', description: 'Primary service and escalation center.' }, { title: 'Regional Desks', description: 'County-level support touchpoints for applicants.' }, { title: 'Remote Support', description: 'Virtual assistance for out-of-station stakeholders.' }]" :columns="3" />

    <SectionCards title="Emergency Contact" :items="[{ title: 'Critical Escalation Line', description: '+254 733 000 111 (24/7 Critical Service Incidents)' }]" :columns="2" />

    <SectionCTA
      title="Need direct guidance from our support officers?"
      description="Submit your inquiry and get routed to the right department quickly."
      button-label="Send Inquiry"
      button-to="#contact-form"
    />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-6">Feedback Form</h2>
        <UCard class="rounded-xl shadow-lg">
          <div class="grid md:grid-cols-2 gap-4">
            <UInput placeholder="Your Name" />
            <UInput placeholder="Your Email" type="email" />
          </div>
          <UTextarea class="mt-4" :rows="5" placeholder="Share your service experience" />
          <div class="mt-4">
            <UButton color="primary">Submit Feedback</UButton>
          </div>
        </UCard>
      </UContainer>
    </section>
  </div>
</template>