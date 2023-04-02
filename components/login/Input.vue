<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const val = ref('')
const style = ref(['top-2'])
const passShow = ref(false)

const emits = defineEmits(['update:value'])

const onFocus = () => {
  style.value = ['-top-5', 'scale-90']
}
const onBlur = () => {
  if (!val.value) style.value = ['top-2']
}
const onChange = () => {
  emits('update:value', val)
}

const togglePassShow = () => {
  passShow.value = !passShow.value
}
</script>

<template>
  <div class="flex items-center border-b-2 border-solid border-white">
    <Icon v-if="icon" class="text-xl" :name="icon" />
    <div class="relative ml-3 w-full">
      <span class="absolute left-0 transition-all" :class="style">{{ placeholder }}</span>
      <input
        v-model="val"
        :type="passShow ? 'text' : type"
        class="h-9 w-full border-none bg-transparent outline-none"
        :class="{ 'pr-8': type === 'password' }"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />
      <div
        v-if="type === 'password'"
        class="absolute top-2 right-0 cursor-pointer"
        @click="togglePassShow"
      >
        <Icon v-if="passShow" class="text-xl" name="ph:eye-light" />
        <Icon v-else class="text-xl" name="ph:eye-slash" />
      </div>
    </div>
  </div>
</template>
