// Settings:

var $removedItems,
    i = 1,
    count = 0,
    num = 0,
    rating_array = [],
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
    newDashboard = '<div class="dashboard new-dashboard" style="position: fixed;"><div class="module enhanced-media-thumbnails "><div class="flex-module media-thumbnails large recent_photos"><div class="directions-block"><h2>Directions for removing twitter followers:</h2><br><br><p>We need to scan all of your followers. Because you have ' + userFollowers + ' followers, this will take about ' + Math.floor( userFollowers*.01 ) + ' minutes.</p><br><button class="btn" id="start-scan">Click here to get started!</button></div></div></div></div>'



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

function setRed(num, rating) {

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[1]+1;
    if (rating < 2.5) {
      $currItem
        .css({'background-color' : '#f2dede' , 'border' : '1px solid #eed3d7' , 'position' : 'relative'})
        .append('<button class="btn noblock" data-ratingID="' + num + '" style="position: absolute; top: 9px; right: -138px;"><span>Don\'t block me!</span></button>');
    }
  });

  // If user clicks on the "Don't block" button, this will change the rating
  $('button.noblock').click(function(){
    var changeID = $(this).attr('data-ratingID'),
        changeID = parseInt( changeID.replace(/,/g, "") );

    rating_array[changeID][0] = 99999;

    $(this)
      .text('Unblocked')
      .parent().css({'background-color' : 'white' , 'border' : '1px solid #e8e8e8'})
  });
}

function deleteFollower(limit) {
  THEcounter = 0;
  $('.popover').remove();

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[1]+1;

    if (rating < limit) {
      THEcounter++;
      $currItem = $('#stream-items-id div.stream-item:nth-child(' + itentifier + ')')
      // $currItem
      //   .find('.user-dropdown .dropdown-menu .block-text').trigger('click')
      //   .find('.follow-button .unblock-text').trigger('click')
      $currItem.css('background','blue');

      $('.fake-count-down').text(THEcounter);
    }
  });
};

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

    if ( 60 === i ) { // item_length
      $("html, body").animate({ scrollTop: $(document).height() }, "fast", function(){
        item_length = $('#stream-items-id div.stream-item').length;
          if ( 60 === i ) {
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
      .append('<h2>Now to remove your fake follwers!</h2><br><p style="font-weight: bold;">You have <span class="fake-count">' + numFake + '</span> fake followers!</p><br><p>Scroll down the list on the right, you\'ll see that all fake followers are highlighted in red. If any of these followers where wrongly marked as fake, just click on the "Don\'t block me" button then move on to step two.</p><br><p><strong>Last step!</strong> Now that we\'ve selected the fake followers, click this button to remove them:</p><br><br><button class="btn" id="delete-followers">Delete fake followers</button><br> ').fadeIn(); // Inserts directions for next step.

    $('#delete-followers').click(function(){
    $('body').append('<div style="position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;background-color: rgba(62, 62, 62, 0.6);" class="popover"></div><div style="z-index: 1000000;position: absolute;left: 30%;width: 400px;padding: 30px 10px;min-height: 175px;margin: 100px auto 0px;text-align: center;background-color: white;" class="wait-box"><h1>Removed <span id="fake-count-down">0</span> followers out of ' + numFake +'</h1></div>')
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











