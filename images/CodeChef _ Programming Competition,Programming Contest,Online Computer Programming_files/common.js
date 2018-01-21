function pushInfo(e){invokeModal(e,"Info")}function pushSuccess(e){invokeModal(e,"Success")}function pushWarn(e){invokeModal(e,"Warning")}function pushError(e){invokeModal(e,"Error")}function pushAttention(e){invokeModal(e,"Attention")}function showDrupalMessages(e){if(e){var t="";$.each(e,function(e,r){$.each(r,function(r,i){t+='<span class="message-'+e+'">'+i+"</span><br/>"})});pushInfo(t)}}function pushSmall(e,t,r){invokeGenericModal({id:"small-box",message:'<div class="ccl-font-p ccl-align-c ccl-margin-m">'+e+"</div>",closeCross:true,areAllAllowed:true,callback:t})}function pushErrorSmall(e,t){pushSmall(e,t,"error")}function pushSuccessSmall(e,t){pushSmall(e,t,"success")}function showInternetError(){var e=$("#small-box");if(is_empty_value(e)){var t=function(){if(navigator.onLine){$("#small-box_wrapper").remove();$("#small-box_background").remove();pushSuccessSmall("You're connected now!");setTimeout(function(){$("#small-box_wrapper").remove();$("#small-box_background").remove()},2e3)}else{setTimeout(t,2e3)}};pushErrorSmall("<span>You're offline. Trying to reconnect </span><img style='padding: 2px; vertical-align: middle;' src='/misc/loader-icon.gif'/>",t)}}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function invokeModal(e,t){invokeGenericModal({id:t+"-modal",message:'<div class="ccl-font-h2 ccl-border-bottom ccl-padding-s ccl-margin-sm ccl-align-c">'+t+'</div><div class="ccl-font-p ccl-align-c ccl-margin-m">'+e+"</div>",closeCross:true,areAllAllowed:true})}var cCookie=function(e,t,r){if(typeof t!="undefined"){r=r||{};if(t===null){t="";r.expires=-1}var i="";if(r.expires&&(typeof r.expires=="number"||r.expires.toUTCString)){var n;if(typeof r.expires=="number"){n=new Date;n.setTime(n.getTime()+r.expires*24*60*60*1e3)}else{n=r.expires}i="; expires="+n.toUTCString()}var s=r.path?"; path="+r.path:"";var a=r.domain?"; domain="+r.domain:"";var o=r.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(t),i,s,a,o].join("")}else{var u=null;if(document.cookie&&document.cookie!=""){var c=document.cookie.split(";");for(var l=0;l<c.length;l++){var p=jQuery.trim(c[l]);if(p.substring(0,e.length+1)==e+"="){u=decodeURIComponent(p.substring(e.length+1));break}}}return u}};var cAjax=function(e){function t(e){try{var t=JSON.parse(e);if(t&&typeof t==="object"&&t!==null){return t}}catch(e){}return e}e["type"]=e["type"]?e["type"]:"GET";if(e["url"].indexOf("?")===-1&&e["type"]==="GET"){e["url"]=e["url"]+"?v="+Date.now()}return $.ajax({dataType:e["dataType"]?e["dataType"]:"JSON",url:e["url"],type:e["type"]?e["type"]:"GET",data:e["data"],retryCount:e["retryCount"]?e["retryCount"]:0,retryLimit:10,success:function(r){r=t(r);if(r.hasOwnProperty("status")&&r.hasOwnProperty("message")&&r.hasOwnProperty("redirect")){if(r["status"]=="error"&&r["message"]=="Session limit exceeded"&&location.pathname.indexOf(r["redirect"])!==0){(function(e){window.location.href=r["redirect"]+"?destination="+e.location.pathname.substr(1)})(window);return}}if(typeof e["success"]=="function"){e["success"](r)}},error:function(r){r=t(r);if(r.hasOwnProperty("status")&&r.hasOwnProperty("message")&&r.hasOwnProperty("redirect")){if(r["status"]=="error"&&r["message"]=="Session limit exceeded"&&location.pathname.indexOf(r["redirect"])!==0){(function(e){window.location.href=r["redirect"]+"?destination="+e.location.pathname.substr(1)})(window);return}}if(r.status>500&&this.retryCount<this.retryLimit){e["retryCount"]=e["retryCount"]?e["retryCount"]+1:1;setTimeout(function(){cAjax(e)},2e3)}else{if(typeof e["error"]=="function"){var i=t(r.responseText);e["error"](i)}}}})};var cacheClass=function(){var e=[];function t(e,t,r,i){return new cache(e,t,r,i)}return{getGlobalCache:function(e,t){return this.getInstance("1",e,t,true)},getInstance:function(r,i,n,s){var a=i;if(s&&s===true){a+="global"}else{a+=r}if(!e[a]){e[a]=t(r,i,n,s)}return e[a]}}}();function is_empty_value(e){if(typeof Ember==="undefined"){return typeof e==="undefined"||e===""}else{return Ember&&Ember.isEmpty(e)}}var cache=function(e,t,r,i){var n=window.localStorage;var s=CryptoJS.MD5(window.location.href.split("?")[0]+r);var a=e;if(i&&i===true){a="global"}var o=s+":"+a+":"+t+":";if(n){return{global:i,storage:n,cid:e,userkey:r,set:function(e,t,r){var i=(new Date).getTime()/1e3;r=r==undefined?0:r;if(!is_empty_value(t)){t={ttl:r,value:t,timestamp:i};t=JSON.stringify(t);t=CryptoJS.AES.encrypt(t,this.userkey);this.storage.setItem(o+e,t)}},update:function(e,t,r){var i=this.storage.getItem(o+e);if(i&&i.length>0){var n=CryptoJS.AES.decrypt(i,this.userkey).toString(CryptoJS.enc.Utf8);n=JSON.parse(n);var s=n.timestamp;if(!is_empty_value(t)){t={ttl:r,value:t,timestamp:s};t=JSON.stringify(t);t=CryptoJS.AES.encrypt(t,this.userkey);this.remove(e);this.storage.setItem(o+e,t)}}else{this.set(e,t,r)}},get:function(e){var t=(new Date).getTime()/1e3;var r=this.storage.getItem(o+e);if(r&&r.length>0){var i=CryptoJS.AES.decrypt(r,this.userkey).toString(CryptoJS.enc.Utf8);i=JSON.parse(i);if(i.ttl==0||t-i.timestamp<=i.ttl){return i.value}else{this.remove(e)}}return""},has:function(e){return this.get(e)?true:false},remove:function(e){var t=this.storage.getItem(o+e);if(t&&t.length>0){n.removeItem(o+e)}}}}else{return{global:i,storage:{},cid:e,userkey:r,uniqueCacheWrapperId:o,set:function(e,t,r){var i=(new Date).getTime()/1e3;r=r=="undefined"?0:r;if(!is_empty_value(t)){t={ttl:r,value:t,timestamp:i};t=JSON.stringify(t);t=CryptoJS.AES.encrypt(t,this.userkey).toString(CryptoJS.enc.Utf8);this.storage[this.uniqueCacheWrapperId+e]=t}},update:function(e,t,r){var i=this.storage[o+e];if(this.storage.hasOwnProperty(this.uniqueCacheWrapperId+e)){var n=CryptoJS.AES.decrypt(i,this.userkey).toString(CryptoJS.enc.Utf8);n=JSON.parse(n);var s=n.timestamp;if(!is_empty_value(t)){t={ttl:r,value:t,timestamp:s};t=JSON.stringify(t);t=CryptoJS.AES.encrypt(t,this.userkey);this.remove(e);this.storage[o+e]=t}}else{this.set(e,t,r)}},get:function(e){var t=(new Date).getTime()/1e3;if(this.storage.hasOwnProperty(this.uniqueCacheWrapperId+e)){var r=this.storage[this.uniqueCacheWrapperId+e];var i=CryptoJS.AES.decrypt(r,this.userkey).toString(CryptoJS.enc.Utf8);if(i.ttl==0||t-i.timestamp<=i.ttl){return this.storage[this.uniqueCacheWrapperId+e]}else{this.remove(e)}}return""},has:function(e){return this.get(e)?true:false},remove:function(e){if(this.storage.hasOwnProperty(this.uniqueCacheWrapperId+e)){delete this.storage[this.uniqueCacheWrapperId+e]}}}}};var clearUserCache=function(){cAjax({url:"/api/user/key",success:function(e){var t=e.key;var r=cacheClass.getGlobalCache("user",t);r.remove("user")}})};var getUserKey=function(e){return new Promise(function(t,r){var i=cCookie("userkey");e=!is_empty_value(e)?e:"";var n=function(){cAjax({url:e+"/api/user/key",success:function(e){cCookie("userkey",e.key,{expires:6e-4,path:"/"});t(e.key)},error:function(e){r(e)}})};if(i){t(i)}else{n()}})};var campaigns=function(e){e=!is_empty_value(e)?e:"";cAjax({url:e+"/api/user/campaigns",success:function(e){if(e.data){var t=e.data;$.each(t,function(e,t){$("body").append(t)})}}})};var showDrupalMessageModalGeneric=function(e,t){$(document).ready(function(){var r="modalbox-error-action"+Date.now();invokeGenericModal({message:e,closeCross:true,id:r,areAllAllowed:true,callback:t,args:r})})};$(document).ready(function(){campaigns();$('input[type="file"]').change(function(){var e=$(this).attr("data-supported-extensions").split(",");if(e.length){if($.inArray($(this).val().split(".").pop().toLowerCase(),e)==-1){$(this).val("");showDrupalMessageModal('<div class="messages error">File format not supported. Allowed formats are : '+e.join(", ")+"</div>")}else{var t=parseInt($(this).attr("data-file-size"));if(t){if(this.files[0].size>t){$(this).val("");showDrupalMessageModal('<div class="messages error">File size should be less than '+t/1024+" KB.</div>")}}}}})});