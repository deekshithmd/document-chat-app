import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ViewDocument } from './pages/ViewDocument'

function App() {

  return (
    <div className='w-full p-0 m-0'>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/document/:docId" element={<ViewDocument />} />
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>

  )
}

export default App

// import { Header } from './components/Header'
// import { Home } from './pages/Home'
// import { Login } from './pages/Login'
// import { Signup } from './pages/Signup'
// import { Route, Routes, Navigate, useRoutes } from 'react-router-dom'
// import './App.css'
// import { ProtectedRoute } from './components/ProtectedRoute'

// // Define your routes as a variable (this is the new part!)
// export const routes = [
//     {
//         path: "/signup",
//         element: <Signup />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         element: <ProtectedRoute />,
//         children: [
//             {
//                 path: "/home",
//                 element: <Home />,
//             },
//             {
//                 index: true,
//                 element: <Navigate to="/home" replace />,
//             },
//         ],
//     },
//     {
//         path: "*",
//         element: <Navigate to="/login" replace />,
//     },
// ];

// function App() {
//     const element = useRoutes(routes);
//     return (
//         <div className='w-full p-0 m-0'>
//             <Header />
//             {element}
//         </div>

//     )
// }

// export default App

