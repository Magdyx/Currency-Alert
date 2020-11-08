// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//chrome.extension.getBackgroundPage().console.log("fff");

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.alarms.create("myAlarm", {delayInMinutes: 1, periodInMinutes: 1} );
});

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	chrome.storage.sync.get(["curr_from", "curr_to", "curr_limit"], function(result) {
		var q = result.curr_from + "_" + result.curr_to;
	  var response = httpGet("https://free.currconv.com/api/v7/convert?q=" + q + "&compact=ultra&apiKey=087a31cf3332555b63ac");
	  response = JSON.parse(response);
	  if (result.curr_limit < response[q]) {
	  	chrome.notifications.create('', {
		  title: 'Just wanted to notify you',
		  message: 'How great it is!',
		  iconUrl: '/images/get_started32.png',
		  type: 'basic'
		});
    	chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
    	chrome.browserAction.setBadgeText({text: "LE"});
    }
		else {
			chrome.browserAction.setBadgeText({text: ""});
		}

	});
});
