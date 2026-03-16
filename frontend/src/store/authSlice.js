import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mirror backend roles for frontend RBAC
export const UserRoles = {
  FARMER: 'farmer',
  BUYER: 'buyer', 
  SUPER_ADMIN: 'super_admin',
  INSTITUTION: 'institution',
}

const API_BASE_URL = 'http://localhost:5000/api'

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Login failed')
      }

      return data
    } catch (error) {
      return rejectWithValue('Network error. Please try again.')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Registration failed')
      }

      return data
    } catch (error) {
      return rejectWithValue('Network error. Please try again.')
    }
  }
)

export const verifyToken = createAsyncThunk(
  'auth/verify',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth
      
      if (!accessToken) {
        return rejectWithValue('No access token available')
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Token verification failed')
      }

      return data
    } catch (error) {
      return rejectWithValue('Network error. Please try again.')
    }
  }
)

const STORAGE_KEY = 'telax_auth'

const loadInitialState = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const persistState = (state) => {
  if (typeof window === 'undefined') return
  try {
    const payload = {
      user: state.user,
      role: state.role,
      accessToken: state.accessToken,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // ignore storage errors
  }
}

const clearPersistedState = () => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

const defaultState = {
  user: null,
  role: null,
  accessToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

const persisted = loadInitialState()

const initialState = {
  ...defaultState,
  ...(persisted || {}),
  isAuthenticated: !!persisted?.accessToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload
      state.user = user
      state.role = user?.role ?? null
      state.accessToken = access_token ?? null
      state.isAuthenticated = !!access_token
      state.error = null
      persistState(state)
    },
    logout: (state) => {
      state.user = null
      state.role = null
      state.accessToken = null
      state.isAuthenticated = false
      state.error = null
      clearPersistedState()
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.role = action.payload.user.role
        state.accessToken = action.payload.access_token
        state.isAuthenticated = true
        state.error = null
        persistState(state)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.role = action.payload.user.role
        state.accessToken = action.payload.access_token
        state.isAuthenticated = true
        state.error = null
        persistState(state)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Verify Token
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.role = action.payload.user.role
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.role = null
        state.accessToken = null
        clearPersistedState()
      })
  },
})

export const { setCredentials, logout, clearError } = authSlice.actions
export default authSlice.reducer

