document.addEventListener('DOMContentLoaded', function () {
 	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		var param = get_parameter(tabs[0].url);  
		var url = get_hostname(param);
		if(url == null || url.indexOf("amazon") < 0) {
			$('.form-input-group').css('display', 'none');
			$('.error-section').html('DNA Tool work only with amazon website.');
			$('#amazon_url').val('https://amazon.com');
		}
		else {
			$('#amazon_url').val(url);
		}
		document.getElementById("asin_selector").focus();
	});

	var storageVariable = chrome.storage.sync.get({
	    includedRatings: 'all_stars',
	    phraseLength: '7'
	},
  	function(items) {
  		document.getElementById('included_rating').value = items.includedRatings;
    	document.getElementById('phrase_length').value = items.phraseLength;
  	});

});

$(function () {
	var api_url = "https://amz.rudraserver.com";
    $("#analysis_copy").click(function () {
    	clear_message();
		var amazon_url = $('#amazon_url').val();
		var asin = $("#asin_selector").val();
		var filter_by_star = $("#included_rating").val();
		var phrase_length = $("#phrase_length").val();
		document.getElementById("asin_selector").placeholder = 'ASIN';
		if(asin != '') {
			$('.spinner-wrapper').show();
			$.ajax({
		        url: api_url+'/dna',
		        type: 'POST',
		        dataType: "json",
		        data : {action : 'reviews', url : amazon_url, asin : asin, filter_by_star : filter_by_star, phrase_length : phrase_length},
		        success: function(res) {
		            if(res.status) {
		            	var url = api_url+'/tmp/dna/'+res.download;
                        var a = document.createElement('a');
                        a.href = url;
                        a.click();
                        window.URL.revokeObjectURL(url);
		            }
		            else {
		            	$('.error-section').html(res.error);
		            }
		            $('.spinner-wrapper').hide();
		        },
		        error: function(err) {
		        	$('.error-section').html('Internal Server Error!!!');
		        	$('.spinner-wrapper').hide();
		        }
		    });
		}
		else {
			$('#asin_selector').css('border', 'solid 1px #FF0000');
			document.getElementById("asin_selector").focus();
			document.getElementById("asin_selector").placeholder = 'Please enter asin.';
		}
    });
});

function get_parameter(url) {
	return url.split('?url=')[1];
}

function get_hostname(url) {
    var m = url.match(/^https:\/\/[^/]+/);
    return m?m[0]:null;
}

function clear_message() {
	$('.error-section').html('');
	$('.success-section').html('');
	$('#asin_selector').css('border', 'solid 1px #ccccc');
}