curl 'https://api.twilio.com/2010-04-01/Accounts/UR_ACCT_SID/Messages.json' -X POST \
--data-urlencode 'To=YOUR_TWIL_NUMBER' \
--data-urlencode 'From=+YOUR_FROM' \
--data-urlencode 'Body=Your Example Message verification code is: 4531' \
-u SID:AUTH

