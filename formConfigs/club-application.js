export const clubApplication = [
  {
    sectionName: "Leaders",
    questions: [
      {
        key: "leaders_team_origin_story",
        text: "How long have you known your other club leaders and how did you meet?",
        hint: "",
        optional: true,
        type: ["textarea", { words: 40 }]
      }
    ]
  },
  {
    sectionName: "Venue",
    questions: [
      {
        key: "high_school_name",
        text: "Where are you planning to run your Hack Club?",
        hint: "(Give us the name and type. It can be a high school, makerspace, or something else.)",
        type: ["input"] 
      },
      {
        key: "high_school_address",
        text: "What's the full address?",
        hint: "(Please include city, state/province, country, and postal code.)",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Idea",
    questions: [
      {
        key: "idea_why",
        text: "Why do you want to start a Hack Club?",
        hint: "",
        type: ["textarea", { words: 75 }]
      },
      {
        key: "idea_other_coding_clubs",
        text: "What will your club do and what would a successful club look like?",
        hint: "",
        type: ["textarea", { words: 75 }] 
      },
      {
        key: "idea_other_general_clubs",
        text: "What do you personally hope to get out of Hack Club?",
        hint: "",
        type: ["textarea", { words: 75 }] 
      }
    ]
  },
  {
    sectionName: "Formation",
    questions: [
      {
        key: "formation_registered",
        text: "What steps have you taken to start your club?",
        hint: "(have you registered with your school, taken interest surveys, identified a sponsor, etc.)",
        type: ["textarea"]
      },
      {
        key: "different",
        text: "Has your school had coding clubs before? What’s going to be new about your Hack Club?",
        hint: "",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Curious",
    questions: [
      {
        key: "other_surprising_or_amusing_discovery",
        text: "What is something surprising or amusing you learned recently?",
        hint: "(have you registered with your school, taken interest surveys, identified a sponsor, etc.)",
        type: ["textarea"]
      },
      {
        key: "point_of_contact_id",
        text: "How did you hear about Hack Club?",
        hint: "(i.e. from a friend, event, teacher, website, twitter)",
        type: ["textarea", { words: 50 }] 
      }
    ]
  }
]