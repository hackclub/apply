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
    hint: "Demographic stats are collected to share in aggregate with donors and will not be used as part of application review.",
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
        type: ["input", { placeholder: "https://" }]
      },
      {
        key: "github",
        text: "Github Link",
        hint: "(optional)",
        type: ["input", { placeholder: "https://" }]
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
        key: "learned",
        text: "What's something interesting you learned recently?",
        hint: "(It doesn't have to be about coding!)",
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












