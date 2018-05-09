<template>
    <div id="signin" 
        :class="{ 
        flex:true,
        commonbox: true,
        'flex-v':true }">
        <div class="logo">
            <img src="~/assets/images/login_logo@2x.png" alt="logo">
        </div>
        <div>
            <dp-button type="primary">button</dp-button>
            <div v-for="(item, index) in data" :key="index">
                <dp-radio 
                :on-change="handleSelect"
                :radioValue="item.value" 
                :bname="item.name"></dp-radio>
            </div>
        </div>
    </div>
</template>
<script>
// import dpButton from '~/components/button/dpButton'
// import dpRadio from '~/components/radio/dpRadio'
export default {
    name: 'signin',
    // components: {
    //     dpButton,
    //     dpRadio
    // },
    data() {
        return {
            data: [
                {
                    value: 1,
                    name: '哈哈哈哈哈',
                    key: '12'
                },
                {
                    value: 2,
                    name: '呃呃呃呃呃呃呃',
                    key: '11'
                },
                {
                    value: 4,
                    name: '呃呃呃呃呃d呃呃',
                    key: '11'
                },
                {
                    value: 5,
                    name: 'a',
                    key: '11'
                },
                {
                    value: 6,
                    name: 'c',
                    key: '11'
                },
                {
                    value: 8,
                    name: 'q',
                    key: '11'
                },
                {
                    value: 9,
                    name: 'r',
                    key: '11'
                },
            ]
        }
    },
    methods: {
        handleSelect(e) {
            console.log(e.target.value)
        }
    }
}
</script>
<style>
    
</style>
