
/**
  Copyright (c) 2016 Lukas Kollmer <lukas@kollmer.me> All Rights Reserved.
  Site: Google captcha page
  Purpose: disable autocomplete on the captchas Google shows when it thinks you're sending an automated search request
*/
$('#captcha').attr('autocomplete', 'off');
$('#captcha').attr('spellcheck',   'false');
$('#captcha').attr('autocorrect',  'off');