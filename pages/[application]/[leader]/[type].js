import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Textarea,
  Field,
  Grid
} from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import manifest from '../../../manifest'
import nookies from 'nookies'

export default function ApplicationClub({
  notFound,
  applicationsRecord,
  leaderRecord,
  params
}) {
  const [data, setData] = useState(
    params.type == 'club' ? applicationsRecord.fields : leaderRecord.fields
  )
  const [saved, setSaved] = useState(true)
  const poster = () => {
    fetch(
      `/api/${params.type}/save?id=${
        params.type == 'club' ? params.application : params.leader
      }`,
      { body: JSON.stringify(data), method: 'POST' }
    )
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          alert(`Error encounted when autosaving! ${res.error}`)
        } else {
          setSaved(true)
        }
      })
  }

  useEffect(() => {
    window.onbeforeunload = function () {
      poster()
      if (!saved) {
        window.confirm('You have unsaved changes!')
      }
    }
  })

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Link href={`/${params.application}/${params.leader}`}>
            <Icon glyph="home" />
          </Link>
          <Text
            variant="subheadline"
            sx={{ fontWeight: 400, mb: 0, flexGrow: 1, ml: 2 }}
            as="div"
          >
            <Link href={`/${params.application}/${params.leader}`}>
              <Text sx={{ textDecoration: 'none', color: 'blue' }}>Apply</Text>
            </Link>

            {' / '}
            <b>{params.type == 'club' ? 'Club' : 'Leader'}</b>
          </Text>

          <Icon
            glyph={saved ? 'checkmark' : 'important'}
            onClick={() => poster()}
            color={saved ? '#33d6a6' : '#ff8c37'}
          />
        </Flex>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        {(params.type == 'club' ? manifest.clubs : manifest.leaders).map(
          (sectionItem, sectionIndex) => (
            <Box>
              <Box sx={{ textAlign: 'left' }}>
                <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800 }}>
                  {sectionItem.header}
                </Text>
              </Box>
              <Box>
                {sectionItem.label && (
                  <Box sx={{ color: 'muted', mb: 3 }}>{sectionItem.label}</Box>
                )}
                {sectionItem.items.map((item, index) => (
                  <Box
                    mt={1}
                    mb={3}
                    key={'form-item-' + sectionIndex + '-' + index}
                  >
                    <Field
                      label={
                        <Text>
                          {item.label}{' '}
                          <Text
                            sx={{
                              color: 'muted',
                              display: item.optional ? 'inline' : 'none'
                            }}
                          >
                            (optional)
                          </Text>
                        </Text>
                      }
                      onChange={e => {
                        let newData = {}
                        newData[item.key] = e.target.value
                        setData({ ...data, ...newData })
                        setSaved(false)
                      }}
                      disabled={applicationsRecord.fields['Submitted'] ? true : false}
                      onBlur={() => poster()}
                      placeholder={item.placeholder}
                      as={
                        item.type == 'string'
                          ? Input
                          : item.type == 'paragraph'
                          ? Textarea
                          : Select
                      }
                      type={item.inputType}
                      name="email"
                      value={data[item.key] !== undefined ? data[item.key] : ''}
                      sx={{
                        border: '1px solid',
                        borderColor: 'rgb(221, 225, 228)'
                      }}
                      {...(item.type == 'select'
                        ? item.options
                          ? {
                              children: (
                                <>
                                  <option value="" disabled>
                                    Select One
                                  </option>
                                  {item.options.map(option => (
                                    <option>{option}</option>
                                  ))}
                                </>
                              )
                            }
                          : {
                              children: (
                                <>
                                  <option value="" disabled>
                                    Select One
                                  </option>
                                  {applicationsRecord.fields[
                                    item.optionsKey
                                  ].map(option => (
                                    <option>{option}</option>
                                  ))}
                                </>
                              )
                            }
                        : {})}
                    />
                    {item.characters && (
                      <Text
                        sx={{ fontSize: '18px', color: 'muted', mt: 1 }}
                        as="p"
                      >
                        (Aim for between {item.characters[0]} and{' '}
                        {item.characters[1]} characters)
                      </Text>
                    )}
                    {item.sublabel && (
                      <Text sx={{ fontSize: '16px', color: 'muted' }} as="p">
                        {item.sublabel}
                      </Text>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )
        )}
      </Card>
    </Container>
  )
}

export async function getServerSideProps({ req, params }) {
  const {
    prospectiveLeadersAirtable,
    applicationsAirtable
  } = require('../../../lib/airtable')
  const cookies = nookies.get({req})
  if (cookies.authToken) {
  try {
    const leaderRecord = await prospectiveLeadersAirtable.find('rec'+ params.leader)
    const applicationsRecord = await applicationsAirtable.find(
     'rec'+ params.application
    )
    if(leaderRecord.fields["Accepted Tokens"].includes(cookies.authToken)){
      return { props: { params, applicationsRecord, leaderRecord } }
    }
    else{
      res.statusCode = 302
      res.setHeader('Location', `/`)
      return
    }
  } catch (e) {
    console.log(e)
    return { props: { notFound: true } }
  }}
  else{
    res.statusCode = 302
    res.setHeader('Location', `/`)
    return
  }
}
