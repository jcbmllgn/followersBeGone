// Settings:

var limit = 60,
    $removedItems,
    i = 1,
    count = 0,
    num = 1,
    rating_array = [[0,0]],
    followers = 0,
    numFake = 0,
    following = 0,
    userFollowers = $('.profile-card').find("[data-nav='followers'] strong").text(),
    userFollowers = parseInt( userFollowers.replace(/,/g, "") ),
    rating = 0,
    THEcounter=0,
    $currItem,
    userFollowers   = $('.profile-card').find("[data-nav='followers'] strong").text(),
    userFollowers   = parseInt( userFollowers.replace(/,/g, "") ),
    newDashboard = '<div class="dashboard new-dashboard" style="position: fixed;"><div class="module enhanced-media-thumbnails "><div class="flex-module media-thumbnails large recent_photos"><div class="directions-block"><h2>Directions for removing twitter followers:</h2><br><p>We need to scan all of your followers to see which are fake and real.</p><br><button class="btn" id="start-scan">Click here to get started!</button><br><br><p style="font-size: 12px;">Because you have ' + userFollowers + ' followers, this will take about ' + Math.floor( userFollowers*.01 ) + ' minutes.</p></div></div></div></div>'



function checkRating(item_id) {
  return rating_array[item_id][0];
}

function setRating(i, newClass) {
  rating = parseInt(followers)/parseInt(following)*parseInt(tweets);

  rating_array.push([rating,num,username]);

  setRed(num, rating);

  if(rating < 2.5) {
    numFake++;
  }

  num++;
}

function setRed() {

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[1];
    var $item = $('#stream-items-id div.stream-item:nth-child(' + itentifier + ')');
    $item.find('user-actions').css('opacity' , '0')
    if (rating < 2.5 && !$item.hasClass('setRed')) {
      $item
        .css({'background-color' : '#f2dede' , 'border' : '1px solid #eed3d7' , 'position' : 'relative'})
        .addClass('setRed')
        .append('<button class="btn noblock" data-ratingID="' + itentifier + '" style="position: absolute; top: 9px; right: 10px;"><span>Don\'t remove me!</span></button>');
    }
  });

  // If user clicks on the "Don't block" button, this will change the rating
  $('button.noblock').click(function(){
    var changeID = $(this).attr('data-ratingID'),
        changeID = parseInt( changeID.replace(/,/g, "") );

    rating_array[changeID][0] = 99999;

    $(this)
      .removeClass('btn noblock')
      .text('Unblocked')
      .parent().css({'background-color' : 'white' , 'border' : '1px solid #e8e8e8'})
  });
}

function deleteFollower(limit) {
  THEcounter = 0;
  $('.popover').remove();

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[1];

    if (rating < limit) {
      THEcounter++;
      $currItem = $('#stream-items-id div.stream-item:nth-child(' + itentifier + ')')
      // $currItem
      //   .find('.user-dropdown .dropdown-menu .block-text').trigger('click')
      //   .find('.follow-button .unblock-text').trigger('click')
      $currItem.css('background','red');

      $('.fake-count-down').text(THEcounter);
    }
  });

  postDeletion();
};

function postDeletion() {
  $('.directions-block')
    .fadeOut().empty()
    .append('<h2><span class="fake-count">' + numFake + '</span> fake followers deleted!</h3><br><p>Those dasterdly fake followers are now gone for good! Thanks for using this script, I\'d be humbuled if you <a href="http://twitter.com/jcbmllgn">follow me on twitter</a> or if you tweeted about this tool:<br><br></p><a href="http://FollowersBeGone.com>FollowersBeGone</a>:<br><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://FollowersBeGone.com" data-text="Remove your fake twitter followers with FollowersBeGone.com!" data-via="jcbmllgn">FollowersBeGone</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><br><br><a href="#" onclick="location.reload();">Click to reload page</a><br><a target="_blank" href="https://github.com/jcbmllgn/followersBeGone">View source on Github</a><br><a href="mailto:jacobdmulligan@gmail.com">Email me</a><p>-Jacob</p>').fadeIn(); // Inserts directions for next step.
  $('.noblock').removeClass('btn').text('No longer follows you');
}

function checkVariable(i, newClass) {

  var a = $('.profile-modal .profile-modal-header');
  if (a) {
    tweets      = $('#profile_popup').find("[data-nav='profile'] strong").text(),
    tweets      = parseInt( tweets.replace(/,/g, "") ),
    following   = $('#profile_popup').find("[data-nav='following'] strong").text(),
    following   = parseInt( following.replace(/,/g, "") ),
    followers   = $('#profile_popup').find("[data-nav='followers'] strong").text(),
    followers   = parseInt( followers.replace(/,/g, "") ),
    username    = $('#profile_popup').find("h2.fullname a").text();

    if( newClass && following > 1 || followers > 1 ){
      setRating(i, newClass);
    } else {
      setTimeout("checkVariable()" , 200); // call myself again in 50 msecs
    }
  }
  else {
      setTimeout("checkVariable()" , 200); // call myself again in 50 msecs
  }
};

function followerScan (num_scan) {
   setTimeout(function () {
    newClass = 'count' + i;
    $currItem = $('#stream-items-id div.stream-item:nth-child(' + i + ')');
    var item_length = $('#stream-items-id div.stream-item').length;

    $currItem
      .find('strong.fullname').trigger('click')
      .addClass(newClass);

    tweets      = $('#profile_popup').find("[data-nav='profile'] strong").text(),
    tweets      = parseInt( tweets.replace(/,/g, "") ),
    following   = $('#profile_popup').find("[data-nav='following'] strong").text(),
    following   = parseInt( following.replace(/,/g, "") ),
    followers   = $('#profile_popup').find("[data-nav='followers'] strong").text()
    followers   = parseInt( followers.replace(/,/g, "") );

    setTimeout("checkVariable(i, newClass)" , 250);

    $("html, body").animate({ scrollTop: $(document).height() }, "fast");

    i++;

    if ( limit === i ) { // item_length
      $("html, body").animate({ scrollTop: $(document).height() }, "fast", function(){
        item_length = $('#stream-items-id div.stream-item').length;
          if ( limit === i ) {
            // alert('Scan is done, read the directions box for the next (and last) step.');
            deleteStep();
          } else {
            followerScan();
          }
      });
    } else {
      followerScan();
    }

   }, 550)
}

function deleteStep() {
  $("html, body").animate({ scrollTop: 0 }, "slow", function(){
    $('.close-modal-background-target').trigger('click');
    $('.directions-block')
      .fadeOut().empty()
      .append('<h2>You have <span class="fake-count">' + numFake + '</span> fake followers!</h2><br><p>Scroll down the list on the right and you\'ll see that all fake followers are highlighted in red. If any of these followers where wrongly marked as fake, just click on the "Don\'t block me" button then move on.</p><br><p>Now that we\'ve selected the fake followers, click this button to remove them, note that this CANNOT be undone!</p><br><br><button class="btn primary-btn" id="delete-followers">Delete fake followers</button><br><br><p style="font-style: italic;">Depending on the number of followers you have, this may take a couple minutes to process!</p>').fadeIn(); // Inserts directions for next step.

    $('#delete-followers').click(function(){
    // $('body').append('<div style="position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;background-color: rgba(62, 62, 62, 0.6);" class="popover"></div><div style="z-index: 1000000;position: absolute;left: 30%;width: 400px;padding: 30px 10px;min-height: 175px;margin: 100px auto 0px;text-align: center;background-color: white;" class="wait-box"><h1>Removed <span id="fake-count-down">0</span> followers out of ' + numFake +'</h1></div>')
      deleteFollower(2.5);
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
  followerScan(50);
});











