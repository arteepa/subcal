<script setup lang="ts">
const uiStore = useUiStore()

const handleClose = (id: string) => {
  uiStore.removeToast(id)
}
</script>

<template>
  <div>
    <CommonToast
      v-for="toast in uiStore.toasts"
      :key="toast.id"
      :toast="toast"
      @close="handleClose"
    />
  </div>
</template>

