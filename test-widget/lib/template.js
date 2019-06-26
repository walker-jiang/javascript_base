// 模板引擎模块
F.module('lib/template', function() {
  /***
  *   模板引擎，处理数据的编译模板入口
  *   @param  str     模块容器id或者模板字符串
  *   @param  data    渲染数据
  **/ 
  var _TplEngine = function(str, data) {
      if(data instanceof Array) {
          var html = '' ;
          var i = 0 ;
          var len = data.length ;
          for(; i < len; i++) {
              html += _getTpl(str) (data[i]) ;
          }
          return html ;
      }else {
          return _getTpl(str)(data) ;
      }
  } ;
  /***
  *   获取模板
  *   @param  str 模板容器id，或者模板字符串
  **/
  var _getTpl = function(str) {
      var ele = document.getElementById(str) ;
      if(ele) {
          var html = /^(textarea | input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML ;
          return _compileTpl(html) ;
      }else {
          return _compileTpl(str) ;
      }
  } ;
  // 处理模板:把模板中的HTML代码存入数组，把JavaScript代码在当前环境下执行
  var _dealTpl = function(str) {
      var _left = '{%' ;
      var _right = '%}' ;
      var tempStr = String(str);
          tempStr = tempStr.replace(/&lt;/g, '<')
          tempStr = tempStr.replace(/&gt;/g, '>')
          tempStr = tempStr.replace(/[\r\t\n]/g, '')
          tempStr = tempStr.replace(new RegExp(_left + '=(.*?)' + _right, 'g'), "',typeof($1) === 'undefined' ? '' : $1, '")
          tempStr = tempStr.replace(new RegExp(_left, 'g'), "');")
          tempStr = tempStr.replace(new RegExp(_right, 'g'), "template_array.push('") ;
          console.log('tempStr', tempStr)
      return tempStr
  } ;
  /***
  *   编译执行
  *   @param  str 模板数据
  **/ 
  var _compileTpl = function(str) {
    console.log("_dealTpl",_dealTpl(str))
    // 变量的值替换字符串模板中对应的变量
      var fnBody = "var template_array=[];\nvar fn=(function(data){\nvar template_key='';\nfor(key in data){\ntemplate_key +=('var '+key+'=data[\"'+key+'\"];');\n}\neval(template_key);\ntemplate_array.push('"+_dealTpl(str)+"');\nconsole.log('template_array','"+_dealTpl(str)+"')\ntemplate_key=null;\n})(templateData);\nfn=null;\nreturn template_array.join('') ;" ;
      return new Function('templateData',  fnBody) ;
  } ;

  // 返回
  return _TplEngine ;
}) ;