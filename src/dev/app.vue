<template>
    <div id="app">
        <select @change="opchange" class="page-lang">
            <option value="zh-CN">中文</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="pt-BR">Português</option>
            <option value="ru">Русский</option>
        </select>
        <section class="page-header">
            <h1 class="project-name">mavonEditor</h1>
            <h3 class="project-tagline">{{d_words.sub_title}}</h3>
            <a href="https://github.com/hinesboy/mavonEditor" class="btn">View on GitHub</a>
            <a href="https://github.com/hinesboy/mavonEditor/zipball/master" class="btn">Download .zip</a>
            <a href="https://github.com/hinesboy/mavonEditor/master" class="btn">Download .tar.gz</a>
        </section>
        <div v-if="!screen_phone" class="item">
            <h2 class="item-header">
                {{d_words.default_setting}}
            </h2>
            <button @click="clearCache">clear cache</button>
            <button @click="uploadimg">upload</button>
            <button @click="imgreplace">imgreplace</button>
            <input type="text" v-model="imgName" />
            <button @click="imgdelete">delete</button>
            <mavon-editor ref=md :subfield="subfield" :toolbarsFlag="toolbarsFlag" :editable="editable"
                          :language="d_language" @change="change" @save="saveone" :ishljs="true" class="item-editor" v-model="help1"
                          :autofocus="autofocus"
                          :external_link="external_link"
                          @imgAdd="$imgAdd" @imgDel="$imgDel" @subfieldtoggle="$subfieldtoggle" @previewtoggle="$previewtoggle"
                          :imageFilter="image_filter">
                <!-- <template slot="left-toolbar-before">
                    左工具栏前
                </template>
                <template slot="left-toolbar-after">
                    左工具栏后
                </template>

                <template slot="right-toolbar-before">
                    右工具栏前
                </template>
                <template slot="right-toolbar-after">
                    右工具栏后
                </template> -->          
            </mavon-editor>
            <button ref="diy" type="button" @click="$click('selftest')" class="op-icon fa fa-mavon-align-left"
                aria-hidden="true" title="自定义"></button>
            <!-- <button ref="automaticEmail" type="button" @click="$click('automaticEmail')" class="op-icon fa fa-mavon-compress"
                aria-hidden="true" title="自动推送模板元素"></button> -->
            <div ref="automaticEmail" type="button"
                class="op-icon fa fa-mavon-compress dropdown dropdown-wrapper" aria-hidden="true"  @mouseleave="$mouseleave_rushmail_dropdown" @mouseenter="$mouseenter_rushmail_dropdown"
                title="自动推送模板元素，标签中的内容会自动替换为产品中的内容">
                <transition name="fade">
                    <div class="op-header popup-dropdown" v-show="s_rushmail_dropdown_open" @mouseenter="$mouseenter_rushmail_dropdown" @mouseleave="$mouseleave_rushmail_dropdown">
                        <div title="id=的内容请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_productname')"><span>产品名</span></div>
                        <div title="class=的内容和img标签请勿修改，系统会根据产品图片数量自动选择1-4张并排的模块，请勿自行删除模块"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_productImg')"><span>产品图片</span></div>
                        <div title="id=的内容请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_simpleprodesc')"><span>产品描述</span></div>
                        <div title="id=的内容和a标签请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_productdescurl')"><span>产品链接</span></div>
                        <div title="id=的内容和a标签请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_contactnow')"><span>询盘链接</span></div>
                        <div title="id=的内容和img标签请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_companyImg')"><span>公司LOGO</span></div>
                        <div title="id=的内容请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_companyname')"><span>公司名称</span></div>
                        <div title="id=的内容请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_profile')"><span>公司详情</span></div>
                        <div title="id=的内容请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_address')"><span>公司地址</span></div>
                        <div title="id=的内容和a标签请勿修改"  class="dropdown-item" @click.stop="$click_Rushmail('rushmail_pchost')"><span>公司链接</span></div>
                        <div title="id=的内容和a标签还有href请勿修改"  class="dropdown-item" @click.stop="addUnsubscribe()"><span>退订链接</span></div>
                    </div>
                </transition>
            </div>
            <button ref="importTemplate" type="button" @click="openImportTemplate" class="op-icon-text"
                aria-hidden="true" title="导入模板">导入模板</button>
        </div>
        <!--自定义-->
        <!-- <div v-if="screen_phone" class="item">
            <h2 class="item-header">
                {{d_words.customize_setting}}
            </h2>
            <mavon-editor :language="d_language" @save="savetwo" :toolbars="toolbars" class="item-editor"
                          v-model="help2"></mavon-editor>
        </div> -->
        <!-- <div class="item">
      <span style="display: block;margin: 30px 0 15px 0;color: #1e6bb8" class="">
        {{d_words.mark}}
      </span>
        </div> -->
        <div class="item">
            <h2 class="item-header">
                {{d_words.detail}}<a href="https://github.com/hinesboy/mavonEditor">GitHub</a>
            </h2>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // import {CONFIG} from './assets/config.js'
    import {CONFIG} from '../lib/config.js'
    import axios from 'axios'
    import {mavonEditor} from '../index'
    export default {
        name: 'app',
        data () {
            return {
                d_language: 'zh-CN',
                help1: '',
                help2: '',
                d_words: {},
                screen_phone: false,
                toolbars: {
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    alignCenter: true, // 中划线
                    undo: true,
                    save: true,
                    fullscreen: true, // 全屏编辑
                    navigation: true,
                    preview: true,
                    subfield: false
                },
                autofocus: true,
                subfield: true,
                editable: true,
                toolbarsFlag: true,
                img_file: {},
                external_link: {
                    markdown_css: function() {
                        return '/markdown/github-markdown.min.css';
                    },
                    hljs_js: function() {
                        return '/highlightjs/highlight.min.js';
                    },
                    hljs_css: function(css) {
                        return '/highlightjs/styles/' + css + '.min.css';
                    },
                    hljs_lang: function(lang) {
                        return '/highlightjs/languages/' + lang + '.min.js';
                    },
                    katex_css: function() {
                        return '/katex/katex.min.css';
                    },
                    katex_js: function() {
                        return '/katex/katex.min.js';
                    }
                },
                toolbar_settings: {
                    undo: true, // 上一步
                    redo: true, // 下一步
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    code: true, // code
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                    /* 1.4.2 */
                    navigation: true // 导航目录
                },
                image_filter: function($files) {
                    console.log('image_filter files:', $files);
                    // console.log('here for you', $files);
                    return true;
                },
                imageClick: function (file) {
                    console.log(file);
                },
                imgName: '',
                rushmail_timer: null,
                s_rushmail_dropdown_open: false
            }
        },
        created () {
            var $vm = this;
            this.initLanguage();
            this.sizeToStatus()
            window.addEventListener('resize', function() {
                // 媒介查询
                $vm.sizeToStatus()
            })
        },
        mounted() {
            var md = this.$refs.md;
            var toolbar_left = md.$refs.toolbar_left;
            var diy = this.$refs.diy;
            var automaticEmail = this.$refs.automaticEmail;
            var importTemplate = this.$refs.importTemplate;
            toolbar_left.$el.append(diy)
            toolbar_left.$el.append(automaticEmail)
            toolbar_left.$el.append(importTemplate)
            // toolbar_left.$el.append(diy.$el)
            // console.log(toolbar_left)
        },
        methods: {
            clearCache() {
                this.$refs.md.$emptyHistory()
            },
            $click(val) {
                console.log(val);
            },
            imgreplace($e) {
                console.log('here');
                this.$refs.md.$imglst2Url([
                    [0, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png'],
                    [1, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png']
                ]);
            },
            uploadimg($e) {
                console.log(this.img_file);
                for (var _img in this.img_file) {
                    this.$refs.md.$img2Url(_img, 'https://raw.githubusercontent.com/hinesboy/mavonEditor/master/img/cn/cn-common.png')
                }
                /* var formdata = new FormData();
                for (var _img in this.img_file) {
                    formdata.append(_img, this.img_file[_img]);
                    // _imglst.push([_img, this.img_file[_img]]);
                }
                axios({
                    url: 'http://127.0.0.1/index.php',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    console.log(res);
                }) */
            },
            $imgAdd(pos, $file) {
                console.log('imgAdd', pos, $file);
                this.img_file[pos] = $file;
                // console.log(this.$refs.md.$refs.toolbar_left.$imgDelByFilename(pos));
                // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
                // console.log(this.$refs.md.$refs.toolbar_left.$imgUpdateByFilename('./test', $file))
                // console.log(this.$refs.md.$refs.toolbar_left.$imgAddByFilename('./test', $file))
                // console.log(this.$refs.md);
                // this.$refs.md.$imgUpdateByUrl(pos, 'http://pic.58pic.com/58pic/13/46/50/61758PICWZY_1024.jpg');
            },
            $imgDel(pos) {
                console.log('imgDel', pos);
                delete this.img_file[pos];
            },
            sizeToStatus () {
                if (window.matchMedia('(min-width:768px)').matches) {
                    // > 768
                    this.screen_phone = false
                } else {
                    // <  768
                    this.screen_phone = true
                }
            },
            saveone (val, render) {
                alert('save one')
            },
            savetwo (val, render) {
                alert('save two')
            },
            change (val, render) {
                console.log('change')
            },
            opchange (event) {
                this.d_language = event.target.value;
            },
            initLanguage() {
                this.d_words = CONFIG[`words_${this.d_language}`]
                this.help1 = CONFIG[`help_${this.d_language}`]
                this.help2 = CONFIG[`help_${this.d_language}`]
            },
            $subfieldtoggle(flag , value) {
                console.log('sufield toggle' + flag)
            },
            $previewtoggle(flag , value) {
                console.log('preview toggle' + flag)
            },
            imgdelete() {
                var md = this.$refs.md;
                var toolbar_left = md.$refs.toolbar_left;
                toolbar_left.$imgDelByFilename(this.imgName);
            },
            $mouseleave_rushmail_dropdown() {
                let vm = this
                this.rushmail_timer = setTimeout(function() {
                    vm.s_rushmail_dropdown_open = false
                },200)
            },
            $mouseenter_rushmail_dropdown() {
                clearTimeout(this.rushmail_timer)
                this.s_rushmail_dropdown_open = true
            },
            $click_Rushmail(_type) {
                this.$refs.md.toolbar_left_click(_type)
                this.s_header_dropdown_open = false
            },
            addUnsubscribe() {
            },
            openImportTemplate() {
                this.$emit('openImportTemplate')
            }
        },
        watch: {
            d_language: function () {
                this.initLanguage();
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    body
        margin 0
        padding 0
        padding-bottom 50px
    .page-lang
        position absolute
        top 15px
        right 2%
    .page-header
        box-sizing border-box
        padding 90px 15px
        width 100%
        height 380px
        color #fff
        text-align center
        background-color #159957
        background-image linear-gradient(120deg, #155799, #159957)
        @media only screen and (max-width 958px)
            height 300px
            padding 60px 15px
        @media only screen and (max-width 768px)
            height 370px
            padding 50px 15px
        .project-name
            margin-top 0
            margin-bottom 0.1rem
            font-size 2.25rem
            @media only screen and (max-width 768px)
                font-size 25px
        .project-tagline
            margin-bottom 2rem
            font-weight normal
            opacity 0.7
            @media only screen and (max-width 768px)
                font-size 16px
        .btn
            padding: 0.6rem 0.9rem
            font-size: 0.9rem
            display: inline-block
            margin-bottom: 1rem
            color: rgba(255, 255, 255, 0.7)
            background-color: rgba(255, 255, 255, 0.08)
            border-color: rgba(255, 255, 255, 0.2)
            border-style: solid
            border-width: 1px
            border-radius: 0.3rem
            transition: color 0.2s, background-color 0.2s, border-color 0.2s
            text-decoration: none
            margin-left 20px
            box-sizing border-box
            &:hover
                color: rgba(255, 255, 255, 0.8)
                text-decoration: none
                background-color: rgba(255, 255, 255, 0.2)
                border-color: rgba(255, 255, 255, 0.3)
            @media only screen and (max-width 768px)
                display: block
                width: 90%
                padding: 0.75rem
                font-size: 0.9rem
                margin-left 5%
    .item
        width 75%
        margin-left 12.5%
        @media only screen and (max-width 1100px)
            width 85%
            margin-left 7.5%
        @media only screen and (max-width 768px)
            width 92%
            margin-left 4%
        .item-header
            margin-top: 3.5rem
            margin-bottom: 2rem
            font-weight: normal
            color: #159957
            @media only screen and (max-width 768px)
                margin-top: 2rem
                margin-bottom: 1rem
        .item-editor
            width 100%
            height 700px
            @media only screen and (max-width 1600px)
                height 550px
.op-icon.dropdown-wrapper.dropdown
    position relative
    .popup-dropdown
            position absolute
            display block
            background #fff
            top 32px
            left -45px
            min-width 130px
            z-index 1600
            box-shadow: 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
            transition all 0.2s linear 0s
            &.op-header
                left -30px
                min-width 90px
            &.fade-enter-active, &.fade-leave-active
                opacity 1
            &.fade-enter, &.fade-leave-active
                opacity 0
    .dropdown-item
            height 35px
            line-height @height
            font-size 12px
            transition all 0.2s linear 0s
            position relative
            &:hover
                background #eaeaea
            input
                position absolute
                font-size 100px
                right 0
                top 0
                opacity 0
                cursor pointer
.op-icon-text
          display inline-block
          cursor pointer
          height 28px
          margin 6px 0 5px 0px
          font-size 15px
          padding 4.5px 6px 5px 3.5px
          color #757575
          border-radius 5px
          text-align center
          background none
          border none
          outline none
          line-height 1
          vertical-align middle
          &.dropdown-wrapper
            line-height 18px
          &.selected
            color rgba(0, 0, 0, 0.8)
            background #eaeaea
          &:hover
            color rgba(0, 0, 0, 0.8)
            background #e5e5e5
</style>
