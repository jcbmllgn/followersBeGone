var i = 1,
    count = 0,
    num = 0,
    rating_array = [],
    followers = 0,
    following = 0,
    userFollowers = $('.profile-card').find("[data-nav='followers'] strong").text(),
    userFollowers = parseInt( userFollowers.replace(/,/g, "") ),
    rating = 0,
    THEcounter=0,
    $currItem;

function checkRating(item_id) {
  return rating_array[item_id][0];
}

function setRating(i, newClass) {
  // alert('My Followers: ' + followers + '. Following: ' + following + '. Tweets: ' + tweets );

  rating = parseInt(followers)/parseInt(following)*parseInt(tweets);

  rating_array.push([rating,num,username]);

  num++;
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
      // alert('no loaded')
  }
};

function followerScan () {
   setTimeout(function () {
    newClass = 'count' + i;
    var $currItem = $('#stream-items-id div.stream-item:nth-child(' + i + ')'),
        item_length = $('#stream-items-id div.stream-item').length;

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

    if ( 90 === i ) { // item_length
      $("html, body").animate({ scrollTop: $(document).height() }, "fast", function(){
        item_length = $('#stream-items-id div.stream-item').length;
          if ( 90 === i ) {
            alert('done. item_length: ' + item_length + ' and i: ' + i );
          } else {
            followerScan();
          }
      });
    } else {
      followerScan();
    }

   }, 550)
}

followerScan();


function deleteFollower(limit) {

  THEcounter = 0;

  $.each(rating_array, function() {
    rating = this[0];
    itentifier = this[1]+1;

    if (rating < limit) {
      THEcounter++;
      $('#stream-items-id div.stream-item:nth-child(' + itentifier + ') .user-dropdown .dropdown-menu .block-text').trigger('click');
      $('#stream-items-id div.stream-item:nth-child(' + itentifier + ') .follow-button .unblock-text').trigger('click');

      // $('#stream-items-id div.stream-item:nth-child(' + itentifier + ')').css('background','blue');
    }
  });
};

deleteFollower(2.5);

      // This will delete a user:
      // $('#stream-items-id div.stream-item:nth-child(' + itentifier + ') .user-dropdown .dropdown-menu .block-text').trigger('click');


























