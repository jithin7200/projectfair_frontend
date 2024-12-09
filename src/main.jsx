// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import './bootstrap.css'
// import Contextshare from './context/Contextshare.jsx'



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       {/* <Contextshare> */}
//           <App />
//       {/* </Contextshare> */}
//    </BrowserRouter>
//  </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import Contextshare from './context/Contextshare.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Contextshare>
     <App />
     </Contextshare>
    </BrowserRouter>
  </StrictMode>,
)
