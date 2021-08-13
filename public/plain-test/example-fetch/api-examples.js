 // fetch("https://api.hackclub.com/v1/users/auth", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
  //     "authorization": "Bearer feb5896b2eb767e5f6051634c24243b9a734eb1fd6a37ce6cafd6a957c1ca735",
  //     "content-type": "application/json",
  //     "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://apply.hackclub.com/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": "{\"email\":\"leo+hack+new@hackclub.com\"}",
  //   "method": "POST",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

  // {"id":29106,"email":"leo+hack+new@hackclub.com","status":"login code sent"}

  // fetch("https://api.hackclub.com/v1/users/29106/exchange_login_code", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
  //     "authorization": "Bearer feb5896b2eb767e5f6051634c24243b9a734eb1fd6a37ce6cafd6a957c1ca735",
  //     "content-type": "application/json",
  //     "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://apply.hackclub.com/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": "{\"login_code\":\"283590\"}",
  //   "method": "POST",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

  // {"errors":{"login_code":["invalid"]}}

  // fetch("https://api.hackclub.com/v1/new_club_applications/15328/submit", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
  //     "authorization": "Bearer 79b8388fdc1a00a5f55eafe5dd36c2d3ad0729fa38888dd6de5334e5f097451c",
  //     "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://apply.hackclub.com/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": null,
  //   "method": "POST",
  //   "mode": "cors",
  //   "credentials": "include"
  // });

  // {"id":15328,"created_at":"2021-08-11T18:01:14.378Z","updated_at":"2021-08-11T18:07:58.217Z","high_school_name":"safd","high_school_url":"fadafd","high_school_type":"public_school","high_school_address":"fafds","high_school_latitude":"41.6822756","high_school_longitude":"-91.5960643","high_school_parsed_address":"Coralville, IA 52241, USA","high_school_parsed_city":"Coralville","high_school_parsed_state":"Iowa","high_school_parsed_state_code":"IA","high_school_parsed_postal_code":"52241","high_school_parsed_country":"United States","high_school_parsed_country_code":"US","leaders_team_origin_story":"fdsafdas","progress_general":null,"progress_student_interest":null,"progress_meeting_yet":null,"idea_why":"fdasfdsafdsa","idea_other_coding_clubs":"fdasfdsafs","idea_other_general_clubs":"fdsafdsafdsafds","formation_registered":"no","formation_misc":"No","other_surprising_or_amusing_discovery":"I don't learn.","curious_what_convinced":"information","curious_how_did_hear":"the news","point_of_contact_id":29106,"submitted_at":"2021-08-11T18:07:58.209Z","interviewed_at":null,"interview_duration":null,"rejected_at":null,"accepted_at":null,"leader_profiles":[{"id":17988,"created_at":"2021-08-11T18:01:14.381Z","updated_at":"2021-08-11T18:07:45.174Z","completed_at":"2021-08-11T18:07:45.173Z","user":{"id":29106,"email":"leo+hack+new@hackclub.com"}}]}

  // fetch("https://api.hackclub.com/v1/new_club_applications/15328/submit", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //   "referrer": "https://apply.hackclub.com/",
  //   "referrerPolicy": "strict-origin-when-cross-origin",
  //   "body": null,
  //   "method": "OPTIONS",
  //   "mode": "cors",
  //   "credentials": "omit"
  // });

  // {"id":15328,"created_at":"2021-08-11T18:01:14.378Z","updated_at":"2021-08-11T18:07:58.217Z","high_school_name":"safd","high_school_url":"fadafd","high_school_type":"public_school","high_school_address":"fafds","high_school_latitude":"41.6822756","high_school_longitude":"-91.5960643","high_school_parsed_address":"Coralville, IA 52241, USA","high_school_parsed_city":"Coralville","high_school_parsed_state":"Iowa","high_school_parsed_state_code":"IA","high_school_parsed_postal_code":"52241","high_school_parsed_country":"United States","high_school_parsed_country_code":"US","leaders_team_origin_story":"fdsafdas","progress_general":null,"progress_student_interest":null,"progress_meeting_yet":null,"idea_why":"fdasfdsafdsa","idea_other_coding_clubs":"fdasfdsafs","idea_other_general_clubs":"fdsafdsafdsafds","formation_registered":"no","formation_misc":"No","other_surprising_or_amusing_discovery":"I don't learn.","curious_what_convinced":"information","curious_how_did_hear":"the news","point_of_contact_id":29106,"submitted_at":"2021-08-11T18:07:58.209Z","interviewed_at":null,"interview_duration":null,"rejected_at":null,"accepted_at":null,"leader_profiles":[{"id":17988,"created_at":"2021-08-11T18:01:14.381Z","updated_at":"2021-08-11T18:07:45.174Z","completed_at":"2021-08-11T18:07:45.173Z","user":{"id":29106,"email":"leo+hack+new@hackclub.com"}}]}


  // fetch("https://api.hackclub.com/v1/new_club_applications/15329", {
  //   "headers": {
  //       "accept": "*/*",
  //       "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
  //       "authorization": "Bearer 35e26a03eea11d34c87fa9a9e486433c27e405d667d0667a9ccf09c9333033c0",
  //       "content-type": "application/json",
  //       "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
  //       "sec-ch-ua-mobile": "?0",
  //       "sec-fetch-dest": "empty",
  //       "sec-fetch-mode": "cors",
  //       "sec-fetch-site": "same-site"
  //     },
  //     "referrer": "https://apply.hackclub.com/",
  //     "referrerPolicy": "strict-origin-when-cross-origin",
  //     "body": "{\"id\":15329,\"created_at\":\"2021-08-11T18:26:49.658Z\",\"updated_at\":\"2021-08-11T18:26:49.658Z\",\"high_school_name\":\"fffff\",\"high_school_url\":null,\"high_school_type\":null,\"high_school_address\":null,\"high_school_latitude\":null,\"high_school_longitude\":null,\"high_school_parsed_address\":null,\"high_school_parsed_city\":null,\"high_school_parsed_state\":null,\"high_school_parsed_state_code\":null,\"high_school_parsed_postal_code\":null,\"high_school_parsed_country\":null,\"high_school_parsed_country_code\":null,\"leaders_team_origin_story\":null,\"progress_general\":null,\"progress_student_interest\":null,\"progress_meeting_yet\":null,\"idea_why\":null,\"idea_other_coding_clubs\":null,\"idea_other_general_clubs\":null,\"formation_registered\":null,\"formation_misc\":null,\"other_surprising_or_amusing_discovery\":null,\"curious_what_convinced\":null,\"curious_how_did_hear\":null,\"point_of_contact_id\":29107,\"submitted_at\":null,\"interviewed_at\":null,\"interview_duration\":null,\"rejected_at\":null,\"accepted_at\":null,\"leader_profiles\":[{\"id\":17989,\"created_at\":\"2021-08-11T18:26:49.661Z\",\"updated_at\":\"2021-08-11T18:26:49.661Z\",\"completed_at\":null,\"user\":{\"id\":29107,\"email\":\"leo+test3@hackclub.com\"}}]}",
  //     "method": "PATCH",
  //     "mode": "cors",
  //     "credentials": "include"
  // });

  
  // {"id":15329,"created_at":"2021-08-11T18:26:49.658Z","updated_at":"2021-08-11T18:27:05.739Z","high_school_name":"fff","high_school_url":null,"high_school_type":null,"high_school_address":null,"high_school_latitude":null,"high_school_longitude":null,"high_school_parsed_address":null,"high_school_parsed_city":null,"high_school_parsed_state":null,"high_school_parsed_state_code":null,"high_school_parsed_postal_code":null,"high_school_parsed_country":null,"high_school_parsed_country_code":null,"leaders_team_origin_story":null,"progress_general":null,"progress_student_interest":null,"progress_meeting_yet":null,"idea_why":null,"idea_other_coding_clubs":null,"idea_other_general_clubs":null,"formation_registered":null,"formation_misc":null,"other_surprising_or_amusing_discovery":null,"curious_what_convinced":null,"curious_how_did_hear":null,"point_of_contact_id":29107,"submitted_at":null,"interviewed_at":null,"interview_duration":null,"rejected_at":null,"accepted_at":null,"leader_profiles":[{"id":17989,"created_at":"2021-08-11T18:26:49.661Z","updated_at":"2021-08-11T18:26:49.661Z","completed_at":null,"user":{"id":29107,"email":"leo+test3@hackclub.com"}}]}
