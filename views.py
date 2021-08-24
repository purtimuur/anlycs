import os
import json
import utils

 
def index():
    fName   = os.sep.join(['templates','template','index.html'])
    html    = utils.gFile(fName)
    return html

def theme_list(dic_cookie={}):
    fName       = os.sep.join(['templates','template','themes','theme_list.html'])
    dic_templ   = {}
    for key in dic_cookie:
        if dic_cookie[key] == None:
            dic_templ[key] = 'undefined'
        else:
            dic_templ[key] = dic_cookie[key]

    html        = utils.ftf(fName,dic_templ)
    return html

def theme(dic_cookie={}):
    fName       = os.sep.join(['templates','template','themes','theme.html'])
    dic_templ   = {}
    for key in dic_cookie:
        if dic_cookie[key] == None:
            dic_templ[key] = 'undefined'
        else:
            dic_templ[key] = dic_cookie[key]

    html    = utils.ftf(fName,dic_templ)
    return html

def research(dic_cookie={}):
    fName   = os.sep.join(['templates','template','research','research.html'])
    dic_templ   = {}
    for key in dic_cookie:
        if dic_cookie[key] == None:
            dic_templ[key] = 'undefined'
        else:
            dic_templ[key] = dic_cookie[key]

    html    = utils.ftf(fName,dic_templ)
    return html

def club(dic_cookie={}):
    fName       = os.sep.join(['templates','template','club','club.html'])
    dic_templ   = {}
    for key in dic_cookie:
        if dic_cookie[key] == None:
            dic_templ[key] = 'undefined'
        else:
            dic_templ[key] = dic_cookie[key]

    html    = utils.ftf(fName,dic_templ)
    return html

