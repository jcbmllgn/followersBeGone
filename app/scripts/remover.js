// Settings:

 $('head').append('<link rel="stylesheet" href="css/style2.css" />');

var $removedItems,
    userFollowers   = $('.profile-card').find("[data-nav='followers'] strong").text(),
    userFollowers   = parseInt( userFollowers.replace(/,/g, "") ),
    newDashboard = '<div class="dashboard new-dashboard"><div class="module enhanced-media-thumbnails "><div class="flex-module media-thumbnails large recent_photos"><h2>All directions for removing twitter followers will be here:</h2><p>First, scan all of your followers, because you have ' + userFollowers + ' followers, this will take about ' + Math.floor( userFollowers*.01 ) + ' minutes.</p></div></div></div>'

/* Template:
<div style="width: 300px;float: left;" class="module enhanced-media-thumbnails "><div class="flex-module media-thumbnails large recent_photos">#####</div></div>

*/


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





