import { html, render } from "./makeWebComponent.js";
import { clubApplication } from "./club-application.js";
import { leaderApplication } from "./leader-application.js";

const caJSON = JSON.stringify(clubApplication);
const laJSON = JSON.stringify(leaderApplication);

const state = {
  caOpen: false,
  caStatus: "imcomplete", // not started | imcomplete | complete
  laOpen: false,
  laStatus: "complete", // not started | imcomplete | complete
  coLeaders: false,
}

const mainHTML = state => html`
  <div class="app-container">
    <div class="caLink app-link">
      Club Application
      <span class=${"app-link-status " + state.caStatus}>${state.caStatus}</span>
      <span class="app-link-arrow noselect">${state.caOpen ? "▽" : "▷"}</span>
    </div>
    <application-form id="club-app" class=${!state.caOpen ? "hidden" : ""}></application-form>
    <hr>
    <div class="laLink app-link">
      Leader Application
      <span class=${"app-link-status " + state.laStatus}>${state.laStatus}</span>
      <span class="app-link-arrow noselect">${state.laOpen ? "▽" : "▷"}</span>
    </div>
    <application-form id="leader-app" class=${!state.laOpen ? "hidden" : ""}></application-form>
    <hr>
    <div class="app-link">
      Co-Leaders
      <span class="app-link-status optional">optional</span>
      <span class="app-link-arrow noselect">${state.coLeadersOpen ? "▽" : "▷"}</span>
    </div>
    <hr>
    <div class="submit-button">SUBMIT YOUR APPLICATION</div>
    <br><br>
    <div class="reach-out">
      Please don’t hesitate to reach out. 
      We’re available to email at <a href="mailto:applications@hackclub.com"><strong>applications@hackclub.com</strong></a>.
    </div>
  </div>
`

const r = () => render(document.body, mainHTML(state));

function init() {
  r();

  // const colors = 'blue indigo violet fuschia pink red orange yellow green teal cyan gray blue'
  // const names = colors.split(' ')
  // const s = n => (100 / 12) * n
  // const step = n => `${s(n)}%`
  // const points = Array.from({ length: 13 }, (m, n) => n)
  // const frames = points.map(n => `background-color: ${names[n]}`)
  // const styles = points.map(p => `${step(p)} { ${frames[p]} }`).join('\n')
  // const pulse = keyframes([], styles)

  const pulseStyle = `
    background-color: #e6f4fc;
    background-image: linear-gradient(
      128deg,
      rgba(255, 0, 0, 0.0625),
      rgba(0, 255, 255, 0.125)
    );
    background-blend-mode: overlay;
    animation: cugusR 48s linear infinite;
  `

  document.body.style = `${document.body.style} ${pulseStyle}`

  const ca = document.querySelector("#club-app");
  ca.setAttribute('form-template', caJSON)
  ca.render();
  ca.addEventListener("input", () => {
    console.log("save")
  })

  const la = document.querySelector("#leader-app");
  la.setAttribute('form-template', laJSON)
  la.render();
  la.addEventListener("input", () => {
    console.log("save")
  })

  const caLink = document.querySelector(".caLink");
  caLink.addEventListener("mousedown", () => {
    state.caOpen = !state.caOpen;
    r();
  })

  const laLink = document.querySelector(".laLink");
  laLink.addEventListener("mousedown", () => {
    state.laOpen = !state.laOpen;
    r();
  })

  document.querySelector(".submit-button").addEventListener("click", () => {
    console.log(ca.getFormDataList())
    console.log(la.getFormDataList())
  })
}

init();