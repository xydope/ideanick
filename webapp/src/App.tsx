import './styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  editIdeaRouteParams,
  getAllIdeasRoute,
  getEditIdeaRoute,
  getEditProfileRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
  getViewIdeaRoute,
  viewIdeaRouteParams,
} from './lib/routes'
import { AllIdeasPage } from './pages/ideas/AllIdeasPage'
import { AppContextProvider } from './lib/ctx'
import { EditIdeaPage } from './pages/ideas/EditIdeaPage'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import { NewIdeaPage } from './pages/ideas/NewIdeaPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { TrpcProvider } from './lib/TrpcProvider'
import { ViewIdeaPage } from './pages/ideas/ViewIdeaPage'

export const App = () => {
  return (
    <HelmetProvider>
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
                <Route path={getEditProfileRoute()} element={<EditProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}