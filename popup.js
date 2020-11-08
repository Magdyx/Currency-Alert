// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

document.getElementById("submit").addEventListener("click", function() {
  var curr_from = document.getElementById("from").value;
  var curr_to = document.getElementById("to").value;
  var curr_limit = document.getElementById("limit").value;
  chrome.storage.sync.set({curr_from: curr_from});
  chrome.storage.sync.set({curr_to: curr_to});
  chrome.storage.sync.set({curr_limit: curr_limit});
});
