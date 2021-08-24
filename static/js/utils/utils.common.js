var fill_logo 			= function(){
	//var content = 'R<span class="logo_blue">E</span>N<span class="logo_blue">I</span>CS'
	var content = 'A<span class="logo_blue">N</span>L<span class="logo_blue">Y</span>CS'
	$('.logo_default').html(content)
	$('.tab.club').html('')
	$('.tab.club').attr('onclick','')
}


window['global_dic_news_icon']  	= {'BTC':'BTC.png','btc':'BTC.png','Bitcoin':'BTC.png',
													'eth':'ETH.png','ETH':'ETH.png','Ethereum':'ETH.png',
													'xrp':'XRP.png','XRP':'XRP.png','Ripple':'XRP.png',
													'Tezos':'XTZ.png','China':'china.svg','US':'usa.svg'}
window['global_list_news_icon'] 	= ['US','China','Tezos','xrp','XRP','Ripple','eth','ETH','Ethereum','Bitcoin','btc','BTC']
