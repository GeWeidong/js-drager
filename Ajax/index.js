;(function(myajax){
/**
 * get方法
 * @param  {[type]}   URL       [请求的url]
 * @param  {[type]}   queryJSON [查询json串]
 * @param  {Function} callback  [回调函数，node写法，第一个参数是错误状态]
 */
myajax.get = function( URL,queryJSON,callback ){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
				//请求成功的回调函数
				callback(null,xhr.responseText);
			}else{
				callback(new Error("没有找到请求的文件111"),undefined);
			}
		}
	};
	//准备发送请求
	var querystring = myajax._jsonToString(queryJSON);
	// 这里处理是因为有可能传入"url?name=bob&age=12"作为URL,为了兼容更灵活的写法
	URL = querystring ? URL+"?"+querystring : URL;
	xhr.open('get',URL,true);
	//发送请求
	xhr.send(null);
}
/**
 * post方法
 * @param  {[type]}   URL       [请求的url]
 * @param  {[type]}   queryJSON [查询json串]
 * @param  {Function} callback  [回调函数，node写法，第一个参数是错误状态]
 */
myajax.post = function( URL,queryJSON,callback ){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
				//请求成功的回调函数
				callback(null,xhr.responseText);
			}else{
				callback(new Error("没有找到请求的文件111"),undefined);
			}
		}
	};
	//准备发送请求
	var querystring = myajax._jsonToString(queryJSON);
	// 这里处理是因为有可能传入"url?name=bob&age=12"作为URL,为了兼容更灵活的写法
	xhr.open('post',URL,true);
	//发送请求
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(querystring);
}


/**
 * 将json格式的参数解析成url中的查询串
 * @param  {[type]} json [json数据]
 * 返回一个串：比如
 * {"name":"bob","age":"12"}
 * name=bob&age=12
 */
myajax._jsonToString = function(json){
	var arr = [];
	for(var k in json){
		arr.push(k+'='+encodeURIComponent(json[k]));
	};
	return arr.join('&');
}

window.myajax = myajax;

})(window.myajax||{});