var root = $('body')[0] 	//document.body
m.render(root,
	[
		m('div',{class:"header_fixed"},
			[m('div',{class:"logo_default",onclick:function(){ window.location='/'}},'ANLYCS')] ),
		m('div',{class:"header_placeholder"},''),
		m('div',{class:"column_container"},[
			m('div',{class:"first column"},[
				m('div',{class:"aside_block"},[
					m('div',{class:"aside_title"},"From News to Trades"),
					m('div',{class:"aside_desc"},"Filtering facts to extract actionnable insights"),
				]),
			]) 
			,
			m('div',{class:"second column"},[
				m('div',{class:"list_news_analysis"},'')
			]) 
		]),
	]
)

index_newsdrill.fill_list_article()		
