// Copy everything in this text area. Script begins on the next line:
var limit = 1.5,
    $removedItems,
    i = 0,
    num = 0,
    r = 0,
    count = 0,
    rating_array = [],
    followers = 0,
    numFake = 0,
    $soFar,
    $item,
    $numLeft,
    endEarly = false,
    following = 0,
    userFollowers = $('.profile-card').find("[data-nav='followers'] strong").text(),
    userFollowers = parseInt( userFollowers.replace(/,/g, "") ),
    upperLimit = userFollowers * .95,
    userTweets = $('.profile-card').find("[data-element-term='tweet_stats'] strong").text(),
    userTweets = parseInt( userTweets.replace(/,/g, "") ),
    userFollowing = $('.profile-card').find("[data-element-term='following_stats'] strong").text(),
    userFollowing = parseInt( userFollowing.replace(/,/g, "") ),
    rating = 0,
    $currItem,
    scanLeft = userFollowers,
    newDashboard = '<div class="dashboard new-dashboard" style="position: fixed;"><div class="module enhanced-media-thumbnails "><div class="flex-module media-thumbnails large recent_photos"><div class="directions-block"><h2>Directions for removing twitter followers:</h2><br><p>We need to scan all of your followers to see which are fake and real.</p><br><button class="btn" id="start-scan">Click here to get started!</button><br><br><p style="font-size: 12px;">Because you have ' + userFollowers + ' followers, this will take about ' + Math.floor( userFollowers*.0125 ) + ' minutes.</p></div></div></div></div>'


// Thanks for taking a peak at the code, if you have any questions or suggestions, shoot me an email at jacobdmulligan@gmail.com


function checkRating(item_id) {
  return rating_array[item_id][0];
}

function setRating(i, newClass) {
  rating = parseInt(followers)/parseInt(following)*parseInt(tweets);

  if (parseInt(tweets) > 200 || parseInt(followers) > 400) {
    rating = 100000;
  }


  if(rating < limit) {
    rating_array.push([rating,numFake,num]);
    setRed(num, numFake);
    numFake++;
  }

  num++;
  scanLeft--;
  if (scanLeft <= 1) {
    endEarly = true;
    $('#follower-tracker').fadeOut();
  }
  update(numFake, scanLeft);
}

function update(numFake, scanLeft) {
  $soFar.text(numFake);
  $numLeft.text(scanLeft);
}

function setRed(num,numFake) {

  $('#stream-items-id div.stream-item:nth-child(' + num + ')')
    .css({'background-color' : '#f2dede' , 'border' : '1px solid #eed3d7' , 'position' : 'relative'})
    .addClass('setRed' + numFake)
    .append('<button class="btn noblock" data-ratingID="' + numFake + '" style="position: absolute; top: 9px; right: 10px;"><span>Don\'t remove me!</span></button>');

  // If user clicks on the "Don't block" button, this will change the rating
  $('button.noblock').click(function(){
    var changeID = $(this).attr('data-ratingID'),
        changeID = parseInt( changeID.replace(/,/g, "") );

    rating_array[changeID][0] = 99999;

    $(this)
      .removeClass('btn noblock')
      .text('Will not be blocked')
      .parent().css({'background-color' : 'white' , 'border' : '1px solid #e8e8e8'})
  });
}

function deleteFollower(limit) {
  $('.popover').remove();

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[2];

    if (rating < limit) {
      $currItem = $('#stream-items-id div.stream-item:nth-child(' + itentifier + ')');
      $currItem // Comment these lines out for testing!
        .find('.user-dropdown .dropdown-menu .block-text').trigger('click')
        .find('.follow-button .unblock-text').trigger('click')
      $currItem.css('background','red');
    }
  });

  postDeletion();
};

function postDeletion() {
  $('.directions-block')
    .fadeOut().empty()
    .append('<h2><span class="fake-count">' + numFake + '</span> fake followers deleted!</h3><br><p>Those dasterdly fake followers are now gone for good! Thanks for using this script, I\'d be humbuled if you <a href="http://twitter.com/jcbmllgn">follow me on twitter</a> or if you tweeted about this tool:<br><br></p><a href="http://FollowersBeGone.com>FollowersBeGone</a>:<br><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://FollowersBeGone.com" data-text="Remove your fake twitter followers with FollowersBeGone.com!" data-via="jcbmllgn">FollowersBeGone</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><br><br><a href="#" onclick="location.reload();">Click to reload page</a><br><a target="_blank" href="https://github.com/jcbmllgn/followersBeGone">View source on Github</a><br><a href="mailto:jacobdmulligan@gmail.com">Email me</a><p>-Jacob</p>').fadeIn(); // Inserts directions for next step.
  $('.noblock').removeClass('btn').text('No longer follows you');


  // load iframe that trackes stats: number of followers you have, fake followers that I found, fake followers that you actually deleted, how many followers you have, how many times you've tweeted
  // Your twitter handle is not being tracked!

  $('body').append('<iframe style="opacity: 0; width:1px; height:1px; position:absolute; bottom:0px;" src="http://followersBeGone.com/tracker.php?user_followers=' + userFollowers + '&user_tweets=' + userTweets +'&user_following=' + userFollowing + '&num_fake=' + numFake + '&num_deleted=' + numFake +'"></iframe>');
}


function checkVariable(i, newClass) {

  var a = $('.profile-modal .profile-modal-header');
  if (a) {
    tweets      = $('#profile_popup').find("[data-nav='profile'] strong").text(),
    tweets      = parseInt( tweets.replace(/,/g, "") ),
    following   = $('#profile_popup').find("[data-nav='following'] strong").text(),
    following   = parseInt( following.replace(/,/g, "") ),
    followers   = $('#profile_popup').find("[data-nav='followers'] strong").text(),
    followers   = parseInt( followers.replace(/,/g, "") );

    if( newClass && following > 1 || followers > 1 ){
      setRating(i);
    } else {
      setTimeout("checkVariable()" , 100); // call myself again in 50 msecs
    }
  }
  else {
      setTimeout("checkVariable()" , 100); // call myself again in 50 msecs
  }
};


function followerScan (num_scan) {

  $('#end-scan').click(function(){
    $('#follower-tracker').fadeOut();
    endEarly = true;
  });

   setTimeout(function () {
    newClass = 'count' + i;
    $currItem = $('#stream-items-id .stream-item:nth-child(' + i + ')');
    var item_length = $('#stream-items-id div.stream-item').length;

    $currItem
      .find('strong.fullname').trigger('click')
      .addClass(newClass);

    setTimeout("checkVariable(i, newClass)" , 100);

    if( i >= item_length-15 ){
      $('#stream-items-id div.stream-item').find('.user-actions').css('opacity' , '0');
      $("html, body").animate({ scrollTop: $(document).height() }, "fast");
    }

    if ( upperLimit === i || endEarly === true) {
      deleteStep();
    } else {
      followerScan();
    }
    i++;
   }, 275)
}

function deleteStep() {
  $("html, body").animate({ scrollTop: 0 }, "slow", function(){
    $('.close-modal-background-target').trigger('click');
    $('.directions-block')
      .fadeOut().empty()
      .append('<h2>You have <span class="fake-count">' + numFake + '</span> fake followers!</h2><br><p>Scroll down the list on the right and you\'ll see that all fake followers are highlighted in red. If any of these followers where wrongly marked as fake, just click on the "Don\'t block me" button then move on.</p><br><p>Now that we\'ve selected the fake followers, click this button to remove them, note that this CANNOT be undone!</p><br><br><button class="btn primary-btn" id="delete-followers">Delete fake followers</button><br><br><p style="font-style: italic;">Depending on the number of followers you have, this may take up to a couple minutes to process!</p>').fadeIn(); // Inserts directions for next step.

    $('#delete-followers').click(function(){
      deleteFollower(limit);
    });
  });
}

function makeDashboard() {
  // remove old dashboard:
  $removedItems = $('.dashboard').addClass('removed-dashboard');
  $removedItems.fadeOut();

  // Insert new dashboard:
  $('.dashboard').after(newDashboard);
}

function undoDashboard() {
  $removedItems.fadeId();
}

makeDashboard();

$('#start-scan').click(function(){
  $('body').append('<div style="position: fixed;top: 60px;right: 50px;z-index:999999;font-weight: bold;color: white;background: #3e3e3e;padding: 20px;font-size: 20px;" id="follower-tracker"><p><span class="soFar">0</span> fake followers so far.</p><br><br><p>Followers left to scan: <span class="numLeft">' + userFollowers + '</span></p><br><br><button class="btn" id="end-scan">Click here to end scan early</button><br><br><p style="font-size:14px;font-weight:normal;">If the scan starts slowing down, you can<br>end it early, delete current fake followers,<br>then rescan..</p></div>');
  $soFar = $('#follower-tracker span.soFar');
  $numLeft = $('#follower-tracker span.numLeft');
  followerScan(50);
});


// Thanks for taking a peak at the code, if you have any questions or suggestions, shoot me an email at jacobdmulligan@gmail.com
