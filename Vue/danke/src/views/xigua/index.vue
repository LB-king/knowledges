<template lang="pug">
  .xigua
    #media
</template>

<script>
import Player from 'xgplayer'
import videoUrl from '@/assets/video.mp4'
export default {
  methods: {},
  mounted() {
    let player = new Player({
      id: 'media',
      url: videoUrl
    })
  }
}
</script>

<style lang="scss">
#media {
  height: 300px;
  width: 400px;
  margin: 0 auto;
}
</style>
