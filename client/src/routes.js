import React from "react"
import { Routes, Route, Redirect } from "react-router-dom"
import LinksPage from "./pages/LinksPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import AuthPage from "./pages/AuthPage"

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Redirect to="/create" />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} exact />
      <Redirect to="/" />
    </Routes>
  )
}
