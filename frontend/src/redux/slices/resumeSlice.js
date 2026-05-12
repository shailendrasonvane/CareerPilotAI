import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchResumes = createAsyncThunk('resume/fetchResumes', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/resume');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch resumes');
  }
});

export const fetchResumeById = createAsyncThunk('resume/fetchResumeById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/resume/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch resume');
  }
});

export const createResume = createAsyncThunk('resume/createResume', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/resume', data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create resume');
  }
});

export const updateResume = createAsyncThunk('resume/updateResume', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/resume/${id}`, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update resume');
  }
});

export const deleteResume = createAsyncThunk('resume/deleteResume', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/resume/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete resume');
  }
});

export const duplicateResume = createAsyncThunk('resume/duplicateResume', async (id, { rejectWithValue }) => {
  try {
    const response = await api.post(`/resume/${id}/duplicate`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to duplicate resume');
  }
});

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    activeResume: null,
    loading: false,
    error: null,
    saveLoading: false
  },
  reducers: {
    clearActiveResume: (state) => {
      state.activeResume = null;
    },
    updateActiveResumeLocally: (state, action) => {
      state.activeResume = { ...state.activeResume, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => { state.loading = true; })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchResumeById.fulfilled, (state, action) => {
        state.activeResume = action.payload;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.resumes.unshift(action.payload);
      })
      .addCase(updateResume.pending, (state) => { state.saveLoading = true; })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.activeResume = action.payload;
        const index = state.resumes.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.resumes[index] = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter(r => r.id !== action.payload);
      })
      .addCase(duplicateResume.fulfilled, (state, action) => {
        state.resumes.unshift(action.payload);
      });
  }
});

export const { clearActiveResume, updateActiveResumeLocally } = resumeSlice.actions;
export default resumeSlice.reducer;
