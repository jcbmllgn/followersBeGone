  <html>
  <head>
  <title>Query string </title>
  </head>
  <body>

<p>What are you doing here? - <a href="http://twitter.com.com/jcbmllgn">Jacob</a>.</p>

<?php

  $user_followers = $_GET["user_followers"];
  $user_tweets = $_GET['user_tweets'];
  $user_following = $_GET['user_following'];
  $num_fake = $_GET['num_fake'];
  $num_deleted = $_GET['num_deleted'];


  // mysql_connect("localhost", "root", "root") or die(mysql_error()); // local
  mysql_connect("localhost", "jcbmllgn_me", "bam124718") or die(mysql_error()); // live

  // Select database
  mysql_select_db("jcbmllgn_fbg") or die(mysql_error());

  // The SQL statement is built:
  $strSQL = "INSERT INTO main(user_followers, user_tweets, user_following, num_fake, num_deleted) VALUES($user_followers, $user_tweets, $user_following, $num_fake, $num_deleted)";

  // The SQL statement is executed
  mysql_query($strSQL) or die (mysql_error());

  // Close the database connection
  mysql_close();

?>


  </body>
  </html>