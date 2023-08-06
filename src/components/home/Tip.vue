<script setup lang="ts">
interface Props {
  tip: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center rounded-lg border border-dashed border-gray-300 p-3 dark:border-indigo-500 md:p-5"
  >
    <Icon
      class="heart text-xl text-orange-400 dark:text-indigo-600"
      name="icon-park-outline:volume-notice"
    />
    <!-- eslint-disable-next-line -->
    <span v-html="tip" class="ml-3 flex-1 break-all text-base"></span>
  </div>
</template>
