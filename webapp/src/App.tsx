import './styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignUpRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { Layout } from './components/Layout'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { TrpcProvider } from './lib/TrpcProvider'
import { ViewIdeaPage } from './pages/ViewIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={getSignUpRoute()} element={<SignUpPage />} />
            <Route path={getSignInRoute()} element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
