export const leaderApplication = [
  {
    sectionName: "Leader",
    questions: [
      {
        name: "name",
        text: "Full Name",
        type: "input"
      },
      {
        name: "birthday",
        text: "Birthday",
        type: "date" 
      },
      {
        name: "class_year",
        text: "Year in School",
        type: ["options", { choices: ["Freshman", "Sophomore", "Junior", "Senior"] }] 
      },
      {
        name: "phone",
        text: "Phone Number",
        hint: "(Include country code if not in the United States)",
        type: "input" 
      },
      {
        name: "address",
        text: "Your full address",
        hint: "(for stickers!)",
        type: "textarea"
      }
    ]
  },
  {
    sectionName: "Stats",
    hint: "Demographic stats are collected to share in aggregate with donors and will not be used as part of application review.",
    questions: [
      {
        name: "gender",
        text: "Gender",
        optional: true,
        type: ["options", { choices: ["Male", "Female", "Other"] }] 
      },
      {
        name: "ethnicity",
        text: "Ethnicity",
        optional: true,
        type: ["options", { choices: ["White", "Black", "Hispanic or Latino", "Native American", "Asian", "Other"] }] 
      },
    ]
  },
  {
    sectionName: "Presence",
    questions: [
      {
        name: "website",
        optional: true,
        text: "Personal Website Link",
        type: ["input", { placeholder: "https://" }]
      },
      {
        name: "github",
        optional: true,
        text: "Github Link",
        type: ["input", { placeholder: "https://" }]
      },
    ]
  },
  {
    sectionName: "Skills",
    questions: [
      {
        name: "made",
        text: "Tell us about something you made which was personally meaningful to you?",
        hint: "(include links and links to images if possible)",
        type: ["textarea", { words: 100 }]
      },
      {
        name: "learned",
        text: "What's something interesting you learned recently?",
        hint: "(It doesn't have to be about coding!)",
        type: ["textarea", { words: 100 }]
      },
      {
        name: "can_code",
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
        name: "logo_program",
        text: "Make something! Our clubs lead Leo McElroy has been deeply influenced by this little drawing tool called the Turtle. You can tell it to move around with these commands. Play around with it and draw a picture.",
        type: [ 
          "textarea", 
          { 
            placeholder:
`forward distance
right angle
left angle
repeat num [ ... ]
goto x y
setangle angle
penup
pendown

example:

repeat 30 [
  forward repcount
  right 91
]

or

repeat 30 [ forward repcount; right 91 ]
`
      }
    ]
  }
]












