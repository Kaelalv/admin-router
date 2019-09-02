import service from "../utils/request";
import Cookie from "./cookies";
import router from "../router";
import store from "../store/index";
const _import = require("./_import_" + process.env.NODE_ENV); //获取组件的方法
// import Login from "../views/login/Index.vue";
import TopLayout from "../layouts/TopLayout.vue";

const MyRoutersKey = "MyRouters";
let getRouter;
removeMyRouter();
function getMyRouters() {
  // console.log(!Boolean(Cookie.get(MyRoutersKey) || sessionStorage.getItem(MyRoutersKey)))
  let data = Cookie.get(MyRoutersKey) || sessionStorage.getItem(MyRoutersKey);
  if (data == null) {
    return data;
  } else {
    return JSON.parse(data);
  }
}

function setMyRouters(routers) {
  Cookie.set(MyRoutersKey, JSON.stringify(routers));
  sessionStorage.setItem(MyRoutersKey, JSON.stringify(routers));
}
function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter); //过滤路由
  //动态添加路由
  router.addRoutes(getRouter);
  //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  global.antRouter = getRouter;
  next({ ...to, replace: true });
}
function filterAsyncRouter(asyncRouterMap) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === "TopLayout") {
        // Layout组件特殊处理
        route.component = TopLayout;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });

  return accessedRouters;
}
function removeMyRouter() {
  Cookie.remove(MyRoutersKey);
  sessionStorage.removeItem(MyRoutersKey);
}
router.beforeEach((to, from, next) => {
  if (!getRouter) {
    if (!getMyRouters()) {
      service({
        url: "/api/router",
        method: "get",
        data: {}
      }).then(res => {
        /* for (var i in res.data) {
          console.log(res.data[i]);
        } */
        getRouter = res.data;
        //  [
        //   {
        //     path: "/",
        //     name: "home",
        //     component: "login/Index"
        //   },
        //   {
        //     path: "/index",
        //     name: "index",
        //     component: "TopLayout",
        //     redirect: "/index/index",
        //     children: [
        //       {
        //         path: "/index/index",
        //         name: "index-index",
        //         // route level code-splitting
        //         // this generates a separate chunk (about.[hash].js) for this route
        //         // which is lazy-loaded when the route is visited.
        //         component: "index/index",
        //         meta: {
        //           title: "首页"
        //         }
        //       }
        //     ]
        //   },
        //   {
        //     path: "/about",
        //     name: "about",
        //     component: "TopLayout",
        //     redirect: "/about/about",
        //     children: [
        //       {
        //         path: "/about/about",
        //         name: "about-index",
        //         // route level code-splitting
        //         // this generates a separate chunk (about.[hash].js) for this route
        //         // which is lazy-loaded when the route is visited.
        //         component: "about/about",
        //         meta: {
        //           title: "首页"
        //         }
        //       }
        //     ]
        //   }
        // ];
        setMyRouters(getRouter);
        store.commit("SET_ROUTER", getRouter);
        routerGo(to, next);
      });
    } else {
      getRouter = getMyRouters();
      store.commit("SET_ROUTER", getRouter);
      routerGo(to, next);
    }
  } else {
    next();
  }
});
