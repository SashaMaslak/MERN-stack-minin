import React from "react"

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:
        <a href={link.to} tarhet="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From where:
        <a href={link.from} tarhet="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Click count on the link: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date of create:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  )
}
