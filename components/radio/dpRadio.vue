<template>
    <label @change="onChange" class="dpRadio">
        <!-- dp-radio-checked -->
        <span class="dp-radio">
            <i class="dp-radio-inner"></i>
            <input 
            ref="_radio" 
            type="radio" 
            class='radio-button dp-radio-input'
            :disabled="disabled"
            @change="change"
            name="dpradio_10333"
            :value="radioValue">
        </span>
        <span for="dpradio_10333">{{ bname }}</span>
    </label>
</template>
<script>
    export default {
        name: 'dpButton',
        props:{
            bname: {
                type: String,
                default: '备选项'
            },
            keyvalue: {
                type: String,
                default: 'radio'
            },
            radioValue: {
                type: Number,
                default: 1
            },
            disabled: {
                default: false
            },
            onChange: {
                type: Function
            },
            // checked: {
            //     default: true
            // }
        },
        data() {
            // bname: 'button'
            return {
                name: 'buttons',
            }
        },
        methods: {
            change(e) {
                let radiogroup = document.querySelectorAll('input[type=radio]')
                for (let i = 0; i < radiogroup.length; i++) {
                    radiogroup[i].offsetParent.setAttribute('class', 'dp-radio')
                    if (radiogroup[i].checked) {
                        radiogroup[i].offsetParent.setAttribute('class', 'dp-radio dp-radio-checked')
                    }
                }
            }
        },
        mounted() {
            // console.log(this.$refs.radio-button)
            if (this.disabled || this.disabled === 'disabled') {
                this.$refs._radio.setAttribute('class', `radio-button dp-radio-input radio-disabled`)
            }
        }
    }
</script>
<style lang="less">
    @import '../../assets/css/index.less';
</style>