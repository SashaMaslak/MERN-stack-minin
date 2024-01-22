import React, { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../hooks/http.hooks"
import { AuthContext } from "../context/AuthContext"
import { LinkCard } from "../components/LinkCard"
import { Loader } from "../components/Loader"

const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(fetched)
    } catch (error) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return <div>{!loading && link && <LinkCard link={link} />}</div>
}

export default DetailPage
