import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'name', label: 'Workout', render: (workout) => workout.name },
  { key: 'category', label: 'Category', render: (workout) => workout.category },
  { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
  {
    key: 'duration',
    label: 'Duration',
    render: (workout) => `${workout.durationMinutes} min`,
  },
  { key: 'description', label: 'Description', render: (workout) => workout.description },
]

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      endpoint={apiUrl}
      columns={columns}
      emptyMessage="No workouts are available yet."
    />
  )
}

export default Workouts
