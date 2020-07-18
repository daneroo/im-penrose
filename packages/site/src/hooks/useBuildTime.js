
import { useStaticQuery, graphql } from 'gatsby'

export default function useBuildTime() {

  const { site } = useStaticQuery(graphql`
  query BuildTimeHook {
    site {
      buildTime
    }
  }
  `)
  const buildTime = site.buildTime
  return { buildTime }
}
