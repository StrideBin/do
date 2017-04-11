document.body.style.height = window.screen.height+'px';
document.body.style.overflow = 'hidden';

$(document).ready(function(){
	p_loading.loadPercent(40);
	var img_len = $('img').length,
		img_index = 0;
	$('img').each(function(){
		$(this).load(function(){
			img_index ++ ;
			p_loading.loadPercent(parseInt(30+40*img_index/img_len));
		});
	});
});

$(window).load(function(){
	setTimeout(function(){p_loading.loadPercent(100);},200);
});

Ceair.namespace('p_loading');

Ceair.apply(p_loading,{
	total_length : 408,
	total_percent : 100,
	current_percent : 0,
	step : 2,
	last_percent : 0,
	isloading:false,
	loadArr:[],
	loadPercent : function(percent){
		try{
			if(percent > p_loading.total_percent || percent < 0 || percent < p_loading.last_percent){
				throw new RangeError('percent must between 0 to 100');
			}
			function inArr(percent){
				for(var i = 0 ; i < p_loading.loadArr.length ; i++){
					if(percent == p_loading.loadArr[i].num){
						return true;
					}
				}
				return false;
			}
			
			if(p_loading.isloading || (p_loading.loadArr.length > 0 && !inArr(percent))){
				p_loading.loadArr.push({
					func:function(){p_loading.loadStep(percent);},
					num:percent
				});
			}else{
				p_loading.loadStep(percent);
			}
		}catch(e){
			console.error(e.name + " : " + e.message);
		}
	},
	loadStep: function(percent){
		
		p_loading.last_percent = p_loading.current_percent;
		p_loading.current_percent = percent;
		var steps = p_loading.current_percent - p_loading.last_percent;
		
		var load_step = 0;
		var timeseed = 0;
		p_loading.isloading = true;
		
		timeseed = setInterval(function(){
			load_step += p_loading.step;
			
			var load_bar = document.getElementById('lptc');
			load_bar.style.width = p_loading.last_percent*p_loading.total_length/p_loading.total_percent + 'px';
			
			var load_percent = document.getElementById('load_percent');
			load_percent.innerHTML = p_loading.last_percent+"";
			
			p_loading.last_percent += p_loading.step ;
			
			if(p_loading.last_percent >= p_loading.total_percent){
				p_loading.loadEnd();
			}
			
			if(load_step > steps){
				p_loading.isloading = false;
				clearInterval(timeseed);
				if(p_loading.loadArr.length > 0){
					setTimeout(p_loading.loadArr.shift().func, 80);
				}
			}
		}, 10);
	},
	loadStart: function(){
		p_loading.loadPercent(0);
	},
	loadEnd: function(){
		$('#loading').hide();
		$('body').removeAttr('style');
	}
});

p_loading.loadPercent(25);