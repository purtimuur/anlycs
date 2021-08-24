index_newsdrill = window.index_newsdrill || {}

index_newsdrill.reveal_account_detail = function(account_name){
	
	if($('.article_snippet_block.'+account_name).hasClass('opened')){
		$('.article_snippet_block.'+account_name).css({visibility:'hidden',height:'0px',padding:'0px'})
		$('.article_snippet_block.'+account_name).removeClass('opened')
	}else{
		$('.article_snippet_block.'+account_name).css({visibility:'',height:'',padding:''})
		setTimeout(function(){
			index_newsdrill.display_target_activity('canvas_'+account_name,account_name)
		},500)
		$('.article_snippet_block.'+account_name).addClass('opened')		
	}
	
}


index_newsdrill.display_target_activity = function(canvas_id,account_name){
			
}


var fill_template_account = function(dic_account){
	
	var article_calendar_snippet_html	= '\n\
						<div  class="article_calendar_snippet analysis" \n\
							style="">\n\
								<div>\n\
									<span style="display:none"><b>Author</b>: <span class="info_span" style="">[[[author]]]</span> - </span>\n\
									<b>Version</b>: <span class="info_span" style="">[[[version]]]</span> - \n\
									<b>Date</b>: <span class="info_span" style="">[[[date]]]</span>  \n\
								</div>\n\
								<div>\n\
									<b> </b><br> <span  class="info_span" style="">[[[text]]]</span>\n\
								</div>\n\
						</div>\n\
						'
						
	var article_tag_html 	= '\n\
						<span class="article_tag" style="">[[[tag]]] </span>\n\
							&nbsp;&nbsp;\n\
						'
						
	var author_tag_html 	= '\n\
								<span class="author_tag" style="">[[[tag]]]</span>\n\
								&nbsp;&nbsp;\n\
						'
	
	var article_block_html ='\n\
				<div class="article_block" style="">\n\
					<div class="article_title_block research" style="">\n\
						<div class="article_author_div" style="position:relative;z-index:0;">\n\
							<span style="" class="author_name">[[[date]]]</span>\n\
							&nbsp;&nbsp;\n\
							<span class="author_tag_bar" style="">\n\
								[[[title]]] - <a href="index_newsdrill.html?ns_name=[[news_name]]">(share link)</a>\n\
							</span>\n\
							<span class="author_twitter" style="">\n\
								<a href="#self" class="plus_opener_link [[[news_id]]]" onclick="index_newsdrill.reveal_account_detail(\'[[[news_id]]]\')">\n\
									<img src="/static/page/research/img/plus-sign-128.png" style="" class="author_twitter_logo">\n\
								</a>\n\
							</span>\n\
							<br><br>\n\
							<span style="visibility:" class="author_name" style="">\n\
								[[[icon_tag]]]\n\
							</span>\n\
							&nbsp;&nbsp;\n\
							<span class="author_tag_bar tag_list" style="line-height: 23px;">\n\
								[[[author_tag_list]]]\n\
							</span>\n\
						</div>\n\
					</div>\n\
					<div class="article_snippet_block [[[news_id]]] research" style="visibility:hidden;height: 0px;padding: 0;">\n\
						<div class="snippet_and_summary" style="">\
							[[[snippet]]] ( [[[summary]]] ) - <a target="_blank" href="[[[url]]]">link</a> \
						</div> \n\
						<div class="article_tag_bar" style="">\n\
							[[[article_tag_list]]]\n\
						</div>\n\
						<div class="article_calendar_holder" style="">\n\
							[[[article_calendar_list]]]\n\
						</div>\n\
						\n\
					</div>\n\
				</div>\n\
				'
				
	var dic_html 					= {} 
	dic_html['date'] 				= dic_account['date'].slice(0,4) + '/' + dic_account['date'].slice(4,6) +'/' + dic_account['date'].slice(6,8) 
	dic_html['title'] 				= dic_account['title'] 	
	dic_html['url'] 				= dic_account['url']
	dic_html['news_id'] 			= dic_account['news_id'] 	
	dic_html['news_name'] 			= dic_account['news_name'] 	
	dic_html['summary'] 			= dic_account['summary']
	dic_html['snippet'] 			= dic_account['snippet']

	var container_analysis_dic 		= dic_account['analysis_dic'] || {}
	var list_analysis_key 			= keys(container_analysis_dic)
	dic_html['article_tag_list'] 		= ''
	dic_html['article_calendar_list'] 	= ''

	dic_html['author_tag_list'] 	= ''
	var list_author_tag 	= dic_account.level_tags || []
	for(var i=0;i<list_author_tag.length;i++){
		if($.trim(list_author_tag[i]).length>0){
			dic_html['author_tag_list'] 	+= utils.template.fillTempl(author_tag_html,{'tag':list_author_tag[i]})
		}
	}

	var lang  						= getUrlParameter('lang') || 'en'
	if(list_analysis_key.indexOf(lang)==-1){
		let article_lang 					= list_analysis_key[0]
		var dic_article 					= container_analysis_dic[article_lang]
		dic_html['article_calendar_list'] 	+= utils.template.fillTempl(article_calendar_snippet_html,dic_article)
	}else{
		let article_lang 					= lang
		var dic_article 					= container_analysis_dic[article_lang]
		dic_html['article_calendar_list'] 	+= utils.template.fillTempl(article_calendar_snippet_html,dic_article)
	}
	
	var list_author_tag 	= dic_account.level_tags || []
	dic_html['icon_tag'] 	= '<span style="padding-left:30px;">&nbsp;</span>'
	for(var i=0;i<global_list_news_icon.length;i++){
		if(list_author_tag.indexOf(global_list_news_icon[i]) >-1){
			var news_icon 			= global_dic_news_icon[global_list_news_icon[i]]
			var news_icon_title 	= news_icon.split('.')[0]
			dic_html['icon_tag'] 	= '<img src="/static/page/research/img/news_logo/'+news_icon+'" title="'+news_icon_title+'" style="width: 25px;    margin-left: 10px;">'
			break;
		}
	}
	var html 	= utils.template.fillTempl(article_block_html,dic_html)
	return html
				
}	


index_newsdrill.fill_list_article 	= function(){
	var list_news_analysis 		= window.list_news_analysis.reverse() || []

	var list_news_analysis_html = ''
	console.log(list_news_analysis)
	for(var i=0;i<Math.min(list_news_analysis.length,15);i++){
		var dic_account 		= list_news_analysis[i]
		list_news_analysis_html	+= fill_template_account(dic_account)
	}
	

	$('.list_news_analysis').html(list_news_analysis_html)
}