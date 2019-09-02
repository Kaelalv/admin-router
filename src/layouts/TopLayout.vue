<template>
  <div class="iu-nav">
    <div class="top-nav">
      <div
        style="color: #fff; background: #43484e; text-align: center; line-height: 60px;"
        :style="isCollapse ? 'width:64px;' : 'width:200px;'"
      >
        LOGO
      </div>
      <el-menu
        :style="
          isCollapse
            ? 'width: calc(100% - 64px);'
            : 'width: calc(100% - 200px);'
        "
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#43484E"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index1) in routes"
          :key="index1"
          :index="index1 + ''"
        >
          {{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <el-menu
      style="height: calc(100vh - 60px); float: left;"
      default-active="/index/index"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      @select="handleSelect1"
      background-color="#545c64"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <el-submenu
        v-for="(item, index2) in firstChildren"
        :index="item.path"
        :key="index2"
      >
        <template slot="title">
          <i class="nav-icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#' + item.meta.icon"></use>
            </svg>
          </i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, index3) in item.children"
          :index="child.path"
          :key="index2 + '-' + index3"
          >{{ child.meta.title }}</el-menu-item
        >
      </el-submenu>
      <button
        class="nav-button iconfont"
        :class="isCollapse ? 'el-menu--collapse' : 'icon-zhankai-'"
        @click="navButton()"
      >
        <svg v-if="isCollapse" class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai-"></use>
        </svg>
        <svg v-else class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhankai"></use>
        </svg>
      </button>
    </el-menu>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstChildren: [],
      activeIndex: "0",
      isCollapse: false,
      acitve1: 1
    };
  },
  created() {
    this.handleSelect(0);
  },
  methods: {
    handleSelect(key) {
      this.firstChildren = this.routes[key].children;
      if (
        this.$route.path === this.routes[key].redirect ||
        this.$route.path === this.routes[key].path
      ) {
        return;
      }
      this.$router.push(this.routes[key].path);
    },
    handleSelect1(key) {
      if (this.$route.path === key) {
        return;
      }
      this.$router.push(key);
    },
    navButton() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen() {},
    handleClose() {}
  },
  computed: {
    routes() {
      let routers = [];
      for (var i in this.$store.state.myRouter.routers) {
        if (this.$store.state.myRouter.routers[i].is_show) {
          routers.push(this.$store.state.myRouter.routers[i]);
        }
      }
      return routers;
    }
  }
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.nav-button {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  border: none;
  height: 40px;
  background: rgb(72, 78, 84);
  color: #ddd;
  font-size: 16px;
  outline: none;
}
// .top {
//   width: 100%;
//   height: 60px;
//   background: #fff;
// }

.top-nav {
  width: 100%;
  height: 60px;
  display: flex;
  box-sizing: border-box;
}
.nav-icon {
  display: inline-block;
  width: 30px;
  font-size: 24px;
  .icon {
    color: #fff;
  }
}
.el-menu.el-menu--horizontal {
  border: none !important;
}
.left {
  float: left;
  width: 200px;
  height: calc(100vh - 60px);
  background: #ddd;
}
.container {
  float: left;
}
</style>
