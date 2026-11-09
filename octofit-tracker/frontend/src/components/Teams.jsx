import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team', render: (team) => team.name },
  { key: 'description', label: 'About', render: (team) => team.description },
  {
    key: 'members',
    label: 'Members',
    render: (team) => (Array.isArray(team.members) ? team.members.length : 0),
  },
]

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      endpoint={apiUrl}
      columns={columns}
      emptyMessage="No teams have been created yet."
    />
  )
}

export default Teams
