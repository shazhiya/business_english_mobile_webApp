<template>
    <div>
        <navbar title="课程学习">
            <template #right v-if="true">
                <p></p>
            </template>

            <template #default>
                <card style="width: 96%; margin-top: 5px; height: 250px">
                    courseware player
                </card>
                <van-cell-group title="章节选择">
                    <card style="width: 96%; margin-top: 5px; height: 40px; overflow-x: scroll">
                        <div style="width: 1000px">
                            <card style="width: 80px; height: 30px;display: inline-block;" v-for="i in 13" :key="i"></card>
                        </div>
                    </card>
                </van-cell-group>
                <van-cell-group title="课件选择">
                    <card style="width: 96%; margin-top: 5px; height: 40px; overflow-x: scroll">
                        <div style="width: 1000px">
                            <card style="width: 80px; height: 30px;display: inline-block;" v-for="i in 13" :key="i"></card>
                        </div>
                    </card>
                </van-cell-group>
                <van-cell-group title="课后习题">
                    <card style="width: 96%; margin-top: 5px; height: 40px; overflow-x: scroll">
                        <div style="width: 1000px">
                            <card style="width: 80px; height: 30px;display: inline-block;" v-for="i in 13" :key="i"></card>
                        </div>
                    </card>
                </van-cell-group>
            </template>
        </navbar>
        <van-sticky :offset-top="46" style="margin-top: 50px">
            <van-tabs v-model="active" swipeable>
                <van-tab title="评论">
                   <div class="remainHeight">
                       <p>1</p>
                       <p>2</p>
                       <p>3</p>
                       <p>4</p>
                       <p>5</p>
                       <p>6</p>
                       <p>7</p>
                       <p>8</p>
                       <p>9</p>
                       <p>10</p>
                       <p>11</p>
                       <p>12</p>
                       <p>13</p>
                       <p>14</p>
                       <p>15</p>
                       <p>16</p>
                       <p>17</p>
                       <p>18</p>
                       <p>19</p>
                       <p>20</p>
                   </div>
                </van-tab>
                <van-tab title="探讨">
                    <div class="remainHeight"></div>
                </van-tab>
                <van-tab title="解惑">
                    <div class="remainHeight"></div>
                </van-tab>
            </van-tabs>
        </van-sticky>
    </div>
</template>

<script>
import navbar from "component/card/navbar";

export default {
    components: {
        navbar
    },
    data(){
        return {
            active: 1
        }
    }
}
</script>

<style scoped>
.remainHeight{
    height: calc(100vh - 90px);
    overflow: scroll;
}
</style>