import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Name', render: (user) => user.name },
  { key: 'username', label: 'Username', render: (user) => user.username },
  { key: 'email', label: 'Email', render: (user) => user.email },
  {
    key: 'team',
    label: 'Team',
    render: (user) => user.team?.name ?? '—',
  },
]

function Users() {
  return (
    <CollectionPage
      title="Users"
      endpoint={apiUrl}
      columns={columns}
      emptyMessage="No users have joined yet."
    />
  )
}

export default Users
