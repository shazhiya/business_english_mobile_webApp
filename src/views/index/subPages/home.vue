<template>
    <div id="opeScope">
        <van-tabs animated swipeable :before-change="beforeChange" style="height:100%" >
            <van-tab v-for="tag in tags" :title="tag.title" :key="tag.title">
                <course-list :type="tag.title"/>
            </van-tab>
        </van-tabs>
        <!-- action sheet -->
        <van-action-sheet v-model="actionSheetShow" title="标题">
            <div class="content">内容</div>
        </van-action-sheet>
    </div>
</template>

<script>
import courseList from "component/course/courseList";
export default {
    components: {courseList},
    data() {
        return {
            active: "",
            tags: [
                {
                    title: "Hot",
                },
                {
                    title: "推荐",
                },
                {
                    title: 'popular'
                },
                {
                    title: 'laster'
                },
                {
                    title: 'likes'
                },
                {
                    title: 'random'
                },
                {
                    title: 'favorites'
                },
                {
                    title: 'vip'
                },
                {
                    title: '4K'
                }
            ]
        };
    },
    methods: {
        beforeChange(name) {
            // todo
            console.log(name);
            return true;
        }
    },
    computed:{
        actionSheetShow:{
          get(){
              return this.$store.state.actionSheet.show
          },
          set(newV){
              this.$store.commit('updateActionSheet',{show:newV})
          }
        }
    },
    created() {
        this.$store.commit('course_base/pushSearchResult')
    },
    mounted() {
        let opeScope = document.querySelector("#opeScope")
        let startY = 0
        opeScope.addEventListener('touchstart',(event)=>{
            startY = event.changedTouches[0].pageY
        })

        opeScope.addEventListener('touchend',(event)=>{
            let endY = event.changedTouches[0].pageY
            let move = endY - startY

            if (Math.abs(move)<100) return
            if (move<0){ // forward up
                this.$store.commit('optional/setHomeTopBarHeight','-57px')
            }else{ // forward down
                this.$store.commit('optional/setHomeTopBarHeight','0px')
            }

        })
    }
};
</script>

<style scoped>

</style>