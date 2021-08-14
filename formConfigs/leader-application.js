export const leaderApplication = [
  {
    sectionName: "Leader",
    questions: [
      {
        key: "name",
        text: "Full Name",
        type: ["input"] 
      },
      {
        key: "birthday",
        text: "Birthday",
        type: ["date"] 
      },
      {
        key: "class_year",
        text: "Year in School",
        type: ["options", { choices: ["freshman", "sophomore", "junior", "senior"] }] 
      },
      {
        key: "phone",
        text: "Phone Number",
        hint: "(Include country code if not in the United States)",
        type: ["input"] 
      },
      {
        key: "address",
        text: "Your full address",
        hint: "(for stickers!)",
        type: ["textarea"] 
      }
    ]
  },
  {
    sectionName: "Stats",
    questions: [
      {
        key: "gender",
        text: "Gender",
        hint: "",
        type: ["options", { choices: ["male", "female", "other"] }] 
      },
      {
        key: "ethnicity",
        text: "Ethnicity",
        hint: "",
        type: ["options", { choices: ["white", "black", "hispanic_or_latino", "native_american", "asian", "other"] }] 
      },
    ]
  },
  {
    sectionName: "Presence",
    questions: [
      {
        key: "website",
        text: "Personal Website Link",
        hint: "(optional)",
        type: ["input"]
      },
      {
        key: "github",
        text: "Github Link",
        hint: "(optional)",
        type: ["input"]
      },
    ]
  },
  {
    sectionName: "Skills",
    questions: [
      {
        key: "made",
        text: "Tell us about something you made which was personally meaningful to you?",
        hint: "(include links and links to images if possible)",
        type: ["textarea", { words: 100 }]
      },
      {
        key: "different",
        text: "Do you already know how to code?",
        hint: "(It's okay if not!)",
        type: ["options", { choices: ["yes", "no"] }] 
      }
    ]
  },
  {
    sectionName: "Bonus",
    questions: [
      {
        key: "bonus",
        text: "Make something! Our clubs lead Leo McElroy has been deeply influenced by this little drawing tool called the Turtle. You can tell it to move around with these commands. Play around with it and draw a picture.",
        hint: "",
        type: ["textarea"] 
      }
    ]
  }
]












