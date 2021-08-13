export const clubApplication = [
  {
    sectionName: "Leaders",
    questions: [
      {
        id: "leaders_team_origin_story",
        q: "How long have you known your other club leaders and how did you meet?",
        hint: "(optional)",
        type: ["textarea", { words: 100 }] 
      }
    ]
  },
  {
    sectionName: "Venue",
    questions: [
      {
        id: "high_school_name",
        q: "Where are you planning to run your Hack Club?",
        hint: "(Give us the name and type. It can be a high school, makerspace, or something else.)",
        type: ["input"] 
      },
      {
        id: "high_school_address",
        q: "What's the full address?",
        hint: "(Please include city, state/province, country, and postal code.)",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Idea",
    questions: [
      {
        id: "idea_why",
        q: "Why do you want to start a Hack Club?",
        hint: "",
        type: ["textarea", { words: 75 }]
      },
      {
        id: "idea_other_coding_clubs",
        q: "What will your club do and what would a successful club look like?",
        hint: "",
        type: ["textarea", { words: 75 }] 
      },
      {
        id: "idea_other_general_clubs",
        q: "What do you personally hope to get out of Hack Club?",
        hint: "",
        type: ["textarea", { words: 75 }] 
      }
    ]
  },
  {
    sectionName: "Formation",
    questions: [
      {
        id: "formation_registered",
        q: "What steps have you taken to start your club?",
        hint: "(have you registered with your school, taken interest surveys, identified a sponsor, etc.)",
        type: ["textarea"]
      },
      {
        id: "different",
        q: "Has your school had coding clubs before? What’s going to be new about your Hack Club?",
        hint: "",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Curious",
    questions: [
      {
        id: "other_surprising_or_amusing_discovery",
        q: "What is something surprising or amusing you learned recently?",
        hint: "(have you registered with your school, taken interest surveys, identified a sponsor, etc.)",
        type: ["textarea"]
      },
      {
        id: "point_of_contact_id",
        q: "How did you hear about Hack Club?",
        hint: "(i.e. from a friend, event, teacher, website, twitter)",
        type: ["textarea", { words: 50 }] 
      }
    ]
  }
]