<template>
  <section id="contact" class="section contact">
    <div class="container contact-inner">
      <p v-reveal class="eyebrow">Contact</p>
      <h2 v-reveal="60" class="section-title">
        Let's build <span class="text-grad">something together</span>
      </h2>
      <p v-reveal="120" class="contact-sub">
        Have a question, or want to order a website or a new project? Send me an
        email or a message on Telegram — I work weekdays, 10:00–19:00 Kyiv time,
        and usually reply the same day.
      </p>

      <div v-reveal="200" class="contact-actions">
        <a class="btn btn-primary" :href="`mailto:${EMAIL}`">
          <SocialIcon name="email" />
          {{ EMAIL }}
        </a>
        <a class="btn btn-ghost" :href="TELEGRAM" target="_blank" rel="noopener">
          <SocialIcon name="telegram" />
          {{ TELEGRAM_HANDLE }}
        </a>
      </div>

      <p v-reveal="280" class="contact-note">
        Open to full-time and freelance opportunities · Based in Ukraine 🇺🇦
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: 140px;
}

.contact-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact-inner .eyebrow::before {
  display: none;
}

.contact-sub {
  margin-top: 20px;
  max-width: 560px;
  color: var(--muted);
  font-size: 17px;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 42px;
}

.contact-actions svg {
  width: 18px;
  height: 18px;
}

.contact-note {
  margin-top: 40px;
  color: var(--muted);
  font-size: 14px;
  letter-spacing: 0.02em;
}
</style>
