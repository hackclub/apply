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
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { clubApplication } from "/formConfigs/club-application.js";
import { leaderApplication } from "/formConfigs/leader-application.js";

const inputType = {
  input: (name, { placeholder } = { placeholder: "" }) => data => (
    <input 
      name={name} 
      defaultValue={data[name]}
      placeholder={placeholder} 
      className="question-input">
    </input>
  ),
  textarea: (name, { words, placeholder } = { words: 0, placeholder: "" }) => data => (
    <MyTextarea defaultValue={data[name]} words={words} fieldName={name} placeholder={placeholder} />
  ),
  options: (name, { choices } = { choices: [] }) => data => <>
    <Select className="options" name={name} defaultValue={data[name] || ""}>
      <option disabled value="">Select One</option>
      {
        choices.map( (choice, i) => (
          <option 
            key={`${name} option ${i}`} 
            value={choice.toLowerCase().split(" ").join("_")}
            >
            {choice}
          </option>
        ))
      }
    </Select>
  </>,
  date: (name) => data => <Input name={name} defaultValue={data[name]} className="question-input" type="date"/>,
  jsx: (name, jsxMaker) => data => jsxMaker(name)
}

const MyTextarea = ({ words, fieldName, placeholder, defaultValue }) => {

  const wordCount = words !== 0 && words !== undefined;
  let [ numWords, setWords] = useState(0);

  return (
    <div>
      <textarea 
        name={fieldName} 
        defaultValue={defaultValue}
        placeholder={placeholder} 
        className="question-textarea question-input"
        onKeyUp={(e) => {
          const n = e.target.value === "" ? 0 : e.target.value.split(" ").length;
          setWords(n)
        }}
        >
      </textarea>
      { 
        wordCount
          ? numWords > 0 
            ? <div className="wordcount question-hint">({numWords} of ~{words})</div>
            : <div className="wordcount question-hint">(aim for {words} words)</div>   
          : ""
      }
    </div>
  )
}

const formQuestion = ({text, hint, type, name, optional}, i) => data => (
  <div key={"fq-" + i} className="question">
    <div className="question-text">
      { text ? text : "" } 
      { optional ? <span className="question-hint">&nbsp;(optional)</span> : ""}
    </div>
    <div className="question-hint">{ hint ? hint : "" }</div>
    {inputType[Array.isArray(type) ? type[0] : type](name, ...type.slice(1))(data)}
  </div>
)

const formQuestions = qs => data => qs.map((q, i) => formQuestion(q, i)(data));

const section = ({sectionName, hint, questions}, i) => (data) => (
  <div key={"section-" + i} className="form-item">
    <div className="form-item-name">
      {sectionName}
    </div>
    <div className="section-hint">{ hint ? hint : "" }</div>
    <div className="form-item-content">
      {formQuestions(questions)(data)}
    </div>
  </div>
)

const savedInfo = (saved, poster) => (
  <div
    style={{ 
      display: "flex",
      position: "fixed", 
      right: "10px", 
      bottom: "10px", 
      cursor: 'pointer',
      "placeItems": "center",
      background: "#00000005",
      paddingLeft: "5px",
      paddingRight: "5px",
      borderRadius: "15px",
    }}
    onClick={poster}
    >
    <Text
      sx={{
        color: saved ? '#33d6a6' : '#ff8c37',
        fontWeight: '800',
        textTransform: 'uppercase',
      }}
      >
      {saved ? 'Saved' : 'Click to Save'}
    </Text>
    <Icon
      glyph={saved ? 'checkmark' : 'important'}
      color={saved ? '#33d6a6' : '#ff8c37'}
      />
  </div>
)

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

  const poster = async () => {
    const appOrLeader = params.type == 'club' ? params.application : params.leader;
    const msg = { body: JSON.stringify(data), method: 'POST' }
    const fetched = await fetch(`/api/save?id=${appOrLeader}&club=${params.type === "club"}`, msg);
    const json = await fetched.json();

    if (json.success) {
      console.log(json);
      setSaved(true);
    } else console.error(json);

    return json;
  }

  const router = useRouter()

  async function goHome() {
    if (!saved) {
      const res = await poster();
      if (res.success) router.push(`/${params.application}/${params.leader}`)
      else {
        console.error(res);
        const leaveAnyway = confirm("Couldn't save. Leave anyway?")
        if (leaveAnyway) router.push(`/${params.application}/${params.leader}`);
      }
    } else {
      router.push(`/${params.application}/${params.leader}`);
    }
    
  }

  function handleFormInput(e) {
    setSaved(false);
    const formData = new FormData(e.target.form);
    const data = Object.fromEntries(formData.entries());
    setData(data);
  }

  const appType = (params.type === "club" ? clubApplication : leaderApplication);

  if (notFound) return <Error statusCode="404" />

  return (
    <Container py={4} variant="copy">
    {/*<style jsx>{formStyle}</style>*/}
      {savedInfo(saved, poster)}
      <Card>
        <form onInput={handleFormInput}>
          <fieldset 
            style={{all: "unset", width:"100%"}} 
            disabled={applicationsRecord.fields['Submitted'] ? true : false}
            >
            {appType.map((formTemplate, i) => section(formTemplate, i)(data))}
          </fieldset>
        </form>
        <Button
          sx={{
            mt: 3,
            width: '100%',
            textTransform: 'uppercase'
          }}
          variant="ctaLg"
          onClick={goHome}
          >
          {'<<'} Save & Go Back
        </Button>
      </Card>
    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const {
    prospectiveLeadersAirtable,
    applicationsAirtable
  } = require('../../../lib/airtable')
  const cookies = nookies.get({ req })
  if (cookies.authToken) {
    try {
      const leaderRecord = await prospectiveLeadersAirtable.find(
        'rec' + params.leader
      )
      const applicationsRecord = await applicationsAirtable.find(
        'rec' + params.application
      )

      if (leaderRecord.fields['Accepted Tokens'].includes(cookies.authToken)) {
        return { props: { params, applicationsRecord, leaderRecord } }
      } else {
        res.statusCode = 302
        res.setHeader('Location', `/`)
        return
      }
    } catch (e) {
      console.log(e)
      return { props: { notFound: true } }
    }
  } else {
    res.statusCode = 302
    res.setHeader('Location', `/`)
    return
  }
}
