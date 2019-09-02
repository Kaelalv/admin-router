<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import service from "../../utils/request";

export default {
  name: "about",
  data() {
    return {
      name: ""
    };
  },
  created() {
    // this.UserLists();
  },
  methods: {
    UserLists() {
      service({
        url: "/api/ajax/Menu/Index",
        method: "post",
        data: {}
      });
    }
  }
};
</script>
