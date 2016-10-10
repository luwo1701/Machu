//JS for main activity here
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './video.html';
import { VideoJS } from 'meteor/yong:meteor-videojs';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
// Wait for the DOM to be loaded before initialising the media player

// Variables to store handles to various required elements
var dropDownStatus=false;
var chapterLocation=0;
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var videoPlaying=false;
var ChapterTime=[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190];

//document.addEventListener("DOMContentLoaded",bodyonCreated(); }, false);
//var progressBar;
Template.body.onRendered(function bodyonCreated(){	
	mediaPlayer=videojs('video');
	mediaPlayer.controls=false;

});
Template.chapters.onRendered(function bodyonCreated(){
//start without the menu or the down arrow	
	$('.selection').toggle();
	$('img.downArrow').toggle();
});

Template.play.events({
	'click, touchstart .video' : function(event){
		$('img.playarrow').addClass("enlarged");	
		//if video is not playing play it and change toggle flag
	},
	'click, touchend .video' : function(event){
		$('img.playarrow').removeClass("enlarged");	
			videoPlaying=true;
			mediaPlayer.play();
			console.log("play");
	}
});

Template.chapters.events({
	'click, touchstart .img.chapter, .skipTo' : function(event){

		//toggle boolean so we know when to populate dropdown
		dropDownStatus=!dropDownStatus;

		//removes all previously made chapters to make room for new ones		
		$('.selection').empty();
		
		var numChapters=6;
		$('.selection').toggle();
		if (chapterLocation==12){
			numChapters=7;
		}
		
		if (chapterLocation == 19){
			chapterLocation=0;
		}	
//if the dropdown is being selected 
	if(dropDownStatus){
		for (i=chapterLocation; i<chapterLocation+numChapters; i++){
			console.log(parseInt(i));	
			$("<li id='"+i.toString()+"'> Chapter" + (i+1).toString()+" </li>").appendTo('.selection');
			}
		
		//$('.selection').addClass(".img.downArrow");
		$("<li class='img.downArrow' src='http://www.clipartbest.com/cliparts/xig/K5G/xigK5GzRT.png'> </li>").appendTo('.selection');
		chapterLocation=chapterLocation+numChapters;
		}
	}
});
/*
Template.menu.events({
	'click, touchstart .selection':function(event){		
			console.log(document.getElementById(event.target.id));
			mediaPlayer.currentTime(parseInt(event.target.id));
			mediaPlayer.play();
			$(event.target.id).toggleClass("click");
			$(event.target.id).addClass("side-bar");
	}
});*/
