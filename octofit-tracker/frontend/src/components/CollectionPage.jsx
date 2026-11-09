import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function CollectionPage({ title, endpoint, columns, emptyMessage }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <div className="mb-4">
        <p className="text-uppercase text-primary fw-semibold small mb-2">OctoFit Tracker</p>
        <h1 className="h2 mb-0">{title}</h1>
      </div>

      {loading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <div className="alert alert-light border" role="status">
          {emptyMessage}
        </div>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.key}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{column.render(record)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
