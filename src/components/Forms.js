import React, { Component } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Label,
  LargeButton,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import styled, { keyframes } from 'styled-components'
import { injectIntl, useIntl } from 'react-intl'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  } 
  to {
    transform: rotate(360deg);
  } 
`
const SaveBaseIcon = styled(Icon)`
  position: fixed;
  bottom: 0;
  left: 0;
  ${(props) => !props.saved && { animation: `4s ${spin} infinite` }}
`

const SaveStatusIcon = ({ saved }) => {
  const intl = useIntl()

  return (
    <SaveBaseIcon
      glyph={saved ? 'checkmark' : 'community'}
      color={saved ? 'muted' : 'primary'}
      title={
        saved
          ? intl.formatMessage({ id: 'SAVED' })
          : intl.formatMessage({ id: 'SAVING' })
      }
      size={36}
      m={2}
      saved={saved}
    />
  )
}

const SaveStatusLine = styled(Box)`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  opacity: ${(props) => (props.saved ? 2 / 3 : 1)};
  transition-duration: 1s;
  color: ${(props) => theme.colors[props.saved ? 'slate' : 'primary']};
  box-shadow: 0 0 4px ${(props) => (props.saved ? '0px' : '2px')};
`

const SaveStatus = (props) => (
  <>
    <SaveStatusIcon {...props} />
    <SaveStatusLine {...props} />
  </>
)

export class AutoSaver extends Component {
  constructor(props) {
    super(props)
    this.state = { previousValues: props.values }
  }

  componentDidMount() {
    const intervalId = setInterval(this.autoSave, 1000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  autoSave = () => {
    const { handleSubmit, isSubmitting, values } = this.props
    const { previousValues } = this.state
    const unsavedChanges = previousValues !== values

    this.setState({ unsavedChanges })

    if (unsavedChanges && !isSubmitting) {
      /* This is super hacky and should be changed -- basically if we have a new
       * ID it's because the parent form is now holding a new record. We don't
       * want to save the new record though because it's just loaded, so we'll
       * set the previousValues to the new record's values */
      const changedRecord = previousValues.id !== values.id

      if (!changedRecord) {
        // We have to call handleSubmit this way because formik:
        // https://github.com/jaredpalmer/formik/issues/347
        handleSubmit({ preventDefault: () => null })
      }

      this.setState({ previousValues: values })
    }
  }

  render() {
    const { unsavedChanges } = this.state
    return (
      <>
        <SaveStatus saved={!unsavedChanges} />
        {unsavedChanges && <ConfirmClose />}
      </>
    )
  }
}

export const Error = styled(Text.span).attrs({
  className: 'error',
  color: 'error',
  fontSize: 1,
  ml: 1
})`
  text-transform: lowercase;
  &:before {
    content: '— ';
  }
`

export const Hint = styled(Text.span).attrs({
  color: 'slate',
  fontSize: 1,
  mt: 1,
  align: 'left'
})`
  display: block;
  line-height: 1.375;
`

// currently unused
class ConfirmClose extends Component {
  componentDidMount() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    window.onbeforeunload = () =>
      window.confirm(intl.formatMessage({ id: 'BEFORE_LEAVING_WARNING' }))
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    return null
  }
}

export const confirmCloseWithIntl = injectIntl(ConfirmClose)

export const Optional = () => {
  const intl = useIntl()

  return (
    <Text.span
      className="optional"
      fontSize={1}
      ml={1}
      color="muted"
      children={`(${intl.formatMessage({ id: 'OPTIONAL' })})`}
    />
  )
}

export const LengthHint = ({ min, max, actual }) => {
  const intl = useIntl()

  return (
    <Text.span
      className="length-hint"
      color="muted"
      children={
        actual === 0
          ? intl.formatMessage({ id: 'AIM_FOR_BETWEEN' }, { min, max })
          : intl.formatMessage(
              { id: 'AIM_FOR_BETWEEN_WITH_ACTUAL' },
              { actual, min, max }
            )
      }
    />
  )
}

export class Field extends Component {
  static defaultProps = {
    type: 'text'
  }

  constructor(props) {
    super(props)
    this.tag = Input.withComponent(
      ['textarea', 'select'].indexOf(props.type) === -1 ? 'input' : props.type
    )
  }

  render() {
    const {
      type,
      name = 'name',
      label,
      children,
      error,
      hint,
      min,
      max,
      rows,
      optional,
      value,
      bg,
      mb = 3,
      ...props
    } = this.props

    const Tag = this.tag

    return (
      <Label className={type} mb={mb} id={name}>
        <Flex style={{ display: 'inline' }} wrap>
          <span>{label}</span>
          {optional ? <Optional /> : null}
          {error && <Error children={error} />}
        </Flex>
        <Tag
          name={name}
          type={type}
          rows={rows || (type === 'textarea' ? 5 : null)}
          children={children}
          {...props}
          value={value}
          bg={bg}
        />
        {min && max && <LengthHint min={min} max={max} actual={value.length} />}
        {hint && <Hint children={hint} />}
      </Label>
    )
  }
}

export const Submit = styled(Button.withComponent('input')).attrs({
  type: 'submit',
  color: 'white',
  py: 2,
  px: 3,
  fontSize: 2
})`
  text-transform: uppercase;
`
Submit.lg = styled(LargeButton.withComponent('input')).attrs({
  type: 'submit',
  color: 'white',
  py: 3,
  px: 4,
  fontSize: 3
})`
  text-transform: uppercase;
`

export const Form = styled(Container.withComponent('form')).attrs({
  py: 4,
  px: 3,
  maxWidth: 42
})`
  display: grid;
  grid-gap: 1rem;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(1, 1fr);
    h2,
    .textarea {
      grid-column: 1 / -1;
    }
  }
  textarea {
    resize: vertical;
  }
`

export const Subheading = styled(Heading.h2).attrs({
  fontSize: 4,
  color: 'primary'
})`
  text-transform: capitalize;
`

const HeadingBox = styled(Box).attrs({
  mr: [4, 5]
})`
  text-align: left;
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  ${theme.mediaQueries.md} {
    flex-basis: 10rem;
    text-align: right;
  }
`

const FieldsBox = styled(Box).attrs({})`
  order: 2;
  flex-grow: 1;
  label div {
    text-align: left !important;
    line-height: 1.375;
  }
`

export const Fieldset = (props) => (
  <Flex flexDirection={['column', 'row']}>
    <HeadingBox>
      <Subheading id={props.section}>{props.section}</Subheading>
    </HeadingBox>
    <FieldsBox>{props.children}</FieldsBox>
  </Flex>
)

export const Aside = (props) => <Box bg="snow" {...props} />
