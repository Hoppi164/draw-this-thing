import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  drawings: [],
})

export const mutations = {
  ...vuexfireMutations,
  SET_DRAWINGS: (state, drawings) => {
    // Only needed for SSR/Universal Mode
    state.drawings = drawings
  },
}
export const actions = {
  bindDrawings: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore.collection('drawings').limit(100)
    await bindFirestoreRef('drawings', ref, { wait: true })
  }),

  unbindDrawings: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('drawings', false)
  }),
}

export const getters = {
  drawings(state) {
    return state.drawings
  },
}
