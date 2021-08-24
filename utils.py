import os

import urllib
import time
import random
import unicodedata
from time import strftime
from datetime import datetime



def gTimeHeader():
    """
    VERSION : 280410
    RESULT  : return the microsecond precise evaluation of the current time,
    """
    dt         = datetime.now()
    microS     = dt.microsecond
    timeHeader = strftime("%Y%m%d_%H%M%S")
    timeHeader = str(timeHeader) + '_' + str(microS)
    return timeHeader

def gDayHeader():
    """
    VERSION : 280410
    RESULT  : return the microsecond precise evaluation of the current time,
    """
    dt          = datetime.now()
    microS      = dt.microsecond
    dayHeader   = strftime("%Y%m%d")
    return dayHeader    

def gDic_time():
    """
    VERSION : 280410
    RESULT  : return the microsecond precise evaluation of the current time,
    """
    dic_out    = {}
    dt         = datetime.now()
    microS     = dt.microsecond
    dic_out['day'] = strftime("%d")
    dic_out['year'] = strftime("%Y")
    dic_out['month'] = strftime("%m")

    dic_out['hour'] = strftime("%H")
    dic_out['minute'] = strftime("%M")
    dic_out['second'] = strftime("%S")
    return dic_out    

def ftf(templFile,dic):
    """
    Naive version, easily portable
    """
    templ = gFile(templFile)
    list_key = dic.keys()
    for key in list_key:
        label   = "{{"+str(key)+"}}"
        value = escape_special_char(dic[key])
        templ = templ.replace(label,value)

    return templ

def gFile(fName):
    """
    Utilities: return the content of a file.
    """
    fH=open(fName,'r'); fcont = fH.read(); fH.close()
    return fcont

def pFile(fName,fcont):
    """
    Utilities: return the content of a file.
    """
    fH=open(fName,'w');  fH.write(fcont); fH.close()
    return fcont

def touchFile(fName,fcont):
    path_dir    = os.sep.join(fName.split(os.sep)[:-1])
    if not os.path.exists( path_dir):
        try:
            os.makedirs(path_dir)
        except:
            pass

    if not os.path.exists(fName):
        fh =  open(fName,'w');fh.write(fcont);fh.close()
    return fcont

def onlyAscii(char):
    try:
        return '' if (ord(char) < 1 or ord(char) > 127) else char
    except:
        return ''


def escape_special_char(a):
    try:
        #dirty hack
        test_a  = escape_german_char(a)
        a       = ''.join([onlyAscii(char) for char in a])
        test_a  = ''.join([onlyAscii(char) for char in test_a])
        a.encode('ascii', 'xmlcharrefreplace')
        test_a.encode('ascii', 'xmlcharrefreplace')
        a       = escape_german_char(a)
        test_a  = escape_german_char(test_a)
        if not len(test_a)<= len(a):
            a = test_a
            
        return a
    except:
        a = ''.join([onlyAscii(char) for char in a])
        a = escape_german_char(a)
        a = ''.join([onlyAscii(char) for char in a])
        a.encode('ascii', 'xmlcharrefreplace')
        a.decode('raw-unicode-escape').replace(u'\xdf','ss').replace('\u00df','ss')        #exec("b = u'" + a + "'")
        return escape_german_char(a)


def escape_german_char(a):
        a =  unicodedata.normalize('NFKD', unicode(a).replace(u"\u00A0", " ")).encode('ascii','ignore')
        a = a.replace('\u00a0',' ').replace('\u2019',"'").replace('\u2013','-').replace('\u00b7','\n-').replace('\u003C3','')
        a = a.replace('\u00df','ss').replace('\u00fc','u').replace('\u00e4','a').replace('\u00f6','o')
        a = a.replace('\u00fb','û').replace('\u00e9','é').replace('\u00ea','ê').replace('\u00e0','a').replace('\u00e8','è')
        a = a.replace('\u00f4','ô').replace('\u00ee','î').replace('\u2022','\n-').replace('\u00e2','â').replace('\u00b0','°')
        a = a.replace('\u0153','oe').replace('\u00e7','ç').replace('\u20ac','€').replace('\u00a3','£')
        a = a.replace('\u00bb','>>').replace('\u00ab','<<').replace('\u2014','-').replace('\u00ef','i')
        a = a.replace('\u00eb','ë').replace('\u00c9','E').replace('\u00f9','ù')
        a = a.replace('\xe9','é').replace('\xe8','è').replace('\xa0',' ').replace('\xe8','è').replace('\xa0',' ')
        return a 


def remove_link(text):
    text    = ' '.join([ w for w in text.split() if not 'facebook' in w])
    text    = ' '.join([ w for w in text.split() if not 'youtube' in w])
    return text


def gTime_epoch(fb_time):
    """ convert a facebook time stamp into an epoch"""
    try:
        [date,global_time] = fb_time.split('T')
    except:
        fb_time             = fb_time.strip() + 'T20:00:00-0000'
        [date,global_time]  = fb_time.split('T')
        
    [year,month,day] = date.split('-')
    if '-' in global_time:
        [local_time,offset] = global_time.split('-')
    elif '+' in global_time:
        [local_time,offset] = global_time.split('+')
    else :
        [local_time,offset] = [global_time,'00']
    [hour,minute,second]    = local_time.split(':')
    hour             = str(divmod(int(hour) + int(offset[:2]),24)[1])
    minute           = str(divmod(int(minute) + int(offset[-2:]),24)[1])
    try:
        t = datetime(int(year), int(month), int(day), int(hour), int(minute), int(second))
    except:
        raise
    time_epoch = int(time.mktime(t.timetuple()))
    return time_epoch


