import CollectionPage from './CollectionPage.jsx'

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
      endpoint="users"
      columns={columns}
      emptyMessage="No users have joined yet."
    />
  )
}

export default Users
