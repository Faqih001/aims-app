<template>
  <div>
    <SectionsSectionHero
      eyebrow="About AIMS"
      title="National Platform for Accreditation Excellence"
      description="AIMS strengthens institutional quality assurance through transparent, digital, and standards-aligned accreditation operations."
      image-url="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=2000"
      primary-label="Our Services"
      primary-to="/services"
      secondary-label="Contact Us"
      secondary-to="/contact"
    />

    <SectionsSectionSplit title="Organization Overview" description="AIMS is designed to coordinate accreditation applications, reviews, and oversight through a secure and auditable digital environment for all stakeholders." image-url="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600" />

    <SectionsSectionCards title="Mission" :items="[{ title: 'Our Mission', description: 'To deliver trusted, efficient, and accessible accreditation services through digital transformation.' }]" :columns="2" />

    <SectionsSectionCards title="Vision" :items="[{ title: 'Our Vision', description: 'To be the leading digital accreditation ecosystem supporting globally competitive quality infrastructure.' }]" :columns="2" />

    <SectionsSectionCards
      title="Core Values"
      :items="[
        { title: 'Integrity', description: 'Upholding fairness and accountability in all accreditation decisions.' },
        { title: 'Transparency', description: 'Ensuring visible progress and evidence-based outcomes.' },
        { title: 'Innovation', description: 'Leveraging digital systems to improve public services.' },
        { title: 'Collaboration', description: 'Coordinating effectively with applicants and technical experts.' }
      ]"
      :columns="4"
    />

    <SectionsSectionTimeline
      title="History Timeline"
      :items="[
        { title: 'Foundational Program', description: 'Initial digitization of accreditation workflows launched.' },
        { title: 'National Rollout', description: 'Portal expanded to all counties and sectors.' },
        { title: 'Reviewer Integration', description: 'Technical review and quality audit features introduced.' },
        { title: 'Analytics Era', description: 'Performance and compliance dashboards enabled.' }
      ]"
    />

    <SectionsSectionCards
      title="Leadership Team"
      :items="[
        { title: 'Director General', description: 'Strategic oversight and policy implementation.' },
        { title: 'Director, Accreditation', description: 'Leads accreditation operations and service quality.' },
        { title: 'Director, ICT', description: 'Drives digital systems and platform resilience.' },
        { title: 'Head, Technical Review', description: 'Ensures scientific and technical rigor in decisions.' }
      ]"
      :columns="4"
    />

    <section class="py-16 md:py-24 bg-white dark:bg-[#111]">
      <UContainer class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-[#003087] dark:text-primary-300 mb-6">Organizational Structure</h2>
        <UCard class="rounded-xl shadow-lg">
          <p class="text-sm text-muted">AIMS operates through governance, accreditation services, assessor coordination, technical review, and compliance assurance directorates.</p>
        </UCard>
      </UContainer>
    </section>

    <SectionsSectionCards
      title="Achievements"
      :items="[
        { title: '96% SLA Compliance', description: 'Measured over the last reporting year.' },
        { title: '350+ Bodies Accredited', description: 'Across laboratory, inspection, and certification services.' },
        { title: 'Paperless Workflow', description: 'Majority of submissions now fully digital.' }
      ]"
      :columns="3"
    />

    <SectionsSectionSplit title="Accreditation Mandate" description="Our mandate is to assess conformity assessment bodies against internationally recognized standards and provide trusted accreditation outcomes." image-url="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600" reverse />

    <SectionsSectionCards
      title="Global Partnerships"
      :items="[
        { title: 'Regional Accreditation Networks', description: 'Alignment with continental quality infrastructure initiatives.' },
        { title: 'International Cooperation', description: 'Collaboration with peer accreditation institutions globally.' },
        { title: 'Knowledge Exchange', description: 'Joint learning, training, and policy harmonization.' }
      ]"
      :columns="3"
    />

    <SectionsSectionCards
      title="Standards Compliance"
      :items="[
        { title: 'ISO/IEC 17011', description: 'Accreditation body competence and operation requirements.' },
        { title: 'ISO/IEC 17025', description: 'Testing and calibration laboratory competence requirements.' },
        { title: 'ISO/IEC 17021', description: 'Certification body requirements and assessment controls.' }
      ]"
      :columns="3"
    />

    <SectionsSectionCards
      title="Impact Statistics"
      :items="[
        { title: '47 Counties', description: 'Service availability across all counties.' },
        { title: '1,200+ Applications', description: 'Managed through digital workflows annually.' },
        { title: '30% Faster Reviews', description: 'Achieved through process automation.' }
      ]"
      :columns="3"
    />

    <SectionsSectionCards
      title="Stakeholder Testimonials"
      :items="[
        { title: 'Public Health Lab', description: 'AIMS significantly improved response times and clarity of requirements.' },
        { title: 'Certification Agency', description: 'Structured coordination made reviews predictable and evidence-based.' },
        { title: 'Inspection Body', description: 'The platform has improved trust and transparency with clients.' }
      ]"
      :columns="3"
    />

    <SectionsSectionCTA
      title="Partner with AIMS for trusted accreditation outcomes"
      description="Start your accreditation journey with a modern and transparent digital process."
      button-label="Start Application"
      button-to="/auth/register"
    />
  </div>
</template>
