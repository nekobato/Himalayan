<template>
  <div id="app">
    <PageLoading v-if="isLoading" />
    <router-view v-else />
    <error-box v-bind:api-error="apiError" />
  </div>
</template>

<script>
import ErrorBox from "../components/molecules/ErrorBox";
import PageLoading from "../components/templates/PageLoading";

export default {
  name: "app",
  data() {
    return {
      isLoading: true,
      apiError: null
    };
  },
  methods: {
    async checkLoginStatus() {
      try {
        const loginStatus = await api.getLoginStatus();
        if (loginStatus) {
          this.$data.isLoading = false;
        } else {
          this.$router.replace("auth");
        }
      } catch (error) {
        this.$data.apiError = error;
      }
    }
  },
  mounted() {
    checkLoginStatus();
  }
};
</script>

<style lang="scss">
@import "./variable.scss";

html,
body {
  overflow: hidden;
  height: 100%;
}

#app {
  position: relative;
  height: 100%;
  background: $color-1;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
