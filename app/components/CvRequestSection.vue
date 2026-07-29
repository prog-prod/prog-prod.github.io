<script setup lang="ts">
type Status = 'idle' | 'sending' | 'sent' | 'error'

const email = ref('')
const message = ref('')
// Bots fill every field they find; humans never see this one.
const company = ref('')
const status = ref<Status>('idle')
const error = ref('')

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()))
const canSubmit = computed(() => emailValid.value && status.value !== 'sending')

async function submit() {
  if (!canSubmit.value) return
  status.value = 'sending'
  error.value = ''

  try {
    const res = await fetch(CV_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: CV_FORM_ACCESS_KEY,
        subject: 'CV request from prog-prod.github.io',
        from_name: 'Website CV request',
        // The address the CV should go to — the whole point of the form.
        email: email.value.trim(),
        message: message.value.trim() || '(no message)',
        botcheck: company.value
      })
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.success === false) {
      throw new Error(data.message || `Request failed (${res.status})`)
    }

    status.value = 'sent'
    email.value = ''
    message.value = ''
  } catch (e) {
    status.value = 'error'
    error.value = e instanceof Error ? e.message : 'Something went wrong'
  }
}
</script>

<template>
  <section id="cv" class="section">
    <div class="container cv-inner">
      <div class="section-head">
        <p v-reveal class="eyebrow">Resume</p>
        <h2 v-reveal="60" class="section-title">
          Ask for <span class="text-grad">my CV</span>
        </h2>
        <p v-reveal="120" class="section-sub">
          I don't keep my CV as a public download — it carries personal contact
          details. Leave an address and I'll send the latest version over,
          usually the same working day.
        </p>
      </div>

      <form v-reveal="180" class="card cv-form" novalidate @submit.prevent="submit">
        <div class="field">
          <label for="cv-email">Where should I send it?</label>
          <input
            id="cv-email"
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="you@company.com"
            required
            :aria-invalid="email.length > 0 && !emailValid"
          />
          <p v-if="email.length > 0 && !emailValid" class="field-hint">
            That doesn't look like an email address.
          </p>
        </div>

        <div class="field">
          <label for="cv-message">Anything you'd like to add? <span>optional</span></label>
          <textarea
            id="cv-message"
            v-model="message"
            name="message"
            rows="4"
            placeholder="A few words about the role or project."
          />
        </div>

        <!-- honeypot -->
        <div class="hp" aria-hidden="true">
          <label for="cv-company">Company</label>
          <input id="cv-company" v-model="company" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div class="cv-actions">
          <button type="submit" class="btn btn-primary" :disabled="!canSubmit">
            {{ status === 'sending' ? 'Sending…' : 'Request CV' }}
          </button>
          <p class="cv-status" role="status" aria-live="polite">
            <span v-if="status === 'sent'" class="ok">
              Thanks — I've got your request and will send the CV shortly.
            </span>
            <span v-else-if="status === 'error'" class="bad">
              {{ error }} — you can also email me directly at {{ EMAIL }}.
            </span>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.cv-inner {
  max-width: 760px;
}

.cv-form {
  margin-top: 34px;
  padding: 30px;
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 9px;
}

.field label {
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
}

.field label span {
  color: var(--muted);
  font-weight: 400;
}

.field input,
.field textarea {
  width: 100%;
  padding: 13px 15px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  font: inherit;
  font-size: 16px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #6b7189;
}

.field input:focus-visible,
.field textarea:focus-visible {
  outline: none;
  border-color: rgba(139, 92, 246, 0.75);
  background: rgba(139, 92, 246, 0.08);
}

.field input[aria-invalid='true'] {
  border-color: rgba(244, 63, 94, 0.7);
}

.field textarea {
  resize: vertical;
  min-height: 110px;
}

.field-hint {
  font-size: 14px;
  color: #fb7185;
}

/* Off-screen rather than display:none — bots skip hidden inputs. */
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cv-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.cv-actions button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.cv-status {
  font-size: 15px;
  flex: 1 1 260px;
}

.cv-status .ok {
  color: var(--cyan);
}

.cv-status .bad {
  color: #fb7185;
}
</style>
