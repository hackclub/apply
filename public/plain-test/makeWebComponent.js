import { render, html, svg } from 'https://cdn.skypack.dev/uhtml';

export { render, html, svg };

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);

export function makeWebComponent(config) {
	let { 
		name, 
		template, 
		onConstruct,
		onConnected, 
		onRender, 
	} = config;

	if (!name) throw "Component requires name.";
	if (!template) template = host => html``;
	if (!onConstruct) onConstruct = false; // host => {};
	if (!onConnected) onConnected = false; // host => {};
	if (!onRender) onRender = false; //host => {};

	class Temp extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: "open" });

			if (onConstruct) onConstruct(this);
			
			this.render();
		}

		on(eventName, selectorString, event) { // focus doesn't work with this, focus doesn't bubble, need focusin
			this.shadowRoot.addEventListener(eventName, (e) => {
				e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
				if (selectorString === "" || matchesTrigger(e, selectorString)) event(e, this);
			})
		}

		// lifecycle
		connectedCallback() { 
			if (onConnected) onConnected(this);
		}
		
		render() {
			if (onRender) onRender(this);
			render(this.shadowRoot, template(this));
		}
	}

	window.customElements.define(name, Temp);
}