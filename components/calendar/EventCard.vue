<script setup lang="ts">
import type { CalendarEvent } from '~/types'
import { formatEventDate } from '~/utils/formatters'

interface Props {
  event: CalendarEvent
}

const props = defineProps<Props>()

const hasUrl = computed(() => !!props.event.url)

const handleClick = () => {
  if (props.event.url) {
    window.open(props.event.url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <div
    :class="[
      'py-3 px-0 border-b border-border transition-all duration-quick',
      hasUrl && 'cursor-pointer hover:bg-accent/5 hover:-translate-y-px'
    ]"
    @click="handleClick"
  >
    <div class="flex justify-between items-start gap-2.5 flex-wrap">
      <h3 class="text-xl font-semibold text-accent whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
        {{ event.title }}
      </h3>
      <div v-if="hasUrl" class="flex items-center justify-center flex-shrink-0">
        <svg
          class="w-6 h-6 text-accent transition-transform duration-quick group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 4.00001C19.5523 4 20 4.44772 20 5.00001V15.7618C20 16.3141 19.5523 16.7618 19 16.7618H17.8096C17.2573 16.7618 16.8096 16.3141 16.8096 15.7618L16.8095 9.44638L7.96303 18.2929C7.5725 18.6834 6.93933 18.6834 6.54881 18.2929L5.70708 17.4511C5.31657 17.0606 5.31658 16.4274 5.7071 16.0369L14.5535 7.19046H8.23822C7.68594 7.19046 7.23822 6.74275 7.23822 6.19046V5.00007C7.23822 4.44779 7.68593 4.00007 8.23822 4.00007L19 4.00001Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>

    <div class="flex items-center gap-2 mt-1 text-text-primary text-sm">
      <img src="/assets/icons/calendar.svg" alt="Date" class="w-4 h-4">
      <span>{{ formatEventDate(event.startDate) }}</span>
    </div>

    <div v-if="event.location" class="flex items-center gap-2 mt-1 text-text-primary text-sm">
      <img src="/assets/icons/location.svg" alt="Location" class="w-4 h-4">
      <span class="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{{ event.location }}</span>
    </div>

    <p v-if="event.description" class="mt-1.5 text-text-secondary text-sm leading-tight truncate-2">
      {{ event.description }}
    </p>
  </div>
</template>

