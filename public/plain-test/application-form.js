import { html, makeWebComponent } from "./makeWebComponent.js";

const inputType = {
  "input": (id) => html`<input name=${id} class="question-input"></input>`,
  "textarea": (id, { words } = { words: 0 }) => html`
    <div id="${id}" class="ta">
      <textarea name=${id} class="question-textarea question-input"></textarea>
      ${ words ? html`<div class="wordcount question-hint" data-words=${words}>(aim for ${words} words)</div>` : "" }
    </div>
  `,
  "options": (id, { choices } = { choices: [] }) => html`
  	<select class="options" name=${id}>
  		<option disabled value="">Select One</option>
  		${choices.map( (choice) => html`<option value=${choice}>${choice}</option/>`)}
  	</select>
  `
}

const htmlQuestion = ({q, hint, type, id}) => html`
  <div class="question">
    <span class="question-text">
      ${q}
      <span class="question-hint">${hint}</span>
    </span>
     ${inputType[type[0]](id, ...type.slice(1))}
  </div>
`

const htmlQuestions = qs => qs.map(htmlQuestion);

const htmlForm = ({sectionName, questions}) => html`
  <div class="form-item">
    <div class="form-item-name">
      ${sectionName}
    </div>
    <div class="form-item-content">
      ${htmlQuestions(questions)}
    </div>
  </div>
`

const template = (host) => html`
  <style>
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
      flex-direction: row;
    }

    .form-item-name {
      text-align: right;
      width: 200px;
      font-size: 27px;
      margin: 0px;
      color: #e42d42;
      font-weight: bold;
      line-height: 1.25;
      padding: 10px;
      padding-right: 20px;
    }

    .form-item-content {
      width: 80%;
      background: white;
      padding: 10px;
      line-height: 1.375;
      font-size: 18px;
      color: #384046;
    }

    .question {
      margin: auto;
      padding-bottom: 12px;
      max-width: 32rem;
    }

    .question-hint {
      font-size: 13px;
      color: #7a8c97;
    }

    .question-textarea {
      resize: vertical;
    }

    .question-input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      resize: vertical;
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

    @media only screen and (max-width: 500px) {
      .form-item {
        flex-direction: column;
      }

      .form-item-name {
        text-align: left;
      }
    }
  </style>

  <main>
    <form class="form">${
    	host.getAttribute("form-template") 
    		? JSON.parse(host.getAttribute("form-template")).map(htmlForm)
    		: ""
    	}</form>
  </main>
`

const onRender = host => {
	const ft = host.getAttribute("form-template");
	console.log(ft);
	// JSON.parse(host.getAttribute("form-template")).map(htmlForm)
}

const onConstruct = host => {

	host.checkIsValid = () => {
		const formData = host.getFormData();
		const valid = [...formData.values()].every(v => v !== "");
		return valid;
	}

	host.getFormData = () => {
		let form = host.shadowRoot.querySelector('.form');
		let formData = new FormData(form);
		return formData;
	}

	host.getFormDataList = () => {
		const formData = host.getFormData();
		return [...formData.entries()];
	}

	host.on("keyup", ".question-textarea", (e) => {
		let length = e.target.value.split(" ").length
		if (e.target.value === "") length = 0;
		const wc = e.target.parentNode.querySelector(".wordcount");
		if (!wc) return;
		wc.innerHTML = `(${length} of ~${wc.dataset.words})`;
	})

	host.on("focusout", ".question-textarea", (e) => {
		let length = e.target.value.split(" ").length;
		if (e.target.value !== "") return;
		const wc = e.target.parentNode.querySelector(".wordcount");
		if (!wc) return;
		wc.innerHTML = `(aim for ${wc.dataset.words} words)`;
	})
}

const config = {
  name: "application-form",
  template,
  onConstruct,
}

makeWebComponent(config);