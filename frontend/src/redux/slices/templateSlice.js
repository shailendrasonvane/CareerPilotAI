import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTemplates = createAsyncThunk('template/fetchTemplates', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/ResumeTemplates');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch templates');
  }
});

const templateSlice = createSlice({
  name: 'template',
  initialState: {
    templates: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => { state.loading = true; })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default templateSlice.reducer;
