import React from 'react'
import { Alert } from 'react-bootstrap'

type managementProps = {
    mainComponent? : React.ReactNode
}

export default function ManagementScreen({mainComponent}: managementProps) {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        {mainComponent ? mainComponent : 
            <Alert style={{width: "100%"}}>Pick an option</Alert>
        }
    </div>
  )
}
