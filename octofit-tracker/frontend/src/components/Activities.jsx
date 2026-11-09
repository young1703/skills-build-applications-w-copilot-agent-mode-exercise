import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'type', label: 'Activity', render: (activity) => activity.type },
  {
    key: 'user',
    label: 'Athlete',
    render: (activity) => activity.user?.name ?? activity.user?.username ?? 'Unknown',
  },
  {
    key: 'duration',
    label: 'Duration',
    render: (activity) => `${activity.durationMinutes} min`,
  },
  { key: 'calories', label: 'Calories', render: (activity) => activity.calories },
  {
    key: 'date',
    label: 'Date',
    render: (activity) =>
      activity.date ? new Date(activity.date).toLocaleDateString() : '—',
  },
]

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      endpoint="activities"
      columns={columns}
      emptyMessage="No activities have been recorded yet."
    />
  )
}

export default Activities
