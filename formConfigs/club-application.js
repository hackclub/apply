
// type/description

// sectionName: string = ""
// hint: string = ""
// question
// {
//   name: string = ""
//   text: string = ""
//   hint: string = ""
//   optional: bool = false
//   type: 
//     [ "input", { placeholder: "" } ] 
//     [ "options", { choices: [] } 
//     [ "textarea", { words: 0, placeholder: "" } 
//     [ "jsx", (name) => <></> ]
// }

export const clubApplication = [
  {
    sectionName: "Leaders",
    questions: [
      {
        name: "leaders_team_origin_story",
        text: "How long have you known your other club leaders and how did you meet?",
        type: [ "textarea", { words: 50 } ]
      }
    ]
  },
  {
    sectionName: "Venue",
    questions: [
      {
        name: "high_school_name",
        text: "Where are you planning to run your Hack Club?",
        type: "input" 
      },
      {
        name: "high_school_type",
        text: "What type of venue is it?",
        hint: "(It can be a high school, makerspace, library, or something else.)",
        type: "input" 
      },
      {
        name: "high_school_address",
        text: "What's the full address?",
        hint: "(Please include city, state/province, country, and postal code.)",
        type: "textarea" 
      }
    ]
  },
  {
    sectionName: "Idea",
    questions: [
      {
        name: "idea_why",
        text: "Why do you want to start a Hack Club?",
        type: ["textarea", { words: 75 }]
      },
      {
        name: "idea_other_coding_clubs",
        text: "What will your club do and what would a successful club look like?",
        type: ["textarea", { words: 75 }] 
      },
      {
        name: "idea_hopes",
        text: "What do you personally hope to get out of Hack Club?",
        type: ["textarea", { words: 75 }] 
      }
    ]
  },
  {
    sectionName: "Formation",
    questions: [
      {
        name: "formation_registered",
        text: "What steps have you taken to start your club?",
        hint: "(have you registered with your school, taken interest surveys, identified a sponsor, etc.)",
        type: ["textarea", { words: 50 }]
      },
      {
        name: "formation_different",
        text: "Has your school had coding clubs before? What’s going to be new about your Hack Club?",
        type: ["textarea", { words: 50 }] 
      }
    ]
  },
  {
    sectionName: "Curious",
    questions: [
      {
        name: "curious_how_find",
        text: "How did you hear about Hack Club?",
        hint: "(i.e. from a friend, event, teacher, website, twitter)",
        type: "textarea" 
      }
    ]
  }
]