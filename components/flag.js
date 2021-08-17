const Flag = props => (
    <a
      title="Hack Club"
      href="https://hackclub.com/"
      className="nav-flag"
      {...props}
    >
      <style jsx>{`
        a {
          display: none;
          background-image: url(https://assets.hackclub.com/flag-orpheus-left.svg);
          background-repeat: no-repeat;
          background-position: top left;
          background-size: contain;
          cursor: pointer;
          flex-shrink: 0;
          width: 112px;
          height: 48px;
          position: fixed;
          top: 32px;
          left: 0;
          z-index: 999;
        }
        @media (min-width: 600px) {
          a {
            display: inline-block;
            height: 64px;
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          a {
            transition: ${3 / 16}s cubic-bezier(0.375, 0, 0.675, 1) transform;
            transform-origin: top left;
          }
          a:hover,
          a:focus {
            animation: waveFlag 0.5s linear infinite alternate;
          }
        }
        @keyframes waveFlag {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-5deg);
          }
        }
      `}</style>
    </a>
  )
  
  export default Flag