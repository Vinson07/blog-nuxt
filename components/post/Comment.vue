<script setup lang="ts">
import { NInput, NButton } from 'naive-ui'

const value = ref('')
</script>

<template>
  <!-- 评论 -->
  <div>
    <!-- 标题 -->
    <div class="mt-5 mb-2 flex items-center border-b border-slate-200 pb-2 text-lg">
      <Icon name="iconamoon:comment-remove-light" />
      <span class="ml-1">评论</span>
    </div>
    <!-- 表情包 -->
    <div class="flex flex-wrap items-center">
      <img
        class="mr-2 mb-2 h-8 w-7 cursor-pointer"
        draggable="false"
        title="：滑稽："
        num="0"
        src="~/assets/img/phiz/face_0.png"
      />
      <img
        class="mr-2 mb-2 h-8 w-7 cursor-pointer"
        draggable="false"
        title="：滑稽："
        num="0"
        src="~/assets/img/phiz/face_0.png"
      />
      <img
        class="mr-2 mb-2 h-8 w-7 cursor-pointer"
        draggable="false"
        title="：滑稽："
        num="0"
        src="~/assets/img/phiz/face_0.png"
      />

      <!-- <img class="tbbq" title="：喷：" num="1" src="./image/phiz/face_1.png" />
      <img class="tbbq" title="：喜欢：" num="2" src="./image/phiz/face_2.png" />
      <img class="tbbq" title="：阴险：" num="3" src="./image/phiz/face_3.png" />
      <img class="tbbq" title="：怒：" num="4" src="./image/phiz/face_4.png" />
      <img class="tbbq" title="：笑眼：" num="5" src="./image/phiz/face_5.png" />
      <img class="tbbq" title="：黑线：" num="6" src="./image/phiz/face_6.png" />
      <img class="tbbq" title="：鼓掌：" num="7" src="./image/phiz/face_7.png" />
      <img class="tbbq" title="：乖：" num="8" src="./image/phiz/face_8.png" />
      <img class="tbbq" title="：汗：" num="9" src="./image/phiz/face_9.png" />
      <img class="tbbq" title="：惊哭：" num="10" src="./image/phiz/face_10.png" />
      <img class="tbbq" title="：酷：" num="11" src="./image/phiz/face_11.png" />
      <img class="tbbq" title="：狂汗：" num="12" src="./image/phiz/face_12.png" />
      <img class="tbbq" title="：问号：" num="13" src="./image/phiz/face_13.png" />
      <img class="tbbq" title="：真棒：" num="14" src="./image/phiz/face_14.png" />
      <img class="tbbq" title="：不高兴：" num="15" src="./image/phiz/face_15.png" />
      <img class="tbbq" title="：大哭：" num="16" src="./image/phiz/face_16.png" />
      <img class="tbbq" title="：思考：" num="17" src="./image/phiz/face_17.png" /> -->
    </div>

    <!-- 评论区 -->
    <div>
      <n-input
        v-model:value="value"
        :autosize="{
          minRows: 6,
          maxRows: 10
        }"
        type="textarea"
        placeholder="来发一针见血的评论吧!"
        class="comment_textarea"
      />
    </div>

    <!-- 评论者信息 -->
    <div class="mt-5 flex justify-between">
      <div class="flex items-center">
        <Avatar class="mr-5" size="32" />
        <n-input
          v-model:value="value"
          style="width: 185px"
          type="text"
          placeholder="QQ号可获取头像和昵称"
          class="mr-3"
        />
        <n-input v-model:value="value" style="width: 185px" type="text" placeholder="昵称*" />
      </div>
      <n-button type="info" class="bg-blue-500"> 提交评论 </n-button>
    </div>

    <!-- 华丽的分割线 -->
    <div class="hr">
      <div></div>
      <!-- 评论区标题 -->
      <div class="title_hr">
        <i class="iconfont icon-pinglun"></i>
        <span>评论区</span>
      </div>
    </div>

    <!-- 评论内容 -->
    <div class="comment_content">
      <ul>
        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=3311118881&spec=100" alt="" />
            <div>
              <span>方法总比困难多</span>
              <span>2022-06-06 15:28</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">半山腰的风景很美，然而我还是更想到山顶去看看！</div>

          <!-- 二级评论 -->
          <div class="comment_user1">
            <!-- 评论者信息 -->
            <div class="comment_user">
              <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=528609062&spec=100" alt="" />
              <div>
                <span>苏小晨</span>
                <span>2022-06-11 15:28</span>
              </div>
            </div>

            <!-- 评论内容 -->
            <div class="comment_main">
              <a href="javascript:;">@方法总比困难多</a>
              <span>加油哦!</span>
            </div>
          </div>
        </li>

        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=3118614536&spec=100" alt="" />
            <div>
              <span>鱼子酱</span>
              <span>2022-06-06 15:28</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">
            生命不息，奋斗不止！只要相信，只要坚持，只要你真的是用生命在热爱，那一定是天赋使命使然，那就是一个人该坚持和努力的东西，无论梦想是什么，无论路有多曲折多遥远，只要是灵魂深处的热爱，就会一直坚持到走上属于自己的舞台！
          </div>
        </li>

        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=2518848232&spec=100" alt="" />
            <div>
              <span>为不凡突破极限</span>
              <span>2022-06-09 11:25</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">前途未必光明坦荡，但一定充满渴望！</div>
        </li>

        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=3311118881&spec=100" alt="" />
            <div>
              <span>方法总比困难多</span>
              <span>2022-06-06 15:28</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">半山腰的风景很美，然而我还是更想到山顶去看看！</div>

          <!-- 二级评论 -->
          <div class="comment_user1">
            <!-- 评论者信息 -->
            <div class="comment_user">
              <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=528609062&spec=100" alt="" />
              <div>
                <span>苏小晨</span>
                <span>2022-06-11 15:28</span>
              </div>
            </div>

            <!-- 评论内容 -->
            <div class="comment_main">
              <a href="javascript:;">@方法总比困难多</a>
              <span>加油哦!</span>
            </div>
          </div>
        </li>

        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=3118614536&spec=100" alt="" />
            <div>
              <span>鱼子酱</span>
              <span>2022-06-06 15:28</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">
            生命不息，奋斗不止！只要相信，只要坚持，只要你真的是用生命在热爱，那一定是天赋使命使然，那就是一个人该坚持和努力的东西，无论梦想是什么，无论路有多曲折多遥远，只要是灵魂深处的热爱，就会一直坚持到走上属于自己的舞台！
          </div>
        </li>

        <li>
          <!-- 评论者信息 -->
          <div class="comment_user">
            <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=2518848232&spec=100" alt="" />
            <div>
              <span>为不凡突破极限</span>
              <span>2022-06-09 11:25</span>
            </div>
          </div>

          <!-- 评论内容 -->
          <div class="comment_main">前途未必光明坦荡，但一定充满渴望！</div>
        </li>
      </ul>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <a href="javascript:;">‹‹</a>
      <a href="javascript:;">‹</a>
      <a href="javascript:;" class="paginationAction">1</a>
      <a href="javascript:;">2</a>
      <a href="javascript:;">3</a>
      <a href="javascript:;">4</a>
      <a href="javascript:;">5</a>
      <a href="javascript:;">6</a>
      <a href="javascript:;">››</a>
    </div>

    <!-- 加载列表 -->
    <div class="loadList">
      <i class="iconfont icon-loadm"></i>
      <span>加载更多</span>
    </div>
  </div>
</template>

<style>
.comment_textarea textarea {
  background: url(~/assets/img/comment.png) no-repeat bottom right;
  background-size: 35%;
}
</style>
