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
  input: (name, data, { placeholder } = { placeholder: "" }) => (
    <input 
      name={name} 
      defaultValue={data[name]}
      placeholder={placeholder} 
      className="question-input">
    </input>
  ),
  textarea: (name, data, { words, placeholder } = { words: 0, placeholder: "" }) => (
    <MyTextarea defaultValue={data[name]} words={words} fieldName={name} placeholder={placeholder} />
  ),
  options: (name, data, { choices } = { choices: [] }) => <>
    <Select className="options" name={name} defaultValue={data[name]}>
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
  date: (name, data) => <Input name={name} defaultValue={data[name]} className="question-input" type="date"/>,
  jsx: (name, data, jsxMaker) => jsxMaker(name)
}

const MyTextarea = ({ words, fieldName, placeholder, defaultValue }) => { // can't use name as prop

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

const formQuestion = ({text, hint, type, name, optional}, data, i) => (
  <div key={"fq-" + i} className="question">
    <div className="question-text">
      { text ? text : "" } 
      { optional ? <span className="question-hint">&nbsp;(optional)</span> : ""}
    </div>
    <div className="question-hint">{ hint ? hint : "" }</div>
    {inputType[Array.isArray(type) ? type[0] : type](name, data, ...type.slice(1))}
  </div>
)

const formQuestions = (qs, data) => qs.map((q, i) => formQuestion(q, data, i));

const section = ({sectionName, hint, questions}, data, i) => (
  <div key={"section-" + i} className="form-item">
    <div className="form-item-name">
      {sectionName}
    </div>
    <div className="section-hint">{ hint ? hint : "" }</div>
    <div className="form-item-content">
      {formQuestions(questions, data)}
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
      "placeItems": "center"
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

const formStyle = `
    * {
      font-family: "Phantom Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    }

    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome, Edge, Opera and Firefox */
    }

    .form-item {
      display: flex;
      width: 100%;
      height: auto;
      flex-direction: column;
    }

    .form-item-name {
      text-align: left;
      width: 200px;
      font-size: 30px;
      color: #e42d42;
      font-weight: bold;
      line-height: 1.25;
      padding: 10px;
    }

    .section-hint {
      padding-left: 10px;
    }

    .form-item-content {
      width: 100%;
      background: none;
      padding: 10px;
      line-height: 1.375;
      font-size: 22px;
      color: #384046;
    }

    .form-item-content textarea,
    .form-item-content input,
    .form-item-content select {
      background: white;
    }

    .question {
      margin: auto;
      padding-bottom: 12px;
      max-width: 32rem;
    }

    .question-hint {
      font-size: 15px;
      color: #7a8c97;
    }

    .question-textarea {
      resize: vertical;
    }

    .question-input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      vertical-align: middle;
      min-height: 36px;
      line-height: inherit;
      font-family: inherit;
      color: inherit;
      background-color: transparent;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      border-color: #dde1e4;
      font-size: inherit;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 6px;
      padding-bottom: 6px;
      background-color: transparent;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .options {
      display: block;
      vertical-align: middle;
      max-width: 32rem;
      min-height: 36px;
      line-height: inherit;
      font-family: inherit;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(221, 225, 228);
      transition: box-shadow 0.1875s cubic-bezier(0.375, 0, 0.675, 1) 0s;
      font-size: 18px;
      margin: 0px;
      padding: 6px 12px;
      width: 100%;
      background-color: transparent;
      color: inherit;
    }

    .options[type="select"] {
      background: url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23606e77' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) right 0.75rem center / 0.5rem no-repeat rgb(255, 255, 255);
    }
`

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

  if (notFound) return <Error statusCode="404" />

  return (
    <Container py={4} variant="copy">
      <style jsx>{formStyle}</style>
      {savedInfo(saved, poster)}
      <Card>
        <form onInput={handleFormInput}>
          <fieldset 
            style={{all: "unset", width:"100%"}} 
            disabled={applicationsRecord.fields['Submitted'] ? true : false}
            >
            {(params.type === "club" ? clubApplication : leaderApplication).map((formTemplate, i) => section(formTemplate, data, i))}
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
