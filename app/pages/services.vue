<template>
  <div>
    <SectionHero
      eyebrow="Accreditation Services"
      title="Comprehensive Services for Conformity Assessment Bodies"
      description="Explore digital accreditation pathways designed for laboratories, certification, inspection, and calibration organizations."
      image-url="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      primary-label="Apply Now"
      primary-to="/auth/register"
      secondary-label="Contact Service Desk"
      secondary-to="/contact"
    />

    <SectionCards
      title="Service Categories"
      :items="[
        { title: 'Testing', description: 'Laboratory testing accreditation pathways.' },
        { title: 'Certification', description: 'Certification body accreditation services.' },
        { title: 'Inspection', description: 'Inspection service accreditation coverage.' },
        { title: 'Calibration', description: 'Calibration scope and quality verification services.' }
      ]"
      :columns="4"
    />

    <SectionSplit title="Testing Laboratories Accreditation" description="Assess laboratory competence, quality management, and technical procedures against international standards." image-url="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=1600" />

    <SectionSplit title="Certification Bodies Accreditation" description="Evaluate certification processes, impartiality safeguards, and operational competence." image-url="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1600" reverse />

    <SectionSplit title="Inspection Bodies Accreditation" description="Strengthen inspection reliability through documented methods, qualified personnel, and oversight controls." image-url="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1600" />

    <SectionSplit title="Calibration Services" description="Support precision and traceability in calibration through robust technical review workflows." image-url="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" reverse />

    <SectionTimeline
      title="Service Process Overview"
      :items="[
        { title: 'Eligibility Check', description: 'Confirm scope fit and prerequisites.' },
        { title: 'Application Submission', description: 'Provide forms and supporting documents.' },
        { title: 'Assessment Phase', description: 'Technical and on-site evaluations conducted.' },
        { title: 'Decision & Follow-up', description: 'Final outcome and surveillance scheduling.' }
      ]"
    />

    <SectionCards
      title="Requirements Checklist"
      :items="[
        { title: 'Legal Registration', description: 'Valid legal and operational registration evidence.' },
        { title: 'Quality Manual', description: 'Documented quality management procedures.' },
        { title: 'Technical Competence', description: 'Qualified personnel and validated methods.' },
        { title: 'Internal Audits', description: 'Evidence of internal audit and management review.' }
      ]"
      :columns="4"
    />

    <SectionCards
      title="Benefits by Service"
      :items="[
        { title: 'Testing Labs', description: 'Improved confidence in analytical outputs.' },
        { title: 'Certification Bodies', description: 'Greater market trust and recognition.' },
        { title: 'Inspection Bodies', description: 'Consistent inspection quality outcomes.' },
        { title: 'Calibration Services', description: 'Higher measurement reliability and traceability.' }
      ]"
      :columns="4"
    />

    <SectionCards
      title="Pricing (Mock)"
      :items="[
        { title: 'Starter Scope', description: 'KES 40,000 - Initial assessment package.' },
        { title: 'Standard Scope', description: 'KES 85,000 - Multi-scope accreditation package.' },
        { title: 'Complex Scope', description: 'Custom quotation based on technical breadth.' }
      ]"
      :columns="3"
    />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-8">Service Comparison</h2>
        <UCard class="rounded-xl overflow-x-auto">
          <table class="w-full text-sm min-w-[680px]">
            <thead>
              <tr class="text-left border-b border-default">
                <th class="py-3">Service</th>
                <th class="py-3">Average Duration</th>
                <th class="py-3">Site Visit</th>
                <th class="py-3">Technical Review</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-default/60"><td class="py-3">Testing Lab</td><td>6-10 Weeks</td><td>Required</td><td>Required</td></tr>
              <tr class="border-b border-default/60"><td class="py-3">Certification Body</td><td>8-12 Weeks</td><td>Required</td><td>Required</td></tr>
              <tr><td class="py-3">Inspection Body</td><td>5-8 Weeks</td><td>Required</td><td>Conditional</td></tr>
            </tbody>
          </table>
        </UCard>
      </UContainer>
    </section>

    <SectionCards
      title="Workflow Diagram"
      :items="[
        { title: 'Input', description: 'Submission and documentation checks.' },
        { title: 'Processing', description: 'Assessment and technical review gates.' },
        { title: 'Output', description: 'Decision publication and follow-up surveillance.' }
      ]"
      :columns="3"
    />

    <SectionFAQ
      title="Service FAQs"
      :items="[
        { label: 'Can I apply for multiple scopes?', content: 'Yes, applications can include multiple scopes with corresponding evidence.' },
        { label: 'Do all services require site visits?', content: 'Most services require on-site assessment, depending on scope and risk profile.' },
        { label: 'Can I update documents after submission?', content: 'Yes, additional documents may be uploaded during review cycles.' }
      ]"
    />

    <SectionCards
      title="Case Studies"
      :items="[
        { title: 'Regional Lab Expansion', description: 'Accreditation readiness achieved in record time.' },
        { title: 'Inspection Quality Program', description: 'Improved consistency in inspection outcomes.' },
        { title: 'Certification Readiness', description: 'Strengthened governance and audit controls.' }
      ]"
      :columns="3"
    />

    <SectionCTA
      title="Choose the accreditation service that fits your organization"
      description="Create an account and begin your structured, transparent service workflow today."
      button-label="Start Your Application"
      button-to="/auth/register"
    />
  </div>
</template>
