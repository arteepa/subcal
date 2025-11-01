<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from '~/types'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes: string[] = ['btn-base']
  
  // Variant classes
  switch (props.variant) {
    case 'primary':
      classes.push('btn-primary')
      break
    case 'secondary':
      classes.push('btn-secondary')
      break
    case 'outline':
      classes.push('btn-outline')
      break
    case 'ghost':
      classes.push('bg-transparent hover:bg-background-card')
      break
  }
  
  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('px-3 py-1.5 text-base')
      break
    case 'md':
      classes.push('px-4 py-2 text-lg')
      break
    case 'lg':
      classes.push('px-6 py-3 text-xl')
      break
  }
  
  // Disabled/loading state
  if (props.disabled || props.loading) {
    classes.push('opacity-50 cursor-not-allowed')
  }
  
  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner mr-2" />
    <slot />
  </button>
</template>

