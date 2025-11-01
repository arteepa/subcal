<script setup lang="ts">
import type { Toast } from '~/types'

interface Props {
  toast: Toast
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: [id: string]
}>()

const toastClasses = computed(() => {
  const classes = [
    'fixed top-5 right-5 z-[1001]',
    'px-5 py-4 rounded-lg shadow-lg',
    'font-medium',
    'animate-slide-in',
    'max-w-md'
  ]
  
  switch (props.toast.type) {
    case 'success':
      classes.push('bg-green-600 text-white')
      break
    case 'error':
      classes.push('bg-red-600 text-white')
      break
    case 'warning':
      classes.push('bg-yellow-600 text-white')
      break
    case 'info':
      classes.push('bg-blue-600 text-white')
      break
  }
  
  return classes.join(' ')
})

const iconEmoji = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return ''
  }
})

const handleClose = () => {
  emit('close', props.toast.id)
}
</script>

<template>
  <div :class="toastClasses">
    <div class="flex items-start gap-3">
      <span class="text-xl">{{ iconEmoji }}</span>
      <p class="flex-1">{{ toast.message }}</p>
      <button
        class="text-white/80 hover:text-white transition-colors"
        @click="handleClose"
      >
        ✕
      </button>
    </div>
  </div>
</template>

