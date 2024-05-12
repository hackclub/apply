export default {
  clubs: [
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
          label: 'Who should we reach out to?',
          type: 'select',
          optionsKey: 'Leaders Emails',
          optional: false,
          translations: {
            'pt-BR': {
              label: 'Quem você gostaria que fosse seu ponto de contato?'
            }
          }
        },
        {
          key: 'Leaders Relationship',
          label:
            'How long have you known your other club leaders and how did you meet?',
          translations: {
            'pt-BR': {
              label:
                'Há quanto tempo você e seus co-líderes se conhecem e como vocês se conheceram?',
              sublabel: '(Não tem problema se for liderar seu clube sozinho!)'
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
        'pt-BR': {
          header: 'Local'
        }
      },
      items: [
        {
          key: 'Venue Type',
          label: 'What type of venue will your Hack Club take place in?',
          translations: {
            'pt-BR': {
              label: 'Que tipo de local é este?',
              options: [
                'Ensino médio',
                'Faculdade/Universidade',
                'Espaço Maker',
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
            'pt-BR': {
              label: 'Onde você está planejando criar seu Hack Club?',
              sublabel:
                '(Coloque o nome do local. Exemplo: "Escola Hacker Feliz")',
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
            'pt-BR': {
              label: 'Qual é o endereço do clube?',
              sublabel: 'Por favor inclua cidade, estado, país e CEP.'
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
        'pt-BR': {
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
            'pt-BR': {
              label: 'Por que você deseja iniciar um Hack Club?'
            }
          },
          words: 75
        },
        {
          key: 'Success',
          label: 'Describe what your club meetings will look like.',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Como será o seu clube?'
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
            'pt-BR': {
              label: 'O que você espera aprender com o seu Hack Club?'
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
        'pt-BR': {
          header: 'Organização'
        }
      },
      items: [
        {
          key: 'Status',
          label: 'What steps if any have you taken to start your club?',
          sublabel:
            '(have you registered with your school, taken interest surveys, identified a sponsor, etc. This is just to know where you are. If you have not done anything yet, that's okay.)',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Que passos você fez para começar seu clube?',
              sublabel:
                '(Você se registrou com sua escola, fez formulários de interesse, etc.)'
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
            'pt-BR': {
              label:
                'Sua escola já teve clubes de programação antes? O que vai ser diferente no seu Hack Club?'
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
        'pt-BR': {
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
            'pt-BR': {
              label:
                'Como você ouviu falar do Hack Club? Se você ouviu falar de nós por meio de um evento ou website, mencione ele aqui.'
            }
          },
          optional: false
        }
      ]
    }
  ],
  leaders: [
    {
      header: 'Leader',
      translations: {
        'pt-BR': {
          header: 'Líder'
        }
      },
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          translations: {
            'pt-BR': {
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
            'pt-BR': {
              label: 'Data de Aniversário'
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
            'pt-BR': {
              label: 'Ano na escola'
            }
          }
        },
        {
          key: 'Code',
          // label: 'Phone number (include country code if not in the United States)',
          type: 'string',
          inputType: 'tel',
          translations: {
            'pt-BR': {
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
            'pt-BR': {
              // label: 'Número de telefone (inclua +55 antes se for do Brasil)'
            }
          },
          optional: false
        }
      ]
    },
    {
      header: 'Mailing address',
      label: 'The address where we can ship you stickers!',
      translations: {
        'pt-BR': {
          header: 'Endereço de correspondência'
        }
      },
      items: [
        {
          key: 'Address Line 1',
          label: 'Street address',
          type: 'string',
          placeholder: '15 Falls Road',
          translations: {
            'pt-BR': {
              label: 'Endereço (linha 1)'
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
            'pt-BR': {
              label: 'Endereço (linha 2)'
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
            'pt-BR': {
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
            'pt-BR': {
              label: 'Estado'
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
            'pt-BR': {
              label: 'CEP'
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
            'pt-BR': {
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
        'pt-BR': {
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
            'pt-BR': {
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
            'pt-BR': {
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
            'pt-BR': {
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
            'pt-BR': {
              label: 'Link do ',
              sublabel: '(Gitlab, Sourcehut, outro site onde seu código reside)'
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
        'pt-BR': {
          header: 'Habilidades',
          label:
            'Queremos te conhecer! Por favor responda essas perguntas como se estivesse contando-as para um amigo'
        }
      },
      items: [
        {
          key: 'Achievement',
          label: `Tell us about something you made which was personally meaningful to you.`,
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label:
                'Conte-nos sobre algo que você fez que foi pessoalmente significativo para você.',
              sublabel: '(coloque links, se possível)'
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
            'pt-BR': {
              label: 'O que você aprendeu recentemente?',
              sublabel:
                'Não precisa ser relacionado ao Hack Club nem ter relação com programação. :)'
            }
          },
          optional: false,
          characters: [50, 400],
          sublabel: `Don't make it about Hack Club! Doesn't have to be about coding.`
        },
        {
          key: 'Hacker Story',
          label: (
            <>
              Please tell us about the time you most successfully hacked some
              (non-computer) system to your advantage.{' '}
              <a
                href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage"
                style={{ color: '#338eda' }}
                target="_blank"
              >
                Here are examples of what we&#39;re looking for
              </a>
              .
            </>
          ),
          translations: {
            'pt-BR': {
              label: (
                <>
                  Por favor nos conte alguma vez que você hackeou com sucesso
                  algum sistema (não computacional) para obter alguma vantagem.
                  <a
                    href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage"
                    style={{ color: '#338eda' }}
                    target="_blank"
                  >
                    {' '}
                    Aqui estão alguns exemplos do que estamos buscando
                  </a>
                  .
                </>
              )
            }
          },
          plainText:
            'Please tell us about the time you most successfully hacked some (non-computer) system to your advantage.',
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
        'pt-BR': {
          header: 'Estatísticas',
          label:
            'Nós nos importamos em ser o mais inclusivos possíveis. Compartilhando essas informações, você nos ajuda a tornar isso possível'
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
            'pt-BR': {
              label: 'Pronomes',
              options: [
                'Macho',
                'Fêmea',
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
            'pt-BR': {
              label: 'Etnia',
              options: [
                'Origem hispânica, latina ou espanhola',
                'Branco',
                'Afro-americano',
                'índio americano ou nativo do Alasca',
                'Asiático',
                'índio asiático',
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
