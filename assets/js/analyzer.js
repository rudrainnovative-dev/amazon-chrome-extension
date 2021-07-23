var table = document.getElementById('productDetails_detailBullets_sections1'), tr = table.getElementsByTagName("tr")[0], td = tr.getElementsByTagName("td")[0];
var asin = td.innerHTML;

var href = "#";
if(asin) {
	href = "https://amz.rudraserver.com/tmp/dna/"+asin+".xlsx";
}

var a = document.createElement("a");
a.setAttribute('id', 'dna_analyzer_download');
a.setAttribute('class', 'a-link-normal a-size-base');
a.setAttribute('style', "display:block;margin:10px 0px;color:blue;");
a.setAttribute('href', href);
a.setAttribute('target', "_blank");
a.innerHTML = 'Download Reviews Xlsx|Csv';

var link = document.getElementById('dna_analyzer_download');
if(!link) {
	document.getElementById('title').appendChild(a);
}

