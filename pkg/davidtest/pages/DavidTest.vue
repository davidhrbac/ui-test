<template>
  <div class="p-20">
    <h1 class="text-xl mb-10">DavidTest extension</h1>

    <p class="mb-10">
      If you can see this page, the extension is installed and routing works ✅
    </p>

    <p><b>Current time:</b> {{ now }}</p>
  </div>
</template>

<script>
export default {
  name: 'DavidTestPage',
  data() {
    return {
      now: new Date().toISOString()
    };
  },
  mounted() {
    this.t = setInterval(() => {
      this.now = new Date().toISOString();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.t);
  }
};
</script>
