# -*- coding: cp1252 -*-
import web
import os
import json
import views as vw

import unicodedata
        
urls = (
   
    '/research',    'research',
    '/themes',      'theme_list',
    '/theme',       'theme',
    '/club',        'club',
    '/(.*)',        'index'
)
app = web.application(urls, globals())


def gDic_cookie(web_cookies):
    list_key_cookie = ['user_mail']
    dic_cookie      = {}
    for key in list_key_cookie:
        dic_cookie[key]     = web_cookies.get(key,None)
    return dic_cookie

class index:        
    def GET(self, name):
        html    = vw.index()
        return html
    
class theme_list:        
    def GET(self):
        html    = vw.theme_list()
        return html
    
class theme:        
    def GET(self):
        html    = vw.theme()
        return html
    
class research:        
    def GET(self):
        html    = vw.research()
        return html
    
class club:        
    def GET(self):
        html    = vw.club()
        return html
    

if __name__ == "__main__":
    #use port 3636
    app.run()
