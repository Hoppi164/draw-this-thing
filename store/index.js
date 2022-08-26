import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  drawings: [],
  user: null,
})

export const mutations = {
  ...vuexfireMutations,
  SET_DRAWINGS: (state, drawings) => {
    // Only needed for SSR/Universal Mode
    state.drawings = drawings
  },

  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null
      return
    }
    const { uid, email, emailVerified } = authUser
    state.user = {
      uid,
      email,
      emailVerified,
      claims,
    }
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

  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      ctx.commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
    } else {
      ctx.commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
      // Do something with the authUser and the claims object...
    }
  },
}

export const getters = {
  drawings(state) {
    return state.drawings
  },
  isLoggedIn: (state) => {
    return !!state?.user?.uid
  },
  user: (state) => {
    return state.user
  },
}
