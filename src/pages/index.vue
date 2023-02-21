<script setup lang="ts">
import { use } from 'h3'

interface IUser {
  name: string
  age?: number
}

const user: IUser = {
  name: 'vinson'
}

user.age = 'abc'

console.log(user)

const year = '2022'
const title = `${year} 2023 Nuxt3`
</script>

<template>
  <h1>index</h1>
  <div>{{ title }}</div>
</template>
