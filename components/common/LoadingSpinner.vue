<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  message: 'Loading...'
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4 border-2'
    case 'md':
      return 'w-8 h-8 border-4'
    case 'lg':
      return 'w-12 h-12 border-4'
    default:
      return 'w-8 h-8 border-4'
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-10">
    <div :class="['spinner', sizeClasses]" />
    <p v-if="message" class="text-text-secondary text-lg">{{ message }}</p>
  </div>
</template>

