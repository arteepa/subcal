<script setup lang="ts">
import { DEFAULT_USER_CONFIG } from '~/constants'

const config = DEFAULT_USER_CONFIG
const { loadCalendarFromUrl, upcomingEvents, metadata, isLoading, error } = useCalendar()
const uiStore = useUiStore()

const isSubscriptionModalOpen = ref(false)

// Load calendar on mount
onMounted(async () => {
  try {
    await loadCalendarFromUrl(config.calendar.httpUrl)
  } catch (err) {
    console.error('Failed to load calendar:', err)
    uiStore.showError('Failed to load calendar events. Please try again later.')
  }
})

const handleSubscribeClick = () => {
  isSubscriptionModalOpen.value = true
}

const handleCloseModal = () => {
  isSubscriptionModalOpen.value = false
}

useHead({
  title: computed(() => metadata.value?.title || 'Calendar'),
  meta: [
    {
      name: 'description',
      content: computed(() => metadata.value?.description || 'Calendar events')
    }
  ]
})
</script>

<template>
  <div>
    <!-- Calendar Header -->
    <header class="bg-background-primary">
      <div class="max-w-3xl mx-auto px-3 py-4 text-center">
        <h1 class="text-base font-bold text-text-primary m-0">
          {{ metadata?.title || 'Loading...' }}
        </h1>
        <p class="text-sm font-normal text-text-secondary m-0 leading-tight">
          {{ metadata?.description || '' }}
        </p>
      </div>
    </header>

    <!-- Events Section -->
    <section class="bg-background-primary py-0">
      <div class="container-custom">
        <!-- Loading state -->
        <CommonLoadingSpinner v-if="isLoading" message="Loading events from calendar feed..." />

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-10 px-5 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 my-5">
          <h3 class="text-red-600 mb-4 text-2xl">Unable to load calendar events</h3>
          <p class="text-red-900 mb-2.5 leading-relaxed">
            There was an error loading the calendar feed.
          </p>
          <div class="bg-red-100 rounded-md p-5 my-5 text-left max-w-2xl mx-auto">
            <p class="text-red-900 mb-2.5"><strong>Technical details:</strong> {{ error.message }}</p>
          </div>
          <button class="btn-primary mt-4" @click="() => loadCalendarFromUrl(config.calendar.httpUrl)">
            🔄 Retry
          </button>
        </div>

        <!-- Events list -->
        <div v-else-if="upcomingEvents.length > 0" class="max-w-3xl mx-auto pb-32">
          <CalendarEventCard
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <!-- No events -->
        <div v-else class="text-center py-10 text-text-secondary text-lg">
          No upcoming events found.
        </div>
      </div>
    </section>

    <!-- Sticky Subscribe Button -->
    <div class="fixed bottom-0 left-0 right-0 z-[1000] py-4 px-5 bg-background-primary border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <p class="text-accent text-sm text-center mb-1">
        Follow these events in your calendar app:
      </p>
      <button
        class="w-full max-w-md mx-auto flex items-center justify-center gap-3 px-6 py-4 bg-accent text-background-primary border-none rounded-xl cursor-pointer text-xl font-semibold transition-all duration-standard shadow-button hover:-translate-y-0.5 hover:shadow-button-hover"
        @click="handleSubscribeClick"
      >
        <span class="font-semibold">Subscribe to Calendar</span>
      </button>
    </div>

    <!-- Subscription Modal -->
    <CalendarSubscriptionModal
      :is-open="isSubscriptionModalOpen"
      :web-cal-url="config.calendar.webCalUrl"
      :http-url="config.calendar.httpUrl"
      @close="handleCloseModal"
    />
  </div>
</template>

