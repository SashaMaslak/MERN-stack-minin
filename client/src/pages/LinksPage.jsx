import React, { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hooks"
import { AuthContext } from "../context/AuthContext"
import { LinksList } from "../components/LinksList"
import { Loader } from "../components/Loader"

const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      })

      setLinks(fetched)
    } catch (error) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && <LinksList links={links} />}</>
}

export default LinksPage
