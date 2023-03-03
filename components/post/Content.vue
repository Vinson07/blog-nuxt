<template>
  <main class="post-main mx-auto pt-10 max-md:px-3 md:w-[800px]">
    <div>
      <article>
        两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。 两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。 两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。 两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。 两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。 两年前在服务器上放了一套 Grafana + Zabbix + Prometheus
        的监控系统，当时是照着文档和网上各路教程一个一个编译的，插件和配置文件丢得七零八落，很难维护，故这几天借迁移服务器的机会，改用
        Docker 安装，基本只用一个配置文件，今后随时可以一键部署。目前写好了 MySQL + Grafana +
        Zabbix-Server + Zabbix-Agent 的配置，Prometheus（以前主要用来监控
        MySQL）暂时还没做，以后补上。
      </article>
      <div id="toc"></div>
    </div>
    <div class="mt-4 mb-7 flex items-center">
      <span class="mr-1">Q.E.D. </span>
      <Icon name="cryptocurrency-color:data" />
    </div>
    <!-- <div
      class="my-9 mx-auto h-10 w-10 cursor-pointer rounded-full bg-red-500 text-center text-lg leading-10 text-white"
    >
      赏
    </div> -->
    <!-- <div class="absolute top-10 left-1/2 w-[335px] -translate-x-1/2 pt-3">
        <Icon
          name="uis:triangle"
          class="absolute top-0 left-1/2 -translate-x-1/2"
          color="#f3f4f6"
        />
        <div
          class="flex justify-between rounded-md bg-gray-100 px-6 pt-5 pb-2 text-center text-sm text-zinc-500"
        >
          <div>
            <img class="h-32 w-32" src="~/assets/img/AliPayQR.jpeg" alt="" />
            <p class="mt-2">支付宝</p>
          </div>
          <div>
            <img class="h-32 w-32" src="~/assets/img/AliPayQR.jpeg" alt="" />
            <p class="mt-2">支付宝</p>
          </div>
        </div>
      </div> -->
    <div class="border-t border-b border-dashed py-5 text-sm text-zinc-500">
      <p class="flex items-center justify-center">
        <Icon name="bi:cc-circle" />
        <span class="ml-1">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</span>
      </p>
      <div class="mt-2 flex justify-between">
        <div class="tag flex items-center">
          <Icon class="mr-2" name="fluent:tag-multiple-16-regular" size="16" />
          <span>DOM</span>
          <span>JS</span>
        </div>
        <div class="flex">
          <Icon name="ci:share" class="mr-3 cursor-pointer" size="20" />
          <div class="flex items-center">
            <Icon
              name="bx:bxs-like"
              class="cursor-pointer"
              :class="{ 'text-red-600': false }"
              size="20"
            />
            <span class="ml-1 text-sm">20</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-14 overflow-hidden rounded md:flex">
      <div class="group/previous relative h-[150px] flex-1 cursor-pointer">
        <img
          class="h-full w-full object-cover"
          src="https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg"
          alt=""
        />
        <div
          class="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-colors duration-500 group-hover/previous:bg-transparent"
        >
          <div class="mx-10 mt-10 text-sm uppercase">
            <p class="mb-2 text-slate-300">Previous Post</p>
            <h4 class="single-line-ellipsis text-white">
              Visual Studio Code Remote DevelopmentVisual Studio Code Remote Development
            </h4>
          </div>
        </div>
      </div>
      <div class="group/next relative h-[150px] flex-1 cursor-pointer">
        <img
          class="h-full w-full object-cover"
          src="https://static.sakura520.co/config/274a3851ab099df4b062848dca18bf84.jpg"
          alt=""
        />
        <div
          class="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-colors duration-500 group-hover/next:bg-transparent"
        >
          <div class="mx-10 mt-10 text-sm uppercase">
            <p class="mb-2 text-slate-300">Previous Post</p>
            <h4 class="single-line-ellipsis text-white">
              Visual Studio Code Remote DevelopmentVisual Studio Code Remote Development
            </h4>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="less">
.post-main {
  .tag {
    span {
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
