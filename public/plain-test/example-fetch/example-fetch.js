  fetch("https://api.hackclub.com/v1/new_club_applications/15329", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es;q=0.8,da;q=0.7",
        "authorization": "Bearer 35e26a03eea11d34c87fa9a9e486433c27e405d667d0667a9ccf09c9333033c0",
        "content-type": "application/json",
        "sec-ch-ua": "Chromium;v=92,  Not A;Brand;v=99, Google Chrome;v=92",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://apply.hackclub.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": {
          id:15329,
          created_at:"2021-08-11T18:26:49.658Z",
          updated_at:"2021-08-11T18:26:49.658Z",
          high_school_name:fffff,
          high_school_url:null,
          high_school_type:null,
          high_school_address:null,
          high_school_latitude:null,
          high_school_longitude:null,
          high_school_parsed_address:null,
          high_school_parsed_city:null,
          high_school_parsed_state:null,
          high_school_parsed_state_code:null,
          high_school_parsed_postal_code:null,
          high_school_parsed_country:null,
          high_school_parsed_country_code:null,
          leaders_team_origin_story:null,
          progress_general:null,
          progress_student_interest:null,
          progress_meeting_yet:null,
          idea_why:null,
          idea_other_coding_clubs:null,
          idea_other_general_clubs:null,
          formation_registered:null,
          formation_misc:null,
          other_surprising_or_amusing_discovery:null,
          curious_what_convinced:null,
          curious_how_did_hear:null,
          point_of_contact_id:29107,
          submitted_at:null,
          interviewed_at:null,
          interview_duration:null,
          rejected_at:null,
          accepted_at:null,
          leader_profiles:[
              {
                  id:17989,
                  created_at:"2021-08-11T18:26:49.661Z",
                  updated_at:"2021-08-11T18:26:49.661Z",
                  completed_at:null,
                  user: {
                      id:29107,
                      email:"leo+test3@hackclub.com"
                   }
              }
         ]
      },
      "method": "PATCH",
      "mode": "cors",
      "credentials": "include"
  });