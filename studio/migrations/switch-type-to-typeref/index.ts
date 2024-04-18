import {deburr} from 'lodash'
import {Work} from '../../sanity.types'
import {
  at,
  createIfNotExists,
  defineMigration,
  patch,
  replace,
  setIfMissing,
  unset,
} from 'sanity/migrate'
import {set} from 'sanity'

function getPetId(pet: {name: string}) {
  return `pet-${deburr(pet.name.toLowerCase())}`
}

export default defineMigration({
  title: 'Switch type to typeref',
  documentTypes: ['work'],
  migrate: {
    document(doc, context) {
      const work = doc as Work

      return [
        // createIfNotExists({
        //   _id: id,
        //   _type: 'category',
        //   title: work.type,
        //   slug: {current: work.type},
        // }),
        // @ts-ignore
        at('type', set(work.type[0])),
      ]
      // const currentPets = work.

      // // migrate any pet object to a new document
      // if (Array.isArray(currentPets) && currentPets.length > 0) {
      //   return (
      //     currentPets
      //       // skip pets that have already been converted to a reference
      //       .filter((pet) => !pet._ref)
      //       .flatMap((pet) => {
      //         const petId = getPetId(pet)

      //         // avoid carrying over the array _key to the pet document
      //         const {_key, ...petAttributes} = pet

      //         return [
      //           createIfNotExists({
      //             _id: petId,
      //             _type: 'pet',
      //             ...petAttributes,
      //           }),
      //           patch(work._id, at(['pets'], replace([{_type: 'reference', _ref: petId}], {_key}))),
      //         ]
      //       })
      //   )
      // }
    },
  },
})
