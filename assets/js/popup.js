document.addEventListener('DOMContentLoaded', function () {
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		$('#openTab').val(tabs[0].url);
		document.getElementById("asinSelector").focus();
		if(tabs[0].url.indexOf("amazon") < 0) {
			$('.form-input-group').css('display', 'none');
			$('.error-section').html('DNA Tool work only with amazon website.');
		}
	});
});

$(function () {
	var apiUrl = "https://amz.rudraserver.com";
    $("#analysisCopy").click(function () {
    	clearMessage();
		var openTab = $('#openTab').val();
		var asin = $("#asinSelector").val();
		var openTabURL = get_hostname(openTab);
		if(openTabURL != null && openTabURL.indexOf("amazon") >= 0) {
			if(asin != '') {
				$('.spinner-wrapper').show();
				$.ajax({
			        url: apiUrl+'/dna',
			        type: 'POST',
			        dataType: "json",
			        data : {action:'reviews', url:openTabURL, asin:asin},
			        success: function(res) {
			            if(res.status) {
			            	var url = apiUrl+'/tmp/dna/'+res.download;
	                        var a = document.createElement('a');
	                        a.href = url;
	                        a.click();
	                        window.URL.revokeObjectURL(url);
	                        var asin = $("#asinSelector").val('');
	                        $('.success-section').html('File downloaded successfully!!!');
			            }
			            else {
			            	$('.error-section').html(res.error);
			            }
			            $('.spinner-wrapper').hide();
			        },
			        error: function(err) {
			        	$('.error-section').html('Internal server error!!!');
			        	$('.spinner-wrapper').hide();
			        }
			    });
			}
			else {
				$('#asinSelector').css('border', 'solid 1px #FF0000');
			}
		}
		else {
			$('.error-section').html('DNA Tool work only with amazon website.');
		}
    });

    function get_hostname(url) {
	    var m = url.match(/^https:\/\/[^/]+/);
	    return m?m[0]:null;
	}

	function clearMessage() {
		$('.error-section').html('');
		$('.success-section').html('');
		$('#asinSelector').css('border', 'solid 1px #ccccc');
	}
});