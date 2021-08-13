import { render } from "./makeWebComponent.js";
import { view } from "./view.js";
import { clubApplication } from "./formConfigs/club-application.js";
import { leaderApplication } from "./formConfigs/leader-application.js";
import { coleadApplication } from "./formConfigs/colead-add.js";

// import { logoIsh } from "./logo-ish.js";

const state = {
  caOpen: false,
  caStatus: "imcomplete", // not started | imcomplete | complete
  laOpen: false,
  laStatus: "complete", // not started | imcomplete | complete
  coLeadersOpen: false,
  coStatus: "imcomplete", // not started | imcomplete | complete
}

const r = () => render(document.body, view(state));

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
  ca.setForm(clubApplication);
  ca.addEventListener("input", () => {
    console.log("save")
  })

  const la = document.querySelector("#leader-app");
  la.setForm(leaderApplication);
  la.addEventListener("input", () => {
    console.log("save")

    // const logoData = la.getFormData().get("bonus");
    // logoIsh(logoData);
  })

  const co = document.querySelector("#colead-app");
  co.setForm(coleadApplication);
  co.addEventListener("input", () => {
    console.log("save")
  })

  document.querySelector(".caLink").addEventListener("mousedown", () => {
    state.caOpen = !state.caOpen;
    r();
  })

  document.querySelector(".laLink").addEventListener("mousedown", () => {
    state.laOpen = !state.laOpen;
    r();
  })

  document.querySelector(".coLeadersLink").addEventListener("mousedown", () => {
    state.coLeadersOpen = !state.coLeadersOpen;
    r();
  })

  document.querySelector(".submit-button").addEventListener("click", () => {
    console.log(ca.getFormDataList())
    console.log(la.getFormDataList())
  })
}

init();