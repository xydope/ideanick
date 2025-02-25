import './styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  editIdeaRouteParams,
  getAllIdeasRoute,
  getEditIdeaRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { AppContextProvider } from './lib/ctx'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { Layout } from './components/Layout'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { TrpcProvider } from './lib/TrpcProvider'
import { ViewIdeaPage } from './pages/ViewIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={getSignOutRoute()} element={<SignOutPage />}></Route>
            <Route element={<Layout />}>
              <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={getSignUpRoute()} element={<SignUpPage />} />
              <Route path={getSignInRoute()} element={<SignInPage />} />
              <Route path={getEditIdeaRoute(editIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
