import CollectionPage from './CollectionPage.jsx'

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
      endpoint="teams"
      columns={columns}
      emptyMessage="No teams have been created yet."
    />
  )
}

export default Teams
