export default {
  clubs: [
    {
      header: 'Leaders',
      translations: {
        'pt-PT': {
          header: 'Líderes'
        }
      },
      items: [
        {
          key: 'President',
          label: 'Who should we reach out to?',
          type: 'select',
          optionsKey: 'Leaders Emails',
          optional: false,
          translations: {
            'pt-PT': {
              label: 'Quem gostarias que fosse o teu ponto de contacto?'
            }
          }
        },
        {
          key: 'Leaders Relationship',
          label:
            'How long have you known your other club leaders and how did you meet?',
          translations: {
            'pt-PT': {
              label:
                'Há quanto tempo conheces os teus co-líderes e como é que vos conheceram?',
              sublabel: '(Não há problema se fores liderar o teu clube sozinho!)'
            }
          },
          type: 'paragraph',
          optional: true,
          words: 50
        }
      ]
    },
    {
      header: 'Venue',
      translations: {
        'pt-PT': {
          header: 'Local'
        }
      },
      items: [
        {
          key: 'Club Name',
          label: "What do you want to call your Hack Club?",
          translations: {
            'pt-PT': {
              label: 'Como queres chamar ao teu Hack Club?',
              sublabel: '(Exemplo: "Hack Club da Escola Feliz" ou "Hackers Unidos")',
              placeholder: 'Hack Club da Escola Feliz'
            }
          },
          sublabel: 'This will be the official name of your club (e.g., "Happy High Hack Club" or "The Code Crusaders") and will be what\'s used on the Hack Club map',
          placeholder: 'Happy High Hack Club',
          type: 'string',
          optional: false
        },
        {
          key: 'Venue Type',
          label: 'What type of venue will your Hack Club take place in?',
          translations: {
            'pt-PT': {
              label: 'Que tipo de local é este?',
              options: [
                'Escola (3ºCiclo ou Secundário)',
                'Universidade',
                'Espaço Maker (makerspace)',
                'Algo mais'
              ],
              sublabel:
                '(Pode ser uma escola, espaço maker ou qualquer outro lugar.)'
            }
          },
          type: 'select',
          placeholder: 'Happy Hack High School',
          options: [
            'High School',
            'Makerspace',
            'Something Else'
          ],
          optional: false
        },
        {
          key: 'School Name',
          label: "What's the name of your venue?",
          translations: {
            'pt-PT': {
              label: 'Onde estás a planear criar o teu Hack Club?',
              sublabel:
                '(Coloca o nome do local. Exemplo: "Escola Hacker Feliz")',
              placeholder: 'Escola Hacker Feliz'
            }
          },
          sublabel:
            "(It doesn't have to be a high school! Instead, you can also add the name of your makerspace here)",
          placeholder: 'Happy Hack High School',
          type: 'string',
          optional: false
        },
        {
          key: 'School Address',
          label: `What's the full address?`,
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label: 'Qual é a morada do clube?',
              sublabel: 'Por favor inclui cidade, estado, país e código postal.'
            }
          },
          optional: false,
          sublabel: 'City, State / Province, Postal Code, Country'
        }
      ]
    },
    {
      header: 'Idea',
      label: (
        <span style={{ fontSize: '20px' }}>
          Answer these questions so we can personalize your club experience.
        </span>
      ),
      translations: {
        'pt-PT': {
          header: 'Ideia'
        }
      },
      items: [
        {
          key: 'Why',
          label: 'Why are you planning to start a Hack Club?',
          type: 'paragraph',
          optional: false,
          translations: {
            'pt-PT': {
              label: 'Porque é que queres começar um Hack Club?'
            }
          },
          words: 75
        },
        {
          key: 'Success',
          label: 'Describe what your club meetings will look like.',
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label: 'Como será o teu clube?'
            }
          },
          optional: false,
          words: 75
        },
        {
          key: 'Get Out Of HC',
          label: 'What do you personally hope to get out of Hack Club?',
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label: 'O que esperas aprender com o teu Hack Club?'
            }
          },
          optional: false,
          words: 75
        }
      ]
    },
    {
      header: 'Formation',
      translations: {
        'pt-PT': {
          header: 'Organização'
        }
      },
      items: [
        {
          key: 'Status',
          label: 'What steps if any have you taken to start your club?',
          sublabel:
            "(have you registered with your school, taken interest surveys, identified a sponsor, etc. This is just to know where you are. If you have not done anything yet, that's okay.)",
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label: 'Que passos deste para começar o teu clube?',
              sublabel:
                '(Registaste-te com a tua escola, fizeste formulários de interesse, etc.)'
            }
          },
          optional: false,
          words: 50
        },
        {
          key: 'What Is New',
          label:
            'Has your school had coding clubs before? What’s going to be new about your Hack Club?',
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label:
                'A tua escola já teve clubes de programação antes? O que vai ser diferente no teu Hack Club?'
            }
          },
          optional: false,
          words: 50
        }
      ]
    },
    {
      header: 'Curious',
      translations: {
        'pt-PT': {
          header: 'Curiosidades'
        }
      },
      items: [
        {
          key: 'Hear About HC',
          label:
            'How did you hear about Hack Club? (i.e. from a friend, an event, a teacher, a website or Twitter)',
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label:
                'Como ouviste falar do Hack Club? Se ouviste falar de nós através de um evento ou website, menciona-o aqui.'
            }
          },
          optional: false
        },
        {
          key: 'Referral Code',
          label: 'Referral Code',
          type: 'string',
          sublabel: (
            <>
              Get this from your friends in other clubs who might've ran /referclub in{' '}
              <a
                href="https://hackclub.slack.com/archives/C02PA5G01ND"
                style={{ color: '#338eda' }}
                target="_blank"
              >
                #leaders
              </a>
            </>
          ),
          translations: {
            'pt-PT': {
              label: 'Código de Referência',
              sublabel: (
                <>
                  Obtém isto dos teus amigos noutros clubes que possam ter executado /referclub em{' '}
                  <a
                    href="https://hackclub.slack.com/archives/C02PA5G01ND"
                    style={{ color: '#338eda' }}
                    target="_blank"
                  >
                    #leaders
                  </a>
                </>
              )
            }
          },
          optional: true
        }
      ]
    }
  ],
  leaders: [
    {
      header: 'Leader',
      translations: {
        'pt-PT': {
          header: 'Líder'
        }
      },
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          translations: {
            'pt-PT': {
              label: 'Nome Completo',
              header: 'Líder'
            }
          },
          optional: false
        },
        {
          key: 'Birthday',
          label: 'Birthday',
          type: 'string',
          inputType: 'date',
          translations: {
            'pt-PT': {
              label: 'Data de Nascimento'
            }
          },
          optional: false
        },
        {
          key: 'School Year',
          label: 'Graduation Year',
          type: 'string',
          optional: false,
          translations: {
            'pt-PT': {
              label: 'Ano de formatura'
            }
          }
        },
        {
          key: 'Code',
          // label: 'Phone number (include country code if not in the United States)',
          type: 'string',
          inputType: 'tel',
          translations: {
            'pt-PT': {
              // label: 'Número de telefone (inclua +55 antes se for do Brasil)'
            }
          },
          optional: false
        },
        {
          key: 'Phone',
          // label: 'Phone number (include country code if not in the United States)',
          type: 'string',
          inputType: 'tel',
          translations: {
            'pt-PT': {
              // label: 'Número de telefone (inclua +55 antes se for do Brasil)'
            }
          },
          optional: false
        },
        {
          key: 'Slack ID',
          label: 'What is your Slack ID?',
          type: 'string',
          sublabel: 'You can get this from #what-is-my-slack-id on Slack, if you are a member of the Hack Club Slack.',
          translations: {
            'pt-PT': {
              label: 'Qual é o teu ID do Slack?',
              sublabel: 'Podes obter isto no canal #what-is-my-slack-id no Slack, se fores membro do Hack Club Slack.'
            }
          },
          optional: true
        }
      ]
    },
    {
      header: 'Mailing address',
      label: 'The address where we can ship you stickers!',
      translations: {
        'pt-PT': {
          header: 'Morada',
          label: 'A morada onde podemos mandar-te os teus autocolantes!'
        }
      },
      items: [
        {
          key: 'Address Line 1',
          label: 'Street address',
          type: 'string',
          placeholder: '15 Falls Road',
          translations: {
            'pt-PT': {
              label: 'Morada (linha 1)'
            }
          },
          optional: false
        },
        {
          key: 'Address Line 2',
          label: 'Address (line 2)',
          type: 'string',
          placeholder: 'Apt #123',
          translations: {
            'pt-PT': {
              label: 'Morada (linha 2)'
            }
          },
          optional: true
        },
        {
          key: 'Address City',
          label: 'City',
          placeholder: 'Ithaca',
          type: 'string',
          translations: {
            'pt-PT': {
              label: 'Cidade'
            }
          },
          optional: false
        },
        {
          key: 'Address State',
          label: 'State',
          type: 'string',
          placeholder: 'NY',
          translations: {
            'pt-PT': {
              label: 'Distrito/Estado'
            }
          },
          optional: false
        },
        {
          key: 'Address Zip',
          label: 'Zip code',
          type: 'string',
          placeholder: '14850',
          translations: {
            'pt-PT': {
              label: 'Código Postal'
            }
          },
          optional: false
        },
        {
          key: 'Address Country',
          label: 'Country',
          placeholder: 'United States',
          type: 'countrySelect',
          translations: {
            'pt-PT': {
              label: 'País'
            }
          },
          optional: false
        }
      ]
    },
    {
      header: 'Presence',
      translations: {
        'pt-PT': {
          header: 'Links'
        }
      },
      items: [
        {
          key: 'Website',
          label: 'Personal website link',
          placeholder: 'https://',
          type: 'string',
          translations: {
            'pt-PT': {
              label: 'Link do site pessoal'
            }
          },
          optional: true
        },
        {
          key: 'GitHub',
          label: 'GitHub link',
          placeholder: 'https://',
          type: 'string',
          translations: {
            'pt-PT': {
              label: 'Link do GitHub'
            }
          },
          optional: true
        },
        {
          key: 'Twitter',
          label: 'Twitter link',
          placeholder: 'https://',
          type: 'string',
          translations: {
            'pt-PT': {
              label: 'Link do Twitter'
            }
          },
          optional: true
        },
        {
          key: 'Other',
          label: 'Other Technical Links',
          placeholder: 'https://',
          type: 'string',
          sublabel: '(Gitlab, Sourcehut, other site where your code lives)',
          translations: {
            'pt-PT': {
              label: 'Link do ',
              sublabel: '(Gitlab, Sourcehut, outro site onde o teu código vive)'
            }
          },
          optional: true
        }
      ]
    },
    {
      header: 'Skills',
      header: 'Hacker Details',
      label:
        'We want to get to know you! Please answer these questions like you’re telling them to a friend',
      translations: {
        'pt-PT': {
          header: 'Habilidades',
          label:
            'Queremos conhecer-te! Por favor responde a estas perguntas como se estivesses a falar com um amigo'
        }
      },
      items: [
        {
          key: 'Achievement',
          label: `Tell us about something you made which was personally meaningful to you.`,
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label:
                'Conta-nos sobre algo que fizeste que foi pessoalmente significativo para ti.',
              sublabel: '(coloca links, se possível)'
            }
          },
          optional: false,
          sublabel: '(include links and links to images if possible)',
          characters: [150, 250]
        },
        {
          key: 'New Fact',
          label:
            'What is something surprising or amusing you learned recently?',
          type: 'paragraph',
          translations: {
            'pt-PT': {
              label: 'O que aprendeste recentemente?',
              sublabel:
                'Não precisa de ser relacionado com o Hack Club nem ter relação com programação. :)'
            }
          },
          optional: false,
          characters: [50, 400],
          sublabel: `Don't make it about Hack Club! Doesn't have to be about coding.`
        },
        {
          key: 'Hacker Story',
          label: "If you had unlimited time, money, and resources, what's the most ridiculous/awesome thing you'd build? Go wild with your imagination!",
          translations: {
            'pt-PT': {
              label: "Se tivesses tempo, dinheiro e recursos ilimitados, qual seria a coisa mais ridícula/incrível que construirias? Solta a imaginação!"
            }
          },
          plainText: "If you had unlimited time, money, and resources, what's the most ridiculous/awesome thing you'd build? Go wild with your imagination!",
          type: 'paragraph',
          optional: false,
          characters: [450, 1200]
        }
      ]
    },
    {
      header: 'Optional Stats',
      label:
        'We care about being as inclusive as possible. Sharing this information helps us achieve that goal.',
      translations: {
        'pt-PT': {
          header: 'Estatísticas',
          label:
            'Preocupamo-nos em ser o mais inclusivos possível. Partilhar esta informação ajuda-nos a alcançar esse objetivo'
        }
      },
      items: [
        {
          key: 'Gender',
          label: 'Gender',
          optional: true,
          type: 'select',
          options: [
            'Male',
            'Female',
            'Non-binary/non-conforming',
            'Prefer not to respond'
          ],
          translations: {
            'pt-PT': {
              label: 'Género',
              options: [
                'Masculino',
                'Feminino',
                'Não binário/não conforme',
                'Prefiro não responder'
              ]
            }
          },
          optional: true
        },
        {
          key: 'Ethnicity',
          label: 'Ethnicity',
          type: 'select',
          translations: {
            'pt-PT': {
              label: 'Etnia',
              options: [
                'Origem hispânica, latina ou espanhola',
                'Branco',
                'Afro-americano',
                'Índio americano ou nativo do Alasca',
                'Asiático',
                'Índio asiático',
                'Nativo havaiano ou outro ilhéu do Pacífico',
                'Outra etnia',
                'Prefiro não dizer'
              ]
            }
          },
          options: [
            'Hispanic, Latino or Spanish origin',
            'White',
            'Black, African American',
            'American Indian or Alaska native',
            'Asian',
            'Asian Indian',
            'Native Hawaiian or Other Pacific Islander',
            'Other Ethnicity',
            'Prefer not to say'
          ],
          optional: true
        }
      ]
    }
  ],
  metaData: {
    maximumAge: 20 /**IN YEARS*/
  }
}
