/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T01:23:38+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: toolbar_left_click.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-08-10T12:43:22+08:00
 * @License: MIT
 * @Copyright: 2017
 */

function $toolbar_left_undo_click($vm) {
    if ($vm.d_history_index > 0) {
        $vm.d_history_index--
    }
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
    if ($vm.s_preview_switch) {
        let start = $vm.getTextareaDom().selectionStart
        let currentLength = $vm.d_value.length
        $vm.$nextTick(() => {
            // 光标操作
            start -= currentLength - $vm.d_value.length
            $vm.getTextareaDom().selectionStart = start
            $vm.getTextareaDom().selectionEnd = start
        })
    }
    $vm.getTextareaDom().focus()
}
// redo
function $toolbar_left_redo_click($vm) {
    if ($vm.d_history_index < $vm.d_history.length - 1) {
        $vm.d_history_index++
    }
    $vm.getTextareaDom().focus()
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_trash_click($vm) {
    $vm.d_value = ''
    $vm.getTextareaDom().focus()
    // $vm.$refs.vNoteDivEdit.innerHTML = $vm.s_markdown.render($vm.d_value)
}
function $toolbar_left_save_click($vm) {
    $vm.save($vm.d_value, $vm.d_render)
}
// ol
function $toolbar_left_ol_click($vm) {
    $vm.insertOl()
}
// ul
function $toolbar_left_ul_click($vm) {
    $vm.insertUl()
}
function $toolbar_left_remove_line_click($vm) {
    $vm.removeLine()
}
// 直接添加链接
export const toolbar_left_addlink = (type, text, link, $vm) => {
    let insert_text = {
        prefix: type === 'link' ? `[${text}](` : `![${text}](`,
        subfix: ')',
        str: link
    };
    $vm.insertText($vm.getTextareaDom(), insert_text);
}
export const toolbar_left_click = (_type, $vm) => {
     var _param_of_insert_text = {
         'bold': {
             prefix: '**',
             subfix: '**',
             str: $vm.d_words.tl_bold
         },
         'italic': {
             prefix: '*',
             subfix: '*',
             str: $vm.d_words.tl_italic
         },
         'header': {
             prefix: '# ',
             subfix: '',
             str: $vm.d_words.tl_header
         },
         'header1': {
             prefix: '# ',
             subfix: '',
             str: $vm.d_words.tl_header_one
         },
         'header2': {
             prefix: '## ',
             subfix: '',
             str: $vm.d_words.tl_header_two
         },
         'header3': {
             prefix: '### ',
             subfix: '',
             str: $vm.d_words.tl_header_three
         },
         'header4': {
             prefix: '#### ',
             subfix: '',
             str: $vm.d_words.tl_header_four
         },
         'header5': {
             prefix: '##### ',
             subfix: '',
             str: $vm.d_words.tl_header_five
         },
         'header6': {
             prefix: '###### ',
             subfix: '',
             str: $vm.d_words.tl_header_six
         },
         'underline': {
             prefix: '++',
             subfix: '++',
             str: $vm.d_words.tl_underline
         },
         'strikethrough': {
             prefix: '~~',
             subfix: '~~',
             str: $vm.d_words.tl_strikethrough
         },
         'mark': {
             prefix: '==',
             subfix: '==',
             str: $vm.d_words.tl_mark
         },
         'superscript': {
             prefix: '^',
             subfix: '^',
             str: $vm.d_words.tl_superscript
         },
         'subscript': {
             prefix: '~',
             subfix: '~',
             str: $vm.d_words.tl_subscript
         },
         'quote': {
             prefix: '> ',
             subfix: '',
             str: $vm.d_words.tl_quote
         },
         'link': {
             prefix: '[](',
             subfix: ')',
             str: $vm.d_words.tl_link
         },
         'imagelink': {
             prefix: '![](',
             subfix: ')',
             str: $vm.d_words.tl_image
         },
         'code': {
             prefix: '```',
             subfix: '\n\n```\n',
             str: 'language'
         },
         'table': {
             prefix: '',
             subfix: '',
             str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
         },
         'aligncenter': {
           prefix: '::: hljs-center\n\n',
           subfix: '\n\n:::\n',
           str: $vm.d_words.tl_aligncenter
         },
         'alignright': {
           prefix: '::: hljs-right\n\n',
           subfix: '\n\n:::\n',
           str: $vm.d_words.tl_alignright
         },
         'alignleft': {
           prefix: '::: hljs-left\n\n',
           subfix: '\n\n:::\n',
           str: $vm.d_words.tl_alignleft
         },
         'rushmail_productname': {
            prefix: '',
            subfix: '',
            str: '<p style="padding:0;margin:0;font-weight:normal;font-size: 24px; font-family: \'Microsoft YaHei\', sans-serif; color: #f60; line-height: 35px;"><strong id="productname">ProductName</strong></p>'
         },
         'rushmail_productImg': {
             prefix: '',
             subfix: '',
             str: '<table border="0" width="600px" cellspacing="0" cellpadding="0"><tbody><tr id="productImg1"><td style="border-collapse: collapse; padding: 0px;" align="center"><img class="productImg1" style="display: inline-block; width: 300px; height: 300px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /></td></tr><tr id="productImg2"><td style="border-collapse: collapse; padding: 0px;" align="center"><img class="productImg2" style="display: inline-block; width: 200px; height: 200px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg2" style="display: inline-block; width: 200px; height: 200px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /></td></tr><tr id="productImg3"><td style="border-collapse: collapse; padding: 0px;" align="center"><img class="productImg3" style="display: inline-block; width: 175px; height: 175px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg3" style="display: inline-block; width: 175px; height: 175px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg3" style="display: inline-block; width: 175px; height: 175px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /></td></tr><tr id="productImg4"><td style="border-collapse: collapse; padding: 0px;" align="center"><img class="productImg4" style="float: left; display: block; width: 150px; height: 150px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg4" style="float: left; display: block; width: 150px; height: 150px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg4" style="float: left; display: block; width: 150px; height: 150px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /><img class="productImg4" style="float: left; display: block; width: 150px; height: 150px;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Sofa-Blue.jpg" alt="" border="0" /></td></tr></tbody></table>'
         },
         'rushmail_simpleprodesc': {
             prefix: '',
             subfix: '',
             str: '<div style="max-height: 300px; overflow-y:auto;font-size:14px;color:#333;line-height:25px;"><span id="simpleprodesc" style="margin:0;padding:0;display:block;">ProductDetails</span></div>'
         },
         'rushmail_productdescurl': {
             prefix: '',
             subfix: '',
             str: '<a id="productdescurl" style="font-family: \'Microsoft JhengHei\', sans-serif;display:inline-block;padding:0 15px;font-size:14px;line-height:35px;color:#f60;border:1px solid #f60;border-radius:3px;cursor:pointer;" target="_blank">Check More</a>'
         },
         'rushmail_contactnow': {
             prefix: '',
             subfix: '',
             str: '<a id="contactnow" target="_blank" style="font-family: \'Microsoft JhengHei\', sans-serif;display:inline-block;padding:0 15px;font-size:14px;line-height:35px;border-radius:3px;color:#fff;background:#f60;border:1px solid #f60;cursor:pointer;" target="_blank">Contact Now</a>'
         },
         'rushmail_companyImg': {
             prefix: '',
             subfix: '',
             str: '<img id="companyImg" style="max-width: 171px; display: block;margin:0;padding:0;" src="http://mailimage.rushingchina.com/image/wb/Appromote/Utensils.jpg" alt="" width="172" height="172" border="0" />'
         },
         'rushmail_companyname': {
             prefix: '',
             subfix: '',
             str: '<p id="companyname" style="font-size:18px;color:#f60;line-height:30px;font-weight:600;text-transform:uppercase;padding:0;margin:0;">CompanyName</p>'
         },
         'rushmail_profile': {
             prefix: '',
             subfix: '',
             str: '<p id="profile" style="margin:0;padding:0;">CompanyIntroduction</p>'
         },
         'rushmail_address': {
             prefix: '',
             subfix: '',
             str: '<p id="address" style="font-size:14px;line-height:25px;color:#FF6633;">Address</p>'
         },
         'rushmail_pchost': {
             prefix: '',
             subfix: '',
             str: '<a id="pchost" target="_blank" style="text-decoration:none;font-size:14px;line-height:35px;display:block;background:rgba(255,100,0,0.1);color:#f60;text-align:center;border-radius:5px;cursor:pointer;">Browse</a>'
         }
     };
     if (_param_of_insert_text.hasOwnProperty(_type)) {
         // 插入对应的内容
         $vm.insertText($vm.getTextareaDom(),
             _param_of_insert_text[_type]);
     }
     var _other_left_click = {
         'undo': $toolbar_left_undo_click,
         'redo': $toolbar_left_redo_click,
         'trash': $toolbar_left_trash_click,
         'save': $toolbar_left_save_click,
         'ol': $toolbar_left_ol_click,
         'ul': $toolbar_left_ul_click,
         'removeLine': $toolbar_left_remove_line_click
     };
     if (_other_left_click.hasOwnProperty(_type)) {
         _other_left_click[_type]($vm);
     }
 }
