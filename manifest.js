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
          label: 'Who would you like your Point of Contact to be?',
          type: 'select',
          optionsKey: 'Leaders Emails',
          optional: false,
          translations: {
            'pt-BR': {
              label: 'Quem você gostaria do seu ponto de contato para ser?'
            }
          }
        },
        {
          key: 'Leaders Relationship',
          label:
            'How long have you known your other club leaders and how did you meet?',
          translations: {
            'pt-BR': {
              label: 'Há quanto tempo você e seus co-líderes se conhecem e como vocês se conheceram?'
            }
          },
          type: 'paragraph',
          optional: false,
          characters: [350, 600]
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
          key: 'School Name',
          label: 'Where are you planning to run your Hack Club?',
          translations: {
            'pt-BR': {
              label: 'Onde você está planejando executar seu Hack Club?',
            }
          },
          type: 'string',
          optional: false
        },
        {
          key: 'Venue Type',
          label: 'What type of venue is this?',
          translations: {
            'pt-BR': {
              label: 'Que tipo de local é este?',
              sublabel:
                '(Pode ser uma escola secundária, fabricante ou outra coisa.)'
            }
          },
          type: 'string',
          sublabel:
            '(It can be a high school, makerspace, or something else.)',
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
      header: 'Idea',
      translations: {
        'pt-BR': {
          header: 'Ideia'
        }
      },
      items: [
        {
          key: 'Why',
          label:
            'Why are you planning to start a Hack Club?',
          type: 'paragraph',
          optional: false,
          translations: {
            'pt-BR': {
              label: 'Por que você deseja iniciar um Hack Club?'
            }
          },
          characters: [350, 600]
        },
        {
          key: 'Success',
          label:
            'What will your club do and what would a successful club look like?',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Como será o seu clube e como seria um clube de sucesso?'
            }
          },
          optional: false,
          characters: [350, 600]
        },
        {
          key: 'Get Out Of HC',
          label: 'What do you personally hope to get out of Hack Club?',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'O que você pessoalmente espera sair do Hack Club?'
            }
          },
          optional: true
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
          label: 'What steps have you taken to start your club?',
          sublabel:
            '(have you registered with your school, taken interest surveys, identified a sponsor, etc.)',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Que passos você fez para começar seu clube?',
              sublabel: '(você se registrou com sua escola, levando pesquisas de interesse, identificou um patrocinador, etc.)',
            }
          },
          optional: false
        },
        {
          key: 'What Is New',
          label:
            'Has your school had coding clubs before? What’s going to be new about your Hack Club?',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Sua escola já teve clubes de programação antes? O que vai ser diferente no seu Hack Club?'
            }
          },
          optional: false,
          characters: [350, 600]
        },
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
            'How did you hear about Hack Club? If you heard about us at an event or on a website, mention it here.',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Como você ouviu falar do Hack Club? Se você ouviu falar de nós por meio de um evento ou website, mencione ele aqui.'
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
      items: [
        {
          key: 'Full Name',
          label: 'Full Name',
          type: 'string',
          translations: {
            'pt-BR': {
              label: 'Nome Completo'
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
          },
        },
        {
          key: 'Phone',
          label:
            'Phone number (include country code if not in the United States)',
          type: 'string',
          inputType: 'tel',
          translations: {
            'pt-BR': {
              label: 'Número de telefone (inclua +55 antes se for do Brasil)'
            }
          },
          optional: false
        },
        {
          key: 'Address',
          label: 'Your full address (where we can ship you stickers)',
          type: 'paragraph',
          translations: {
            'pt-BR': {
              label: 'Seu endereço completo (onde podemos te enviar figurinhas adesivas)'
            }
          },
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
        translations: {
          'pt-BR': {
            header: 'Estatísticas',
            label: 'Estatísticas demográficas são coletadas apenas para compartilharmos com nossos doadores e não vão influenciar a análise de sua inscrição.'
          }
        },
      items: [
        {
          key: 'Gender',
          label: 'Gender',
          type: 'select',
          translations: {
            'pt-BR': {
              label: 'Gênero',
              options: [
                'Feminino',
                'Masculino',
                'Não-binário / genderqueer',
                'Agênero',
                'Outro'
              ]
            }
          },
          options: [
            'Female',
            'Male',
            'Non-binary / genderqueer',
            'Agender',
            'Other',
          ],
          optional: false
        },
        {
          key: 'Ethnicity',
          label: 'Ethnicity',
          type: 'select',
          translations: {
            'pt-BR': {
              label: 'Etnia',
              options: [
                'Latino ou hispânico',
                'Branco',
                'Preto',
                'Americano Nativo ou Indígena Americano',
                'Asiático ou das Ilhas do Pacífico',
                'Outra etnia'
              ]
            }
          },
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
          translations: {
            'pt-BR': {
              label: 'Link do site pessoal'
            },
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
              label: 'Link do Twitter',
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
              label: 'Link do GitHub',
            }
          },
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
              <a href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage" style={{color: '#338eda'}}>
                Here are examples of what we’re looking for
              </a>
              .
            </>
          ),
          translations: {
            'pt-BR': {
              label: (
                <>
                  Por favor nos conte alguma vez que você hackeou com sucesso algum sistema (não computacional) para obter alguma vantagem.
                  <a href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage" style={{color: '#338eda'}}>
                  Aqui estão alguns exemplos do que estamos buscando.
                  </a>
                  .
                </>
              ),
            }
          },
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
          translations: {
            'pt-BR': {
              label: 'Conte-nos sobre algo que você fez que foi pessoalmente significativo para você.',
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
              label: 'Nos fale sobre algo que você e/ou seus co-líderes aprenderam recentemente?',
              sublabel: '(não faça essa pergunta ser sobre o Hack Club! Não precisa ter relação com programação)',
            }
          },
          optional: false,
          characters: [50, 400],
          sublabel: `Don't make it about Hack Club! Doesn't have to be about coding.`
        },
        {
          key: 'Technicality',
          label:
            'Are you technical? (You are a programmer who can teach without outside assistance)',
          type: 'select',
          optional: false,
          translations: {
            'pt-BR': {
              label: 'Você tem habilidades técnicas? (Você é um programador que consegue ensinar sem assistência externa)',
              sublabel: `(Tudo bem se não!)`,
            }
          },
          sublabel: `(It's okay if not!)`,
          options: ['Yes', 'No']
        }
      ]
    }
  ]
}
