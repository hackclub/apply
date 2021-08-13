import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

const testForm = [
  {
    sectionName: "Leaders",
    questions: [
      {
        id: "leaders_team_origin_story",
        q: "How long have you known your other club leaders and how did you meet?",
        hint: "(optional)",
        type: ["textarea", { words: 100 }] // input | textarea | options: []
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
        type: ["input"] // input | textarea | options: []
      },
      {
        id: "high_school_address",
        q: "What's the full address?",
        hint: "(Please include city, state/province, country, and postal code.)",
        type: ["textarea"] // input | textarea | options: []
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
        // type: { type: ["textarea"], words: 100 } // input | textarea | options: []
      },
      {
        id: "idea_other_coding_clubs",
        q: "What will your club do and what would a successful club look like?",
        hint: "",
        type: ["textarea", { words: 75 }] // input | textarea | options: []
      },
      {
        id: "idea_other_general_clubs",
        q: "What do you personally hope to get out of Hack Club?",
        hint: "",
        type: ["textarea", { words: 75 }] // input | textarea | options: []
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
        // type: { type: ["textarea"], words: 100 } // input | textarea | options: []
      },
      {
        id: "different",
        q: "Has your school had coding clubs before? What’s going to be new about your Hack Club?",
        hint: "",
        type: ["textarea"] // input | textarea | options: []
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
        // type: { type: ["textarea"], words: 100 } // input | textarea | options: []
      },
      {
        id: "point_of_contact_id",
        q: "How did you hear about Hack Club?",
        hint: "(i.e. from a friend, event, teacher, website, twitter)",
        type: ["textarea", { words: 50 }] // input | textarea | options: []
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
        type: ["input"] // input | textarea | options: []
      }
    ]
  }
]

const clubApplicationSchema = {
  high_school_name: "",
  high_school_type: "", // dropped
  high_school_address: "",
  leaders_team_origin_story: "",
  idea_why: "",
  idea_other_coding_clubs: "",
  idea_other_general_clubs: "",
  formation_registered: "",
  other_surprising_or_amusing_discovery: "",
  point_of_contact_id: "",
  isValidSync: () => false,
}



const ClubApplicationForm = () => {
  // useEffect(() => {
  //   const appForm = document.querySelector("#club-app");
  //   console.log(appForm);
  // }, []);

  return <>
    <Helmet>
      <script type="module" src="/plain-test/application-form.js"></script>
    </Helmet>

    <button onClick={e => {
      const appForm = document.querySelector("#club-app");
      appForm.on("keyup", ".question-textarea", () => {
        console.log(appForm.checkIsValid());
        const valid = appForm.checkIsValid();
      })
    }}>click me</button>

    <application-form id="club-app" form-template={JSON.stringify(testForm)}></application-form>
  </>
}


export default ClubApplicationForm;


