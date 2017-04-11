$(function(){

	
	// 初始化页面规则
	initPageElementRule();
	
	var ids = "";
	$("#search").click(function() {
		$("#searchForm").submit();
		$("#searchForm").validate().valid()&&searchFormSubmit();
		
	});

	$("#clear").click(function() {
		$("#searchForm")[0].reset();
	});
function searchFormSubmit() {
	loadingStart();
	// 清空内容
	clearContent();
	var idType="";
	$("#psdpIdtype")[0].value=="身份证"?idType="NI":idType="PSPT";
 	var	params = {
 				"idType" :/*"PSPT"*/idType,
 				"number" :/*"G56429358"*/$("#psdpNumber")[0].value,
 				"name" :/*"SANG"*/$("#psdpName")[0].value
 		};
	 $.ajax({
	        type: "post",
	        url: getRootPath()+"/psdp/queryTsdata",
	        dataType: "json",
	        contentType : "application/json",
	        data : JSON.stringify(params), 
	        timeout : 60000,
	 	    error : function(data){
	 	    	errorMessageShow();
	 	    	loadingEnd();
	 	    },
	 	    global : false,
	        success: function(data){
	        	loadingEnd();
	        	var newdata=jsonTransfer(data);
				tsdata=newdata.tsdata;

				
				if(tsdata.length>0){
					
				var expirationDate=[];
				   var idDetail="";
				   for (var i = 0; i < tsdata[0].cust.documents.length; i++) {
				
				   if(tsdata[0].cust.documents[i].expirationDate==null||tsdata[0].cust.documents[i].expirationDate=="undefined"){
					   expirationDate[i]="";
				   }else{
					   expirationDate[i]=tsdata[0].cust.documents[i].expirationDate;
				   }
				   
				   idDetail+="<tr><td>"+tsdata[0].cust.documents[i].surName+"</td><td>"+tsdata[0].cust.documents[i].givenName+"</td><td>"+tsdata[i].cust.surName+"</td><td>"+tsdata[0].cust.documents[i].type+"</td><td>"+tsdata[0].cust.documents[i].number+"</td><td>"+tsdata[0].cust.documents[i].nationalityCountry+"</td><td>"+tsdata[0].cust.documents[i].birthDay+"</td><td>"+tsdata[0].cust.documents[i].gender+"</td><td>"+expirationDate[i]+/*"</td><td>"+tsdata[0].cust.documents[i].passportHolder+*/"</td></tr>";
				   }
				   $(".idDetail tbody").append(idDetail);
				
				var tabPart="";

				for (var i = 0; i < tsdata.length; i++) {
					var d=new Date(tsdata[i].seg.departureDate);
					var departureDate=formatDate(d);
					var d1=new Date(tsdata[i].seg.departureTime);
					var departureTime=formatDateDetail(d1);
					var d2=new Date(tsdata[i].seg.arrivalTime);
					var arrivalTime=formatDateDetail(d2);
					tabPart+=
					"<tr><td>"+tsdata[i].seg.carrier
					+tsdata[i].seg.flightNumber+"</td><td>"
					+departureDate+"</td><td>"
					+tsdata[i].seg.departureAirPort+"</td><td>"
					+tsdata[i].seg.arrivalAirPort+"</td><td>"
					+departureTime+"</td><td>"
					+arrivalTime+"</td><td>" +tsdata[i].lastEvent+"</td><td>"+
							"<a href='#' class='detail' id='"+i+"'>详细信息</a></td></tr>";
				}

				$(".tablePart tbody").append(tabPart);
				$(".idDetail").show();
				$(".tablePart").show();
				$(".titles").show();
				$("#psdpNumber").val("");
				$("#psdpIdtype").val("");
				$("#psdpName").val("");}					
				else{
					errorMessageShow();
				}
 
				/**返回上级**/
				$(".backs").click(function(){
					$(".idDetail").show();
					$(".tableDetail").hide();
					$(".tablePart").show();
					
				})			
				/**更多信息**/
				$(".detail").click(function(){
					ids=$(this).attr("id");
					$(".tablePart").hide();
					$(".tableDetail").show();
					$("#segDetail").click();
					$("#segDetail").focus();
					
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
		var recordDates;
		if(books.recordDate=="undefined"||books.recordDate==""){
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
		if(tsdata[ids].ticket==""){
			var tktDetail="";
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
				

			var d=new Date(tsdata[ids].ticket.issueDate);
			var issueDate=formatDate(d);
		var tktDetail="<tr><td>"+tsdata[ids].ticket.ticketNumber
		+"</td><td>"+tsdata[ids].ticket.issueOffice+"</td><td>"
		+tsdata[ids].ticket.iataCode+"</td><td>"+issueDate+
		"</td><td>"+tsdata[ids].ticket.totalPrice.amount+"/"+tsdata[ids].ticket.totalPrice.currencyCode+"/"+tsdata[ids].ticket.totalPrice.numberOfDecimals+"</td><td>"+
		fare+"</td><td>"
		+amount+"</td><td>"+nature+"</td><td>"+numberOfDecimals+"</td><td>"+currencyCode+"</td></tr>";}
		$(".tktDetail tbody").append(tktDetail);
})


	$("#ckiDetail").click(function(){
		$(".ckiDetail").show();
		if(tsdata[ids].checkIn==""){
			var ckiDetail="";
		}else{
			var d=new Date(tsdata[ids].checkIn.checkInDate);
			var checkinTime=formatDateDetail(d);
		var ckiDetail="<tr><td>"+tsdata[ids].checkIn.status+
		"</td><td>"+checkinTime+"</td><td>"
		+tsdata[ids].checkIn.baggage+"</td><td>"+tsdata[ids].checkIn.location+
		"</td><td>"+tsdata[ids].checkIn.gate+"</td></tr>";}
		$(".ckiDetail tbody").append(ckiDetail);
})
	$("#cctDetail").click(function(){
		$(".cctDetail").show();
		var cctDetail="";
		if(tsdata[ids].contact!=""){
		for (var i = 0; i < tsdata[ids].contact.length; i++) {
			cctDetail+="<tr><td>"+tsdata[ids].contact[i].type+
			"</td><td>"+tsdata[ids].contact[i].number+"</td></tr>";
		}}
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
		if(tsdata[ids].ssr!=""){
		for (var i = 0; i < tsdata[ids].ssr.length; i++) {
			ssrDetail+="<tr><td>"+tsdata[ids].ssr[i].ssrCode+
			"</td><td>"+tsdata[ids].ssr[i].actionCode+"</td><td>"
			+tsdata[ids].ssr[i].airlinCode+"</td><td>"+tsdata[ids].ssr[i].text
			+"</td></tr>";
		}}
		$(".ssrDetail tbody").append(ssrDetail);
})
				$("#segDetail,#bookDetail,#tktDetail,#ckiDetail,#cctDetail,#ssrDetail").click(function(){
					$("html,body").animate({
						scrollTop : $(window).height()
					}, 1);
					
				})
			}
	});
	 
/**
 * 结果name清空
 */
	function clearContent() {
		ids="";
		$(".tableDetail").hide();
		$(".tablePart").hide();
		$(".tablePart tbody").html("");
		$(".details tbody").html("");
		$(".details").hide();
		$(".idDetail tbody").html("");
		$(".idDetail").hide();
		$(".titles").hide();
	}
	
}
function initPageElementRule(){
	$("#searchForm").validate({
		rules : {
			psdpIdtype     : "required",
			psdpNumber : "required"
 
		},
		errorElement : "em",
		submitHandler : function() {
		},
		messages : {
			psdpIdtype     : "请录入证件类型",
			psdpNumber : "请输入证件号"
			 
		}
	});
	
	
	
}

function errorMessageShow(){
	$("#msgModal").show();
	setTimeout(function () {
		$("#msgModal").hide();
    }, 1500)
}
})








