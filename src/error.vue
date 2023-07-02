<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'

const router = useRouter()
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="router.push('/')">找点乐子吧</n-button>
      </template>
    </n-result>
  </div>
</template>
