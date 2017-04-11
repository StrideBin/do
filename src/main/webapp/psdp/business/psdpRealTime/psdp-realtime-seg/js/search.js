
$(function(){
	
	//查询成功后的数组下标
	var ids = "";
	
	//初始化界面规则
	initPageElementRule();
	
	//查询按钮事件触发
	$("#search").click(function() {
		$("#searchForm").submit();
		$("#searchForm").validate().valid()&&searchFormSubmit();
		
	});
	
	//清除表单信息
	$("#clear").click(function() {
		$("#searchForm")[0].reset();
	});
	/**
	 * 
	 * 表单提交方法
	 * 
	 **/
	function searchFormSubmit() {
		
		loadingStart();
		
		clearContent();//初始化界面信息
		
		var carrierFlag="";
		
		$(".radio").find("ins")[0].className=="checked"?carrierFlag="carrier":carrierFlag="opCarrier";
		
	 	var	params = {
	 				"carrierFlag":carrierFlag,
					"flightNumber" :/*"5101"*/$("#flightNumber")[0].value.toUpperCase(),
					"carrier" :/*"MU"*/$("#carrier")[0].value.toUpperCase(),
					"originLocation" :/*"SHA"*/$("#originLocation")[0].value.toUpperCase(),
					"destinationLocation" :/*"PEK"*/$("#destinationLocation")[0].value.toUpperCase(),
					"departureDate" :/*"2016-7-22"*/$("#departureDate").val(),
			};
	
		$.ajax({
					type: "post",
					url:getRootPath()+"/psdp/queryTsdataSeg",
					dataType : "json",
					contentType : "application/json",
					data : JSON.stringify(params), 
					timeout : 60000,
					error : function(data) {
						errorMessageShow();
						loadingEnd();
					},
					success : function(data) {
						
						loadingEnd();
						
						//Json数据null值转""
			        	var newdata=jsonTransfer(data);
			        	
			        	//Json数据按checkin条件分类返回
			        	tsdata=checkInData(newdata.tsdata);
			        	
						if(tsdata.length>0){
							
						var tabPart="";
							var data=new Date(tsdata[0].seg.departureDate);
							var departureDate=formatDate(data);
							var date1=new Date(tsdata[0].seg.departureTime);
							var departureTime=formatDateDetail(date1);
							var date2=new Date(tsdata[0].seg.arrivalTime);
							var arrivalTime=formatDateDetail(date2);
							tabPart+=
							"<tr><td>"+tsdata[0].seg.carrier
							+tsdata[0].seg.flightNumber+"</td><td>"
							+departureDate+"</td><td>"
							+tsdata[0].seg.departureAirPort+"</td><td>"
							+tsdata[0].seg.arrivalAirPort+"</td><td>"
							+departureTime+"</td><td>"
							+arrivalTime+"</td></tr>";
							
							var expirationDate=[];
							   var idDetail="";
							   for (var j = 0; j < tsdata.length; j++) {
							   
							   idDetail+="<tr><td>"+(j+1)
							   		   +"</td><td>"+tsdata[j].cust.surName
							   		   +"</td><td>"+tsdata[j].cust.givenName
							   		   +"</td><td>"+tsdata[j].cust.naGivenName
							   		   +"</td><td>"+tsdata[j].cust.idtype
							   		   +"</td><td class='blurNumber font-blur'>"+tsdata[j].cust.number
							   		   +"</td><td>"+tsdata[j].cust.type
							   		   +"</td><td>"+tsdata[j].lastEvent
							   		   +"</td><td>"+"<a href='#' class='detail' id='"+j+"'>详细信息</a></td></tr>";
							   }
							   $(".idDetail tbody").append(idDetail);
								$(".blurNumber").hover(function(){
									$(this).removeClass("font-blur");
								},function(){
								$(this).addClass("font-blur");
								});
	
						$(".tablePart tbody").append(tabPart);
						
						$(".idDetail").show();
						$(".tablePart").show();
						
						$(".title-id").text("旅客信息("+tsdata.length+"条数据)");
						$(".titles").show();
						$("#psdpNumber").val("");
						$("#psdpIdtype").val("");
						$("#psdpName").val("");
						}
						else{
							errorMessageShow();
						}
					

			/**更多信息**/
			$(".detail").click(function(){
				ids=$(this).attr("id");
				$(".tableDetail").show();
				$(".idDetail").hide();
				$("#segDetail").click();
				$("#segDetail").focus();
			})
			/**返回上级**/
			$(".backs").click(function(){
				$(".idDetail").show();
				$(".tableDetail").hide();
				
			})
			
			$(".btn-details").click(function(){
				$(".details").hide();
				$(".details tbody").html("");
			})
						
						
			$("#segDetail").click(function(){
				$(".segDetail").show();
				var segs=tsdata[ids].seg;
				var d1=new Date(segs.departureDate);
				var departureDate=formatDate(d1);
				var segDetail="<tr><td>"+segs.actionCode+"</td><td>"
				+segs.couponStatus+"</td><td>"
				+segs.opCarrier+"</td><td>"
				+segs.opFlightNumber+"</td><td>"+segs.suffix+"</td><td>"
				+segs.departureTerminal+"</td><td>"
				+segs.arrivalTerminal+"</td><td>"+segs.compartment+"</td><td>"+segs.clazz+"</td></tr>";
				$(".segDetail tbody").append(segDetail);
				
		})
			$("#bookDetail").click(function(){
				$(".bookDetail").show();
				var books=tsdata[ids].book;
				var recordDates="";
				if(books.recordDate=="undefined"){
					recordDates="";
				}else{
					recordDates=books.recordDate;
				}
				
				var bookDetail="<tr><td>"+books.bookingOffice+"</td><td>" +
						""+books.iataCode+"</td><td>"+books.gdsCode+"</td><td>"
						+books.gdsRecord+"</td><td>"+books.record+"</td><td>"+
						recordDates+"</td><td>"+books.group+"</td><td>"+books.groupName
						+"</td></tr>";
				$(".bookDetail tbody").append(bookDetail);
		})
			$("#tktDetail").click(function(){
				$(".tktDetail").show();
				var tktDetail="";
				if(tsdata[ids].ticket==""){
				}else{
					
					if(tsdata[ids].ticket.fare==""||tsdata[ids].ticket.fare==null){
						var fare="";
					}else{
						var fare=tsdata[ids].ticket.fare;
					}
					var amount="";
					var nature="";
					var numberOfDecimals="";
					var currencyCode="";
					if(tsdata[ids].ticket.tax!=""){
						amount=tsdata[ids].ticket.tax[0].amount;
						nature=tsdata[ids].ticket.tax[0].nature;
						numberOfDecimals=tsdata[ids].ticket.tax[0].numberOfDecimals;
						currencyCode=tsdata[ids].ticket.tax[0].currencyCode;
					}
						
					var data=new Date(tsdata[ids].ticket.issueDate);
					var issueDate=formatDate(data);
					tktDetail="<tr><td>"+tsdata[ids].ticket.ticketNumber
						+"</td><td>"+tsdata[ids].ticket.issueOffice
						+"</td><td>"+tsdata[ids].ticket.iataCode
						+"</td><td>"+issueDate
						+"</td><td>"+tsdata[ids].ticket.totalPrice.amount+"/"+tsdata[ids].ticket.totalPrice.currencyCode+"/"+tsdata[ids].ticket.totalPrice.numberOfDecimals
						+"</td><td>"+fare
						+"</td><td>"+amount
						+"</td><td>"+nature
						+"</td><td>"+numberOfDecimals
						+"</td><td>"+currencyCode+"</td></tr>";}
					$(".tktDetail tbody").append(tktDetail);
		})
		
			$("#ckiDetail").click(function(){
				$(".ckiDetail").show();
				if(tsdata[ids].checkIn==""){
					var ckiDetail="";
				}else{
					var data=new Date(tsdata[ids].checkIn.checkInDate);
					var checkinTime=formatDateDetail(data);
				var ckiDetail="<tr><td>"+tsdata[ids].checkIn.status
							+"</td><td>"+checkinTime
							+"</td><td>"+tsdata[ids].checkIn.baggage
							+"</td><td>"+tsdata[ids].checkIn.location
							+"</td><td>"+tsdata[ids].checkIn.gate+"</td></tr>";
				}
				$(".ckiDetail tbody").append(ckiDetail);
		})
			$("#cctDetail").click(function(){
				$(".cctDetail").show();
				var cctDetail="";
				for (var i = 0; i < tsdata[ids].contact.length; i++) {
					cctDetail+="<tr><td>"+tsdata[ids].contact[i].type
							 +"</td><td>"+tsdata[ids].contact[i].number+"</td></tr>";
				}
				$(".cctDetail tbody").append(cctDetail);
		})
		
		
		$("#freTraveler").click(function(){
		$(".freTraveler").show();
		var freTraveler="";
		if(tsdata[ids].freTraveler!=""){
		for (var i = 0; i < tsdata[ids].cust.freTraveler.length; i++) {
			freTraveler+="<tr><td>"+tsdata[ids].cust.freTraveler[i].companyCode+
			"</td><td>"+
			tsdata[ids].cust.freTraveler[i].number+"</td><td>"+
			tsdata[ids].cust.freTraveler[i].loyalLevel+"</td><td>"+
			tsdata[ids].cust.freTraveler[i].allianceLevel+"</td></tr>";
		}}
		$(".freTraveler tbody").append(freTraveler);
		})
			
			$("#ssrDetail").click(function(){
				$(".ssrDetail").show();
					var ssrDetail="";
				for (var i = 0; i < tsdata[ids].ssr.length; i++) {
					ssrDetail+="<tr><td>"+tsdata[ids].ssr[i].ssrCode
					+"</td><td>"+tsdata[ids].ssr[i].actionCode
					+"</td><td>"+tsdata[ids].ssr[i].airlinCode
					+"</td><td>"+tsdata[ids].ssr[i].text+"</td></tr>";
				}
				$(".ssrDetail tbody").append(ssrDetail);
		})
			/**
			 * 
			 * 详细数据查询出来之后滚动条下拉到底端
			 * 
			 * */
			$("#segDetail,#bookDetail,#tktDetail,#ckiDetail,#cctDetail,#ssrDetail").click(function(){
				$("html,body").animate({
					scrollTop : $(window).height()
				}, 1);
				})
			}
		});
			/**
			 * 初始化界面
			 */
		function clearContent() {
			ids="";
			$(".tablePart").hide();
			$(".tablePart tbody").html("");
			$(".details tbody").html("");
			$(".details").hide();
			$(".tableDetail").hide();
			$(".idDetail tbody").html("");
			$(".idDetail").hide();
			$(".titles").hide();
		}
			
		}
	
		/**
		 * 
		 * 初始化页面规则
		 * 
		 * */
		function initPageElementRule(){
			
			//表单验证规则
			$("#searchForm").validate({
				rules : {
					flightNumber     : "required",
					departureDate     : "required",
					carrier:"required",
				},
				errorElement : "em",
				submitHandler : function() {
				},
				messages : {
					flightNumber     : "请录入航班号",
					departureDate     : "请录入离港日期",
					carrier:"请录入航班承运",
					 
				},
				errorPlacement : function(error, element) {
					console.info(element);
					console.info(error);
					element.parent().append(error);
				},
				highlight : function(element, errorClass) {
					$(element).parent().find("." + errorClass).removeClass("checked")
				},
			});
			
			//日历初始化
			$('.departureDate').datetimepicker({
		        language:  'zh-CN',
		        weekStart: 1,
		        todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				forceParse: 0
		    });
			
			
			
			
		}
		/**
		 * 
		 * 错误信息提示
		 * 
		 * */
		function errorMessageShow(){
			$("#msgModal").show();
			setTimeout(function () {
				$("#msgModal").hide();
		    }, 1500)
		}
		/**
		 * 
		 * 查询信息分类
		 * 
		 * */
		function checkInData(tsdata){
			var checkInTsdata=[];
			
			var unCheckInTsdata=[];
			
			var ckSign=0;
			
			var unCkSign=0;
			
			var checkin=$("#checkin").attr("class").indexOf("checked")>0?true:false;
			
			var uncheckin=$("#uncheckin").attr("class").indexOf("checked")>0?true:false;
			
			var allChose=checkin&&uncheckin;
			
			if(allChose==true||checkin==false&&uncheckin==false){
				return tsdata;
			}
			for (var i = 0; i < tsdata.length; i++) {
				if(tsdata[i].lastEvent=="CheckIn"){
					checkInTsdata[ckSign]=tsdata[i];
					ckSign++;
				}else{
					unCheckInTsdata[unCkSign]=tsdata[i];
					unCkSign++;
				}
			}
			if(checkin){
				return checkInTsdata;
			}
			if(uncheckin){
				return unCheckInTsdata;
			}
		}


})






