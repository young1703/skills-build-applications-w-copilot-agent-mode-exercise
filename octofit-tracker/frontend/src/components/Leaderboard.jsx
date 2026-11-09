import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'rank', label: 'Rank', render: (entry) => `#${entry.rank}` },
  {
    key: 'user',
    label: 'Athlete',
    render: (entry) => entry.user?.name ?? entry.user?.username ?? 'Unknown',
  },
  {
    key: 'team',
    label: 'Team',
    render: (entry) => entry.team?.name ?? '—',
  },
  { key: 'points', label: 'Points', render: (entry) => entry.points },
  { key: 'period', label: 'Period', render: (entry) => entry.period },
]

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      endpoint={apiUrl}
      columns={columns}
      emptyMessage="The leaderboard is waiting for its first results."
    />
  )
}

export default Leaderboard
