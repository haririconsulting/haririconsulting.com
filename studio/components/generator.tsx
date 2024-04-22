import {generateRandomString} from '../../frontend/util/text'

export default function StringGenerator({length}: {length: number}) {
  return (
    <button
      onClick={() => {
        alert(generateRandomString(length))
      }}
    >
      Random string
    </button>
  )
}
