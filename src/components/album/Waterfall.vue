<script setup lang="ts">
interface Props {
  list: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="container">
    <div v-for="(img, index) in list" :key="index" class="box">
      <img :src="img" alt="" />
    </div>
    <!-- <div class="box">
      <img src="https://cdn.sakura520.co/images/0302.jpeg" alt="" />
    </div>
    <div class="box">
      <img src="https://cdn.sakura520.co/images/0510.webp" alt="" />
    </div>
    <div class="box">
      <img src="https://cdn.sakura520.co/images/0517.webp" alt="" />
    </div>
    <div class="box">
      <img
        src="http://view.lixingyong.com/images/2023/05/28/7ed0fb5865b7a71c2c8f8de78055be3504ff7e6e8032e86b.png"
        alt=""
      />
    </div>
    <div class="box">
      <img src="https://cdn.sakura520.co/images/0302.jpeg" alt="" />
    </div>
    <div class="box">
      <img
        src="http://view.lixingyong.com/images/2023/05/28/7ed0fb5865b7a71c2c8f8de78055be3504ff7e6e8032e86b.png"
        alt=""
      />
    </div>
    <div class="box">
      <img
        src="http://view.lixingyong.com/images/2023/05/28/1588433642207d4bea005c5c97e0c.webp"
        alt=""
      />
    </div>
    <div class="box">
      <img src="https://cdn.sakura520.co/images/073.jpeg" alt="" />
    </div> -->
  </div>
</template>

<style>
.container {
  width: 1400px;
  margin: 20px auto;
  columns: 4;
  column-gap: 15px;
}
.container .box {
  width: 100%;
  margin-bottom: 15px;
  break-inside: avoid;
}
.container .box img {
  max-width: 100%;
  border-radius: 15px;
}

@media (max-width: 1200px) {
  .container {
    width: calc(100% - 40px);
    columns: 3;
  }
}
@media (max-width: 768px) {
  .container {
    columns: 2;
  }
}
@media (max-width: 480px) {
  .container {
    columns: 1;
  }
}
</style>
