document.addEventListener('DOMContentLoaded', function () {
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		$('#openTab').val(tabs[0].url);
		document.getElementById("asinSelector").focus();
	});
});

$(function () {
	var apiUrl = "https://amz.rudraserver.com";
    $("#analysisCopy").click(function () {
		var openTab = $('#openTab').val();
		var asin = $("#asinSelector").val();
		var openTabURL = POST_hostname(openTab);

		if(openTabURL != null && openTabURL.indexOf("amazon") >= 0) {
			
			$('.error-section').html('');
			$('.success-section').html('');

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
	                        $('.error-section').html('');
	                        $('.success-section').html('File downloaded successfully!!!');
			            }
			            else {
			            	$('.error-section').html(res.error);
			            	$('.success-section').html('');
			            }
			            $('.spinner-wrapper').hide();
			        },
			        error: function(err) {
			        	$('.error-section').html('Internal server error!!!');
			        	$('.success-section').html('');
			        	$('.spinner-wrapper').hide();
			        }
			    });
			}
			else {
				$('.error-section').html('ASIN is required field!!!');
	            $('.success-section').html('');
			}
		}
		else {
			$('.error-section').html('Not a valid amazon page!!!');
		}
    });

    function POST_hostname(url) {
	    var m = url.match(/^https:\/\/[^/]+/);
	    return m?m[0]:null;
	}
});
