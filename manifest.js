export default {
  clubs: [
    {
      header: 'School',
      items: [
        {
          key: 'School Name',
          label: 'Name of high school',
          type: 'string',
          optional: false
        },
        {
          key: 'School Website',
          label: 'Link to your high school’s website, if any',
          type: 'string',
          optional: true
        },
        {
          key: 'School Type',
          label: 'Type of school',
          type: 'select',
          optional: false,
          options: ['Public school', 'Private school', 'Charter school']
        },
        {
          key: 'School Address',
          label: 'High School address',
          type: 'paragraph',
          optional: false,
          sublabel:
            'Please include city, state / province, country, and postal code.'
        }
      ]
    },
    {
      header: 'Leaders',
      items: [
        {
          key: 'President',
          label: 'President / equivalent position',
          type: 'select',
          optionsKey: 'Leaders Emails',
          optional: false
        },
        {
          key: 'Leaders Relationship',
          label:
            'How long have you known your other club leaders and how did you meet?',
          type: 'paragraph',
          optional: false,
          characters: [350, 600],
          sublabel:
            'Please include city, state / province, country, and postal code.'
        }
      ]
    },
    {
      header: 'Idea',
      items: [
        {
          key: 'Why',
          label:
            'Why are you planning to start a Hack Club? Have you run anything like a Hack Club before? Why do you think the club is going to work?',
          type: 'paragraph',
          optional: false,
          characters: [350, 600]
        },
        {
          key: 'What Is New',
          label:
            'Has your school had coding clubs before? What’s going to be new about your Hack Club?',
          type: 'paragraph',
          optional: false,
          characters: [350, 600]
        },
        {
          key: 'Pre-existing Clubs',
          label:
            'What successful clubs exist at your school? What makes them successful? Why will you be just as successful, if not more, than them?',
          type: 'paragraph',
          optional: false,
          characters: [350, 600]
        }
      ]
    },
    {
      header: 'Formation',
      items: [
        {
          key: 'School Status',
          label: 'Have you already registered your club with your school?',
          type: 'string',
          optional: false
        },
        {
          key: 'School Details',
          label:
            'Please provide any other relevant information about your relationship with the school. For example, do you already have a teacher sponsor?',
          type: 'paragraph',
          optional: true
        }
      ]
    },
    {
      header: 'Curious',
      items: [
        {
          key: 'New Fact',
          label:
            'What is something surprising or amusing you learned recently?',
          type: 'paragraph',
          optional: false,
          characters: [50, 400],
          sublabel: `Don't make it about Hack Club! Doesn't have to be about coding.`
        },
        {
          key: 'Get Out Of HC',
          label: 'What do you hope to get out of Hack Club?',
          type: 'paragraph',
          optional: true
        },
        {
          key: 'Hear About HC',
          label:
            'How did you hear about Hack Club? If you heard about us at an event or on a website, mention it here.',
          type: 'paragraph',
          optional: true
        }
      ]
    }
  ],
  leaders: [
    {
      header: 'Leader',
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          optional: false
        },
        {
          key: 'School Year',
          label: 'Year in school',
          type: 'select',
          optional: false,
          options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Other year']
        },
        {
          key: 'Phone',
          label:
            'Phone number (include country code if not in the United States)',
          type: 'string',
          optional: false
        },
        {
          key: 'Address',
          label: 'Your full address (where we can ship you stickers)',
          type: 'paragraph',
          optional: false,
          sublabel:
            'Please include city, state / province, country, and postal code.'
        }
      ]
    },
    {
      header: 'Stats',
      label:
        'Demographic stats are collected to share in aggregate with donors and will not be used as part of application review.',
      items: [
        {
          key: 'Gender',
          label: 'Gender',
          type: 'select',
          options: [
            'Female',
            'Male',
            'Non-binary / genderqueer',
            'Agender',
            'Other'
          ],
          optional: false
        },
        {
          key: 'Ethnicity',
          label: 'Ethnicity',
          type: 'select',
          options: [
            'Hispanic or Latino',
            'White',
            'Black',
            'Native American or American Indian',
            'Asian or Pacific Islander',
            'Other Ethnicity'
          ],
          optional: false
        }
      ]
    },
    {
      header: 'Presence',
      items: [
        {
          key: 'Website',
          label: 'Personal website link',
          placeholder: 'https://',
          type: 'string',
          optional: true
        },
        {
          key: 'Twitter',
          label: 'Twitter link',
          placeholder: 'https://',
          type: 'string',
          optional: true
        },
        {
          key: 'GitHub',
          label: 'GitHub link',
          placeholder: 'https://',
          type: 'string',
          optional: true
        }
      ]
    },
    {
      header: 'Skills',
      items: [
        {
          key: 'Hacker Story',
          label: (
            <>
              Please tell us about the time you most successfully hacked some
              (non-computer) system to your advantage.{' '}
              <a href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage">
                Here are examples of what we’re looking for
              </a>
              .
            </>
          ),
          type: 'paragraph',
          optional: false,
          characters: [450, 1200]
        },
        {
          key: 'Achievement',
          label: `Please tell us in one or two sentences about the most impressive thing you have built or achieved. Include links (and links to images) if possible.`,
          type: 'paragraph',
          optional: false,
          characters: [150, 250]
        },
        {
          key: 'Technicality',
          label: 'Are you technical? (You are a programmer who can teach without outside assistance)',
          type: 'select',
          optional: false,
          options: ['Yes', 'No']
        },
      ]
    }
  ]
}
