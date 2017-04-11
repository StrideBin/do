/**
 * 获取文字在指定容器中的宽度
 * 
 * str 待计算宽度文字
 * srcEl 目标容器
 * 
 * @returns 文字宽度
 * 
 * added：汪晔
 */
function getTextWidth(str,srcEl){
	var text_span = $('#text_width_aclc');
	text_span.show();
	if(text_span.length == 0){
		$('body').append($('<span id="text_width_aclc" style="visibility:hidden;"></span>'));
	}
	text_span = $('#text_width_aclc');
	var font_attr = ['font-size','font-weight','font-family','font-style'];
	for(var i=0 ; i< font_attr.length ; i++){
		text_span.css(font_attr[i],srcEl.css(font_attr[i]));
	}
	
	text_span.text(str);
	var width = text_span.width();
	text_span.hide();
	return width;
}

function objExistInArray(array,obj){
	return indexOfArray(array,obj) != -1;
}

function indexOfArray(array,obj){
	for(var i = 0;i<array.length;i++){
        if(array[i] == obj){
           return i;
         }
     }
     return -1;
}

function clear(array){
	array.length = 0;
}

function insert(array,index, obj){
	if(index >= 0){
		array.splice(index, 0, obj);
	}
}
function remove(array,index){
	if(index >= 0){
		array.splice(index, 1);
	}
}
function removeObj(array, obj){
	var index = array.indexOf(obj);
	if(index >= 0){
		remove(array,index);
	}
}
