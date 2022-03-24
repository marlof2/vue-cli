<template>
  <header>
    <div class="">
      <Login></Login>
    </div>
  </header>

  <RouterView />
</template>
<script>
import Login from "./modules/auth/_components/Login.vue";
export default {
  components: [Login],
  data() {
    return {};
  },
};
</script>

<style></style>
