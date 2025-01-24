<script setup lang="ts">
interface Props {
  tip: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="border-v-hc dark:border-v-hc-dark flex items-center rounded-lg border border-dashed p-3 md:p-5"
  >
    <Icon
      class="heart text-v-hc dark:text-v-hc-dark text-xl"
      name="icon-park-outline:volume-notice"
    />
    <!-- eslint-disable-next-line -->
    <span v-html="tip" class="ml-3 flex-1 break-all text-base"></span>
  </div>
</template>
