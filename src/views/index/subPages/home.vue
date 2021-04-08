<template>
    <div id="opeScope">
        <van-tabs animated swipeable :before-change="beforeChange" style="height:100%" >
            <van-tab v-for="tag in tags" :title="tag.title" :key="tag.title">
                <class-list :classes="currentList" :type="tag.title"/>
            </van-tab>
        </van-tabs>
        <!-- action sheet -->
        <van-action-sheet v-model="actionSheetShow" title="标题">
            <div class="content">内容</div>
        </van-action-sheet>
    </div>
</template>

<script>
import classList from '@/components/clazz/classList'
import resolvedPost from "@/store/ResovePost";
export default {
    components: {classList},
    data() {
        return {
            active: 0,
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
            ],
            classes:[]
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
        },
        currentList(){
            return this.classes
        }
    },
    beforeMount() {
        resolvedPost('class/load',{status:'enabled'},res=>{
            this.classes = res
        })
    },
    mounted() {
        let opeScope = document.querySelector("#opeScope")
        let startY = 0
        opeScope.addEventListener('touchstart',(event)=>{
            startY = event.changedTouches[0].pageY
        })

        opeScope.addEventListener('touchmove',(event)=>{
            let endY = event.changedTouches[0].pageY
            let move = endY - startY

            if (Math.abs(move)<100) return
            if (move<0){ // forward up
                this.$store.commit('optional/setHomeTopBarHeight','-57px')
            }else{ // forward down
                this.$store.commit('optional/setHomeTopBarHeight','0px')
            }
            startY = endY
        })
    }
};
</script>

<style scoped>

</style>