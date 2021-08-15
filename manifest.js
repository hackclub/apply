export default {
  clubs: [
    {
      header: 'Venue',
      translations: {
        'pt-BR': {
          header: 'Local'
        }
      },
      items: [
        {
          key: 'School Name',
          label: 'Where are you planning to run your Hack Club?',
          translations: {
            'pt-BR': {
              label: 'Onde você está planejando executar seu Hack Club?',
              sublabel:
                '(Dê-nos o nome e o tipo. Pode ser uma escola secundária, fabricante ou outra coisa.)'
            }
          },
          type: 'string',
          sublabel:
            '(Give us the name and type. It can be a high school, makerspace, or something else.)',
          optional: false
        },
        {
          key: 'School Address',
          label: `What's the full address?`,
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Qual é o endereço completo?',
              sublabel:
                'Por favor inclua cidade, estado / província, país, e CEP.'
            }
          },
          optional: false,
          sublabel:
            'Please include city, state / province, country, and postal code.'
        }
      ]
    },
    {
      header: 'Leaders',
      translations: {
        'pt-BR': {
          header: 'Líderes'
        }
      },
      items: [
        {
          key: 'President',
          label: 'Who would you like your Point of Contact to be?',
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
          key: 'Success',
          label:
            'What will your club do and what would a successful club look like?',
          type: 'paragraph',
          optional: false,
          characters: [350, 600]
        },
        {
          key: 'Get Out Of HC',
          label: 'What do you personally hope to get out of Hack Club?',
          type: 'paragraph',
          optional: true
        }
      ]
    },
    {
      header: 'Formation',
      items: [
        {
          key: 'Status',
          label: 'What steps have you taken to start your club?',
          sublabel:
            '(have you registered with your school, taken interest surveys, identified a sponsor, etc.)',
          type: 'paragraph',
          optional: false
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
          plainText:
            'Please tell us about the time you most successfully hacked some (non-computer) system to your advantage.',
          type: 'paragraph',
          optional: false,
          characters: [450, 1200]
        },
        {
          key: 'Achievement',
          label: `Tell us about something you made which was personally meaningful to you?`,
          type: 'paragraph',
          optional: false,
          sublabel: '(include links and links to images if possible)',
          characters: [150, 250]
        },
        {
          key: 'Technicality',
          label:
            'Are you technical? (You are a programmer who can teach without outside assistance)',
          type: 'select',
          optional: false,
          hint: `(It's okay if not!)`,
          options: ['Yes', 'No']
        }
      ]
    }
  ]
}
