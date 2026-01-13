import {Helmet} from 'react-helmet-async'

const Title = ({title='chart',description='this is chat app called vortex'}) => {
  return (
   <Helmet>
    <title>{title}</title>
    <meta  name='description' content={description}/>
   </Helmet>
  )
}

export default Title