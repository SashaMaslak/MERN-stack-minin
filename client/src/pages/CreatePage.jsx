import React, { useContext, useState } from "react"
import { useHttp } from "../hooks/http.hooks"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const CreatePage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState("")

  const pressHandler = async e => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        )
        navigate(`/detail/${data.link._id}`)
      } catch (error) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Add link"
            id="link"
            type="text"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyUp={pressHandler}
          />
          <label htmlFor="email">Input Email</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
