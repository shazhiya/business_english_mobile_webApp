<template>
    <div id="opeScope">
        <van-tabs animated swipeable :before-change="beforeChange" style="height:100%" >
            <van-tab v-for="tag in tags" :title="tag.title" :key="tag.title">
                <class-list :classes="currentList" :type="tag.title" :setCurrentClass="setCurrentClass"/>
            </van-tab>
        </van-tabs>
        <!-- action sheet -->
        <van-action-sheet @click.stop="1-1" v-model="actionSheetShow" title="课程一览" close-on-click-action close-on-click-overlay close-on-popstate>
            <div class="content">
                <courseItem v-for="cc in currentClass.ccs" :key="cc.curriculumId" :course="cc" :show-toolbar="false"/>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import classList from '@/components/clazz/classList'
import courseItem from "component/course/courseItem";
export default {
    components: {classList,courseItem},
    data() {
        return {
            active: 0,
            tags: [
                {
                    title: "热门",
                },
                {
                    title: "推荐",
                },
                {
                    title: '好课'
                },
                {
                    title: '高分'
                },
                {
                    title: '广场'
                },
                {
                    title: '随机'
                },
                {
                    title: '猜你感兴趣'
                },
            ],
            classes:[],
            currentClass:{}
        };
    },
    methods: {
        beforeChange(name) {
            // todo
            console.log(name);
            return true;
        },
        setCurrentClass(clazz){
            this.currentClass = clazz
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