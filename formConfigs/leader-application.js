export const leaderApplication = [
  {
    sectionName: "Leader",
    questions: [
      {
        id: "name",
        q: "Full Name",
        hint: "",
        type: ["input"] 
      },
      {
        id: "birthday",
        q: "Birthday",
        hint: "(day, month, year)",
        type: ["input"] 
      },
      {
        id: "class_year",
        q: "Year in School",
        hint: "options",
        type: ["options", { choices: ["freshman", "sophomore", "junior", "senior"] }] 
      },
      {
        id: "phone",
        q: "Phone Number",
        hint: "(Include country code if not in United States)",
        type: ["input"] 
      },
      {
        id: "address",
        q: "Your full adress",
        hint: "(for stickers!)",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Stats",
    questions: [
      {
        id: "gender",
        q: "Gender",
        hint: "",
        type: ["options", { choices: ["male", "female", "other"] }] 
      },
      {
        id: "ethnicity",
        q: "Ethnicity",
        hint: "",
        type: ["options", { choices: ["white", "black", "hispanic_or_latino", "native_american", "asian", "other"] }] 
      },
    ]
  },
  {
    sectionName: "Presence",
    questions: [
      {
        id: "website",
        q: "Personal Website Link",
        hint: "(optional)",
        type: ["input"]
      },
      {
        id: "github",
        q: "Github Link",
        hint: "(optional)",
        type: ["input"]
      },
    ]
  },
  {
    sectionName: "Skills",
    questions: [
      {
        id: "made",
        q: "Tell us about something you made which was personally meaningful to you?",
        hint: "(include links and links to images if possible)",
        type: ["textarea", { words: 100 }]
      },
      {
        id: "different",
        q: "Do you already know how to code?",
        hint: "(It's okay if not!)",
        type: ["options", { choices: ["yes", "no"] }] 
      }
    ]
  },
  {
    sectionName: "Bonus",
    questions: [
      {
        id: "bonus",
        q: "Make something! Our clubs lead Leo McElroy has been deeply influenced by this little drawing tool called the Turtle. You can tell it to move around with these commands. Play around with it and draw a picture.",
        hint: "",
        type: ["textarea"] 
      }
    ]
  }
]












