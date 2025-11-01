<script setup lang="ts">
import type { CalendarService } from '~/types'
import { CALENDAR_SERVICES } from '~/constants'

interface Props {
  isOpen: boolean
  webCalUrl: string
  httpUrl: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const { handleSubscription, copyToClipboard } = useSubscription(props.webCalUrl, props.httpUrl)

const selectedService = ref<CalendarService | null>(null)

const showMainView = computed(() => !selectedService.value)

const handleServiceClick = (service: CalendarService) => {
  selectedService.value = service
  handleSubscription(service)
}

const handleBack = () => {
  selectedService.value = null
}

const handleCopy = async () => {
  await copyToClipboard(props.httpUrl)
}

const handleClose = () => {
  selectedService.value = null
  emit('close')
}

// Reset when modal closes
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    selectedService.value = null
  }
})
</script>

<template>
  <CommonModal :is-open="isOpen" @close="handleClose">
    <!-- Main subscription view -->
    <div v-if="showMainView" class="py-5">
      <p class="text-center text-lg text-text-secondary mb-10">
        Suscribe with your preferred method to stay updated
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Popular Calendars -->
        <div class="text-center">
          <h3 class="text-xl mb-4 text-text-primary">Popular Calendars</h3>
          <div class="flex flex-col gap-4">
            <button
              v-for="service in ['apple', 'google', 'outlook']"
              :key="service"
              class="flex items-center gap-4 px-5 py-4 rounded-lg bg-background-card border-2 border-border cursor-pointer transition-all duration-standard text-left w-full backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-md hover:border-accent hover:bg-accent/10"
              @click="handleServiceClick(service as CalendarService)"
            >
              <span class="text-2xl min-w-[30px]">
                {{ CALENDAR_SERVICES[service as CalendarService].icon }}
              </span>
              <span class="flex flex-col gap-0.5">
                <strong class="text-base text-text-primary">
                  {{ CALENDAR_SERVICES[service as CalendarService].name }}
                </strong>
                <small class="text-sm text-text-secondary">
                  {{ CALENDAR_SERVICES[service as CalendarService].description }}
                </small>
              </span>
            </button>
          </div>
        </div>

        <!-- Direct URL -->
        <div class="text-center">
          <h3 class="text-xl mb-4 text-text-primary">Use direct URL</h3>
          <p class="text-text-secondary mb-4">Copy this URL to add to any calendar app</p>
          <div class="flex gap-2.5 mt-4">
            <input
              :value="webCalUrl"
              type="text"
              readonly
              class="flex-1 px-3 py-3 border-2 border-border rounded-lg text-sm font-sans bg-background-card text-text-primary backdrop-blur-sm transition-all duration-standard focus:outline-none focus:border-accent focus:bg-background-card/80"
            >
            <button
              class="px-5 py-3 bg-accent text-background-primary border-none rounded-lg cursor-pointer font-medium transition-all duration-standard whitespace-nowrap hover:bg-accent-hover hover:-translate-y-0.5"
              @click="handleCopy"
            >
              📋 Copy
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Service-specific instructions -->
    <div v-else-if="selectedService" class="text-left py-8 px-7">
      <div class="flex items-center gap-2.5 mb-4">
        <button
          class="appearance-none bg-transparent border border-border text-text-secondary px-3 py-2 rounded-lg cursor-pointer transition-all duration-quick hover:text-text-primary hover:border-accent hover:bg-accent/10"
          @click="handleBack"
        >
          ← Back
        </button>
        <h3 class="m-0 text-2xl">
          {{ CALENDAR_SERVICES[selectedService].icon }} Subscribe with {{ CALENDAR_SERVICES[selectedService].name }}
        </h3>
      </div>

      <p class="text-text-secondary mb-4">
        Tap the button to add this calendar.
      </p>

      <div class="my-4 flex gap-3 flex-wrap">
        <a
          v-if="selectedService === 'apple'"
          :href="webCalUrl"
          class="btn-primary"
        >
          Open in Apple Calendar
        </a>
        <a
          v-else-if="selectedService === 'google'"
          :href="`https://calendar.google.com/calendar/u/0/r/settings/addbyurl?cid=${encodeURIComponent(httpUrl)}`"
          target="_blank"
          class="btn-primary"
        >
          Add to Google Calendar
        </a>
        <button class="btn-secondary" @click="handleCopy">
          Copy URL
        </button>
      </div>

      <p class="mt-5 mb-2.5 font-bold text-text-primary">Manual Instructions</p>
      <ol class="pl-7 text-text-secondary leading-relaxed">
        <li v-if="selectedService === 'apple'" class="my-2.5">
          Open the Settings app
        </li>
        <li v-if="selectedService === 'apple'" class="my-2.5">
          Go to Calendar → Accounts → Add Account → Other
        </li>
        <li v-if="selectedService === 'apple'" class="my-2.5">
          Under Calendars, choose "Add Subscribed Calendar"
        </li>
        <li v-if="selectedService === 'apple'" class="my-2.5">
          Enter: <code class="bg-background-card/60 border border-border px-1.5 py-0.5 rounded-md text-text-primary break-all">{{ webCalUrl }}</code>
        </li>
        <li v-if="selectedService === 'apple'" class="my-2.5">
          Tap Next, then Save
        </li>

        <li v-if="selectedService === 'google'" class="my-2.5">
          Open Google Calendar in your browser
        </li>
        <li v-if="selectedService === 'google'" class="my-2.5">
          Click the "+" next to "Other calendars"
        </li>
        <li v-if="selectedService === 'google'" class="my-2.5">
          Select "From URL"
        </li>
        <li v-if="selectedService === 'google'" class="my-2.5">
          Paste this URL: <code class="bg-background-card/60 border border-border px-1.5 py-0.5 rounded-md text-text-primary break-all">{{ httpUrl }}</code>
        </li>
        <li v-if="selectedService === 'google'" class="my-2.5">
          Click "Add calendar"
        </li>

        <li v-if="selectedService === 'outlook'" class="my-2.5">
          Open Outlook Calendar
        </li>
        <li v-if="selectedService === 'outlook'" class="my-2.5">
          Click "Add calendar" or "Subscribe to calendar"
        </li>
        <li v-if="selectedService === 'outlook'" class="my-2.5">
          Select "From internet"
        </li>
        <li v-if="selectedService === 'outlook'" class="my-2.5">
          Enter this URL: <code class="bg-background-card/60 border border-border px-1.5 py-0.5 rounded-md text-text-primary break-all">{{ httpUrl }}</code>
        </li>
        <li v-if="selectedService === 'outlook'" class="my-2.5">
          Give it a name and click "Import"
        </li>
      </ol>
    </div>
  </CommonModal>
</template>

