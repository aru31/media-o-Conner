$(document).ready(function(){$("#problem-submission").submit(function(){$("#edit-submit").attr("disabled",true)});$(".done").click(function(){var e="/api/balloons/markdone/"+$(this).attr("data-contest")+"/"+$(this).attr("data-id");cAjax({type:"DELETE",url:e,success:function(e){if(e["status"]==="success"){var t=e["balloon_id"]+"_status";document.getElementById(t).innerHTML="<span style='color: green;'>Tied</span>"}else{alert("error..check the status of the balloon after refreshing")}},error:function(e){alert("Error")}})});$(".refresh").click(function(){var e="/api/balloons/fill/"+$(this).attr("data-contest");var t="/balloons/"+$(this).attr("data-contest");cAjax({type:"GET",url:e,success:function(e){window.location.href=t},error:function(e){alert("Error")}})})});function map_language(e){var t={1:"cpp",27:"cpp",10:"java",11:"c",34:"c",29:"php",4:"python",116:"python",99:"python",2:"pas",22:"pas",17:"ruby",3:"perl",12:"brainfuck",35:"js"};if(typeof t[e]!="undefined"){window.frames["frame_edit-program"].document.getElementById("syntax_selection").value=t[e];window.frames["frame_edit-program"].editArea.execCommand("change_syntax",t[e])}else{window.frames["frame_edit-program"].document.getElementById("syntax_selection").value="cpp";window.frames["frame_edit-program"].editArea.execCommand("change_syntax",t[e])}}