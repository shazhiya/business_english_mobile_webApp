<template>
    <div>
        <video id="videoid" class="video-js vjs-default-skin" controls preload="auto">
            <source :src="src+'courseware/1098_c1eddaaefcacf1937817db2b6dd56011.f0.mp4'" >
        </video>
    </div>
</template>

<script>
// import videojs from 'video.js'
export default {
    name: "video.player",
    mounted() {
        // videojs('videoid', {
        //     bigPlayButton: false,
        //     textTrackDisplay: false,
        //     posterImage: true,
        //     errorDisplay: false,
        //     controlBar: true
        // }, function () {
        //     this.play()
        // })
    }
}
</script>

<style scoped>

</style>