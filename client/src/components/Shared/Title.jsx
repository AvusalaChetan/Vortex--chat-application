import React from 'react'
import {Helmet} from 'react-helmet-async'

const Title = ({title='chart',decription='this is chat app called vortex'}) => {
  return (
   <Helmet>
    <title>{title}</title>
    <meta  name='description' content={decription}/>
   </Helmet>
  )
}

export default Title