<template>
  <div id="app">
    <transition name="in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang='stylus'>
html,body
  height 100%
  #app
    height 100%
  .in-enter{
    transform: translateX(100%);
  }
  .in-enter-active{
    transition: all 0.5s;
  }
</style>
